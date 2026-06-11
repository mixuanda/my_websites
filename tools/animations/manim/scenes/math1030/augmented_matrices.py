from manim import *


TEXT = {
    "en": {
        "title": "Row operations preserve solutions",
        "subtitle": "Package the system, then rewrite equations safely.",
        "states": [
            (
                "Package the system as [A|b]",
                "Coefficients and constants stay aligned in one augmented matrix.",
                "equations -> augmented matrix",
            ),
            (
                "The vertical bar is bookkeeping",
                "It marks the constants column, but row operations act on the whole row.",
                "coefficient block | constants",
            ),
            (
                "Only reversible row moves are safe",
                "Swap rows, scale by a nonzero number, or add a multiple of one row to another.",
                "swap   scale c != 0   replace",
            ),
            (
                "Row replacement rewrites equations",
                "Use row 1 to eliminate x1 from the lower equations.",
                "R2 <- R2 - R1    R3 <- R3 - 2R1",
            ),
            (
                "The constants move too",
                "Freezing the last column would no longer describe the same equations.",
                "whole rows change together",
            ),
            (
                "The invariant is the solution set",
                "The display changes, but the tuples solving the system do not.",
                "same solution set",
            ),
        ],
        "conclusion": "An augmented matrix is useful because each legal row move is an equivalent equation rewrite.",
    },
    "zh-hk": {
        "title": "行變換保留解集",
        "subtitle": "先包裝方程組，再安全改寫方程。",
        "states": [
            (
                "把系統包裝成 [A|b]",
                "係數和常數保持對齊，放入同一個增廣矩陣。",
                "方程組 -> 增廣矩陣",
            ),
            (
                "直線只是記號提示",
                "它標出常數列，但行變換作用在整行上。",
                "係數區塊 | 常數列",
            ),
            (
                "只有可逆行變換才安全",
                "交換兩行、用非零數乘一行，或把一行倍數加到另一行。",
                "交換   乘 c != 0   替換",
            ),
            (
                "行替換就是改寫方程",
                "用第 1 行清掉下方方程中的 x1。",
                "R2 <- R2 - R1    R3 <- R3 - 2R1",
            ),
            (
                "常數列也要一起變",
                "若固定最後一列，就不再代表同一個方程組。",
                "整行一起改變",
            ),
            (
                "不變量是解集",
                "顯示方式改變，但滿足系統的數組沒有改變。",
                "同一個解集",
            ),
        ],
        "conclusion": "增廣矩陣有用，因為每個合法行變換都是等價的方程改寫。",
    },
    "zh-cn": {
        "title": "行变换保留解集",
        "subtitle": "先包装方程组，再安全改写方程。",
        "states": [
            (
                "把系统包装成 [A|b]",
                "系数和常数保持对齐，放入同一个增广矩阵。",
                "方程组 -> 增广矩阵",
            ),
            (
                "直线只是记号提示",
                "它标出常数列，但行变换作用在整行上。",
                "系数区块 | 常数列",
            ),
            (
                "只有可逆行变换才安全",
                "交换两行、用非零数乘一行，或把一行倍数加到另一行。",
                "交换   乘 c != 0   替换",
            ),
            (
                "行替换就是改写方程",
                "用第 1 行清掉下方方程中的 x1。",
                "R2 <- R2 - R1    R3 <- R3 - 2R1",
            ),
            (
                "常数列也要一起变",
                "若固定最后一列，就不再代表同一个方程组。",
                "整行一起改变",
            ),
            (
                "不变量是解集",
                "显示方式改变，但满足系统的数组没有改变。",
                "同一个解集",
            ),
        ],
        "conclusion": "增广矩阵有用，因为每个合法行变换都是等价的方程改写。",
    },
}


START_MATRIX = [[1, 2, 2, 4], [1, 3, 3, 5], [2, 6, 5, 6]]
AFTER_MATRIX = [[1, 2, 2, 4], [0, 1, 1, 1], [0, 2, 1, -2]]
FROZEN_CONSTANTS = [[1, 2, 2, 4], [0, 1, 1, 5], [0, 2, 1, 6]]


