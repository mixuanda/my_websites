from manim import *


TEXT = {
    "en": {
        "title": "Read a matrix by position",
        "subtitle": "Size first. Then rows, columns, and entries.",
        "states": [
            (
                "Start with the shape",
                "This matrix has 2 rows and 3 columns.",
                "size = 2 x 3",
            ),
            (
                "Rows and columns locate an entry",
                "Row 2 and column 3 meet at the entry 4.",
                "a_23 = 4",
            ),
            (
                "Equality is entrywise",
                "Same size is necessary, but every matching position must agree.",
                "same size + same entries",
            ),
            (
                "One mismatch breaks equality",
                "A single changed entry means the matrices are not equal.",
                "A != B",
            ),
            (
                "Columns follow the variable order",
                "In a coefficient matrix, column 2 records coefficients of x_2.",
                "variable order matters",
            ),
        ],
        "conclusion": "Matrix literacy starts with position: row, column, entry, and size.",
    },
    "zh-hk": {
        "title": "按位置閱讀矩陣",
        "subtitle": "先看大小，再看行、列、元素。",
        "states": [
            (
                "先看形狀",
                "這個矩陣有 2 行、3 列。",
                "大小 = 2 x 3",
            ),
            (
                "行和列定位元素",
                "第 2 行與第 3 列交會的位置，就是元素 4。",
                "a_23 = 4",
            ),
            (
                "矩陣相等要逐項比較",
                "大小相同只是必要條件；每個對應位置也要相同。",
                "大小相同 + 元素相同",
            ),
            (
                "一個位置不同就不相等",
                "只要改動一個元素，兩個矩陣就不再相等。",
                "A != B",
            ),
            (
                "列跟着變量次序",
                "在係數矩陣中，第 2 列記錄 x_2 的係數。",
                "變量次序很重要",
            ),
        ],
        "conclusion": "讀矩陣的起點是位置：行、列、元素和大小。",
    },
    "zh-cn": {
        "title": "按位置阅读矩阵",
        "subtitle": "先看大小，再看行、列、元素。",
        "states": [
            (
                "先看形状",
                "这个矩阵有 2 行、3 列。",
                "大小 = 2 x 3",
            ),
            (
                "行和列定位元素",
                "第 2 行与第 3 列交会的位置，就是元素 4。",
                "a_23 = 4",
            ),
            (
                "矩阵相等要逐项比较",
                "大小相同只是必要条件；每个对应位置也要相同。",
                "大小相同 + 元素相同",
            ),
            (
                "一个位置不同就不相等",
                "只要改动一个元素，两个矩阵就不再相等。",
                "A != B",
            ),
            (
                "列跟着变量次序",
                "在系数矩阵中，第 2 列记录 x_2 的系数。",
                "变量次序很重要",
            ),
        ],
        "conclusion": "读矩阵的起点是位置：行、列、元素和大小。",
    },
}


BASE_MATRIX = [[1, 2, 0], [3, -1, 4]]
MISMATCH_MATRIX = [[1, 2, 0], [3, -1, 5]]
COEFFICIENT_MATRIX = [[1, 2, -1], [3, -1, 5]]


