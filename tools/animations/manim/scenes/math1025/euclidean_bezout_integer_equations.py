from manim import *


TEXT = {
    "en": {
        "title": "Euclidean algorithm to Bézout identity",
        "subtitle": "Run divisions downward for the gcd; run equations backward for coefficients.",
        "summary_label": "Summary",
        "visual": {
            "start_pair": "start pair",
            "new_pair": "new pair",
            "gcd_invariant": "same gcd",
            "common_divisors": "common divisors unchanged",
            "last_nonzero": "last nonzero remainder",
            "reverse": "reverse",
            "substitute": "substitute",
            "bezout": "Bézout combination",
            "coefficients": "integer coefficients",
            "diophantine": "integer equation test",
            "solvable": "solvable iff gcd(a,b) divides c",
        },
        "states": [
            (
                "Start with division with remainder",
                "The first Euclidean move replaces (7224,1290) by (1290,774).",
                "7224 = 1290*5 + 774",
            ),
            (
                "The invariant is the gcd",
                "Because r=a-bq, the pairs (a,b) and (b,r) have the same positive common divisors.",
                "gcd(a,b) = gcd(b,r)",
            ),
            (
                "Follow the remainder chain",
                "The remainders strictly decrease, so the first zero remainder must eventually appear.",
                "774, 516, 258, 0",
            ),
            (
                "Run the equations backward",
                "The last nonzero remainder can be rewritten using earlier remainders.",
                "258 = 2*774 - 1290",
            ),
            (
                "Reach Bézout's identity",
                "Substitute 774=7224-5*1290 to express the gcd using the original two numbers.",
                "258 = 2*7224 - 11*1290",
            ),
            (
                "Use the gcd in integer equations",
                "Bézout explains why ax+by=c has integer solutions exactly when gcd(a,b) divides c.",
                "gcd(a,b) | c",
            ),
        ],
        "conclusion": "The Euclidean algorithm gives the gcd by decreasing remainders. The extended algorithm reverses the same equations to produce a Bézout combination.",
    },
    "zh-hk": {
        "title": "由歐幾里得算法到 Bézout 恆等式",
        "subtitle": "向下做除法求 gcd；向上回代求係數。",
        "summary_label": "總結",
        "visual": {
            "start_pair": "起始 pair",
            "new_pair": "新 pair",
            "gcd_invariant": "gcd 不變",
            "common_divisors": "共同因數不變",
            "last_nonzero": "最後非零餘數",
            "reverse": "倒推",
            "substitute": "代入",
            "bezout": "Bézout 組合",
            "coefficients": "整數係數",
            "diophantine": "整數方程測試",
            "solvable": "有解 iff gcd(a,b) 整除 c",
        },
        "states": [
            (
                "由帶餘除法開始",
                "第一個 Euclidean move 把 (7224,1290) 換成 (1290,774)。",
                "7224 = 1290*5 + 774",
            ),
            (
                "不變量是 gcd",
                "因為 r=a-bq，(a,b) 與 (b,r) 有同一批正共同因數。",
                "gcd(a,b) = gcd(b,r)",
            ),
            (
                "沿着餘數鏈前進",
                "餘數嚴格遞減，所以第一個零餘數必然會出現。",
                "774, 516, 258, 0",
            ),
            (
                "把等式倒過來用",
                "最後非零餘數可用較早的餘數改寫。",
                "258 = 2*774 - 1290",
            ),
            (
                "得到 Bézout 恆等式",
                "代入 774=7224-5*1290，把 gcd 寫成原本兩個數的組合。",
                "258 = 2*7224 - 11*1290",
            ),
            (
                "用 gcd 判斷整數方程",
                "Bézout 解釋 ax+by=c 有整數解，當且僅當 gcd(a,b) 整除 c。",
                "gcd(a,b) | c",
            ),
        ],
        "conclusion": "歐幾里得算法用遞減餘數求 gcd；擴展算法倒轉同一批等式，產生 Bézout 組合。",
    },
    "zh-cn": {
        "title": "从欧几里得算法到 Bézout 恒等式",
        "subtitle": "向下做除法求 gcd；向上回代求系数。",
        "summary_label": "总结",
        "visual": {
            "start_pair": "起始 pair",
            "new_pair": "新 pair",
            "gcd_invariant": "gcd 不变",
            "common_divisors": "共同因数不变",
            "last_nonzero": "最后非零余数",
            "reverse": "倒推",
            "substitute": "代入",
            "bezout": "Bézout 组合",
            "coefficients": "整数系数",
            "diophantine": "整数方程测试",
            "solvable": "有解 iff gcd(a,b) 整除 c",
        },
        "states": [
            (
                "从带余除法开始",
                "第一个 Euclidean move 把 (7224,1290) 换成 (1290,774)。",
                "7224 = 1290*5 + 774",
            ),
            (
                "不变量是 gcd",
                "因为 r=a-bq，(a,b) 与 (b,r) 有同一批正共同因数。",
                "gcd(a,b) = gcd(b,r)",
            ),
            (
                "沿着余数链前进",
                "余数严格递减，所以第一个零余数必然会出现。",
                "774, 516, 258, 0",
            ),
            (
                "把等式倒过来用",
                "最后非零余数可用较早的余数改写。",
                "258 = 2*774 - 1290",
            ),
            (
                "得到 Bézout 恒等式",
                "代入 774=7224-5*1290，把 gcd 写成原本两个数的组合。",
                "258 = 2*7224 - 11*1290",
            ),
            (
                "用 gcd 判断整数方程",
                "Bézout 解释 ax+by=c 有整数解，当且仅当 gcd(a,b) 整除 c。",
                "gcd(a,b) | c",
            ),
        ],
        "conclusion": "欧几里得算法用递减余数求 gcd；扩展算法倒转同一批等式，产生 Bézout 组合。",
    },
}