class AugmentedMatrixRowOperationSafetyBase(Scene):
    """MATH1030 2.2: augmented matrices and row-operation invariance."""

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

    def matrix_grid(
        self,
        rows,
        highlights=(),
        warning=(),
        scale_numbers=1.0,
    ):
        cell_width = 0.72
        cell_height = 0.5
        cells = VGroup()
        values = VGroup()

        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - 1.5) * cell_width
                y = (1 - row_index) * cell_height
                is_constant = col_index == 3
                is_highlight = (row_index, col_index) in highlights
                is_warning = (row_index, col_index) in warning
                fill_color = RED_E if is_warning else YELLOW_E if is_highlight else BLACK
                stroke_color = RED_B if is_warning else YELLOW_B if is_highlight else BLUE_E if is_constant else GREY_B

                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.2,
                    stroke_color=stroke_color,
                    fill_color=fill_color,
                    fill_opacity=0.42 if (is_highlight or is_warning) else 0.18,
                ).move_to([x, y, 0])
                number = self.label(
                    str(value),
                    font_size=26 * scale_numbers,
                    max_width=cell_width * 0.68,
                ).move_to(cell)
                cells.add(cell)
                values.add(number)

        divider = Line(
            [1.5 * cell_width, -0.92, 0],
            [1.5 * cell_width, 0.92, 0],
            color=BLUE_B,
            stroke_width=4,
        )
        left_bracket = Text("[", font=self.font, font_size=84).next_to(cells, LEFT, buff=0.08)
        right_bracket = Text("]", font=self.font, font_size=84).next_to(cells, RIGHT, buff=0.08)
        return VGroup(cells, values, divider, left_bracket, right_bracket)

    def equations_to_matrix_visual(self):
        equations = VGroup(
            self.label("x1 + 2x2 + 2x3 = 4", font_size=22, max_width=3.2),
            self.label("x1 + 3x2 + 3x3 = 5", font_size=22, max_width=3.2),
            self.label("2x1 + 6x2 + 5x3 = 6", font_size=22, max_width=3.2),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        matrix = self.matrix_grid(START_MATRIX).scale(0.92)
        arrow = self.label("=>", font_size=38, color=GREEN_B, weight=BOLD, max_width=0.8)
        return VGroup(equations, arrow, matrix).arrange(RIGHT, buff=0.34)

    def operation_cards(self):
        cards = VGroup()
        specs = [
            ("swap", "Ri <-> Rj", BLUE_B),
            ("scale", "Ri <- cRi", GREEN_B),
            ("replace", "Rj <- aRi + Rj", YELLOW_B),
        ]
        for title, formula, color in specs:
            box = RoundedRectangle(
                corner_radius=0.08,
                width=2.15,
                height=1.18,
                stroke_color=color,
                fill_color=BLACK,
                fill_opacity=0.24,
            )
            title_mob = self.label(title, font_size=19, color=color, weight=MEDIUM, max_width=1.8)
            formula_mob = self.label(formula, font_size=21, max_width=1.9)
            content = VGroup(title_mob, formula_mob).arrange(DOWN, buff=0.16).move_to(box)
            cards.add(VGroup(box, content))
        return cards.arrange(RIGHT, buff=0.22)

    def row_replacement_visual(self):
        before = self.matrix_grid(START_MATRIX, highlights={(0, 0), (1, 0), (2, 0)}).scale(0.82)
        after = self.matrix_grid(AFTER_MATRIX, highlights={(1, 0), (2, 0), (1, 3), (2, 3)}).scale(0.82)
        arrow = Arrow(
            before.get_right() + RIGHT * 0.16,
            after.get_left() + LEFT * 0.16,
            buff=0,
            color=GREEN_B,
            stroke_width=4,
            max_tip_length_to_length_ratio=0.12,
        )
        return VGroup(before, arrow, after).arrange(RIGHT, buff=0.24)

    def constants_warning_visual(self):
        correct = self.matrix_grid(AFTER_MATRIX, highlights={(1, 3), (2, 3)}).scale(0.78)
        wrong = self.matrix_grid(FROZEN_CONSTANTS, warning={(1, 3), (2, 3)}).scale(0.78)
        ok = self.label("OK", font_size=25, color=GREEN_B, weight=BOLD, max_width=0.9).next_to(
            correct, DOWN, buff=0.18
        )
        bad = self.label("not equivalent", font_size=23, color=RED_B, weight=BOLD, max_width=2.6).next_to(
            wrong, DOWN, buff=0.18
        )
        return VGroup(VGroup(correct, ok), VGroup(wrong, bad)).arrange(RIGHT, buff=0.52)

    def invariant_visual(self):
        before = self.matrix_grid(START_MATRIX).scale(0.75)
        after = self.matrix_grid(AFTER_MATRIX).scale(0.75)
        arrow = DoubleArrow(
            before.get_right() + RIGHT * 0.12,
            after.get_left() + LEFT * 0.12,
            buff=0,
            color=GREEN_B,
            stroke_width=4,
            max_tip_length_to_length_ratio=0.1,
        )
        invariant = self.label("solution set", font_size=27, color=GREEN_B, weight=BOLD, max_width=3.0)
        invariant.next_to(arrow, DOWN, buff=0.18)
        return VGroup(before, arrow, after, invariant)

    def state_visual(self, index):
        if index == 0:
            return self.equations_to_matrix_visual()
        if index == 1:
            matrix = self.matrix_grid(START_MATRIX, highlights={(0, 3), (1, 3), (2, 3)}).scale(1.08)
            coeff = self.label("A", font_size=27, color=GRAY_B, weight=BOLD, max_width=0.8)
            const = self.label("b", font_size=27, color=BLUE_B, weight=BOLD, max_width=0.8)
            coeff.next_to(matrix, DOWN, buff=0.18).shift(LEFT * 0.5)
            const.next_to(matrix, DOWN, buff=0.18).shift(RIGHT * 1.14)
            return VGroup(matrix, coeff, const)
        if index == 2:
            return self.operation_cards()
        if index == 3:
            return self.row_replacement_visual()
        if index == 4:
            return self.constants_warning_visual()
        return self.invariant_visual()

    def construct(self):
        copy = TEXT[self.locale]
        title = self.label(copy["title"], font_size=37, weight=BOLD, max_width=7.2)
        subtitle = self.label(copy["subtitle"], font_size=23, color=GRAY_B, max_width=7.4)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.16).to_edge(UP)

        self.play(FadeIn(header, shift=DOWN * 0.2))

        current = None
        for index, (caption, focus, operation) in enumerate(copy["states"]):
            caption_mob = self.label(caption, font_size=28, weight=MEDIUM, max_width=7.0)
            visual = self.state_visual(index).scale(1.02)
            focus_mob = self.label(focus, font_size=21, color=GRAY_B, max_width=7.2)
            operation_mob = self.label(operation, font_size=24, color=BLUE_B, max_width=7.2)
            group = VGroup(caption_mob, visual, focus_mob, operation_mob).arrange(
                DOWN,
                buff=0.32,
            )
            group.next_to(header, DOWN, buff=0.38)

            if current is None:
                self.play(FadeIn(group, shift=UP * 0.15))
            else:
                self.play(FadeOut(current, shift=UP * 0.1), FadeIn(group, shift=UP * 0.1))

            current = group
            self.wait(1.08 if index < len(copy["states"]) - 1 else 1.5)

        conclusion = self.label(
            copy["conclusion"],
            font_size=25,
            color=GREEN_B,
            max_width=7.4,
        ).to_edge(DOWN)
        self.play(FadeIn(conclusion, shift=UP * 0.2))
        self.wait(1.25)


class AugmentedMatrixRowOperationSafetyEn(AugmentedMatrixRowOperationSafetyBase):
    locale = "en"


class AugmentedMatrixRowOperationSafetyZhHk(AugmentedMatrixRowOperationSafetyBase):
    locale = "zh-hk"
    font = "PingFang HK"


class AugmentedMatrixRowOperationSafetyZhCn(AugmentedMatrixRowOperationSafetyBase):
    locale = "zh-cn"
    font = "PingFang SC"


class AugmentedMatrixRowOperationSafety(AugmentedMatrixRowOperationSafetyEn):
    """Backwards-compatible alias for one-off English render commands."""
