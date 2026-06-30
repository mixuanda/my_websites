from manim import *


TEXT = {
    "en": {
        "title": "Matrix multiplication: entries and identity",
        "subtitle": "Inner size | row-column entries | identity selectors.",
        "states": [
            (
                "Check the inner size first",
                "A 2 x 3 matrix can multiply a 3 x 2 matrix because the shared size is 3.",
                "outer sizes give AB as 2 x 2",
            ),
            (
                "One entry uses one row and one column",
                "The top-left entry is not 1 times 4 alone; it uses the whole row-column pairing.",
                "c11 = 1*4 + 2*5 + (-1)*6 = 8",
            ),
            (
                "Repeat the rule for every output cell",
                "Each cell of AB is built from a row of A and a column of B.",
                "cik = ai1*b1k + ai2*b2k + ai3*b3k",
            ),
            (
                "Right identity preserves columns",
                "Multiplying by I2 on the right asks for the original columns of A again.",
                "A I2 = A",
            ),
            (
                "Left identity preserves rows",
                "Multiplying by I2 on the left asks for the original rows of A again.",
                "I2 A = A",
            ),
            (
                "Order still matters",
                "Identity matrices are special. A general product cannot be reordered.",
                "AB != BA in general",
            ),
        ],
        "visual": {
            "defined": "defined",
            "inner": "inner size 3",
            "outer": "outer size 2 x 2",
            "row": "row 1",
            "column": "column 1",
            "entry": "entry c11",
            "product": "AB",
            "formula": "row-column rule",
            "right_identity": "right identity",
            "left_identity": "left identity",
            "order_a": "AB: 2 x 2",
            "order_b": "BA: 3 x 3",
            "practice": "try the visualizer below",
        },
        "conclusion": [
            ("inner size", "defined product"),
            ("row + column", "one entry"),
            ("identity", "preserves A"),
        ],
    },
    "zh-hk": {
        "title": "矩陣乘法：元素與單位矩陣",
        "subtitle": "內側大小 | 行列元素 | 單位矩陣選擇器。",
        "states": [
            (
                "先檢查內側大小",
                "2 x 3 矩陣可以乘 3 x 2 矩陣，因為共同大小是 3。",
                "外側大小給出 AB 是 2 x 2",
            ),
            (
                "一個元素使用一行和一列",
                "左上角元素不是只做 1 乘 4，而是使用整個行列配對。",
                "c11 = 1*4 + 2*5 + (-1)*6 = 8",
            ),
            (
                "每個輸出格重複同一規則",
                "AB 的每一格都由 A 的一行與 B 的一列構成。",
                "cik = ai1*b1k + ai2*b2k + ai3*b3k",
            ),
            (
                "右邊單位矩陣保持列不變",
                "右乘 I2 等於再次取出 A 原本的各列。",
                "A I2 = A",
            ),
            (
                "左邊單位矩陣保持行不變",
                "左乘 I2 等於再次取出 A 原本的各行。",
                "I2 A = A",
            ),
            (
                "次序仍然重要",
                "單位矩陣是特殊情況。一般矩陣乘積不能隨意調換次序。",
                "一般而言 AB != BA",
            ),
        ],
        "visual": {
            "defined": "有定義",
            "inner": "內側大小 3",
            "outer": "外側大小 2 x 2",
            "row": "第 1 行",
            "column": "第 1 列",
            "entry": "元素 c11",
            "product": "AB",
            "formula": "行乘列規則",
            "right_identity": "右單位元",
            "left_identity": "左單位元",
            "order_a": "AB: 2 x 2",
            "order_b": "BA: 3 x 3",
            "practice": "試下面視覺化工具",
        },
        "conclusion": [
            ("內側大小", "乘積有定義"),
            ("行 + 列", "一個元素"),
            ("單位矩陣", "保持 A 不變"),
        ],
    },
    "zh-cn": {
        "title": "矩阵乘法：元素与单位矩阵",
        "subtitle": "内侧大小 | 行列元素 | 单位矩阵选择器。",
        "states": [
            (
                "先检查内侧大小",
                "2 x 3 矩阵可以乘 3 x 2 矩阵，因为共同大小是 3。",
                "外侧大小给出 AB 是 2 x 2",
            ),
            (
                "一个元素使用一行和一列",
                "左上角元素不是只做 1 乘 4，而是使用整个行列配对。",
                "c11 = 1*4 + 2*5 + (-1)*6 = 8",
            ),
            (
                "每个输出格重复同一规则",
                "AB 的每一格都由 A 的一行与 B 的一列构成。",
                "cik = ai1*b1k + ai2*b2k + ai3*b3k",
            ),
            (
                "右边单位矩阵保持列不变",
                "右乘 I2 等于再次取出 A 原本的各列。",
                "A I2 = A",
            ),
            (
                "左边单位矩阵保持行不变",
                "左乘 I2 等于再次取出 A 原本的各行。",
                "I2 A = A",
            ),
            (
                "次序仍然重要",
                "单位矩阵是特殊情形。一般矩阵乘积不能随意调换次序。",
                "一般而言 AB != BA",
            ),
        ],
        "visual": {
            "defined": "有定义",
            "inner": "内侧大小 3",
            "outer": "外侧大小 2 x 2",
            "row": "第 1 行",
            "column": "第 1 列",
            "entry": "元素 c11",
            "product": "AB",
            "formula": "行乘列规则",
            "right_identity": "右单位元",
            "left_identity": "左单位元",
            "order_a": "AB: 2 x 2",
            "order_b": "BA: 3 x 3",
            "practice": "试下面可视化工具",
        },
        "conclusion": [
            ("内侧大小", "乘积有定义"),
            ("行 + 列", "一个元素"),
            ("单位矩阵", "保持 A 不变"),
        ],
    },
}


