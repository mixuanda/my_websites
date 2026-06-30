from manim import *


TEXT = {
    "en": {
        "title": "Transpose: reflection and symmetry",
        "subtitle": "Rows become columns | diagonal reflection | symmetric and skew parts.",
        "states": [
            (
                "Transpose swaps orientation",
                "The entry in row i, column j of A appears in row j, column i of A^T.",
                "(A^T)_{ji} = a_ij",
            ),
            (
                "For square matrices, use the main diagonal",
                "Entries on the main diagonal stay fixed; off-diagonal entries trade places.",
                "reflect across the diagonal",
            ),
            (
                "Symmetric and skew-symmetric are pair rules",
                "Symmetric means matching pairs agree. Skew-symmetric means matching pairs change sign.",
                "A^T = A   |   K^T = -K",
            ),
            (
                "Skew-symmetric diagonals must be zero",
                "A diagonal entry of K must equal its own negative, so it can only be zero.",
                "k_ii = -k_ii -> k_ii = 0",
            ),
            (
                "Transpose reverses matrix products",
                "The row-column order turns around when a product is transposed.",
                "(AB)^T = B^T A^T",
            ),
            (
                "Every square matrix splits into two parts",
                "A + A^T is symmetric, A - A^T is skew-symmetric, and their halves add back to A.",
                "A = 1/2(A + A^T) + 1/2(A - A^T)",
            ),
        ],
        "visual": {
            "row_col": "rows -> columns",
            "diagonal": "main diagonal",
            "symmetric": "symmetric",
            "skew": "skew-symmetric",
            "zero_diagonal": "zero diagonal",
            "order": "order reverses",
            "split": "symmetric part + skew part",
            "lab": "try the transpose lab below",
        },
        "conclusion": [
            ("transpose", "swap i and j"),
            ("symmetry", "compare pairs"),
            ("split", "A = S + K"),
        ],
    },
    "zh-hk": {
        "title": "轉置：反射與對稱",
        "subtitle": "行變成列 | 對角線反射 | 對稱與反對稱部分。",
        "states": [
            (
                "轉置會改變閱讀方向",
                "A 中第 i 行第 j 列的元素，會出現在 A^T 的第 j 行第 i 列。",
                "(A^T)_{ji} = a_ij",
            ),
            (
                "方陣可用主對角線理解",
                "主對角線上的元素不動，對角線外的元素會交換位置。",
                "沿主對角線反射",
            ),
            (
                "對稱與反對稱都是成對規則",
                "對稱表示成對元素相等；反對稱表示成對元素互為相反數。",
                "A^T = A   |   K^T = -K",
            ),
            (
                "反對稱矩陣的對角線必為零",
                "K 的對角元素必須等於自己的相反數，所以只能是零。",
                "k_ii = -k_ii -> k_ii = 0",
            ),
            (
                "轉置會反轉矩陣乘積次序",
                "乘積被轉置時，行乘列的次序會整個反過來。",
                "(AB)^T = B^T A^T",
            ),
            (
                "每個方陣都可拆成兩部分",
                "A + A^T 是對稱矩陣，A - A^T 是反對稱矩陣；各取一半就會加回 A。",
                "A = 1/2(A + A^T) + 1/2(A - A^T)",
            ),
        ],
        "visual": {
            "row_col": "行 -> 列",
            "diagonal": "主對角線",
            "symmetric": "對稱",
            "skew": "反對稱",
            "zero_diagonal": "零對角線",
            "order": "次序反轉",
            "split": "對稱部分 + 反對稱部分",
            "lab": "試下面的轉置工具",
        },
        "conclusion": [
            ("轉置", "交換 i 與 j"),
            ("對稱", "比較成對元素"),
            ("分解", "A = S + K"),
        ],
    },
    "zh-cn": {
        "title": "转置：反射与对称",
        "subtitle": "行变成列 | 对角线反射 | 对称与反对称部分。",
        "states": [
            (
                "转置会改变阅读方向",
                "A 中第 i 行第 j 列的元素，会出现在 A^T 的第 j 行第 i 列。",
                "(A^T)_{ji} = a_ij",
            ),
            (
                "方阵可用主对角线理解",
                "主对角线上的元素不动，对角线外的元素会交换位置。",
                "沿主对角线反射",
            ),
            (
                "对称与反对称都是成对规则",
                "对称表示成对元素相等；反对称表示成对元素互为相反数。",
                "A^T = A   |   K^T = -K",
            ),
            (
                "反对称矩阵的对角线必为零",
                "K 的对角元素必须等于自己的相反数，所以只能是零。",
                "k_ii = -k_ii -> k_ii = 0",
            ),
            (
                "转置会反转矩阵乘积次序",
                "乘积被转置时，行乘列的次序会整个反过来。",
                "(AB)^T = B^T A^T",
            ),
            (
                "每个方阵都可拆成两部分",
                "A + A^T 是对称矩阵，A - A^T 是反对称矩阵；各取一半就会加回 A。",
                "A = 1/2(A + A^T) + 1/2(A - A^T)",
            ),
        ],
        "visual": {
            "row_col": "行 -> 列",
            "diagonal": "主对角线",
            "symmetric": "对称",
            "skew": "反对称",
            "zero_diagonal": "零对角线",
            "order": "次序反转",
            "split": "对称部分 + 反对称部分",
            "lab": "试下面的转置工具",
        },
        "conclusion": [
            ("转置", "交换 i 与 j"),
            ("对称", "比较成对元素"),
            ("分解", "A = S + K"),
        ],
    },
}


