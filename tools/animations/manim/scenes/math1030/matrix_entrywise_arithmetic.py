from manim import *


TEXT = {
    "en": {
        "title": "Matrix arithmetic is entrywise",
        "subtitle": "Same size | matching positions | shape preserved.",
        "states": [
            (
                "Same size is the gate",
                "Addition and subtraction need a partner for every position.",
                "A, B in R^(m x n)",
            ),
            (
                "Addition happens position by position",
                "Each output entry is built from the two matching input entries.",
                "[A+B]_ij = a_ij + b_ij",
            ),
            (
                "A scalar reaches every entry",
                "Scalar multiplication changes values, not the matrix shape.",
                "[7A]_ij = 7a_ij",
            ),
            (
                "Subtraction means add the inverse",
                "First build -B by changing every sign, then add entrywise.",
                "A - B = A + (-B)",
            ),
            (
                "Zero and inverse keep the same outline",
                "The zero matrix and additive inverse have the same size as A.",
                "A + O = A,  A + (-A) = O",
            ),
            (
                "Algebraic laws are entrywise checks",
                "Matrix equality is proved by checking every (i,j)-entry.",
                "(alpha+beta)A = alpha A + beta A",
            ),
        ],
        "visual": {
            "ok": "defined",
            "blocked": "not defined",
            "same_size": "same 2 x 3 size",
            "missing": "missing partners",
            "entry": "entry (1,1)",
            "sum": "sum",
            "scalar": "scalar",
            "every_cell": "every cell",
            "inverse": "additive inverse",
            "identity": "additive identity",
            "lab": "try the arithmetic lab below",
        },
        "conclusion": [
            ("same size", "add / subtract"),
            ("one scalar", "all entries"),
            ("matrix shape", "preserved"),
        ],
    },
    "zh-hk": {
        "title": "矩陣算術是逐格運算",
        "subtitle": "同型 | 對應位置 | 形狀保持。",
        "states": [
            (
                "同型是入口條件",
                "加法與減法需要每個位置都有配對元素。",
                "A, B in R^(m x n)",
            ),
            (
                "加法逐格發生",
                "每個輸出元素都來自兩個對應輸入元素。",
                "[A+B]_ij = a_ij + b_ij",
            ),
            (
                "純量作用到每一格",
                "純量乘法改變數值，但不改變矩陣形狀。",
                "[7A]_ij = 7a_ij",
            ),
            (
                "減法就是加上逆元",
                "先把 B 每個元素變號成 -B，再逐格相加。",
                "A - B = A + (-B)",
            ),
            (
                "零矩陣與逆元保持同一外形",
                "零矩陣和加法逆元都必須與 A 同型。",
                "A + O = A,  A + (-A) = O",
            ),
            (
                "代數規律靠逐項檢查",
                "證明矩陣相等，就是檢查每個 (i,j)-元素。",
                "(alpha+beta)A = alpha A + beta A",
            ),
        ],
        "visual": {
            "ok": "有定義",
            "blocked": "無定義",
            "same_size": "同為 2 x 3",
            "missing": "缺少配對位置",
            "entry": "(1,1) 元素",
            "sum": "和矩陣",
            "scalar": "純量",
            "every_cell": "每一格",
            "inverse": "加法逆元",
            "identity": "加法單位元",
            "lab": "試下面算術 lab",
        },
        "conclusion": [
            ("同型", "可加減"),
            ("一個純量", "作用每格"),
            ("矩陣形狀", "保持不變"),
        ],
    },
    "zh-cn": {
        "title": "矩阵算术是逐格运算",
        "subtitle": "同型 | 对应位置 | 形状保持。",
        "states": [
            (
                "同型是入口条件",
                "加法与减法需要每个位置都有配对元素。",
                "A, B in R^(m x n)",
            ),
            (
                "加法逐格发生",
                "每个输出元素都来自两个对应输入元素。",
                "[A+B]_ij = a_ij + b_ij",
            ),
            (
                "标量作用到每一格",
                "数乘改变数值，但不改变矩阵形状。",
                "[7A]_ij = 7a_ij",
            ),
            (
                "减法就是加上逆元",
                "先把 B 每个元素变号成 -B，再逐格相加。",
                "A - B = A + (-B)",
            ),
            (
                "零矩阵与逆元保持同一外形",
                "零矩阵和加法逆元都必须与 A 同型。",
                "A + O = A,  A + (-A) = O",
            ),
            (
                "代数规律靠逐项检查",
                "证明矩阵相等，就是检查每个 (i,j)-元素。",
                "(alpha+beta)A = alpha A + beta A",
            ),
        ],
        "visual": {
            "ok": "有定义",
            "blocked": "无定义",
            "same_size": "同为 2 x 3",
            "missing": "缺少配对位置",
            "entry": "(1,1) 元素",
            "sum": "和矩阵",
            "scalar": "标量",
            "every_cell": "每一格",
            "inverse": "加法逆元",
            "identity": "加法单位元",
            "lab": "试下面算术 lab",
        },
        "conclusion": [
            ("同型", "可加减"),
            ("一个标量", "作用每格"),
            ("矩阵形状", "保持不变"),
        ],
    },
}


