from manim import *


TEXT = {
    "en": {
        "title": "Gram-Schmidt removes old directions",
        "subtitle": "Projection subtraction builds orthogonal vectors while preserving the span.",
        "visual": {
            "not_yet_orthogonal": "not yet orthogonal",
            "first_step": "first step",
            "projection_coefficient": "projection coefficient",
            "new_check": "new check",
            "coefficients": "coefficients",
            "pair_1": "pair 1",
            "pair_2": "pair 2",
            "pair_3": "pair 3",
            "orthogonal_output": "orthogonal output",
            "span_invariant": "span invariant",
            "orthonormal_basis": "orthonormal basis",
            "input_basis": "input basis",
            "orthogonal_basis": "orthogonal basis",
        },
        "states": [
            (
                "Start with the input basis",
                "The vectors w1, w2, and w3 are linearly independent, but not orthogonal yet.",
                "input list: w1, w2, w3",
            ),
            (
                "Keep the first direction",
                "The first orthogonal vector is unchanged: v1 = w1.",
                "v1 = w1",
            ),
            (
                "Remove the part of w2 along v1",
                "The projection coefficient is 1, so subtract one copy of v1.",
                "v2 = w2 - v1",
            ),
            (
                "Remove two old directions from w3",
                "The coefficients along v1 and v2 are both 1.",
                "v3 = w3 - v1 - v2",
            ),
            (
                "Check the new vectors",
                "The dot products are zero, so the output list is orthogonal.",
                "v1.v2 = v1.v3 = v2.v3 = 0",
            ),
            (
                "Normalize only after orthogonalizing",
                "Divide by lengths to get an orthonormal basis; the span has not changed.",
                "same span, then unit lengths",
            ),
        ],
        "conclusion": "Gram-Schmidt changes the basis, not the subspace: subtract projections first, then normalize if needed.",
    },
    "zh-hk": {
        "title": "Gram-Schmidt 扣除舊方向",
        "subtitle": "用投影扣除建立正交向量，同時不改變張成空間。",
        "visual": {
            "not_yet_orthogonal": "暫未正交",
            "first_step": "第一步",
            "projection_coefficient": "投影係數",
            "new_check": "新檢查",
            "coefficients": "係數",
            "pair_1": "第 1 對",
            "pair_2": "第 2 對",
            "pair_3": "第 3 對",
            "orthogonal_output": "正交輸出",
            "span_invariant": "張成不變量",
            "orthonormal_basis": "標準正交基",
            "input_basis": "原基底",
            "orthogonal_basis": "正交基底",
        },
        "states": [
            (
                "由原來基底開始",
                "w1、w2、w3 線性無關，但暫時未互相正交。",
                "輸入列表：w1, w2, w3",
            ),
            (
                "保留第一個方向",
                "第一個正交向量不改：v1 = w1。",
                "v1 = w1",
            ),
            (
                "扣除 w2 在 v1 上的部分",
                "投影係數是 1，所以扣除一份 v1。",
                "v2 = w2 - v1",
            ),
            (
                "從 w3 扣除兩個舊方向",
                "沿 v1 和 v2 的係數都等於 1。",
                "v3 = w3 - v1 - v2",
            ),
            (
                "檢查新的向量",
                "內積全部為 0，所以輸出列表是正交的。",
                "v1.v2 = v1.v3 = v2.v3 = 0",
            ),
            (
                "先正交化，再正規化",
                "把向量除以長度就得到標準正交基；張成空間沒有改變。",
                "同一張成空間，再變成單位長度",
            ),
        ],
        "conclusion": "Gram-Schmidt 改變的是基底，不是子空間：先扣除投影，需要時再正規化。",
    },
    "zh-cn": {
        "title": "Gram-Schmidt 扣去旧方向",
        "subtitle": "用投影扣除建立正交向量，同时不改变张成空间。",
        "visual": {
            "not_yet_orthogonal": "暂未正交",
            "first_step": "第一步",
            "projection_coefficient": "投影系数",
            "new_check": "新检查",
            "coefficients": "系数",
            "pair_1": "第 1 对",
            "pair_2": "第 2 对",
            "pair_3": "第 3 对",
            "orthogonal_output": "正交输出",
            "span_invariant": "张成不变量",
            "orthonormal_basis": "标准正交基",
            "input_basis": "原基底",
            "orthogonal_basis": "正交基底",
        },
        "states": [
            (
                "由原来基底开始",
                "w1、w2、w3 线性无关，但暂时未互相正交。",
                "输入列表：w1, w2, w3",
            ),
            (
                "保留第一个方向",
                "第一个正交向量不改：v1 = w1。",
                "v1 = w1",
            ),
            (
                "扣去 w2 在 v1 上的部分",
                "投影系数是 1，所以扣去一份 v1。",
                "v2 = w2 - v1",
            ),
            (
                "从 w3 扣去两个旧方向",
                "沿 v1 和 v2 的系数都等于 1。",
                "v3 = w3 - v1 - v2",
            ),
            (
                "检查新的向量",
                "内积全部为 0，所以输出列表是正交的。",
                "v1.v2 = v1.v3 = v2.v3 = 0",
            ),
            (
                "先正交化，再规范化",
                "把向量除以长度就得到标准正交基；张成空间没有改变。",
                "同一张成空间，再变成单位长度",
            ),
        ],
        "conclusion": "Gram-Schmidt 改变的是基底，不是子空间：先扣去投影，需要时再规范化。",
    },
}


