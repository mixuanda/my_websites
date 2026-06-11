from manim import *


TEXT = {
    "en": {
        "title": "Row operations as left multiplication",
        "subtitle": "Do the operation to I first; then multiply on the left.",
        "visual": {
            "identity": "identity",
            "row_operation_matrix": "row-operation matrix",
            "sample_matrix": "sample matrix",
            "after_operation": "after row operation",
            "operation": "operation",
            "sequence": "sequence",
            "inverse": "inverse",
            "old_row_1": "old row 1",
            "old_row_2": "old row 2",
            "new_row_2": "new row 2",
            "sequence_rule": "first operation closest to A₁",
            "start": "start",
        },
        "states": [
            (
                "Start with the identity",
                "A row-operation matrix is made by applying the row operation to I₃.",
                "ρ: R₂ ← R₂ + 3R₁",
            ),
            (
                "Apply ρ to I₃",
                "Only row 2 changes: row 2 becomes row 2 plus 3 row 1.",
                "Eρ = ρ(I₃)",
            ),
            (
                "Now multiply A on the left",
                "The same Eρ performs the same row operation on any 3-row matrix A.",
                "ρ(A) = Eρ A",
            ),
            (
                "Read the changed row",
                "The new second row is a linear combination of old rows of A.",
                "new row 2 = old row 2 + 3 old row 1",
            ),
            (
                "A chain becomes a product",
                "The first operation sits closest to A₁ because it acts first.",
                "A₃ = E₂ E₁ A₁",
            ),
            (
                "Reverse operations give inverses",
                "Changing +3 to -3 undoes the row addition.",
                "Eρ⁻¹ Eρ = I",
            ),
        ],
        "conclusion": "The structural point is left multiplication: elementary matrices package row operations as ordinary matrix products.",
    },
    "zh-hk": {
        "title": "行變換就是左乘矩陣",
        "subtitle": "先把操作做在 I 上，再用所得矩陣左乘。",
        "visual": {
            "identity": "單位矩陣",
            "row_operation_matrix": "行變換矩陣",
            "sample_matrix": "樣本矩陣",
            "after_operation": "行變換後",
            "operation": "操作",
            "sequence": "操作串",
            "inverse": "逆操作",
            "old_row_1": "舊第 1 行",
            "old_row_2": "舊第 2 行",
            "new_row_2": "新第 2 行",
            "sequence_rule": "第一個操作最靠近 A₁",
            "start": "開始",
        },
        "states": [
            (
                "由單位矩陣開始",
                "行變換矩陣是把同一個行變換作用在 I₃ 上得到的。",
                "ρ: R₂ ← R₂ + 3R₁",
            ),
            (
                "把 ρ 作用在 I₃ 上",
                "只有第 2 行改變：第 2 行變成第 2 行加 3 倍第 1 行。",
                "Eρ = ρ(I₃)",
            ),
            (
                "現在用 Eρ 左乘 A",
                "同一個 Eρ 會對任何三行矩陣 A 做同一個行變換。",
                "ρ(A) = Eρ A",
            ),
            (
                "讀出改變後的行",
                "新的第 2 行是 A 的舊行的線性組合。",
                "新第 2 行 = 舊第 2 行 + 3 舊第 1 行",
            ),
            (
                "一串操作變成乘積",
                "第一個操作最靠近 A₁，因為它最先作用。",
                "A₃ = E₂ E₁ A₁",
            ),
            (
                "反向操作給出逆矩陣",
                "把 +3 改成 -3，就會抵消這個行加法。",
                "Eρ⁻¹ Eρ = I",
            ),
        ],
        "conclusion": "結構重點是左乘：初等矩陣把行變換包裝成普通矩陣乘積。",
    },
    "zh-cn": {
        "title": "行变换就是左乘矩阵",
        "subtitle": "先把操作做在 I 上，再用所得矩阵左乘。",
        "visual": {
            "identity": "单位矩阵",
            "row_operation_matrix": "行变换矩阵",
            "sample_matrix": "样本矩阵",
            "after_operation": "行变换后",
            "operation": "操作",
            "sequence": "操作串",
            "inverse": "逆操作",
            "old_row_1": "旧第 1 行",
            "old_row_2": "旧第 2 行",
            "new_row_2": "新第 2 行",
            "sequence_rule": "第一个操作最靠近 A₁",
            "start": "开始",
        },
        "states": [
            (
                "由单位矩阵开始",
                "行变换矩阵是把同一个行变换作用在 I₃ 上得到的。",
                "ρ: R₂ ← R₂ + 3R₁",
            ),
            (
                "把 ρ 作用在 I₃ 上",
                "只有第 2 行改变：第 2 行变成第 2 行加 3 倍第 1 行。",
                "Eρ = ρ(I₃)",
            ),
            (
                "现在用 Eρ 左乘 A",
                "同一个 Eρ 会对任何三行矩阵 A 做同一个行变换。",
                "ρ(A) = Eρ A",
            ),
            (
                "读出改变后的行",
                "新的第 2 行是 A 的旧行的线性组合。",
                "新第 2 行 = 旧第 2 行 + 3 旧第 1 行",
            ),
            (
                "一串操作变成乘积",
                "第一个操作最靠近 A₁，因为它最先作用。",
                "A₃ = E₂ E₁ A₁",
            ),
            (
                "反向操作给出逆矩阵",
                "把 +3 改成 -3，就会抵消这个行加法。",
                "Eρ⁻¹ Eρ = I",
            ),
        ],
        "conclusion": "结构重点是左乘：初等矩阵把行变换包装成普通矩阵乘积。",
    },
}