A_RECT = [[1, 4, -2], [0, 3, 5]]
AT_RECT = [[1, 0], [4, 3], [-2, 5]]
SYM = [[2, -1, 4], [-1, 3, 0], [4, 0, 5]]
SKEW = [[0, 2, -1], [-2, 0, 5], [1, -5, 0]]
A_SPLIT = [[2, 4], [0, 6]]
S_PART = [[2, 2], [2, 6]]
K_PART = [[0, 2], [-2, 0]]


class TransposeSymmetryStoryBase(Scene):
    """MATH1030 3.3: transpose, symmetry, skew-symmetry, and splitting."""

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
        cell_width=0.62,
        cell_height=0.48,
        font_size=20,
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
                    stroke_width=1.2,
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

        left_bracket = Text("[", font=self.font, font_size=70).next_to(cells, LEFT, buff=0.05)
        right_bracket = Text("]", font=self.font, font_size=70).next_to(cells, RIGHT, buff=0.05)
        return VGroup(cells, values, left_bracket, right_bracket)

    def badge(self, title, body, color=GREEN_B, width=3.4, height=0.82):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.28,
        )
        title_mob = self.label(title, font_size=15, color=color, weight=MEDIUM, max_width=width * 0.84)
        body_mob = self.label(body, font_size=20, max_width=width * 0.84)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.06).move_to(box)
        return VGroup(box, content)

    def state_card(self, index):
        title, body, formula = TEXT[self.locale]["states"][index]
        box = RoundedRectangle(
            corner_radius=0.10,
            width=6.4,
            height=1.32,
            stroke_color=TEAL_B,
            fill_color=BLACK,
            fill_opacity=0.34,
        )
        title_mob = self.label(title, font_size=22, color=TEAL_A, weight=MEDIUM, max_width=5.8)
        body_mob = self.label(body, font_size=15, color=GREY_A, max_width=5.8)
        formula_mob = self.label(formula, font_size=17, color=YELLOW_A, max_width=5.8)
        content = VGroup(title_mob, body_mob, formula_mob).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content)

    def with_caption(self, matrix, caption, color=TEAL_A):
        caption_mob = self.label(caption, font_size=18, color=color, weight=MEDIUM, max_width=2.8)
        return VGroup(caption_mob, matrix).arrange(DOWN, buff=0.12)

    def transpose_panel(self):
        visual = TEXT[self.locale]["visual"]
        left = self.with_caption(
            self.matrix_grid(A_RECT, highlights={(0, 2), (1, 0)}, color=BLUE_B),
            "A  (2 x 3)",
            BLUE_A,
        )
        right = self.with_caption(
            self.matrix_grid(AT_RECT, highlights={(2, 0), (0, 1)}, color=PURPLE_B),
            "A^T  (3 x 2)",
            PURPLE_A,
        )
        arrow = Arrow(LEFT, RIGHT, color=YELLOW_B, buff=0.12).scale(0.82)
        tag = self.badge(visual["row_col"], "(i,j) -> (j,i)", color=YELLOW_B, width=3.0)
        row = VGroup(left, arrow, right).arrange(RIGHT, buff=0.42)
        return VGroup(row, tag).arrange(DOWN, buff=0.32)

    def reflection_panel(self):
        visual = TEXT[self.locale]["visual"]
        matrix = self.matrix_grid(
            SYM,
            highlights={(0, 1), (1, 0), (0, 2), (2, 0)},
            color=BLUE_B,
            cell_width=0.58,
            cell_height=0.46,
            font_size=18,
        )
        diagonal = Line(
            matrix[0][0].get_corner(UL) + 0.08 * DOWN + 0.08 * RIGHT,
            matrix[0][8].get_corner(DR) + 0.08 * UP + 0.08 * LEFT,
            color=YELLOW_B,
            stroke_width=5,
        )
        caption = self.badge(visual["diagonal"], "a_ij <-> a_ji", color=YELLOW_B, width=3.5)
        return VGroup(VGroup(matrix, diagonal), caption).arrange(DOWN, buff=0.34)

    def pair_rules_panel(self):
        visual = TEXT[self.locale]["visual"]
        sym = self.with_caption(
            self.matrix_grid(SYM, highlights={(0, 1), (1, 0)}, color=GREEN_B, cell_width=0.52, cell_height=0.42, font_size=16),
            "A^T = A",
            GREEN_A,
        )
        skew = self.with_caption(
            self.matrix_grid(SKEW, highlights={(0, 1), (1, 0)}, color=RED_B, cell_width=0.52, cell_height=0.42, font_size=16),
            "K^T = -K",
            RED_A,
        )
        badges = VGroup(
            self.badge(visual["symmetric"], "a_ij = a_ji", color=GREEN_B, width=2.8),
            self.badge(visual["skew"], "k_ij = -k_ji", color=RED_B, width=2.8),
        ).arrange(RIGHT, buff=0.35)
        row = VGroup(sym, skew).arrange(RIGHT, buff=0.68)
        return VGroup(row, badges).arrange(DOWN, buff=0.28)

    def zero_diagonal_panel(self):
        visual = TEXT[self.locale]["visual"]
        matrix = self.matrix_grid(
            SKEW,
            highlights={(0, 0), (1, 1), (2, 2)},
            color=RED_B,
            cell_width=0.58,
            cell_height=0.46,
            font_size=18,
        )
        badge = self.badge(visual["zero_diagonal"], "k_ii = -k_ii", color=RED_B, width=3.4)
        equation = self.label("2k_ii = 0  ->  k_ii = 0", font_size=26, color=YELLOW_A, max_width=5.0)
        return VGroup(matrix, VGroup(badge, equation).arrange(DOWN, buff=0.16)).arrange(RIGHT, buff=0.7)

    def order_panel(self):
        visual = TEXT[self.locale]["visual"]
        left = self.badge("AB", "then transpose", color=BLUE_B, width=2.4)
        middle = self.label("(AB)^T", font_size=32, color=YELLOW_A, weight=MEDIUM, max_width=2.2)
        right = self.badge("B^T A^T", visual["order"], color=PURPLE_B, width=2.7)
        arrow1 = Arrow(LEFT, RIGHT, color=GREY_B, buff=0.12).scale(0.6)
        arrow2 = Arrow(LEFT, RIGHT, color=GREY_B, buff=0.12).scale(0.6)
        return VGroup(left, arrow1, middle, arrow2, right).arrange(RIGHT, buff=0.22)

    def split_panel(self):
        visual = TEXT[self.locale]["visual"]
        a = self.with_caption(
            self.matrix_grid(A_SPLIT, color=BLUE_B, cell_width=0.58, cell_height=0.46, font_size=18),
            "A",
            BLUE_A,
        )
        s = self.with_caption(
            self.matrix_grid(S_PART, color=GREEN_B, cell_width=0.58, cell_height=0.46, font_size=18),
            "1/2(A + A^T)",
            GREEN_A,
        )
        k = self.with_caption(
            self.matrix_grid(K_PART, color=RED_B, cell_width=0.58, cell_height=0.46, font_size=18),
            "1/2(A - A^T)",
            RED_A,
        )
        equals = self.label("=", font_size=28, color=YELLOW_A)
        plus = self.label("+", font_size=28, color=YELLOW_A)
        row = VGroup(a, equals, s, plus, k).arrange(RIGHT, buff=0.22)
        badge = self.badge(visual["split"], visual["lab"], color=TEAL_B, width=4.6)
        return VGroup(row, badge).arrange(DOWN, buff=0.26)

    def conclusion_panel(self):
        pairs = TEXT[self.locale]["conclusion"]
        cards = VGroup(
            *[self.badge(title, body, color=color, width=2.5) for (title, body), color in zip(pairs, [BLUE_B, GREEN_B, PURPLE_B])]
        ).arrange(RIGHT, buff=0.28)
        return cards

    def construct(self):
        self.camera.background_color = "#111827"
        data = TEXT[self.locale]

        title = self.label(data["title"], font_size=34, color=WHITE, weight=BOLD, max_width=10.4)
        subtitle = self.label(data["subtitle"], font_size=18, color=GREY_B, max_width=10.4)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.08).to_edge(UP, buff=0.34)
        rule = Line(LEFT, RIGHT, color=TEAL_E, stroke_width=1.2).scale(5.6).next_to(header, DOWN, buff=0.18)
        self.play(FadeIn(header), Create(rule), run_time=0.7)

        panels = [
            self.transpose_panel(),
            self.reflection_panel(),
            self.pair_rules_panel(),
            self.zero_diagonal_panel(),
            self.order_panel(),
            self.split_panel(),
        ]

        card = self.state_card(0).to_edge(DOWN, buff=0.34)
        visual = panels[0].move_to(ORIGIN + 0.18 * UP)
        self.play(FadeIn(visual, shift=0.25 * UP), FadeIn(card, shift=0.15 * UP), run_time=0.8)
        self.wait(0.3)

        for index in range(1, len(panels)):
            next_visual = panels[index].move_to(ORIGIN + 0.18 * UP)
            next_card = self.state_card(index).to_edge(DOWN, buff=0.34)
            self.play(
                FadeOut(visual, shift=0.2 * LEFT),
                FadeOut(card, shift=0.12 * DOWN),
                FadeIn(next_visual, shift=0.2 * RIGHT),
                FadeIn(next_card, shift=0.12 * UP),
                run_time=0.75,
            )
            visual = next_visual
            card = next_card
            self.wait(0.25)

        conclusion = self.conclusion_panel().move_to(ORIGIN + 0.12 * UP)
        self.play(
            FadeOut(visual, shift=0.2 * DOWN),
            FadeOut(card, shift=0.12 * DOWN),
            FadeIn(conclusion, shift=0.18 * UP),
            run_time=0.75,
        )
        self.wait(0.6)


class TransposeSymmetryStoryEn(TransposeSymmetryStoryBase):
    locale = "en"
    font = "Avenir Next"


class TransposeSymmetryStoryZhHk(TransposeSymmetryStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class TransposeSymmetryStoryZhCn(TransposeSymmetryStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class TransposeSymmetryStory(TransposeSymmetryStoryEn):
    pass
