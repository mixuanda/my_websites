import { firestore } from "@/lib/firebase-admin";
import type { ProblemAttemptRecord, SectionMastery } from "./types";

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