class EuclideanBezoutIntegerEquationStoryBase(Scene):
    """MATH1025 7.1: Euclidean algorithm, back-substitution, and Bézout."""

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

    def number_pair(self, a, b, label, center, color=BLUE_B):
        box = RoundedRectangle(
            corner_radius=0.12,
            width=2.4,
            height=0.84,
            stroke_color=color,
            stroke_width=2,
            fill_color=color,
            fill_opacity=0.13,
        ).move_to(center)
        pair = self.label(f"({a}, {b})", font_size=26, color=WHITE, weight=MEDIUM, max_width=2.05)
        pair.move_to(box)
        tag = self.label(label, font_size=17, color=color, weight=MEDIUM, max_width=2.1)
        tag.next_to(box, UP, buff=0.08)
        return VGroup(box, pair, tag)

    def equation_line(self, value, center, color=WHITE, width=5.7, font_size=25):
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

    def division_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = self.number_pair("7224", "1290", labels["start_pair"], LEFT * 3.15 + UP * 0.35, BLUE_B)
        right = self.number_pair("1290", "774", labels["new_pair"], RIGHT * 3.15 + UP * 0.35, GREEN_B)
        eq = self.equation_line("7224 = 1290*5 + 774", UP * 0.35, YELLOW_B, width=4.7)
        arrow_l = Arrow(left.get_right(), eq.get_left(), buff=0.14, color=GRAY_B, stroke_width=2.3)
        arrow_r = Arrow(eq.get_right(), right.get_left(), buff=0.14, color=GRAY_B, stroke_width=2.3)
        invariant = self.label("gcd(7224,1290) = gcd(1290,774)", font_size=22, color=TEAL_B, weight=MEDIUM, max_width=7.2)
        invariant.next_to(eq, DOWN, buff=0.28)
        return VGroup(left, right, eq, arrow_l, arrow_r, invariant).move_to(UP * 0.1)

    def invariant_visual(self):
        labels = TEXT[self.locale]["visual"]
        top = self.equation_line("a = b*q + r", UP * 0.9, YELLOW_B, width=4.2, font_size=28)
        middle = self.equation_line("r = a - b*q", UP * 0.05, BLUE_B, width=4.2, font_size=27)
        bottom = self.equation_line("gcd(a,b) = gcd(b,r)", DOWN * 0.8, TEAL_B, width=5.0, font_size=27)
        tag = self.label(labels["common_divisors"], font_size=23, color=WHITE, weight=MEDIUM, max_width=5.4)
        tag.next_to(bottom, DOWN, buff=0.18)
        arrows = VGroup(
            Arrow(top.get_bottom(), middle.get_top(), buff=0.09, color=GRAY_B, stroke_width=2.2),
            Arrow(middle.get_bottom(), bottom.get_top(), buff=0.09, color=GRAY_B, stroke_width=2.2),
        )
        return VGroup(top, middle, bottom, tag, arrows).move_to(UP * 0.12)

    def remainder_chain_visual(self):
        labels = TEXT[self.locale]["visual"]
        equations = [
            ("7224 = 1290*5 + 774", BLUE_B),
            ("1290 = 774*1 + 516", GREEN_B),
            ("774 = 516*1 + 258", YELLOW_B),
            ("516 = 258*2 + 0", RED_B),
        ]
        rows = VGroup()
        for index, (equation, color) in enumerate(equations):
            rows.add(self.equation_line(equation, ORIGIN, color=color, width=5.3, font_size=21))
        rows.arrange(DOWN, buff=0.12).move_to(LEFT * 1.05 + UP * 0.12)
        remainders = VGroup(
            self.label("774", font_size=23, color=BLUE_B, weight=MEDIUM),
            self.label("516", font_size=23, color=GREEN_B, weight=MEDIUM),
            self.label("258", font_size=25, color=YELLOW_B, weight=BOLD),
            self.label("0", font_size=23, color=RED_B, weight=MEDIUM),
        ).arrange(DOWN, buff=0.35).move_to(RIGHT * 3.35 + UP * 0.12)
        arrows = VGroup()
        for index in range(3):
            arrows.add(Arrow(remainders[index].get_bottom(), remainders[index + 1].get_top(), buff=0.07, color=GRAY_B, stroke_width=2))
        badge = self.label(labels["last_nonzero"], font_size=20, color=YELLOW_B, weight=MEDIUM, max_width=2.4)
        badge.next_to(remainders[2], RIGHT, buff=0.28)
        return VGroup(rows, remainders, arrows, badge).move_to(UP * 0.05)

    def reverse_visual(self):
        labels = TEXT[self.locale]["visual"]
        title = self.label(labels["reverse"], font_size=23, color=YELLOW_B, weight=MEDIUM, max_width=2.4)
        title.move_to(UP * 1.58)
        lines = VGroup(
            self.equation_line("258 = 774 - 516", ORIGIN, YELLOW_B, width=4.5, font_size=24),
            self.equation_line("516 = 1290 - 774", ORIGIN, GREEN_B, width=4.6, font_size=23),
            self.equation_line("258 = 774 - (1290 - 774)", ORIGIN, WHITE, width=6.2, font_size=23),
            self.equation_line("258 = 2*774 - 1290", ORIGIN, TEAL_B, width=5.0, font_size=24),
        ).arrange(DOWN, buff=0.13).move_to(UP * 0.02)
        substitute = self.label(labels["substitute"], font_size=19, color=GRAY_A, max_width=2.4)
        substitute.next_to(lines[2], RIGHT, buff=0.24)
        return VGroup(title, lines, substitute)

    def bezout_visual(self):
        labels = TEXT[self.locale]["visual"]
        title = self.label(labels["bezout"], font_size=27, color=YELLOW_B, weight=MEDIUM, max_width=3.2)
        title.move_to(UP * 1.25)
        lines = VGroup(
            self.equation_line("774 = 7224 - 5*1290", ORIGIN, BLUE_B, width=5.8, font_size=23),
            self.equation_line("258 = 2(7224 - 5*1290) - 1290", ORIGIN, WHITE, width=7.0, font_size=22),
            self.equation_line("258 = 2*7224 - 11*1290", ORIGIN, TEAL_B, width=6.0, font_size=25),
        ).arrange(DOWN, buff=0.16).move_to(UP * 0.04)
        return VGroup(title, lines)

    def diophantine_visual(self):
        labels = TEXT[self.locale]["visual"]
        title = self.label(labels["diophantine"], font_size=27, color=YELLOW_B, weight=MEDIUM, max_width=4.2)
        title.move_to(UP * 1.22)
        equation = self.equation_line("a*x + b*y = c", UP * 0.45, WHITE, width=4.2, font_size=27)
        gcd_badge = RoundedRectangle(
            corner_radius=0.12,
            width=2.25,
            height=0.78,
            stroke_color=TEAL_B,
            stroke_width=2,
            fill_color=TEAL_E,
            fill_opacity=0.16,
        ).move_to(LEFT * 2.65 + DOWN * 0.45)
        gcd_text = self.label("gcd(a,b)", font_size=23, color=TEAL_B, weight=MEDIUM, max_width=1.9).move_to(gcd_badge)
        divides = self.equation_line("gcd(a,b) | c", RIGHT * 1.15 + DOWN * 0.45, YELLOW_B, width=4.0, font_size=25)
        arrow = Arrow(gcd_badge.get_right(), divides.get_left(), buff=0.16, color=GRAY_B, stroke_width=2.3)
        return VGroup(title, equation, gcd_badge, gcd_text, divides, arrow)

    def construct(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=WHITE, weight=BOLD, max_width=10.5)
        title.to_edge(UP, buff=0.2)
        subtitle = self.label(data["subtitle"], font_size=19, color=GRAY_B, max_width=10.5)
        subtitle.next_to(title, DOWN, buff=0.08)

        visuals = [
            self.division_visual,
            self.invariant_visual,
            self.remainder_chain_visual,
            self.reverse_visual,
            self.bezout_visual,
            self.diophantine_visual,
        ]

        current_visual = visuals[0]()
        current_card = self.explain_card(data["states"][0])
        self.play(FadeIn(title), FadeIn(subtitle), FadeIn(current_visual), FadeIn(current_card), run_time=1.0)
        self.wait(1.15)

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


class EuclideanBezoutIntegerEquationStoryEn(EuclideanBezoutIntegerEquationStoryBase):
    locale = "en"
    font = "Avenir Next"


class EuclideanBezoutIntegerEquationStoryZhHk(EuclideanBezoutIntegerEquationStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class EuclideanBezoutIntegerEquationStoryZhCn(EuclideanBezoutIntegerEquationStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class EuclideanBezoutIntegerEquationStory(EuclideanBezoutIntegerEquationStoryEn):
    pass
