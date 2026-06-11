from manim import *


TEXT = {
    "en": {
        "title": "Pivot staircase to RREF",
        "subtitle": "Clear below pivots first. Then clear above them.",
        "states": [
            (
                "Start with the augmented matrix",
                "Use row 1 to clear entries below the first pivot.",
                "R2 <- R2 - R1    R3 <- R3 - 2R1",
            ),
            (
                "The first pivot column is clean",
                "Move to the next pivot and clear below it.",
                "R3 <- R3 - 2R2",
            ),
            (
                "REF: pivots form a staircase",
                "The matrix is readable by back-substitution.",
                "R3 <- -R3",
            ),
            (
                "Normalize the last pivot",
                "RREF needs each pivot column clean above and below.",
                "R1 <- R1 - 2R3    R2 <- R2 - R3",
            ),
            (
                "Clear above the last pivot",
                "One pivot column remains to be cleaned.",
                "R1 <- R1 - 2R2",
            ),
            (
                "RREF reads the solution directly",
                "The left block is the identity matrix.",
                "x = 2,    y = -3,    z = 4",
            ),
        ],
        "conclusion": "RREF is a reading form, not just an arithmetic endpoint.",
    },
    "zh-hk": {
        "title": "由主元階梯到 RREF",
        "subtitle": "先清主元下方，再清主元上方。",
        "states": [
            (
                "由增廣矩陣開始",
                "用第 1 行清掉第一個主元下方的元素。",
                "R2 <- R2 - R1    R3 <- R3 - 2R1",
            ),
            (
                "第一個主元列已清乾淨",
                "移到下一個主元，再清它下方的元素。",
                "R3 <- R3 - 2R2",
            ),
            (
                "REF：主元形成階梯",
                "這個矩陣已可用回代閱讀。",
                "R3 <- -R3",
            ),
            (
                "標準化最後主元",
                "RREF 要求每個主元列上下都清乾淨。",
                "R1 <- R1 - 2R3    R2 <- R2 - R3",
            ),
            (
                "清最後主元上方",
                "還有一個主元列需要清理。",
                "R1 <- R1 - 2R2",
            ),
            (
                "RREF 可直接讀出解",
                "左邊區塊已經是單位矩陣。",
                "x = 2,    y = -3,    z = 4",
            ),
        ],
        "conclusion": "RREF 是閱讀形式，不只是計算終點。",
    },
    "zh-cn": {
        "title": "由主元阶梯到 RREF",
        "subtitle": "先清主元下方，再清主元上方。",
        "states": [
            (
                "由增广矩阵开始",
                "用第 1 行清掉第一个主元下方的元素。",
                "R2 <- R2 - R1    R3 <- R3 - 2R1",
            ),
            (
                "第一个主元列已清干净",
                "移到下一个主元，再清它下方的元素。",
                "R3 <- R3 - 2R2",
            ),
            (
                "REF：主元形成阶梯",
                "这个矩阵已可用回代阅读。",
                "R3 <- -R3",
            ),
            (
                "标准化最后主元",
                "RREF 要求每个主元列上下都清干净。",
                "R1 <- R1 - 2R3    R2 <- R2 - R3",
            ),
            (
                "清最后主元上方",
                "还有一个主元列需要清理。",
                "R1 <- R1 - 2R2",
            ),
            (
                "RREF 可直接读出解",
                "左边区块已经是单位矩阵。",
                "x = 2,    y = -3,    z = 4",
            ),
        ],
        "conclusion": "RREF 是阅读形式，不只是计算终点。",
    },
}


MATRIX_STATES = [
    ([[1, 2, 2, 4], [1, 3, 3, 5], [2, 6, 5, 6]], [(0, 0)]),
    ([[1, 2, 2, 4], [0, 1, 1, 1], [0, 2, 1, -2]], [(0, 0), (1, 1)]),
    ([[1, 2, 2, 4], [0, 1, 1, 1], [0, 0, -1, -4]], [(0, 0), (1, 1), (2, 2)]),
    ([[1, 2, 2, 4], [0, 1, 1, 1], [0, 0, 1, 4]], [(0, 0), (1, 1), (2, 2)]),
    ([[1, 2, 0, -4], [0, 1, 0, -3], [0, 0, 1, 4]], [(0, 0), (1, 1), (2, 2)]),
    ([[1, 0, 0, 2], [0, 1, 0, -3], [0, 0, 1, 4]], [(0, 0), (1, 1), (2, 2)]),
]