I3 = [["1", "0", "0"], ["0", "1", "0"], ["0", "0", "1"]]
E_ADD = [["1", "0", "0"], ["3", "1", "0"], ["0", "0", "1"]]
A_SAMPLE = [["1", "0", "1"], ["0", "2", "1"], ["1", "0", "0"]]
EA_SAMPLE = [["1", "0", "1"], ["3", "2", "4"], ["1", "0", "0"]]
E_INV = [["1", "0", "0"], ["-3", "1", "0"], ["0", "0", "1"]]


class RowOperationMatrixLeftMultiplyStoryBase(Scene):
    """MATH1030 3.3: elementary row operations as left multiplication."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def matrix_grid(self, rows, highlights=(), color=BLUE_B, cell_width=0.58, cell_height=0.42):
        row_count = len(rows)
        col_count = len(rows[0])
        cells = VGroup()
        values = VGroup()
        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - (col_count - 1) / 2) * cell_width
                y = ((row_count - 1) / 2 - row_index) * cell_height
                is_highlight = (row_index, col_index) in highlights
                fill_color = YELLOW_E if is_highlight else BLACK
                stroke_color = YELLOW_B if is_highlight else color
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.15,
                    stroke_color=stroke_color,
                    fill_color=fill_color,
                    fill_opacity=0.42 if is_highlight else 0.16,
                ).move_to([x, y, 0])
                value_mob = self.label(
                    value,
                    font_size=18,
                    max_width=cell_width * 0.72,
                ).move_to(cell)
                cells.add(cell)
                values.add(value_mob)

        left_bracket = Text("[", font=self.font, font_size=70).next_to(cells, LEFT, buff=0.05)
        right_bracket = Text("]", font=self.font, font_size=70).next_to(cells, RIGHT, buff=0.05)
        return VGroup(cells, values, left_bracket, right_bracket)

    def formula_card(self, title, body, color=GREEN_B, width=6.4, height=0.88):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.22,
        )
        title_mob = self.label(title, font_size=18, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=22, max_width=width * 0.9)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content)

    def fit_visual(self, visual, max_width=7.25, max_height=3.35):
        if visual.width > max_width:
            visual.scale_to_fit_width(max_width)
        if visual.height > max_height:
            visual.scale_to_fit_height(max_height)
        return visual

    def labeled_matrix(self, rows, label, color, highlights=()):
        matrix = self.matrix_grid(rows, highlights=highlights, color=color)
        caption = self.label(label, font_size=20, color=color, weight=MEDIUM, max_width=2.4).next_to(matrix, DOWN, buff=0.12)
        return VGroup(matrix, caption)

    def identity_visual(self):
        labels = TEXT[self.locale]["visual"]
        identity = self.labeled_matrix(I3, "I₃", BLUE_B)
        op_card = self.formula_card(labels["operation"], "ρ: R₂ ← R₂ + 3R₁", YELLOW_B, width=5.6)
        return self.fit_visual(VGroup(identity, op_card).arrange(DOWN, buff=0.35))

    def build_elementary_visual(self):
        labels = TEXT[self.locale]["visual"]
        identity = self.labeled_matrix(I3, labels["identity"], BLUE_B)
        e_matrix = self.labeled_matrix(E_ADD, "Eρ", GREEN_B, highlights={(1, 0), (1, 1), (1, 2)})
        arrow = self.label("ρ", font_size=28, color=YELLOW_B, weight=BOLD, max_width=0.8)
        row = VGroup(identity, arrow, e_matrix).arrange(RIGHT, buff=0.38)
        card = self.formula_card(labels["row_operation_matrix"], "Eρ = ρ(I₃)", GREEN_B, width=5.8)
        return self.fit_visual(VGroup(row, card).arrange(DOWN, buff=0.3))

    def left_multiply_visual(self):
        labels = TEXT[self.locale]["visual"]
        e_matrix = self.labeled_matrix(E_ADD, "Eρ", GREEN_B, highlights={(1, 0), (1, 1), (1, 2)}).scale(0.92)
        a_matrix = self.labeled_matrix(A_SAMPLE, "A", BLUE_B).scale(0.92)
        result = self.labeled_matrix(EA_SAMPLE, "ρ(A)", PURPLE_B, highlights={(1, 0), (1, 1), (1, 2)}).scale(0.92)
        row = VGroup(
            e_matrix,
            self.label("×", font_size=28, color=GRAY_B, weight=BOLD, max_width=0.4),
            a_matrix,
            self.label("⇒", font_size=30, color=GREEN_B, weight=BOLD, max_width=0.7),
            result,
        ).arrange(RIGHT, buff=0.18)
        card = self.formula_card(labels["after_operation"], "ρ(A) = Eρ A", PURPLE_B, width=5.9)
        return self.fit_visual(VGroup(row, card).arrange(DOWN, buff=0.24))

    def changed_row_visual(self):
        labels = TEXT[self.locale]["visual"]
        rows = VGroup(
            self.formula_card(labels["old_row_1"], "[1, 0, 1]", BLUE_B, width=3.05, height=0.76),
            self.formula_card(labels["old_row_2"], "[0, 2, 1]", GREEN_B, width=3.05, height=0.76),
            self.formula_card(labels["new_row_2"], "[3, 2, 4]", PURPLE_B, width=3.05, height=0.76),
        ).arrange(RIGHT, buff=0.18)
        equation = self.formula_card(
            labels["after_operation"],
            "[3,2,4] = [0,2,1] + 3[1,0,1]",
            YELLOW_B,
            width=6.8,
            height=0.92,
        )
        matrix = self.labeled_matrix(EA_SAMPLE, "Eρ A", PURPLE_B, highlights={(1, 0), (1, 1), (1, 2)}).scale(0.92)
        return self.fit_visual(VGroup(rows, equation, matrix).arrange(DOWN, buff=0.22))

    def sequence_visual(self):
        labels = TEXT[self.locale]["visual"]
        chain = VGroup(
            self.formula_card("A₁", labels["start"], BLUE_B, width=1.35, height=0.76),
            self.label("-- ρ₁ -->", font_size=20, color=YELLOW_B, max_width=1.2),
            self.formula_card("A₂", "E₁ A₁", GREEN_B, width=1.5, height=0.76),
            self.label("-- ρ₂ -->", font_size=20, color=YELLOW_B, max_width=1.2),
            self.formula_card("A₃", "E₂ E₁ A₁", PURPLE_B, width=1.85, height=0.76),
        ).arrange(RIGHT, buff=0.12)
        product = self.formula_card(labels["sequence"], labels["sequence_rule"], GREEN_B, width=6.6)
        order = self.formula_card(labels["operation"], "A₃ = E₂ E₁ A₁", BLUE_B, width=5.2)
        return self.fit_visual(VGroup(chain, product, order).arrange(DOWN, buff=0.28))

    def inverse_visual(self):
        labels = TEXT[self.locale]["visual"]
        e_inv = self.labeled_matrix(E_INV, "Eρ⁻¹", RED_B, highlights={(1, 0), (1, 1), (1, 2)}).scale(0.95)
        e_matrix = self.labeled_matrix(E_ADD, "Eρ", GREEN_B, highlights={(1, 0), (1, 1), (1, 2)}).scale(0.95)
        identity = self.labeled_matrix(I3, "I₃", BLUE_B).scale(0.95)
        row = VGroup(
            e_inv,
            self.label("×", font_size=28, color=GRAY_B, weight=BOLD, max_width=0.4),
            e_matrix,
            self.label("⇒", font_size=30, color=GREEN_B, weight=BOLD, max_width=0.7),
            identity,
        ).arrange(RIGHT, buff=0.18)
        card = self.formula_card(labels["inverse"], "R₂ ← R₂ − 3R₁", RED_B, width=5.8)
        return self.fit_visual(VGroup(row, card).arrange(DOWN, buff=0.24))

    def state_visual(self, index):
        if index == 0:
            return self.identity_visual()
        if index == 1:
            return self.build_elementary_visual()
        if index == 2:
            return self.left_multiply_visual()
        if index == 3:
            return self.changed_row_visual()
        if index == 4:
            return self.sequence_visual()
        return self.inverse_visual()

    def construct(self):
        copy = TEXT[self.locale]
        title = self.label(copy["title"], font_size=36, weight=BOLD, max_width=7.2)
        subtitle = self.label(copy["subtitle"], font_size=22, color=GRAY_B, max_width=7.35)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.16).to_edge(UP)

        self.play(FadeIn(header, shift=DOWN * 0.2))

        current = None
        for index, (caption, focus, operation) in enumerate(copy["states"]):
            caption_mob = self.label(caption, font_size=27, weight=MEDIUM, max_width=7.0)
            visual = self.state_visual(index)
            focus_mob = self.label(focus, font_size=20, color=GRAY_B, max_width=7.25)
            operation_mob = self.label(operation, font_size=23, color=BLUE_B, max_width=7.25)
            group = VGroup(caption_mob, visual, focus_mob, operation_mob).arrange(
                DOWN,
                buff=0.22,
            )
            group.next_to(header, DOWN, buff=0.3)

            if current is None:
                self.play(FadeIn(group, shift=UP * 0.15))
            else:
                self.play(FadeOut(current, shift=UP * 0.1), FadeIn(group, shift=UP * 0.1))

            current = group
            self.wait(1.02 if index < len(copy["states"]) - 1 else 1.45)

        conclusion = self.label(copy["conclusion"], font_size=24, color=GREEN_B, max_width=7.4).to_edge(DOWN)
        self.play(FadeIn(conclusion, shift=UP * 0.2))
        self.wait(1.2)


class RowOperationMatrixLeftMultiplyStoryEn(RowOperationMatrixLeftMultiplyStoryBase):
    locale = "en"


class RowOperationMatrixLeftMultiplyStoryZhHk(RowOperationMatrixLeftMultiplyStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class RowOperationMatrixLeftMultiplyStoryZhCn(RowOperationMatrixLeftMultiplyStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class RowOperationMatrixLeftMultiplyStory(RowOperationMatrixLeftMultiplyStoryEn):
    """Backwards-compatible alias for one-off English render commands."""
