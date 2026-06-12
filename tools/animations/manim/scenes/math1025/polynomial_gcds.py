from manim import *


TEXT = {
    "en": {
        "title": "Polynomial gcds connect algorithms and factors",
        "subtitle": "Euclidean remainders produce a monic gcd, then Bezout explains prime-like divisibility.",
        "summary_label": "Summary",
        "visual": {
            "associates": "associates",
            "monic": "monic gcd",
            "common": "same common divisors",
            "invariant": "Euclidean invariant",
            "remainders": "remainder chain",
            "normalize": "normalize",
            "bezout": "Bezout combination",
            "field": "coefficient field",
            "prime": "prime-like step",
        },
        "states": [
            (
                "Polynomial gcds are normalized by convention",
                "Scalar multiples such as x-1, 5x-5, and -2x+2 have the same divisibility behavior, so the gcd is recorded as monic.",
                "choose x-1",
            ),
            (
                "The Euclidean step keeps the same common divisors",
                "If f=gq+r, then divisors common to f and g are exactly the divisors common to g and r.",
                "gcd(f,g)=gcd(g,r)",
            ),
            (
                "Run the chapter's polynomial gcd example",
                "The remainder chain goes from f and g to r1=-6x^2-3x+9, then r2=-x+1, then zero.",
                "last nonzero remainder: -x+1",
            ),
            (
                "Make the gcd monic and reverse the chain",
                "Normalize -x+1 to x-1, and back-substitution writes the gcd as a polynomial combination of f and g.",
                "x-1=a(x)f(x)+b(x)g(x)",
            ),
            (
                "Irreducibility depends on the field",
                "x^2-2 changes between Q and R, while x^2+1 changes between R and C.",
                "always name the field",
            ),
            (
                "Bezout makes irreducibles behave like primes",
                "When p is irreducible and p does not divide a, gcd(a,p)=1, so ua+vp=1 drives the divisibility proof.",
                "p | ab and p does not divide a -> p | b",
            ),
        ],
        "conclusion": "Normalize gcds, preserve common divisors through remainders, and use Bezout for irreducible factor tests.",
    },
    "zh-hk": {
        "title": "多項式 gcd 連接算法與因式",
        "subtitle": "Euclidean 餘式給出 monic gcd，Bézout 再解釋類似質數的整除性。",
        "summary_label": "總結",
        "visual": {
            "associates": "相伴多項式",
            "monic": "monic gcd",
            "common": "共同因式相同",
            "invariant": "Euclidean 不變量",
            "remainders": "餘式鏈",
            "normalize": "標準化",
            "bezout": "Bézout 線性組合",
            "field": "係數域",
            "prime": "類似質數的步驟",
        },
        "states": [
            (
                "多項式 gcd 先按慣例標準化",
                "x-1、5x-5、-2x+2 這些常數倍有相同整除行為，所以 gcd 記成 monic。",
                "選 x-1",
            ),
            (
                "Euclidean step 保持同一批共同因式",
                "若 f=gq+r，則 f 與 g 的共同因式，正好也是 g 與 r 的共同因式。",
                "gcd(f,g)=gcd(g,r)",
            ),
            (
                "執行本章的多項式 gcd 例子",
                "餘式鏈由 f、g 走到 r1=-6x^2-3x+9，再到 r2=-x+1，最後到零。",
                "最後非零餘式：-x+1",
            ),
            (
                "令 gcd monic，並反向回代",
                "把 -x+1 標準化為 x-1；回代可把 gcd 寫成 f 與 g 的多項式線性組合。",
                "x-1=a(x)f(x)+b(x)g(x)",
            ),
            (
                "不可約性取決於係數域",
                "x^2-2 在 Q 與 R 之間改變；x^2+1 在 R 與 C 之間改變。",
                "必須說明係數域",
            ),
            (
                "Bézout 令不可約多項式像質數",
                "若 p 不可約且 p 不整除 a，則 gcd(a,p)=1，因此 ua+vp=1 推動整除證明。",
                "p | ab 且 p 不整除 a -> p | b",
            ),
        ],
        "conclusion": "標準化 gcd，透過餘式保持共同因式，再用 Bézout 檢查不可約因式。",
    },
    "zh-cn": {
        "title": "多项式 gcd 连接算法与因式",
        "subtitle": "Euclidean 余式给出 monic gcd，Bézout 再解释类似质数的整除性。",
        "summary_label": "总结",
        "visual": {
            "associates": "相伴多项式",
            "monic": "monic gcd",
            "common": "共同因式相同",
            "invariant": "Euclidean 不变量",
            "remainders": "余式链",
            "normalize": "标准化",
            "bezout": "Bézout 线性组合",
            "field": "系数域",
            "prime": "类似质数的步骤",
        },
        "states": [
            (
                "多项式 gcd 先按惯例标准化",
                "x-1、5x-5、-2x+2 这些常数倍有相同整除行为，所以 gcd 记成 monic。",
                "选 x-1",
            ),
            (
                "Euclidean step 保持同一批共同因式",
                "若 f=gq+r，则 f 与 g 的共同因式，正好也是 g 与 r 的共同因式。",
                "gcd(f,g)=gcd(g,r)",
            ),
            (
                "执行本章的多项式 gcd 例子",
                "余式链由 f、g 走到 r1=-6x^2-3x+9，再到 r2=-x+1，最后到零。",
                "最后非零余式：-x+1",
            ),
            (
                "令 gcd monic，并反向回代",
                "把 -x+1 标准化为 x-1；回代可把 gcd 写成 f 与 g 的多项式线性组合。",
                "x-1=a(x)f(x)+b(x)g(x)",
            ),
            (
                "不可约性取决于系数域",
                "x^2-2 在 Q 与 R 之间改变；x^2+1 在 R 与 C 之间改变。",
                "必须说明系数域",
            ),
            (
                "Bézout 令不可约多项式像质数",
                "若 p 不可约且 p 不整除 a，则 gcd(a,p)=1，因此 ua+vp=1 推动整除证明。",
                "p | ab 且 p 不整除 a -> p | b",
            ),
        ],
        "conclusion": "标准化 gcd，通过余式保持共同因式，再用 Bézout 检查不可约因式。",
    },
}