class GaussianEliminationRrefPivotStoryBase(Scene):
    """MATH1030 2.3 pilot: pivot staircase to RREF.

    The scene avoids LaTeX-only mobjects so all three locale variants can render
    on machines without dvisvgm. The website note still carries full KaTeX.
    """

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        kwargs = {
            "font_size": font_size,
            "color": color,
            "weight": weight,
        }
        if self.font:
            kwargs["font"] = self.font
        text = Text(value, **kwargs)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def matrix_grid(self, rows, pivot_positions=()):
        cell_width = 0.76
        cell_height = 0.52
        cells = VGroup()
        values = VGroup()
        markers = VGroup()

        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - 1.5) * cell_width
                y = (1 - row_index) * cell_height
                is_pivot = (row_index, col_index) in pivot_positions

                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.2,
                    stroke_color=BLUE_E if col_index == 3 else GREY_B,
                    fill_color=YELLOW_E if is_pivot else BLACK,
                    fill_opacity=0.38 if is_pivot else 0.18,
                ).move_to([x, y, 0])
                number = self.label(str(value), font_size=28, max_width=cell_width * 0.72).move_to(cell)
                cells.add(cell)
                values.add(number)

                if is_pivot:
                    markers.add(
                        Dot(color=YELLOW, radius=0.07).move_to(
                            cell.get_corner(UL) + RIGHT * 0.1 + DOWN * 0.1
                        )
                    )

        divider = Line(
            [1.5 * cell_width, -0.98, 0],
            [1.5 * cell_width, 0.98, 0],
            color=BLUE_B,
            stroke_width=4,
        )
        left_bracket = Text("[", font=self.font, font_size=90).next_to(cells, LEFT, buff=0.08)
        right_bracket = Text("]", font=self.font, font_size=90).next_to(cells, RIGHT, buff=0.08)

        return VGroup(cells, values, divider, left_bracket, right_bracket, markers)

    def construct(self):
        copy = TEXT[self.locale]
        title = self.label(copy["title"], font_size=38, weight=BOLD, max_width=7.2)
        subtitle = self.label(copy["subtitle"], font_size=24, color=GRAY_B, max_width=7.4)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.16).to_edge(UP)

        self.play(FadeIn(header, shift=DOWN * 0.2))

        current = None
        for index, ((rows, pivots), (caption, focus, operation)) in enumerate(
            zip(MATRIX_STATES, copy["states"])
        ):
            caption_mob = self.label(caption, font_size=29, weight=MEDIUM, max_width=7.0)
            matrix = self.matrix_grid(rows, pivots).scale(1.05)
            focus_mob = self.label(focus, font_size=23, color=GRAY_B, max_width=7.2)
            operation_mob = self.label(operation, font_size=25, color=BLUE_B, max_width=7.2)

            group = VGroup(caption_mob, matrix, focus_mob, operation_mob).arrange(
                DOWN,
                buff=0.34,
            )
            group.next_to(header, DOWN, buff=0.42)

            if current is None:
                self.play(FadeIn(group, shift=UP * 0.15))
            else:
                self.play(FadeOut(current, shift=UP * 0.1), FadeIn(group, shift=UP * 0.1))

            current = group
            self.wait(1.1 if index < len(MATRIX_STATES) - 1 else 1.6)

        conclusion = self.label(
            copy["conclusion"],
            font_size=26,
            color=GREEN_B,
            max_width=7.4,
        ).to_edge(DOWN)
        self.play(FadeIn(conclusion, shift=UP * 0.2))
        self.wait(1.4)


class GaussianEliminationRrefPivotStoryEn(GaussianEliminationRrefPivotStoryBase):
    locale = "en"


class GaussianEliminationRrefPivotStoryZhHk(GaussianEliminationRrefPivotStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class GaussianEliminationRrefPivotStoryZhCn(GaussianEliminationRrefPivotStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class GaussianEliminationRrefPivotStory(GaussianEliminationRrefPivotStoryEn):
    """Backwards-compatible alias for old render commands."""
