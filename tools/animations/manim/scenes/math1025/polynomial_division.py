from manim import *


TEXT = {
    "en": {
        "title": "Polynomial division keeps an identity",
        "subtitle": "Cancel leading terms until the remainder has smaller degree than the divisor.",
        "summary_label": "Summary",
        "visual": {
            "identity": "division identity",
            "dividend": "dividend",
            "divisor": "divisor",
            "quotient": "quotient",
            "remainder": "remainder",
            "nonzero": "nonzero divisor",
            "stop_rule": "stop rule",
            "leading": "leading term",
            "subtract": "subtract multiple",
            "current": "current remainder",
            "degree": "degree check",
            "stepper": "stepper below",
        },
        "states": [
            (
                "Division is an identity with a stopping rule",
                "For nonzero g, write f=gq+r and stop only when the remainder degree is smaller than deg g.",
                "f(x)=g(x)q(x)+r(x), deg r < deg g",
            ),
            (
                "Use the chapter's long-division example",
                "The quotient and remainder are built from f=x^4-3x^3+2x^2+4x-1 and g=x^2-2x+3.",
                "q=?, r=?",
            ),
            (
                "First cancel x^4",
                "The leading ratio x^4/x^2 gives the first quotient term x^2, then subtract x^2g.",
                "current = -x^3 - x^2 + 4x - 1",
            ),
            (
                "Then cancel -x^3",
                "Apply the same rule to the current remainder: (-x^3)/x^2 gives -x.",
                "current = -3x^2 + 7x - 1",
            ),
            (
                "The last cancellation produces the remainder",
                "The term -3 cancels -3x^2, and the remaining x+8 has degree 1, smaller than 2.",
                "q=x^2-x-3, r=x+8",
            ),
            (
                "Every subtraction preserves the identity",
                "The final quotient and remainder satisfy the original division identity, and the stepper below shows the same updates.",
                "f=(x^2-2x+3)(x^2-x-3)+(x+8)",
            ),
        ],
        "conclusion": "Cancel leading terms, preserve f=gq+current remainder, and stop when deg r < deg g.",
    },
    "zh-hk": {
        "title": "多項式除法保持同一恆等式",
        "subtitle": "逐步消去最高次項，直到餘式次數小於除式。",
        "summary_label": "總結",
        "visual": {
            "identity": "除法恆等式",
            "dividend": "被除式",
            "divisor": "除式",
            "quotient": "商式",
            "remainder": "餘式",
            "nonzero": "非零除式",
            "stop_rule": "停止條件",
            "leading": "最高次項",
            "subtract": "減去倍式",
            "current": "暫時餘式",
            "degree": "次數檢查",
            "stepper": "下方 stepper",
        },
        "states": [
            (
                "除法是一個恆等式加停止條件",
                "對非零 g，寫成 f=gq+r；只有在餘式次數小於 deg g 時才停止。",
                "f(x)=g(x)q(x)+r(x), deg r < deg g",
            ),
            (
                "使用本章的長除法例子",
                "商式與餘式由 f=x^4-3x^3+2x^2+4x-1 和 g=x^2-2x+3 建立。",
                "q=?, r=?",
            ),
            (
                "先消去 x^4",
                "最高次項比值 x^4/x^2 給出第一個商式項 x^2，然後減去 x^2g。",
                "current = -x^3 - x^2 + 4x - 1",
            ),
            (
                "再消去 -x^3",
                "同一規則套到暫時餘式：(-x^3)/x^2 給出 -x。",
                "current = -3x^2 + 7x - 1",
            ),
            (
                "最後一次消去產生餘式",
                "-3 會消去 -3x^2，剩下的 x+8 次數是 1，小於 2。",
                "q=x^2-x-3, r=x+8",
            ),
            (
                "每次相減都保持同一恆等式",
                "最後商式與餘式滿足原本除法恆等式；下方 stepper 顯示同一批更新。",
                "f=(x^2-2x+3)(x^2-x-3)+(x+8)",
            ),
        ],
        "conclusion": "消去最高次項，保持 f=gq+暫時餘式，並在 deg r < deg g 時停止。",
    },
    "zh-cn": {
        "title": "多项式除法保持同一恒等式",
        "subtitle": "逐步消去最高次项，直到余式次数小于除式。",
        "summary_label": "总结",
        "visual": {
            "identity": "除法恒等式",
            "dividend": "被除式",
            "divisor": "除式",
            "quotient": "商式",
            "remainder": "余式",
            "nonzero": "非零除式",
            "stop_rule": "停止条件",
            "leading": "最高次项",
            "subtract": "减去倍式",
            "current": "暂时余式",
            "degree": "次数检查",
            "stepper": "下方 stepper",
        },
        "states": [
            (
                "除法是一个恒等式加停止条件",
                "对非零 g，写成 f=gq+r；只有在余式次数小于 deg g 时才停止。",
                "f(x)=g(x)q(x)+r(x), deg r < deg g",
            ),
            (
                "使用本章的长除法例子",
                "商式与余式由 f=x^4-3x^3+2x^2+4x-1 和 g=x^2-2x+3 建立。",
                "q=?, r=?",
            ),
            (
                "先消去 x^4",
                "最高次项比值 x^4/x^2 给出第一个商式项 x^2，然后减去 x^2g。",
                "current = -x^3 - x^2 + 4x - 1",
            ),
            (
                "再消去 -x^3",
                "同一规则套到暂时余式：(-x^3)/x^2 给出 -x。",
                "current = -3x^2 + 7x - 1",
            ),
            (
                "最后一次消去产生余式",
                "-3 会消去 -3x^2，剩下的 x+8 次数是 1，小于 2。",
                "q=x^2-x-3, r=x+8",
            ),
            (
                "每次相减都保持同一恒等式",
                "最后商式与余式满足原本除法恒等式；下方 stepper 显示同一批更新。",
                "f=(x^2-2x+3)(x^2-x-3)+(x+8)",
            ),
        ],
        "conclusion": "消去最高次项，保持 f=gq+暂时余式，并在 deg r < deg g 时停止。",
    },
}