A = [[1, 2, -1], [3, 0, 4]]
B = [[4, 1], [5, -2], [6, 3]]
AB = [[8, -6], [36, 15]]
A2 = [[2, -1], [4, 3]]
I2 = [[1, 0], [0, 1]]


class MatrixMultiplicationIdentityStoryBase(Scene):
    """MATH1030 3.1: matrix products, identity matrices, and order."""

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
                is_highlight = (row_index, col_index) in highlights
                stroke_color = YELLOW_B if is_highlight else color
                fill_color = YELLOW_E if is_highlight else BLACK
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.25,
                    stroke_color=stroke_color,
                    fill_color=fill_color,
                    fill_opacity=0.42 if is_highlight else 0.18,
                ).move_to([x, y, 0])
                value_mob = self.label(
                    str(value),
                    font_size=font_size,
                    max_width=cell_width * 0.78,
                ).move_to(cell)
                cells.add(cell)
                values.add(value_mob)

        left_bracket = Text("[", font=self.font, font_size=78).next_to(cells, LEFT, buff=0.06)
        right_bracket = Text("]", font=self.font, font_size=78).next_to(cells, RIGHT, buff=0.06)
        return VGroup(cells, values, left_bracket, right_bracket)

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

    def single_line_badge(self, value, color=GREEN_B, width=3.1):
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

    def fit_visual(self, visual, max_width=10.7, max_height=3.85):
        if visual.width > max_width:
            visual.scale_to_fit_width(max_width)
        if visual.height > max_height:
            visual.scale_to_fit_height(max_height)
        return visual

    def product_row(self, a_highlights=(), b_highlights=(), result_highlights=(), show_result=True):
        matrix_a = self.matrix_grid(A, highlights=a_highlights, color=BLUE_B).scale(0.86)
        matrix_b = self.matrix_grid(B, highlights=b_highlights, color=GREEN_B).scale(0.86)
        result_rows = AB if show_result else [["?", "?"], ["?", "?"]]
        result = self.matrix_grid(result_rows, highlights=result_highlights, color=PURPLE_B).scale(0.86)
        times = self.label("*", font_size=30, color=GRAY_B, weight=BOLD, max_width=0.5)
        equals = self.label("=", font_size=30, color=GREEN_B, weight=BOLD, max_width=0.5)
        return VGroup(matrix_a, times, matrix_b, equals, result).arrange(RIGHT, buff=0.16)

    def size_gate_visual(self):
        labels = TEXT[self.locale]["visual"]
        row = self.product_row(show_result=False)
        badges = VGroup(
            self.badge(labels["defined"], labels["inner"], GREEN_B, width=3.1),
            self.badge(labels["product"], labels["outer"], PURPLE_B, width=3.5),
        ).arrange(RIGHT, buff=0.28)
        return self.fit_visual(VGroup(row, badges).arrange(DOWN, buff=0.28))

    def entry_visual(self):
        labels = TEXT[self.locale]["visual"]
        row = self.product_row(
            a_highlights={(0, 0), (0, 1), (0, 2)},
            b_highlights={(0, 0), (1, 0), (2, 0)},
            result_highlights={(0, 0)},
        )
        details = VGroup(
            self.badge(labels["row"], "[1, 2, -1]", BLUE_B, width=3.4),
            self.badge(labels["column"], "[4, 5, 6]^T", GREEN_B, width=3.4),
            self.badge(labels["entry"], "8", PURPLE_B, width=2.0),
        ).arrange(RIGHT, buff=0.18)
        formula = self.badge(labels["formula"], "1*4 + 2*5 + (-1)*6 = 8", YELLOW_B, width=6.8)
        return self.fit_visual(VGroup(row, details, formula).arrange(DOWN, buff=0.18))

    def full_product_visual(self):
        labels = TEXT[self.locale]["visual"]
        row = self.product_row(result_highlights={(0, 0), (0, 1), (1, 0), (1, 1)})
        formula = self.badge(labels["formula"], "cik = ai1*b1k + ai2*b2k + ai3*b3k", GREEN_B, width=7.4)
        warning = self.badge(labels["product"], "[[8, -6], [36, 15]]", PURPLE_B, width=4.8)
        return self.fit_visual(VGroup(row, VGroup(formula, warning).arrange(RIGHT, buff=0.22)).arrange(DOWN, buff=0.24))

    def identity_visual(self, side):
        labels = TEXT[self.locale]["visual"]
        a_highlights = {(0, 0), (1, 0)} if side == "right" else {(0, 0), (0, 1)}
        i_highlights = {(0, 0), (1, 0)} if side == "right" else {(0, 0), (0, 1)}
        result_highlights = a_highlights
        matrix_a = self.matrix_grid(A2, highlights=a_highlights, color=BLUE_B).scale(0.92)
        identity = self.matrix_grid(I2, highlights=i_highlights, color=GREEN_B).scale(0.92)
        result = self.matrix_grid(A2, highlights=result_highlights, color=PURPLE_B).scale(0.92)
        times = self.label("*", font_size=30, color=GRAY_B, weight=BOLD, max_width=0.5)
        equals = self.label("=", font_size=30, color=GREEN_B, weight=BOLD, max_width=0.5)
        if side == "right":
            row = VGroup(matrix_a, times, identity, equals, result).arrange(RIGHT, buff=0.18)
            caption = self.badge(labels["right_identity"], "A I2 = A", GREEN_B, width=4.2)
        else:
            row = VGroup(identity, times, matrix_a, equals, result).arrange(RIGHT, buff=0.18)
            caption = self.badge(labels["left_identity"], "I2 A = A", GREEN_B, width=4.2)
        return self.fit_visual(VGroup(row, caption).arrange(DOWN, buff=0.28))

    def order_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = self.badge("A(2 x 3) * B(3 x 2)", labels["order_a"], BLUE_B, width=4.5, height=0.92)
        right = self.badge("B(3 x 2) * A(2 x 3)", labels["order_b"], RED_B, width=4.5, height=0.92)
        not_equal = self.single_line_badge("AB != BA", YELLOW_B, width=3.1)
        practice = self.badge(labels["practice"], "row-column cells", GREEN_B, width=4.0)
        return self.fit_visual(VGroup(VGroup(left, not_equal, right).arrange(RIGHT, buff=0.26), practice).arrange(DOWN, buff=0.38))

    def visual_for(self, index):
        if index == 0:
            return self.size_gate_visual()
        if index == 1:
            return self.entry_visual()
        if index == 2:
            return self.full_product_visual()
        if index == 3:
            return self.identity_visual("right")
        if index == 4:
            return self.identity_visual("left")
        return self.order_visual()

    def construct(self):
        copy = TEXT[self.locale]
        self.camera.background_color = "#111827"

        title = self.label(copy["title"], font_size=35, color=BLUE_B, weight=BOLD, max_width=10.9)
        subtitle = self.label(copy["subtitle"], font_size=21, color=GRAY_A, max_width=10.9)
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


class MatrixMultiplicationIdentityStoryEn(MatrixMultiplicationIdentityStoryBase):
    locale = "en"
    font = "Avenir Next"


class MatrixMultiplicationIdentityStoryZhHk(MatrixMultiplicationIdentityStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class MatrixMultiplicationIdentityStoryZhCn(MatrixMultiplicationIdentityStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class MatrixMultiplicationIdentityStory(MatrixMultiplicationIdentityStoryEn):
    """Backwards-compatible alias for one-off English render commands."""
