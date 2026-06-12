from manim import *


TEXT = {
    "en": {
        "title": "Rational numbers and root irrationality",
        "subtitle": "A lowest-terms fraction cannot hide the same prime in numerator and denominator.",
        "summary_label": "Summary",
        "visual": {
            "rational_set": "rational numbers Q",
            "closed_arithmetic": "closed under arithmetic",
            "root_gap": "root outside Q",
            "assume": "assume rational",
            "lowest_terms": "lowest terms",
            "numerator": "numerator",
            "denominator": "denominator",
            "euclid": "Euclid's lemma",
            "prime_badge": "prime 2",
            "substitute": "substitute",
            "conflict": "contradiction",
            "prime_root": "prime root",
            "square_test": "square-root test",
            "square": "perfect square",
            "not_square": "not a square",
        },
        "states": [
            (
                "Q is closed, but not complete",
                "Rational numbers are stable under arithmetic, but x^2=2 has a real root outside Q.",
                "sqrt(2) notin Q",
            ),
            (
                "Assume a lowest-terms fraction",
                "If sqrt(2) were rational, write sqrt(2)=a/b with positive integers and gcd(a,b)=1.",
                "sqrt(2)=a/b, gcd(a,b)=1",
            ),
            (
                "Squaring forces 2 into the numerator",
                "From 2b^2=a^2, the prime 2 divides a^2, so Euclid's lemma gives 2|a.",
                "2 | a",
            ),
            (
                "Substitution forces 2 into the denominator",
                "Write a=2c and substitute back: b^2=2c^2, so the same prime also divides b.",
                "2 | b",
            ),
            (
                "The lowest-terms condition breaks",
                "The same prime divides both a and b, contradicting the assumption gcd(a,b)=1.",
                "2 | a and 2 | b",
            ),
            (
                "The pattern gives root tests",
                "The same idea proves prime nth roots irrational and sqrt(n) rational exactly for perfect squares.",
                "sqrt(n) in Q iff n=m^2",
            ),
        ],
        "conclusion": "A lowest-terms contradiction forces the same prime into numerator and denominator. The same pattern supports prime-root irrationality and the perfect-square test.",
    },
    "zh-hk": {
        "title": "有理數、無理數與根式證明",
        "subtitle": "最低項分數不能同時把同一個質數藏在分子和分母。",
        "summary_label": "總結",
        "visual": {
            "rational_set": "有理數 Q",
            "closed_arithmetic": "四則運算封閉",
            "root_gap": "Q 以外的根",
            "assume": "假設有理",
            "lowest_terms": "最低項",
            "numerator": "分子",
            "denominator": "分母",
            "euclid": "Euclid 引理",
            "prime_badge": "質數 2",
            "substitute": "代入",
            "conflict": "矛盾",
            "prime_root": "質數 n 次根",
            "square_test": "平方根判別",
            "square": "完全平方數",
            "not_square": "非完全平方數",
        },
        "states": [
            (
                "有理數封閉，但仍不夠大",
                "有理數對四則運算穩定，但 x^2=2 有一個落在 Q 以外的實根。",
                "sqrt(2) 不在 Q",
            ),
            (
                "先假設有最低項分數",
                "若 sqrt(2) 是有理數，可寫成 sqrt(2)=a/b，且 gcd(a,b)=1。",
                "sqrt(2)=a/b, gcd(a,b)=1",
            ),
            (
                "平方迫使 2 進入分子",
                "由 2b^2=a^2 得質數 2 整除 a^2，所以 Euclid 引理給出 2|a。",
                "2 | a",
            ),
            (
                "代入後也進入分母",
                "寫 a=2c 並代回去，得到 b^2=2c^2，所以同一質數也整除 b。",
                "2 | b",
            ),
            (
                "最低項條件被破壞",
                "同一個質數同時整除 a 和 b，與 gcd(a,b)=1 的假設矛盾。",
                "2 | a and 2 | b",
            ),
            (
                "同一模式給出根式判別",
                "同樣想法證明質數 n 次根無理，也說明 sqrt(n) 有理正好等於 n 是完全平方數。",
                "sqrt(n) in Q iff n=m^2",
            ),
        ],
        "conclusion": "最低項反證迫出同一質數同時整除分子與分母；同一模式支撐質數根式與完全平方數判別。",
    },
    "zh-cn": {
        "title": "有理数、无理数与根式证明",
        "subtitle": "最低项分数不能同时把同一个质数藏在分子和分母。",
        "summary_label": "总结",
        "visual": {
            "rational_set": "有理数 Q",
            "closed_arithmetic": "四则运算封闭",
            "root_gap": "Q 以外的根",
            "assume": "假设有理",
            "lowest_terms": "最低项",
            "numerator": "分子",
            "denominator": "分母",
            "euclid": "Euclid 引理",
            "prime_badge": "质数 2",
            "substitute": "代入",
            "conflict": "矛盾",
            "prime_root": "质数 n 次根",
            "square_test": "平方根判别",
            "square": "完全平方数",
            "not_square": "非完全平方数",
        },
        "states": [
            (
                "有理数封闭，但仍不够大",
                "有理数对四则运算稳定，但 x^2=2 有一个落在 Q 以外的实根。",
                "sqrt(2) 不在 Q",
            ),
            (
                "先假设有最低项分数",
                "若 sqrt(2) 是有理数，可写成 sqrt(2)=a/b，且 gcd(a,b)=1。",
                "sqrt(2)=a/b, gcd(a,b)=1",
            ),
            (
                "平方迫使 2 进入分子",
                "由 2b^2=a^2 得质数 2 整除 a^2，所以 Euclid 引理给出 2|a。",
                "2 | a",
            ),
            (
                "代入后也进入分母",
                "写 a=2c 并代回去，得到 b^2=2c^2，所以同一质数也整除 b。",
                "2 | b",
            ),
            (
                "最低项条件被破坏",
                "同一个质数同时整除 a 和 b，与 gcd(a,b)=1 的假设矛盾。",
                "2 | a and 2 | b",
            ),
            (
                "同一模式给出根式判别",
                "同样想法证明质数 n 次根无理，也说明 sqrt(n) 有理正好等于 n 是完全平方数。",
                "sqrt(n) in Q iff n=m^2",
            ),
        ],
        "conclusion": "最低项反证迫出同一质数同时整除分子与分母；同一模式支撑质数根式与完全平方数判别。",
    },
}