class PolynomialDivisionRemainderStoryBase(Scene):
    """MATH1025 8.1: polynomial long division and the remainder invariant."""

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

    def equation_line(self, value, center, color=WHITE, width=5.8, font_size=24):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=0.54,
            stroke_color=GRAY_B,
            stroke_width=1.2,
            fill_color=BLACK,
            fill_opacity=0.16,
        ).move_to(center)
        eq = self.label(value, font_size=font_size, color=color, weight=MEDIUM, max_width=width - 0.28)
        eq.move_to(box)
        return VGroup(box, eq)

    def tag_box(self, value, center, color=BLUE_B, width=2.4, height=0.72, font_size=22):
        box = RoundedRectangle(
            corner_radius=0.1,
            width=width,
            height=height,
            stroke_color=color,
            stroke_width=1.8,
            fill_color=color,
            fill_opacity=0.13,
        ).move_to(center)
        text = self.label(value, font_size=font_size, color=WHITE, weight=MEDIUM, max_width=width - 0.25)
        text.move_to(box)
        return VGroup(box, text)

    def named_poly(self, name, formula, center, color, width=4.2):
        labels = TEXT[self.locale]["visual"]
        card = RoundedRectangle(
            corner_radius=0.12,
            width=width,
            height=1.08,
            stroke_color=color,
            stroke_width=1.8,
            fill_color=color,
            fill_opacity=0.12,
        ).move_to(center)
        tag = self.label(labels[name], font_size=18, color=color, weight=MEDIUM, max_width=width - 0.3)
        tag.next_to(card, UP, buff=0.07)
        formula_mob = self.label(formula, font_size=21, color=WHITE, weight=MEDIUM, max_width=width - 0.35)
        formula_mob.move_to(card)
        return VGroup(card, formula_mob, tag)

    def identity_visual(self):
        labels = TEXT[self.locale]["visual"]
        title = self.label(labels["identity"], font_size=25, color=YELLOW_B, weight=MEDIUM, max_width=3.8)
        title.move_to(UP * 1.42)
        identity = self.equation_line("f(x) = g(x)q(x) + r(x)", UP * 0.68, YELLOW_B, width=6.2, font_size=28)
        g_tag = self.tag_box("g(x) != 0", LEFT * 2.45 + DOWN * 0.22, BLUE_B, width=2.55, height=0.72, font_size=23)
        stop = self.equation_line("deg r < deg g", RIGHT * 1.35 + DOWN * 0.22, TEAL_B, width=3.65, font_size=27)
        stop_label = self.label(labels["stop_rule"], font_size=19, color=TEAL_B, weight=MEDIUM, max_width=2.4)
        stop_label.next_to(stop, DOWN, buff=0.12)
        nonzero = self.label(labels["nonzero"], font_size=18, color=BLUE_B, weight=MEDIUM, max_width=2.4)
        nonzero.next_to(g_tag, DOWN, buff=0.12)
        arrow = Arrow(g_tag.get_right(), stop.get_left(), buff=0.18, color=GRAY_B, stroke_width=2.2)
        return VGroup(title, identity, g_tag, stop, stop_label, nonzero, arrow).move_to(UP * 0.06)

    def example_visual(self):
        f_card = self.named_poly("dividend", "f = x^4 - 3x^3 + 2x^2 + 4x - 1", LEFT * 2.45 + UP * 0.45, BLUE_B, width=5.0)
        g_card = self.named_poly("divisor", "g = x^2 - 2x + 3", RIGHT * 2.9 + UP * 0.45, GREEN_B, width=3.8)
        q_slot = self.named_poly("quotient", "q = ?", LEFT * 1.45 + DOWN * 0.82, YELLOW_B, width=2.8)
        r_slot = self.named_poly("remainder", "r = ?", RIGHT * 1.75 + DOWN * 0.82, TEAL_B, width=2.8)
        return VGroup(f_card, g_card, q_slot, r_slot).move_to(UP * 0.06)

    def step_visual(self, ratio, subtract, current, quotient, highlight_color):
        labels = TEXT[self.locale]["visual"]
        left = VGroup(
            self.equation_line(f"{labels['leading']}: {ratio}", ORIGIN, YELLOW_B, width=6.1, font_size=22),
            self.equation_line(f"{labels['subtract']}: {subtract}", ORIGIN, BLUE_B, width=7.2, font_size=21),
            self.equation_line(f"{labels['current']}: {current}", ORIGIN, TEAL_B, width=7.2, font_size=21),
        ).arrange(DOWN, buff=0.14).move_to(LEFT * 1.55 + UP * 0.18)
        quotient_card = self.named_poly("quotient", quotient, RIGHT * 4.2 + UP * 0.46, highlight_color, width=2.8)
        invariant = self.equation_line("f = gq + current", RIGHT * 4.2 + DOWN * 0.72, WHITE, width=3.15, font_size=22)
        arrows = VGroup(
            Arrow(left[0].get_bottom(), left[1].get_top(), buff=0.09, color=GRAY_B, stroke_width=2.0),
            Arrow(left[1].get_bottom(), left[2].get_top(), buff=0.09, color=GRAY_B, stroke_width=2.0),
            Arrow(quotient_card.get_bottom(), invariant.get_top(), buff=0.14, color=GRAY_B, stroke_width=2.0),
        )
        return VGroup(left, quotient_card, invariant, arrows).move_to(UP * 0.05)

    def final_step_visual(self):
        labels = TEXT[self.locale]["visual"]
        rows = VGroup(
            self.equation_line(f"{labels['leading']}: (-3x^2)/x^2 = -3", ORIGIN, YELLOW_B, width=6.3, font_size=22),
            self.equation_line(f"{labels['subtract']}: (-3)g = -3x^2 + 6x - 9", ORIGIN, BLUE_B, width=7.4, font_size=21),
            self.equation_line("r = x + 8", ORIGIN, TEAL_B, width=3.2, font_size=27),
            self.equation_line("deg(x+8)=1 < 2=deg(g)", ORIGIN, GREEN_B, width=5.8, font_size=22),
        ).arrange(DOWN, buff=0.11).move_to(LEFT * 1.45 + UP * 0.18)
        q = self.named_poly("quotient", "q = x^2 - x - 3", RIGHT * 4.25 + UP * 0.56, YELLOW_B, width=3.4)
        r = self.named_poly("remainder", "r = x + 8", RIGHT * 4.25 + DOWN * 0.72, TEAL_B, width=3.0)
        return VGroup(rows, q, r).move_to(UP * 0.03)

    def invariant_visual(self):
        labels = TEXT[self.locale]["visual"]
        q_card = self.named_poly("quotient", "q = x^2 - x - 3", LEFT * 2.85 + UP * 0.72, YELLOW_B, width=3.55)
        r_card = self.named_poly("remainder", "r = x + 8", RIGHT * 2.7 + UP * 0.72, TEAL_B, width=3.0)
        identity = self.equation_line(
            "f = (x^2 - 2x + 3)(x^2 - x - 3) + (x + 8)",
            UP * -0.12,
            GREEN_B,
            width=8.9,
            font_size=21,
        )
        stepper = self.tag_box(labels["stepper"], DOWN * 1.02, BLUE_B, width=2.9, height=0.54, font_size=19)
        arrows = VGroup(
            Arrow(q_card.get_bottom(), identity.get_top(), buff=0.12, color=GRAY_B, stroke_width=2.1),
            Arrow(r_card.get_bottom(), identity.get_top(), buff=0.12, color=GRAY_B, stroke_width=2.1),
            Arrow(identity.get_bottom(), stepper.get_top(), buff=0.14, color=BLUE_B, stroke_width=2.1),
        )
        return VGroup(q_card, r_card, identity, stepper, arrows).move_to(UP * 0.08)

    def construct(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=WHITE, weight=BOLD, max_width=10.7)
        title.to_edge(UP, buff=0.2)
        subtitle = self.label(data["subtitle"], font_size=19, color=GRAY_B, max_width=10.6)
        subtitle.next_to(title, DOWN, buff=0.08)

        visuals = [
            self.identity_visual,
            self.example_visual,
            lambda: self.step_visual(
                "x^4 / x^2 = x^2",
                "x^2g = x^4 - 2x^3 + 3x^2",
                "-x^3 - x^2 + 4x - 1",
                "q = x^2",
                YELLOW_B,
            ),
            lambda: self.step_visual(
                "(-x^3) / x^2 = -x",
                "(-x)g = -x^3 + 2x^2 - 3x",
                "-3x^2 + 7x - 1",
                "q = x^2 - x",
                ORANGE,
            ),
            self.final_step_visual,
            self.invariant_visual,
        ]

        current_visual = visuals[0]()
        current_card = self.explain_card(data["states"][0])
        self.play(FadeIn(title), FadeIn(subtitle), FadeIn(current_visual), FadeIn(current_card), run_time=1.0)
        self.wait(1.45)

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
            self.wait(0.72)

        conclusion = self.explain_card((data["summary_label"], data["conclusion"], data["states"][-1][2]))
        self.play(Transform(current_card, conclusion), run_time=0.7)
        self.wait(0.9)


class PolynomialDivisionRemainderStoryEn(PolynomialDivisionRemainderStoryBase):
    locale = "en"
    font = "Avenir Next"


class PolynomialDivisionRemainderStoryZhHk(PolynomialDivisionRemainderStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class PolynomialDivisionRemainderStoryZhCn(PolynomialDivisionRemainderStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class PolynomialDivisionRemainderStory(PolynomialDivisionRemainderStoryEn):
    pass