class MatrixBasicsPositionMapBase(Scene):
    """MATH1030 2.1: size, entries, equality, and coefficient columns."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        kwargs = {
            "font": self.font,
            "font_size": font_size,
            "color": color,
            "weight": weight,
        }
        text = Text(value, **kwargs)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def matrix_grid(self, rows, highlights=(), mismatch=(), column_labels=None):
        cell_width = 0.82
        cell_height = 0.56
        cells = VGroup()
        values = VGroup()
        labels = VGroup()

        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - (len(row) - 1) / 2) * cell_width
                y = ((len(rows) - 1) / 2 - row_index) * cell_height
                is_highlight = (row_index, col_index) in highlights
                is_mismatch = (row_index, col_index) in mismatch
                fill_color = RED_E if is_mismatch else YELLOW_E if is_highlight else BLACK
                stroke_color = RED_B if is_mismatch else YELLOW_B if is_highlight else GREY_B

                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.3,
                    stroke_color=stroke_color,
                    fill_color=fill_color,
                    fill_opacity=0.42 if (is_highlight or is_mismatch) else 0.18,
                ).move_to([x, y, 0])
                number = self.label(str(value), font_size=29, max_width=cell_width * 0.7).move_to(cell)
                cells.add(cell)
                values.add(number)

        if column_labels:
            top_y = ((len(rows) - 1) / 2 + 0.88) * cell_height
            for col_index, label in enumerate(column_labels):
                x = (col_index - (len(column_labels) - 1) / 2) * cell_width
                labels.add(
                    self.label(label, font_size=20, color=BLUE_B, max_width=cell_width).move_to(
                        [x, top_y + 0.32, 0]
                    )
                )

        left_bracket = Text("[", font=self.font, font_size=94).next_to(cells, LEFT, buff=0.08)
        right_bracket = Text("]", font=self.font, font_size=94).next_to(cells, RIGHT, buff=0.08)
        return VGroup(labels, cells, values, left_bracket, right_bracket)

    def state_visual(self, index):
        if index == 0:
            matrix = self.matrix_grid(BASE_MATRIX)
            row_note = self.label("2 rows", font_size=20, color=YELLOW_B, max_width=2.2).next_to(
                matrix, LEFT, buff=0.42
            )
            col_note = self.label("3 columns", font_size=20, color=YELLOW_B, max_width=2.4).next_to(
                matrix, DOWN, buff=0.26
            )
            return VGroup(matrix, row_note, col_note)

        if index == 1:
            matrix = self.matrix_grid(BASE_MATRIX, highlights={(1, 2)})
            row_bar = Rectangle(width=3 * 0.82, height=0.56, stroke_width=3, stroke_color=BLUE_B).move_to(
                matrix[1][3].get_center()
            )
            col_bar = Rectangle(width=0.82, height=2 * 0.56, stroke_width=3, stroke_color=GREEN_B).move_to(
                VGroup(matrix[1][2], matrix[1][5]).get_center()
            )
            return VGroup(matrix, row_bar, col_bar)

        if index == 2:
            left = self.matrix_grid(BASE_MATRIX).scale(0.82)
            right = self.matrix_grid(BASE_MATRIX).scale(0.82)
            equal = self.label("=", font_size=38, color=GREEN_B, weight=BOLD, max_width=0.6)
            group = VGroup(left, equal, right).arrange(RIGHT, buff=0.28)
            return group

        if index == 3:
            left = self.matrix_grid(BASE_MATRIX).scale(0.82)
            right = self.matrix_grid(MISMATCH_MATRIX, mismatch={(1, 2)}).scale(0.82)
            not_equal = self.label("!=", font_size=32, color=RED_B, weight=BOLD, max_width=0.8)
            group = VGroup(left, not_equal, right).arrange(RIGHT, buff=0.28)
            return group

        matrix = self.matrix_grid(
            COEFFICIENT_MATRIX,
            highlights={(0, 1), (1, 1)},
            column_labels=["x1", "x2", "x3"],
        )
        arrow = Arrow(
            matrix[1][1].get_bottom() + DOWN * 0.18,
            matrix[1][4].get_bottom() + DOWN * 0.18,
            buff=0,
            color=BLUE_B,
            stroke_width=4,
            max_tip_length_to_length_ratio=0.12,
        )
        return VGroup(matrix, arrow)

    def construct(self):
        copy = TEXT[self.locale]
        title = self.label(copy["title"], font_size=38, weight=BOLD, max_width=7.2)
        subtitle = self.label(copy["subtitle"], font_size=24, color=GRAY_B, max_width=7.4)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.16).to_edge(UP)

        self.play(FadeIn(header, shift=DOWN * 0.2))

        current = None
        for index, (caption, focus, operation) in enumerate(copy["states"]):
            caption_mob = self.label(caption, font_size=29, weight=MEDIUM, max_width=7.0)
            visual = self.state_visual(index).scale(1.08)
            focus_mob = self.label(focus, font_size=22, color=GRAY_B, max_width=7.2)
            operation_mob = self.label(operation, font_size=25, color=BLUE_B, max_width=7.2)
            group = VGroup(caption_mob, visual, focus_mob, operation_mob).arrange(
                DOWN,
                buff=0.34,
            )
            group.next_to(header, DOWN, buff=0.42)

            if current is None:
                self.play(FadeIn(group, shift=UP * 0.15))
            else:
                self.play(FadeOut(current, shift=UP * 0.1), FadeIn(group, shift=UP * 0.1))

            current = group
            self.wait(1.15 if index < len(copy["states"]) - 1 else 1.55)

        conclusion = self.label(
            copy["conclusion"],
            font_size=26,
            color=GREEN_B,
            max_width=7.4,
        ).to_edge(DOWN)
        self.play(FadeIn(conclusion, shift=UP * 0.2))
        self.wait(1.3)


class MatrixBasicsPositionMapEn(MatrixBasicsPositionMapBase):
    locale = "en"


class MatrixBasicsPositionMapZhHk(MatrixBasicsPositionMapBase):
    locale = "zh-hk"
    font = "PingFang HK"


class MatrixBasicsPositionMapZhCn(MatrixBasicsPositionMapBase):
    locale = "zh-cn"
    font = "PingFang SC"


class MatrixBasicsPositionMap(MatrixBasicsPositionMapEn):
    """Backwards-compatible alias for one-off English render commands."""