class RationalIrrationalRootProofStoryBase(Scene):
    """MATH1025 7.2: irrationality proof pattern for roots."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def explain_card(self, state):
        title, body, key = state
        box = RoundedRectangle(
            corner_radius=0.1,
            width=11.8,
            height=1.08,
            stroke_color=TEAL_B,
            stroke_width=1.5,
            fill_color=BLACK,
            fill_opacity=0.22,
        ).move_to(DOWN * 1.95)
        title_mob = self.label(title, font_size=22, color=TEAL_B, weight=MEDIUM, max_width=11.0)
        body_mob = self.label(body, font_size=19, color=WHITE, max_width=10.9)
        key_mob = self.label(key, font_size=18, color=YELLOW_B, weight=MEDIUM, max_width=10.7)
        content = VGroup(title_mob, body_mob, key_mob).arrange(DOWN, buff=0.045).move_to(box)
        return VGroup(box, content)

    def equation_line(self, value, center, color=WHITE, width=5.2, font_size=25):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=0.58,
            stroke_color=GRAY_B,
            stroke_width=1.2,
            fill_color=BLACK,
            fill_opacity=0.16,
        ).move_to(center)
        eq = self.label(value, font_size=font_size, color=color, weight=MEDIUM, max_width=width - 0.28)
        eq.move_to(box)
        return VGroup(box, eq)

    def tag_box(self, value, center, color=BLUE_B, width=2.3, height=0.72, font_size=22):
        box = RoundedRectangle(
            corner_radius=0.1,
            width=width,
            height=height,
            stroke_color=color,
            stroke_width=1.7,
            fill_color=color,
            fill_opacity=0.12,
        ).move_to(center)
        text = self.label(value, font_size=font_size, color=WHITE, weight=MEDIUM, max_width=width - 0.26)
        text.move_to(box)
        return VGroup(box, text)

    def prime_badge(self, center, label="2", color=YELLOW_B, radius=0.34):
        circle = Circle(radius=radius, stroke_color=color, stroke_width=2.0, fill_color=color, fill_opacity=0.2).move_to(center)
        value = self.label(label, font_size=28, color=color, weight=BOLD, max_width=0.6).move_to(circle)
        return VGroup(circle, value)

    def gap_visual(self):
        labels = TEXT[self.locale]["visual"]
        q_card = RoundedRectangle(
            corner_radius=0.16,
            width=3.6,
            height=1.55,
            stroke_color=BLUE_B,
            stroke_width=2.0,
            fill_color=BLUE_E,
            fill_opacity=0.15,
        ).move_to(LEFT * 2.7 + UP * 0.12)
        q_title = self.label("Q", font_size=48, color=BLUE_B, weight=BOLD, max_width=1.8).move_to(q_card.get_center() + UP * 0.18)
        q_sub = self.label(labels["rational_set"], font_size=18, color=WHITE, max_width=3.1).next_to(q_title, DOWN, buff=0.05)
        ops = VGroup(
            self.tag_box("x+y", ORIGIN, BLUE_B, width=1.15, height=0.45, font_size=17),
            self.tag_box("xy", ORIGIN, BLUE_B, width=1.0, height=0.45, font_size=17),
            self.tag_box("x/y", ORIGIN, BLUE_B, width=1.05, height=0.45, font_size=17),
        ).arrange(RIGHT, buff=0.12).next_to(q_card, DOWN, buff=0.16)
        closed = self.label(labels["closed_arithmetic"], font_size=19, color=TEAL_B, weight=MEDIUM, max_width=3.2)
        closed.next_to(ops, DOWN, buff=0.12)

        eq = self.equation_line("x^2 = 2", RIGHT * 2.25 + UP * 0.52, YELLOW_B, width=3.1, font_size=28)
        root = self.equation_line("sqrt(2) notin Q", RIGHT * 2.25 + DOWN * 0.34, RED_B, width=4.2, font_size=26)
        root_label = self.label(labels["root_gap"], font_size=20, color=RED_B, weight=MEDIUM, max_width=3.0)
        root_label.next_to(root, DOWN, buff=0.13)
        arrow = Arrow(q_card.get_right(), eq.get_left(), buff=0.2, color=GRAY_B, stroke_width=2.3)
        return VGroup(q_card, q_title, q_sub, ops, closed, eq, root, root_label, arrow).move_to(UP * 0.1)

    def lowest_terms_visual(self):
        labels = TEXT[self.locale]["visual"]
        assume = self.label(labels["assume"], font_size=23, color=YELLOW_B, weight=MEDIUM, max_width=2.8).move_to(UP * 1.35)
        equation = self.equation_line("sqrt(2) = a / b", UP * 0.65, YELLOW_B, width=4.5, font_size=29)
        numerator = self.tag_box("a", LEFT * 1.2 + DOWN * 0.25, BLUE_B, width=1.35, height=0.86, font_size=34)
        denominator = self.tag_box("b", RIGHT * 1.2 + DOWN * 0.25, GREEN_B, width=1.35, height=0.86, font_size=34)
        gcd = self.equation_line("gcd(a,b) = 1", DOWN * 1.15, TEAL_B, width=3.8, font_size=27)
        seal = self.label(labels["lowest_terms"], font_size=20, color=TEAL_B, weight=MEDIUM, max_width=2.6)
        seal.next_to(gcd, RIGHT, buff=0.25)
        arrows = VGroup(
            Arrow(equation.get_bottom(), numerator.get_top(), buff=0.1, color=GRAY_B, stroke_width=2.1),
            Arrow(equation.get_bottom(), denominator.get_top(), buff=0.1, color=GRAY_B, stroke_width=2.1),
        )
        return VGroup(assume, equation, numerator, denominator, gcd, seal, arrows).move_to(UP * 0.08)

    def square_visual(self):
        labels = TEXT[self.locale]["visual"]
        lines = VGroup(
            self.equation_line("sqrt(2) = a / b", ORIGIN, WHITE, width=4.4, font_size=26),
            self.equation_line("2 = a^2 / b^2", ORIGIN, BLUE_B, width=4.4, font_size=26),
            self.equation_line("2b^2 = a^2", ORIGIN, YELLOW_B, width=4.4, font_size=27),
            self.equation_line("2 | a^2  =>  2 | a", ORIGIN, TEAL_B, width=5.2, font_size=26),
        ).arrange(DOWN, buff=0.12).move_to(LEFT * 1.05 + UP * 0.08)
        arrows = VGroup()
        for index in range(3):
            arrows.add(Arrow(lines[index].get_bottom(), lines[index + 1].get_top(), buff=0.07, color=GRAY_B, stroke_width=2.0))
        badge = self.prime_badge(RIGHT * 3.2 + UP * 0.18)
        badge_label = self.label(labels["euclid"], font_size=21, color=YELLOW_B, weight=MEDIUM, max_width=2.7)
        badge_label.next_to(badge, DOWN, buff=0.18)
        target = Arrow(badge.get_left(), lines[3].get_right(), buff=0.18, color=YELLOW_B, stroke_width=2.2)
        return VGroup(lines, arrows, badge, badge_label, target).move_to(UP * 0.06)

    def substitute_visual(self):
        labels = TEXT[self.locale]["visual"]
        title = self.label(labels["substitute"], font_size=23, color=YELLOW_B, weight=MEDIUM, max_width=2.4)
        title.move_to(UP * 1.46)
        lines = VGroup(
            self.equation_line("a = 2c", ORIGIN, BLUE_B, width=3.3, font_size=27),
            self.equation_line("2b^2 = (2c)^2", ORIGIN, WHITE, width=5.1, font_size=26),
            self.equation_line("b^2 = 2c^2", ORIGIN, YELLOW_B, width=4.4, font_size=27),
            self.equation_line("2 | b^2  =>  2 | b", ORIGIN, TEAL_B, width=5.2, font_size=26),
        ).arrange(DOWN, buff=0.13).move_to(LEFT * 0.35 + UP * 0.02)
        arrows = VGroup()
        for index in range(3):
            arrows.add(Arrow(lines[index].get_bottom(), lines[index + 1].get_top(), buff=0.07, color=GRAY_B, stroke_width=2.0))
        badge = self.prime_badge(RIGHT * 3.35 + DOWN * 0.3)
        badge_label = self.label(labels["prime_badge"], font_size=19, color=YELLOW_B, weight=MEDIUM, max_width=2.2)
        badge_label.next_to(badge, DOWN, buff=0.14)
        target = Arrow(lines[3].get_right(), badge.get_left(), buff=0.16, color=YELLOW_B, stroke_width=2.1)
        return VGroup(title, lines, arrows, badge, badge_label, target)

    def contradiction_visual(self):
        labels = TEXT[self.locale]["visual"]
        top = self.equation_line("2 | a    and    2 | b", UP * 1.08, YELLOW_B, width=5.0, font_size=27)
        left = self.tag_box("a", LEFT * 1.65 + UP * 0.05, BLUE_B, width=1.28, height=0.84, font_size=34)
        right = self.tag_box("b", RIGHT * 1.65 + UP * 0.05, GREEN_B, width=1.28, height=0.84, font_size=34)
        badge_left = self.prime_badge(left.get_center() + DOWN * 0.92, "2", YELLOW_B, radius=0.28)
        badge_right = self.prime_badge(right.get_center() + DOWN * 0.92, "2", YELLOW_B, radius=0.28)
        gcd = self.equation_line("gcd(a,b) = 1", DOWN * 0.86, TEAL_B, width=3.7, font_size=26)
        slash = Line(gcd.get_left() + DOWN * 0.22, gcd.get_right() + UP * 0.22, color=RED_B, stroke_width=5)
        conflict = self.label(labels["conflict"], font_size=24, color=RED_B, weight=BOLD, max_width=2.4).next_to(gcd, DOWN, buff=0.18)
        arrows = VGroup(
            Arrow(badge_left.get_top(), left.get_bottom(), buff=0.08, color=YELLOW_B, stroke_width=2.0),
            Arrow(badge_right.get_top(), right.get_bottom(), buff=0.08, color=YELLOW_B, stroke_width=2.0),
        )
        return VGroup(top, left, right, badge_left, badge_right, gcd, slash, conflict, arrows).move_to(UP * 0.06)

    def root_tests_visual(self):
        labels = TEXT[self.locale]["visual"]
        template_title = self.label(labels["prime_root"], font_size=23, color=YELLOW_B, weight=MEDIUM, max_width=3.0)
        template_title.move_to(UP * 1.45)
        template = self.equation_line("sqrt[n](p) notin Q  (n>1)", UP * 0.82, YELLOW_B, width=5.9, font_size=26)
        proof = self.equation_line("p b^n = a^n  ->  p|a and p|b", UP * 0.14, TEAL_B, width=6.4, font_size=24)
        test_title = self.label(labels["square_test"], font_size=20, color=WHITE, weight=MEDIUM, max_width=3.0)
        test_title.move_to(DOWN * 0.32)
        criterion = self.equation_line("sqrt(n) in Q  iff  n=m^2", DOWN * 0.62, BLUE_B, width=5.8, font_size=24)
        square = self.tag_box("sqrt(49)=7", LEFT * 2.15 + DOWN * 1.15, GREEN_B, width=3.0, height=0.38, font_size=20)
        nonsquare = self.tag_box("sqrt(10) notin Q", RIGHT * 2.15 + DOWN * 1.15, RED_B, width=3.4, height=0.38, font_size=20)
        return VGroup(template_title, template, proof, test_title, criterion, square, nonsquare).move_to(UP * 0.08)

    def construct(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=WHITE, weight=BOLD, max_width=10.5)
        title.to_edge(UP, buff=0.2)
        subtitle = self.label(data["subtitle"], font_size=19, color=GRAY_B, max_width=10.5)
        subtitle.next_to(title, DOWN, buff=0.08)

        visuals = [
            self.gap_visual,
            self.lowest_terms_visual,
            self.square_visual,
            self.substitute_visual,
            self.contradiction_visual,
            self.root_tests_visual,
        ]

        current_visual = visuals[0]()
        current_card = self.explain_card(data["states"][0])
        self.play(FadeIn(title), FadeIn(subtitle), FadeIn(current_visual), FadeIn(current_card), run_time=1.0)
        self.wait(1.1)

        for index in range(1, len(visuals)):
            next_visual = visuals[index]()
            next_card = self.explain_card(data["states"][index])
            self.play(
                FadeOut(current_visual, shift=LEFT * 0.22),
                FadeOut(current_card, shift=DOWN * 0.1),
                FadeIn(next_visual, shift=LEFT * 0.22),
                FadeIn(next_card, shift=UP * 0.1),
                run_time=0.75,
            )
            current_visual = next_visual
            current_card = next_card
            self.wait(0.7)

        conclusion = self.explain_card((data["summary_label"], data["conclusion"], data["states"][-1][2]))
        self.play(Transform(current_card, conclusion), run_time=0.7)
        self.wait(0.9)


class RationalIrrationalRootProofStoryEn(RationalIrrationalRootProofStoryBase):
    locale = "en"
    font = "Avenir Next"


class RationalIrrationalRootProofStoryZhHk(RationalIrrationalRootProofStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class RationalIrrationalRootProofStoryZhCn(RationalIrrationalRootProofStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class RationalIrrationalRootProofStory(RationalIrrationalRootProofStoryEn):
    pass