A = [[2, -3, 4], [1, 0, -7]]
B = [[6, 2, -4], [3, 5, 2]]
A_PLUS_B = [[8, -1, 0], [4, 5, -5]]
SEVEN_A = [[14, -21, 28], [7, 0, -49]]
NEG_B = [[-6, -2, 4], [-3, -5, -2]]
ZERO = [[0, 0, 0], [0, 0, 0]]
SMALL = [[6, 2], [3, 5]]


class MatrixEntrywiseArithmeticStoryBase(Scene):
    """MATH1030 3.1: matrix addition, subtraction, and scalar multiplication."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(
            value,
            font=self.font,
            font_size=font_size,
            color=color,
            weight=weight,
            disable_ligatures=True,
        )
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def matrix_grid(
        self,
        rows,
        highlights=(),
        bad_cells=(),
        color=BLUE_B,
        cell_width=0.74,
        cell_height=0.50,
        font_size=22,
    ):
        row_count = len(rows)
        col_count = len(rows[0])
        cells = VGroup()
        values = VGroup()
        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - (col_count - 1) / 2) * cell_width
                y = ((row_count - 1) / 2 - row_index) * cell_height
                key = (row_index, col_index)
                is_highlight = key in highlights
                is_bad = key in bad_cells
                stroke_color = RED_B if is_bad else YELLOW_B if is_highlight else color
                fill_color = RED_E if is_bad else YELLOW_E if is_highlight else BLACK
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.25,
                    stroke_color=stroke_color,
                    fill_color=fill_color,
                    fill_opacity=0.42 if (is_highlight or is_bad) else 0.18,
                ).move_to([x, y, 0])
                value_mob = self.label(str(value), font_size=font_size, max_width=cell_width * 0.78).move_to(cell)
                cells.add(cell)
                values.add(value_mob)

        left_bracket = Text("[", font=self.font, font_size=76).next_to(cells, LEFT, buff=0.06)
        right_bracket = Text("]", font=self.font, font_size=76).next_to(cells, RIGHT, buff=0.06)
        return VGroup(cells, values, left_bracket, right_bracket)

    def state_card(self, index):
        state = TEXT[self.locale]["states"][index]
        box = RoundedRectangle(
            corner_radius=0.1,
            width=12.2,
            height=1.12,
            stroke_color=GRAY_C,
            fill_color=BLACK,
            fill_opacity=0.32,
        )
        title = self.label(state[0], font_size=22, color=YELLOW_B, weight=BOLD, max_width=11.3)
        body = self.label(state[1], font_size=17, color=WHITE, max_width=11.55)
        formula = self.label(state[2], font_size=16, color=GREEN_B, max_width=11.2)
        content = VGroup(title, body, formula).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content).to_edge(DOWN, buff=0.24)

    def badge(self, title, body, color=GREEN_B, width=3.4, height=0.84):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.26,
        )
        title_mob = self.label(title, font_size=15, color=color, weight=MEDIUM, max_width=width * 0.84)
        body_mob = self.label(body, font_size=20, max_width=width * 0.84)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.06).move_to(box)
        return VGroup(box, content)

    def single_line_badge(self, value, color=GREEN_B, width=3.0):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=0.54,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.26,
        )
        content = self.label(value, font_size=20, color=color, weight=MEDIUM, max_width=width * 0.86).move_to(box)
        return VGroup(box, content)

    def fit_visual(self, visual, max_width=10.6, max_height=3.85):
        if visual.width > max_width:
            visual.scale_to_fit_width(max_width)
        if visual.height > max_height:
            visual.scale_to_fit_height(max_height)
        return visual

    def shape_gate_visual(self):
        labels = TEXT[self.locale]["visual"]
        a = self.matrix_grid(A, color=BLUE_B).scale(0.82)
        b = self.matrix_grid(B, color=GREEN_B).scale(0.82)
        small = self.matrix_grid(SMALL, bad_cells={(0, 1), (1, 1)}, color=RED_B).scale(0.82)
        plus = self.label("+", font_size=30, color=GRAY_B, weight=BOLD, max_width=0.5)
        ok = self.badge(labels["ok"], labels["same_size"], GREEN_B, width=3.1)
        top = VGroup(a.copy(), plus.copy(), b.copy(), ok).arrange(RIGHT, buff=0.18)
        blocked = self.badge(labels["blocked"], labels["missing"], RED_B, width=3.1)
        bottom = VGroup(a, plus, small, blocked).arrange(RIGHT, buff=0.18)
        return self.fit_visual(VGroup(top, bottom).arrange(DOWN, buff=0.28))

    def addition_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = self.matrix_grid(A, highlights={(0, 0)}, color=BLUE_B).scale(0.86)
        right = self.matrix_grid(B, highlights={(0, 0)}, color=GREEN_B).scale(0.86)
        result = self.matrix_grid(A_PLUS_B, highlights={(0, 0)}, color=PURPLE_B).scale(0.86)
        plus = self.label("+", font_size=30, color=GRAY_B, weight=BOLD, max_width=0.5)
        equals = self.label("=", font_size=30, color=GREEN_B, weight=BOLD, max_width=0.5)
        row = VGroup(left, plus, right, equals, result).arrange(RIGHT, buff=0.16)
        formula = self.badge(labels["entry"], "2 + 6 = 8", YELLOW_B, width=4.2)
        caption = self.badge(labels["sum"], "2 x 3 -> 2 x 3", PURPLE_B, width=4.2)
        return self.fit_visual(VGroup(row, VGroup(formula, caption).arrange(RIGHT, buff=0.25)).arrange(DOWN, buff=0.26))

    def scalar_visual(self):
        labels = TEXT[self.locale]["visual"]
        scalar = self.badge(labels["scalar"], "7", YELLOW_B, width=1.3, height=0.82)
        matrix = self.matrix_grid(A, highlights={(0, 0), (1, 2)}, color=BLUE_B).scale(0.88)
        result = self.matrix_grid(SEVEN_A, highlights={(0, 0), (1, 2)}, color=PURPLE_B).scale(0.88)
        arrow = Arrow(LEFT, RIGHT, color=GREEN_B, stroke_width=5, max_tip_length_to_length_ratio=0.12)
        row = VGroup(VGroup(scalar, matrix).arrange(RIGHT, buff=0.14), arrow, result).arrange(RIGHT, buff=0.30)
        note = self.badge(labels["every_cell"], "7*2=14, 7*(-7)=-49", GREEN_B, width=5.2)
        return self.fit_visual(VGroup(row, note).arrange(DOWN, buff=0.28))

    def subtraction_visual(self):
        labels = TEXT[self.locale]["visual"]
        b = self.matrix_grid(B, highlights={(0, 1), (1, 2)}, color=GREEN_B).scale(0.84)
        neg_b = self.matrix_grid(NEG_B, highlights={(0, 1), (1, 2)}, color=RED_B).scale(0.84)
        arrow = Arrow(LEFT, RIGHT, color=RED_B, stroke_width=5, max_tip_length_to_length_ratio=0.12)
        sign_flip = VGroup(b, arrow, neg_b).arrange(RIGHT, buff=0.24)
        identity = self.badge(labels["inverse"], "A - B = A + (-B)", YELLOW_B, width=5.2)
        return self.fit_visual(VGroup(sign_flip, identity).arrange(DOWN, buff=0.30))

    def zero_inverse_visual(self):
        labels = TEXT[self.locale]["visual"]
        a = self.matrix_grid(A, color=BLUE_B).scale(0.78)
        zero = self.matrix_grid(ZERO, color=GREEN_B).scale(0.78)
        neg_a = self.matrix_grid([[-v for v in row] for row in A], color=RED_B).scale(0.78)
        identity = self.badge(labels["identity"], "A + O = A", GREEN_B, width=3.8)
        inverse = self.badge(labels["inverse"], "A + (-A) = O", RED_B, width=3.8)
        top = VGroup(a.copy(), self.label("+", 27, GRAY_B, BOLD, 0.5), zero, identity).arrange(RIGHT, buff=0.16)
        bottom = VGroup(a, self.label("+", 27, GRAY_B, BOLD, 0.5), neg_a, inverse).arrange(RIGHT, buff=0.16)
        return self.fit_visual(VGroup(top, bottom).arrange(DOWN, buff=0.26))

    def laws_visual(self):
        labels = TEXT[self.locale]["visual"]
        law_cards = VGroup(
            self.badge("A + B", "B + A", BLUE_B, width=3.2, height=0.76),
            self.badge("(a+b)A", "aA + bA", GREEN_B, width=3.6, height=0.76),
            self.badge("1A", "A", PURPLE_B, width=2.8, height=0.76),
        ).arrange(DOWN, buff=0.16)
        cell = Rectangle(
            width=1.45,
            height=1.0,
            stroke_width=2.5,
            stroke_color=YELLOW_B,
            fill_color=YELLOW_E,
            fill_opacity=0.35,
        )
        cell_label = self.label("(i,j)", font_size=26, color=WHITE, weight=BOLD, max_width=1.1).move_to(cell)
        formula = self.badge(labels["lab"], "same entry on both sides", YELLOW_B, width=4.8)
        entry_check = VGroup(VGroup(cell, cell_label), formula).arrange(DOWN, buff=0.22)
        return self.fit_visual(VGroup(law_cards, entry_check).arrange(RIGHT, buff=0.72), max_width=9.4)

    def visual_for(self, index):
        if index == 0:
            return self.shape_gate_visual()
        if index == 1:
            return self.addition_visual()
        if index == 2:
            return self.scalar_visual()
        if index == 3:
            return self.subtraction_visual()
        if index == 4:
            return self.zero_inverse_visual()
        return self.laws_visual()

    def construct(self):
        copy = TEXT[self.locale]
        self.camera.background_color = "#111827"

        title = self.label(copy["title"], font_size=35, color=BLUE_B, weight=BOLD, max_width=10.8)
        subtitle = self.label(copy["subtitle"], font_size=21, color=GRAY_A, max_width=10.8)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.10).to_edge(UP, buff=0.28)
        self.play(FadeIn(header, shift=DOWN * 0.15), run_time=0.6)

        active_visual = None
        active_card = None
        for index in range(len(copy["states"])):
            visual = self.visual_for(index).move_to(ORIGIN + UP * 0.25)
            card = self.state_card(index)

            if active_visual is None:
                self.play(FadeIn(visual, shift=UP * 0.15), FadeIn(card, shift=UP * 0.12), run_time=0.65)
            else:
                self.play(
                    FadeOut(active_visual, shift=LEFT * 0.18),
                    FadeOut(active_card, shift=DOWN * 0.12),
                    FadeIn(visual, shift=RIGHT * 0.18),
                    FadeIn(card, shift=UP * 0.12),
                    run_time=0.62,
                )
            self.wait(0.55)
            active_visual = visual
            active_card = card

        conclusion_rows = VGroup()
        for left_text, right_text in copy["conclusion"]:
            left = self.single_line_badge(left_text, BLUE_B, width=3.1)
            arrow = Arrow(LEFT, RIGHT, color=GREEN_B, stroke_width=4, max_tip_length_to_length_ratio=0.16)
            right = self.single_line_badge(right_text, GREEN_B, width=3.1)
            conclusion_rows.add(VGroup(left, arrow, right).arrange(RIGHT, buff=0.18))
        conclusion = conclusion_rows.arrange(DOWN, buff=0.24).move_to(ORIGIN + UP * 0.22)
        final_card = self.state_card(5)

        self.play(
            FadeOut(active_visual, shift=UP * 0.18),
            FadeOut(active_card, shift=DOWN * 0.12),
            FadeIn(conclusion, shift=UP * 0.12),
            FadeIn(final_card, shift=UP * 0.12),
            run_time=0.7,
        )
        self.wait(0.85)


class MatrixEntrywiseArithmeticStoryEn(MatrixEntrywiseArithmeticStoryBase):
    locale = "en"
    font = "Avenir Next"


class MatrixEntrywiseArithmeticStoryZhHk(MatrixEntrywiseArithmeticStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class MatrixEntrywiseArithmeticStoryZhCn(MatrixEntrywiseArithmeticStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"
