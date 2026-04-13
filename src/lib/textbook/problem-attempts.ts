import { firestore } from "@/lib/firebase-admin";
import type {
  CheckpointSummary,
  ProblemAttemptRecord,
  ProblemProgress,
  ProblemSchema,
  SectionMastery,
} from "./types";

const memoryAttemptsByUser = new Map<string, ProblemAttemptRecord[]>();

function normalizeUserId(userId?: string) {
  return userId ?? "anonymous";
}

function computeMastery(sectionId: string, attempts: ProblemAttemptRecord[], userId?: string): SectionMastery {
  const sectionAttempts = attempts.filter((attempt) => attempt.unitId === sectionId);
  const totalAttempts = sectionAttempts.length;
  const correctAttempts = sectionAttempts.filter((attempt) => attempt.correct).length;

  return {
    correctAttempts,
    mastery: totalAttempts === 0 ? 0 : correctAttempts / totalAttempts,
    sectionId,
    totalAttempts,
    userId,
  };
}

function computeProblemProgressFromAttempts(
  problemId: string,
  attempts: ProblemAttemptRecord[],
  maxAttempts?: number | null,
  userId?: string
): ProblemProgress {
  const problemAttempts = attempts
    .filter((attempt) => attempt.problemId === problemId)
    .sort((a, b) => a.attemptedAt.localeCompare(b.attemptedAt));
  const attemptsUsed = problemAttempts.length;
  const bestScore = problemAttempts.reduce(
    (best, attempt) => Math.max(best, attempt.score),
    0
  );
  const solved = bestScore >= 1;
  const cappedMaxAttempts = maxAttempts ?? null;
  const attemptsRemaining =
    cappedMaxAttempts === null ? null : Math.max(cappedMaxAttempts - attemptsUsed, 0);
  const status: ProblemProgress["status"] =
    attemptsUsed === 0
      ? "not-started"
      : solved
        ? "solved"
        : attemptsRemaining === 0
          ? "locked-out"
          : "in-progress";

  return {
    attemptsRemaining,
    attemptsUsed,
    bestScore,
    lastSubmittedAt: problemAttempts[problemAttempts.length - 1]?.attemptedAt,
    maxAttempts: cappedMaxAttempts,
    problemId,
    solved,
    status,
    userId,
  };
}

function computeCheckpointSummaryFromAttempts(
  sectionId: string,
  attempts: ProblemAttemptRecord[],
  problems: ProblemSchema[]
): CheckpointSummary {
  const sectionAttempts = attempts.filter((attempt) => attempt.unitId === sectionId);
  const problemProgress = problems.map((problem) =>
    computeProblemProgressFromAttempts(problem.id, sectionAttempts, problem.maxAttempts)
  );
  const weakTags = Array.from(
    new Set(
      problems
        .filter((problem) => !problemProgress.find((item) => item.problemId === problem.id)?.solved)
        .flatMap((problem) => problem.skillTags)
    )
  );

  return {
    attemptsUsed: sectionAttempts.length,
    averageBestScore:
      problems.length === 0
        ? 0
        : problemProgress.reduce((sum, item) => sum + item.bestScore, 0) / problems.length,
    masteredCount: problemProgress.filter((item) => item.solved).length,
    problemCount: problems.length,
    sectionId,
    submittedCount: problemProgress.filter((item) => item.attemptsUsed > 0).length,
    weakTags,
  };
}

async function getAttemptsForUser(userId?: string) {
  const key = normalizeUserId(userId);
  const memoryAttempts = memoryAttemptsByUser.get(key) ?? [];

  if (!firestore || !userId) {
    return memoryAttempts;
  }

  const snapshot = await firestore
    .collection("users")
    .doc(userId)
    .collection("textbookProblemAttempts")
    .get();

  return snapshot.docs.map((doc) => doc.data() as ProblemAttemptRecord);
}

export async function persistProblemAttempt(attempt: ProblemAttemptRecord) {
  const key = normalizeUserId(attempt.userId);

  const current = memoryAttemptsByUser.get(key) ?? [];
  memoryAttemptsByUser.set(key, [attempt, ...current]);

  if (!firestore || !attempt.userId) {
    return;
  }

  const userRef = firestore.collection("users").doc(attempt.userId);
  await userRef.collection("textbookProblemAttempts").doc(attempt.attemptId).set(attempt);

  const sectionAttemptsSnapshot = await userRef
    .collection("textbookProblemAttempts")
    .where("unitId", "==", attempt.unitId)
    .get();

  const attempts = sectionAttemptsSnapshot.docs.map((doc) => doc.data() as ProblemAttemptRecord);
  const mastery = computeMastery(attempt.unitId, attempts, attempt.userId);

  await userRef
    .collection("textbookSectionProgress")
    .doc(attempt.unitId)
    .set(mastery, { merge: true });
}

export async function getSectionMastery(sectionId: string, userId?: string) {
  const key = normalizeUserId(userId);
  const memoryMastery = computeMastery(sectionId, memoryAttemptsByUser.get(key) ?? [], userId);

  if (!firestore || !userId) {
    return memoryMastery;
  }

  const stored = await firestore
    .collection("users")
    .doc(userId)
    .collection("textbookSectionProgress")
    .doc(sectionId)
    .get();

  if (!stored.exists) {
    return memoryMastery;
  }

  return stored.data() as SectionMastery;
}

export async function getProblemProgress(
  problemId: string,
  userId?: string,
  maxAttempts?: number | null
) {
  const attempts = await getAttemptsForUser(userId);
  return computeProblemProgressFromAttempts(problemId, attempts, maxAttempts, userId);
}

export async function getNextAttemptNumber(problemId: string, userId?: string) {
  const progress = await getProblemProgress(problemId, userId);
  return progress.attemptsUsed + 1;
}

export async function getCheckpointSummary(
  sectionId: string,
  problems: ProblemSchema[],
  userId?: string
) {
  const attempts = await getAttemptsForUser(userId);
  return computeCheckpointSummaryFromAttempts(sectionId, attempts, problems);
}