W1 = (1, 0, 1)
W2 = (1, 1, 1)
W3 = (0, 1, 2)
V1 = (1, 0, 1)
V2 = (0, 1, 0)
V3 = (-1, 0, 1)


class GramSchmidtProjectionStoryBase(Scene):
    """MATH1030 9.3: projection subtraction in the Gram-Schmidt process."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(
            value,
            font=self.font,
            font_size=font_size,
            color=color,
            weight=weight,
        )
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def vector_card(self, name, values, color=BLUE_B, width=2.02, height=1.08):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
        )
        title = self.label(name, font_size=22, color=color, weight=MEDIUM, max_width=width * 0.84)
        vector = self.label(
            f"({values[0]}, {values[1]}, {values[2]})",
            font_size=22,
            max_width=width * 0.86,
        )
        content = VGroup(title, vector).arrange(DOWN, buff=0.12).move_to(box)
        return VGroup(box, content)

    def formula_card(self, title, body, color=GREEN_B, width=4.9, height=0.96):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.2,
        )
        title_mob = self.label(title, font_size=19, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=21, max_width=width * 0.9)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.1).move_to(box)
        return VGroup(box, content)

    def symbol(self, value, color=GRAY_B, width=0.7):
        return self.label(value, font_size=30, color=color, weight=BOLD, max_width=width)

    def fit_visual(self, visual, max_width=7.15, max_height=3.25):
        if visual.width > max_width:
            visual.scale_to_fit_width(max_width)
        if visual.height > max_height:
            visual.scale_to_fit_height(max_height)
        return visual

    def input_visual(self):
        labels = TEXT[self.locale]["visual"]
        cards = VGroup(
            self.vector_card("w1", W1, BLUE_B),
            self.vector_card("w2", W2, YELLOW_B),
            self.vector_card("w3", W3, TEAL_B),
        ).arrange(RIGHT, buff=0.28)
        note = self.formula_card(labels["not_yet_orthogonal"], "w1.w2 = 2,  w1.w3 = 2", RED_B, width=5.7)
        return self.fit_visual(VGroup(cards, note).arrange(DOWN, buff=0.24))

    def first_direction_visual(self):
        labels = TEXT[self.locale]["visual"]
        v1 = self.vector_card("v1 = w1", V1, BLUE_B, width=2.55)
        arrow = Arrow(
            LEFT * 1.35,
            RIGHT * 1.35,
            buff=0,
            color=BLUE_B,
            stroke_width=5,
            max_tip_length_to_length_ratio=0.12,
        )
        origin = Dot(arrow.get_start(), color=GRAY_B, radius=0.04)
        direction = VGroup(arrow, origin)
        direction.next_to(v1, DOWN, buff=0.32)
        note = self.formula_card(labels["first_step"], "v1 = (1, 0, 1)", BLUE_B, width=4.2)
        return self.fit_visual(VGroup(v1, direction, note).arrange(DOWN, buff=0.24))

    def subtraction_row(self, source, subtractors, result, scale=1.0):
        pieces = [self.vector_card(source[0], source[1], source[2])]
        for name, values, color in subtractors:
            pieces.append(self.symbol("-", color=GRAY_B, width=0.38))
            pieces.append(self.vector_card(name, values, color))
        pieces.append(self.symbol("=>", color=GREEN_B, width=0.64))
        pieces.append(self.vector_card(result[0], result[1], result[2]))
        row = VGroup(*pieces).arrange(RIGHT, buff=0.15)
        row.scale(scale)
        return self.fit_visual(row, max_height=1.7)

    def w2_projection_visual(self):
        labels = TEXT[self.locale]["visual"]
        row = self.subtraction_row(
            ("w2", W2, YELLOW_B),
            [("1*v1", V1, BLUE_B)],
            ("v2", V2, GREEN_B),
            scale=0.9,
        )
        coeff = self.formula_card(labels["projection_coefficient"], "<w2,v1> / ||v1||^2 = 2 / 2 = 1", GREEN_B)
        dot = self.formula_card(labels["new_check"], "v1.v2 = 0", BLUE_B, width=3.4)
        bottom = VGroup(coeff, dot).arrange(RIGHT, buff=0.22)
        return self.fit_visual(VGroup(row, bottom).arrange(DOWN, buff=0.24))

    def w3_projection_visual(self):
        labels = TEXT[self.locale]["visual"]
        row = self.subtraction_row(
            ("w3", W3, TEAL_B),
            [("1*v1", V1, BLUE_B), ("1*v2", V2, GREEN_B)],
            ("v3", V3, PURPLE_B),
            scale=0.74,
        )
        coeff = self.formula_card(labels["coefficients"], "<w3,v1>/||v1||^2 = 1,  <w3,v2>/||v2||^2 = 1", GREEN_B, width=6.6)
        return self.fit_visual(VGroup(row, coeff).arrange(DOWN, buff=0.26))

    def dot_check_visual(self):
        labels = TEXT[self.locale]["visual"]
        checks = VGroup(
            self.formula_card(labels["pair_1"], "v1.v2 = 0", BLUE_B, width=2.15, height=0.82),
            self.formula_card(labels["pair_2"], "v1.v3 = 0", PURPLE_B, width=2.15, height=0.82),
            self.formula_card(labels["pair_3"], "v2.v3 = 0", GREEN_B, width=2.15, height=0.82),
        ).arrange(RIGHT, buff=0.22)
        output = VGroup(
            self.vector_card("v1", V1, BLUE_B),
            self.vector_card("v2", V2, GREEN_B),
            self.vector_card("v3", V3, PURPLE_B),
        ).arrange(RIGHT, buff=0.26)
        badge = self.label(labels["orthogonal_output"], font_size=26, color=GREEN_B, weight=BOLD, max_width=4.6)
        return self.fit_visual(VGroup(checks, output, badge).arrange(DOWN, buff=0.24))

    def normalize_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = VGroup(
            self.formula_card(labels["input_basis"], "w1, w2, w3", GRAY_B, width=2.05, height=1.04),
            self.symbol("<=>", color=GREEN_B, width=0.8),
            self.formula_card(labels["orthogonal_basis"], "v1, v2, v3", GREEN_B, width=2.05, height=1.04),
        ).arrange(RIGHT, buff=0.2)
        span_note = self.formula_card(labels["span_invariant"], "Span(w1,w2,w3) = Span(v1,v2,v3)", GREEN_B, width=6.3)
        unit_note = self.formula_card(labels["orthonormal_basis"], "u1 = v1/sqrt2,  u2 = v2,  u3 = v3/sqrt2", BLUE_B, width=6.5)
        return self.fit_visual(VGroup(left, span_note, unit_note).arrange(DOWN, buff=0.22))

    def state_visual(self, index):
        if index == 0:
            return self.input_visual()
        if index == 1:
            return self.first_direction_visual()
        if index == 2:
            return self.w2_projection_visual()
        if index == 3:
            return self.w3_projection_visual()
        if index == 4:
            return self.dot_check_visual()
        return self.normalize_visual()

    def construct(self):
        copy = TEXT[self.locale]
        title = self.label(copy["title"], font_size=36, weight=BOLD, max_width=7.2)
        subtitle = self.label(copy["subtitle"], font_size=22, color=GRAY_B, max_width=7.4)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.16).to_edge(UP)

        self.play(FadeIn(header, shift=DOWN * 0.2))

        current = None
        for index, (caption, focus, operation) in enumerate(copy["states"]):
            caption_mob = self.label(caption, font_size=28, weight=MEDIUM, max_width=7.0)
            visual = self.state_visual(index).scale(1.02)
            focus_mob = self.label(focus, font_size=21, color=GRAY_B, max_width=7.25)
            operation_mob = self.label(operation, font_size=24, color=BLUE_B, max_width=7.25)
            group = VGroup(caption_mob, visual, focus_mob, operation_mob).arrange(
                DOWN,
                buff=0.27,
            )
            group.next_to(header, DOWN, buff=0.34)

            if current is None:
                self.play(FadeIn(group, shift=UP * 0.15))
            else:
                self.play(FadeOut(current, shift=UP * 0.1), FadeIn(group, shift=UP * 0.1))

            current = group
            self.wait(1.04 if index < len(copy["states"]) - 1 else 1.5)

        conclusion = self.label(
            copy["conclusion"],
            font_size=24,
            color=GREEN_B,
            max_width=7.4,
        ).to_edge(DOWN)
        self.play(FadeIn(conclusion, shift=UP * 0.2))
        self.wait(1.2)


class GramSchmidtProjectionStoryEn(GramSchmidtProjectionStoryBase):
    locale = "en"


class GramSchmidtProjectionStoryZhHk(GramSchmidtProjectionStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class GramSchmidtProjectionStoryZhCn(GramSchmidtProjectionStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class GramSchmidtProjectionStory(GramSchmidtProjectionStoryEn):
    """Backwards-compatible alias for one-off English render commands."""