class PolynomialGcdIrreducibilityStoryBase(Scene):
    """MATH1025 8.2: polynomial gcds, Bezout, and irreducibility checks."""

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
            width=11.85,
            height=1.12,
            stroke_color=TEAL_B,
            stroke_width=1.5,
            fill_color=BLACK,
            fill_opacity=0.22,
        ).move_to(DOWN * 1.96)
        title_mob = self.label(title, font_size=22, color=TEAL_B, weight=MEDIUM, max_width=11.0)
        body_mob = self.label(body, font_size=18, color=WHITE, max_width=11.05)
        key_mob = self.label(key, font_size=18, color=YELLOW_B, weight=MEDIUM, max_width=10.85)
        content = VGroup(title_mob, body_mob, key_mob).arrange(DOWN, buff=0.045).move_to(box)
        return VGroup(box, content)

    def equation_line(self, value, center, color=WHITE, width=6.0, font_size=24, fill_opacity=0.16):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=0.58,
            stroke_color=GRAY_B,
            stroke_width=1.2,
            fill_color=BLACK,
            fill_opacity=fill_opacity,
        ).move_to(center)
        eq = self.label(value, font_size=font_size, color=color, weight=MEDIUM, max_width=width - 0.28)
        eq.move_to(box)
        return VGroup(box, eq)

    def tag_box(self, value, center, color=BLUE_B, width=2.7, height=0.68, font_size=21):
        box = RoundedRectangle(
            corner_radius=0.1,
            width=width,
            height=height,
            stroke_color=color,
            stroke_width=1.7,
            fill_color=color,
            fill_opacity=0.13,
        ).move_to(center)
        text = self.label(value, font_size=font_size, color=WHITE, weight=MEDIUM, max_width=width - 0.24)
        text.move_to(box)
        return VGroup(box, text)

    def captioned_card(self, title, value, center, color, width=3.3, height=1.05, title_size=17, value_size=22):
        card = RoundedRectangle(
            corner_radius=0.12,
            width=width,
            height=height,
            stroke_color=color,
            stroke_width=1.8,
            fill_color=color,
            fill_opacity=0.12,
        ).move_to(center)
        title_mob = self.label(title, font_size=title_size, color=color, weight=MEDIUM, max_width=width - 0.22)
        value_mob = self.label(value, font_size=value_size, color=WHITE, weight=MEDIUM, max_width=width - 0.25)
        content = VGroup(title_mob, value_mob).arrange(DOWN, buff=0.08).move_to(card)
        return VGroup(card, content)

    def associates_visual(self):
        labels = TEXT[self.locale]["visual"]
        title = self.label(labels["associates"], font_size=24, color=YELLOW_B, weight=MEDIUM, max_width=3.2)
        title.move_to(UP * 1.45)
        cards = VGroup(
            self.captioned_card("d1", "x - 1", LEFT * 3.3 + UP * 0.45, BLUE_B, width=2.35),
            self.captioned_card("d2", "5x - 5", LEFT * 0.95 + UP * 0.45, BLUE_B, width=2.35),
            self.captioned_card("d3", "-2x + 2", RIGHT * 1.4 + UP * 0.45, BLUE_B, width=2.35),
        )
        arrows = VGroup(
            Arrow(cards[0].get_right(), cards[1].get_left(), buff=0.12, color=GRAY_B, stroke_width=2.0),
            Arrow(cards[1].get_right(), cards[2].get_left(), buff=0.12, color=GRAY_B, stroke_width=2.0),
        )
        monic = self.captioned_card(labels["monic"], "gcd = x - 1", RIGHT * 2.65 + DOWN * 0.92, TEAL_B, width=3.25, height=0.92)
        same = self.equation_line(labels["common"], LEFT * 1.7 + DOWN * 0.92, TEAL_B, width=3.5, font_size=20)
        arrow_down = Arrow(cards[1].get_bottom(), monic.get_top(), buff=0.16, color=YELLOW_B, stroke_width=2.5)
        return VGroup(title, cards, arrows, same, monic, arrow_down).move_to(UP * 0.02)

    def invariant_visual(self):
        labels = TEXT[self.locale]["visual"]
        title = self.label(labels["invariant"], font_size=24, color=YELLOW_B, weight=MEDIUM, max_width=4.3)
        title.move_to(UP * 1.42)
        identity = self.equation_line("f = gq + r", UP * 0.7, YELLOW_B, width=4.2, font_size=29)
        left = self.captioned_card("pair 1", "(f, g)", LEFT * 3.35 + DOWN * 0.3, BLUE_B, width=2.35)
        right = self.captioned_card("pair 2", "(g, r)", RIGHT * 3.35 + DOWN * 0.3, GREEN_B, width=2.35)
        bridge = self.equation_line("r = f - gq  |  f = gq + r", DOWN * 0.3, WHITE, width=3.95, font_size=20)
        arrows = VGroup(
            Arrow(left.get_right(), bridge.get_left(), buff=0.12, color=GRAY_B, stroke_width=2.2),
            Arrow(bridge.get_right(), right.get_left(), buff=0.12, color=GRAY_B, stroke_width=2.2),
        )
        result = self.equation_line("gcd(f,g) = gcd(g,r)", DOWN * 1.18, TEAL_B, width=4.8, font_size=24)
        return VGroup(title, identity, left, right, bridge, arrows, result).move_to(UP * 0.05)

    def chain_visual(self):
        labels = TEXT[self.locale]["visual"]
        title = self.label(labels["remainders"], font_size=24, color=YELLOW_B, weight=MEDIUM, max_width=4.2)
        title.move_to(UP * 1.45)
        rows = VGroup(
            self.equation_line("f = (2x)g + r1", UP * 0.72, BLUE_B, width=5.5, font_size=24),
            self.equation_line("r1 = -6x^2 - 3x + 9", UP * 0.08, BLUE_B, width=5.5, font_size=23),
            self.equation_line("g = (-1/3x + 1/3)r1 + r2", DOWN * 0.56, GREEN_B, width=6.2, font_size=22),
            self.equation_line("r2 = -x + 1", DOWN * 1.2, TEAL_B, width=3.4, font_size=24),
        )
        zero = self.tag_box("r3 = 0", RIGHT * 3.25 + DOWN * 1.2, RED_B, width=1.95, font_size=22)
        arrow = Arrow(rows[3].get_right(), zero.get_left(), buff=0.12, color=GRAY_B, stroke_width=2.1)
        degree_tags = VGroup(
            self.tag_box("deg 4", LEFT * 3.75 + UP * 0.72, BLUE_D, width=1.45, height=0.48, font_size=16),
            self.tag_box("deg 2", LEFT * 3.75 + UP * 0.08, BLUE_D, width=1.45, height=0.48, font_size=16),
            self.tag_box("deg 1", LEFT * 3.75 + DOWN * 1.2, BLUE_D, width=1.45, height=0.48, font_size=16),
        )
        return VGroup(title, rows, zero, arrow, degree_tags).move_to(UP * 0.14)

    def bezout_visual(self):
        labels = TEXT[self.locale]["visual"]
        title = self.label(labels["bezout"], font_size=24, color=YELLOW_B, weight=MEDIUM, max_width=4.6)
        title.move_to(UP * 1.47)
        normalize = self.equation_line("-x + 1 = -(x - 1)", UP * 0.75, TEAL_B, width=4.4, font_size=25)
        gcd = self.captioned_card(labels["monic"], "x - 1", LEFT * 3.7 + DOWN * 0.1, TEAL_B, width=2.15, height=0.88)
        coeff_a = self.captioned_card("a(x)", "-1/3x + 1/3", LEFT * 1.25 + DOWN * 0.1, BLUE_B, width=2.55, height=0.88, value_size=19)
        coeff_b = self.captioned_card("b(x)", "2/3x^2 - 2/3x - 1", RIGHT * 1.75 + DOWN * 0.1, GREEN_B, width=3.35, height=0.88, value_size=18)
        line = self.equation_line("x-1 = a(x)f(x) + b(x)g(x)", DOWN * 1.07, YELLOW_B, width=7.2, font_size=24)
        arrows = VGroup(
            Arrow(normalize.get_bottom(), gcd.get_top(), buff=0.14, color=TEAL_B, stroke_width=2.2),
            Arrow(coeff_a.get_right(), coeff_b.get_left(), buff=0.12, color=GRAY_B, stroke_width=2.0),
        )
        return VGroup(title, normalize, gcd, coeff_a, coeff_b, line, arrows).move_to(UP * 0.03)

    def field_visual(self):
        labels = TEXT[self.locale]["visual"]
        title = self.label(labels["field"], font_size=24, color=YELLOW_B, weight=MEDIUM, max_width=4.4)
        title.move_to(UP * 1.5)
        q_col = self.captioned_card("Q[x]", "x^2 - 2\nirreducible", LEFT * 4.0 + UP * 0.28, BLUE_B, width=2.45, height=1.25, value_size=18)
        r_col = self.captioned_card("R[x]", "x^2 - 2\nfactors", LEFT * 1.35 + UP * 0.28, GREEN_B, width=2.25, height=1.25, value_size=18)
        r2_col = self.captioned_card("R[x]", "x^2 + 1\nirreducible", RIGHT * 1.3 + UP * 0.28, TEAL_B, width=2.45, height=1.25, value_size=18)
        c_col = self.captioned_card("C[x]", "x^2 + 1\nfactors", RIGHT * 4.0 + UP * 0.28, PURPLE_B, width=2.25, height=1.25, value_size=18)
        fact1 = self.equation_line("(x - sqrt2)(x + sqrt2)", LEFT * 2.0 + DOWN * 1.05, GREEN_B, width=4.0, font_size=20)
        fact2 = self.equation_line("(x - i)(x + i)", RIGHT * 2.6 + DOWN * 1.05, PURPLE_B, width=3.3, font_size=21)
        arrows = VGroup(
            Arrow(q_col.get_right(), r_col.get_left(), buff=0.12, color=GRAY_B, stroke_width=2.0),
            Arrow(r2_col.get_right(), c_col.get_left(), buff=0.12, color=GRAY_B, stroke_width=2.0),
            Arrow(r_col.get_bottom(), fact1.get_top(), buff=0.12, color=GREEN_B, stroke_width=2.0),
            Arrow(c_col.get_bottom(), fact2.get_top(), buff=0.12, color=PURPLE_B, stroke_width=2.0),
        )
        return VGroup(title, q_col, r_col, r2_col, c_col, fact1, fact2, arrows).move_to(UP * 0.02)

    def prime_visual(self):
        labels = TEXT[self.locale]["visual"]
        title = self.label(labels["prime"], font_size=24, color=YELLOW_B, weight=MEDIUM, max_width=4.8)
        title.move_to(UP * 1.48)
        start = self.equation_line("p irreducible,  p does not divide a", UP * 0.78, BLUE_B, width=6.4, font_size=23)
        gcd = self.equation_line("gcd(a,p) = 1", UP * 0.1, TEAL_B, width=3.5, font_size=25)
        bezout = self.equation_line("u a + v p = 1", DOWN * 0.58, YELLOW_B, width=3.6, font_size=25)
        finish = self.equation_line("p | ab  ->  p | b", DOWN * 1.27, GREEN_B, width=4.4, font_size=25)
        arrows = VGroup(
            Arrow(start.get_bottom(), gcd.get_top(), buff=0.12, color=GRAY_B, stroke_width=2.0),
            Arrow(gcd.get_bottom(), bezout.get_top(), buff=0.12, color=GRAY_B, stroke_width=2.0),
            Arrow(bezout.get_bottom(), finish.get_top(), buff=0.12, color=GRAY_B, stroke_width=2.0),
        )
        return VGroup(title, start, gcd, bezout, finish, arrows).move_to(UP * 0.02)

    def summary_visual(self):
        labels = TEXT[self.locale]["visual"]
        data = [
            (labels["monic"], "x - 1", TEAL_B),
            (labels["invariant"], "gcd(f,g)=gcd(g,r)", BLUE_B),
            (labels["bezout"], "af+bg=gcd", YELLOW_B),
            (labels["field"], "Q / R / C", PURPLE_B),
            (labels["prime"], "p | ab", GREEN_B),
        ]
        cards = VGroup()
        for index, (title, value, color) in enumerate(data):
            x = -4.6 + index * 2.3
            cards.add(self.captioned_card(title, value, RIGHT * x + UP * 0.22, color, width=2.08, height=1.08, title_size=15, value_size=19))
        summary = self.label(TEXT[self.locale]["conclusion"], font_size=22, color=WHITE, max_width=10.6)
        summary.move_to(DOWN * 1.1)
        heading = self.label(TEXT[self.locale]["summary_label"], font_size=28, color=YELLOW_B, weight=MEDIUM, max_width=3.0)
        heading.move_to(UP * 1.45)
        return VGroup(heading, cards, summary)

    def construct(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=YELLOW_B, weight=MEDIUM, max_width=11.4)
        subtitle = self.label(data["subtitle"], font_size=21, color=GRAY_A, max_width=10.9)
        heading = VGroup(title, subtitle).arrange(DOWN, buff=0.11).to_edge(UP, buff=0.28)
        self.play(FadeIn(heading, shift=DOWN * 0.15), run_time=0.6)

        visuals = [
            self.associates_visual(),
            self.invariant_visual(),
            self.chain_visual(),
            self.bezout_visual(),
            self.field_visual(),
            self.prime_visual(),
        ]

        current_visual = None
        current_card = None
        for index, visual in enumerate(visuals):
            card = self.explain_card(data["states"][index])
            if current_visual is None:
                self.play(FadeIn(visual, shift=UP * 0.1), FadeIn(card, shift=UP * 0.1), run_time=0.75)
                self.wait(1.75)
            else:
                self.play(
                    FadeOut(current_visual, shift=LEFT * 0.25),
                    FadeOut(current_card, shift=DOWN * 0.08),
                    FadeIn(visual, shift=RIGHT * 0.25),
                    FadeIn(card, shift=UP * 0.08),
                    run_time=0.72,
                )
                self.wait(1.22)
            current_visual = visual
            current_card = card

        summary = self.summary_visual()
        self.play(FadeOut(current_visual), FadeOut(current_card), FadeIn(summary, shift=UP * 0.12), run_time=0.78)
        self.wait(1.7)
        self.play(FadeOut(summary), FadeOut(heading), run_time=0.6)


class PolynomialGcdIrreducibilityStoryEn(PolynomialGcdIrreducibilityStoryBase):
    locale = "en"
    font = "Avenir Next"


class PolynomialGcdIrreducibilityStoryZhHk(PolynomialGcdIrreducibilityStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class PolynomialGcdIrreducibilityStoryZhCn(PolynomialGcdIrreducibilityStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class PolynomialGcdIrreducibilityStory(PolynomialGcdIrreducibilityStoryEn):
    pass
