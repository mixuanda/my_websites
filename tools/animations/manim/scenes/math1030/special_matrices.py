from manim import *


TEXT = {
    "en": {
        "title": "Special matrix families",
        "subtitle": "Zero pattern | identity action | elementary row moves.",
        "states": [
            (
                "Shape is information",
                "A zero pattern predicts algebra\nbefore computation.",
                "recognize the family first",
            ),
            (
                "Diagonal matrices keep only diagonal entries",
                "All off-diagonal entries are zero.\nDiagonal products stay diagonal.",
                "diag(a) diag(b) = diag(ab)",
            ),
            (
                "Triangular matrices preserve one zero side",
                "Upper triangular matrices have zeros below the diagonal.\nUpper-triangular products stay upper triangular.",
                "upper * upper = upper",
            ),
            (
                "Identity is the multiplicative do-nothing matrix",
                "The identity matrix is diagonal with ones.\nCompatible multiplication preserves A.",
                "A I_n = A,  I_m A = A",
            ),
            (
                "Elementary matrices package one row operation",
                "Start from I and apply one row operation.\nThe result is an elementary matrix.",
                "E = one row move applied to I",
            ),
            (
                "Left and right multiplication have different effects",
                "EA performs the row operation on A.\nAE performs the corresponding column operation.",
                "left: rows, right: columns",
            ),
        ],
        "visual": {
            "diagonal": "diagonal",
            "triangular": "triangular",
            "identity": "identity",
            "zero": "zero matrix",
            "elementary": "elementary",
            "off_diagonal_zero": "off-diagonal entries are 0",
            "below_zero": "zeros below the diagonal",
            "product": "closed",
            "do_nothing": "does not change A",
            "swap": "swap rows",
            "scale": "scale one row",
            "add": "add a row multiple",
            "row_effect": "EA changes rows",
            "column_effect": "AE changes columns",
            "practice": "use the checker, then the row stepper",
        },
        "conclusion": [
            ("diagonal", "only diagonal may be nonzero"),
            ("triangular", "one zero side is preserved"),
            ("elementary", "one row operation as multiplication"),
        ],
    },
    "zh-hk": {
        "title": "特殊矩陣家族",
        "subtitle": "零元素圖案 | 單位作用 | 初等行變換。",
        "states": [
            (
                "形狀本身就是訊息",
                "零元素圖案能在計算前\n先預告代數行為。",
                "先認出矩陣家族",
            ),
            (
                "對角矩陣只保留主對角線",
                "所有非對角元素都是零。\n對角乘積仍是對角矩陣。",
                "diag(a) diag(b) = diag(ab)",
            ),
            (
                "三角矩陣保留其中一側的零元素",
                "上三角在對角線下方全為零。\n上三角乘積仍是上三角。",
                "上三角 * 上三角 = 上三角",
            ),
            (
                "單位矩陣是乘法中的不改變矩陣",
                "單位矩陣是在對角線上全為一。\n相容乘法會保持 A 不變。",
                "A I_n = A,  I_m A = A",
            ),
            (
                "初等矩陣包裝一次行變換",
                "由 I 出發，做一次初等行變換。\n得到的矩陣就是初等矩陣。",
                "E = 對 I 做一次行變換",
            ),
            (
                "左乘與右乘效果不同",
                "EA 會把行變換作用到 A。\nAE 則會作用到相應的列。",
                "左乘：行；右乘：列",
            ),
        ],
        "visual": {
            "diagonal": "對角",
            "triangular": "三角",
            "identity": "單位",
            "zero": "零矩陣",
            "elementary": "初等",
            "off_diagonal_zero": "非對角元素全為 0",
            "below_zero": "對角線下方全為 0",
            "product": "乘積同族",
            "do_nothing": "不改變 A",
            "swap": "交換兩行",
            "scale": "縮放一行",
            "add": "加上某行倍數",
            "row_effect": "EA 改變行",
            "column_effect": "AE 改變列",
            "practice": "先用分類工具，再看行化簡步驟",
        },
        "conclusion": [
            ("對角", "只有主對角線可非零"),
            ("三角", "一側零元素被保留"),
            ("初等", "一次行變換寫成乘法"),
        ],
    },
    "zh-cn": {
        "title": "特殊矩阵家族",
        "subtitle": "零元素图案 | 单位作用 | 初等行变换。",
        "states": [
            (
                "形状本身就是信息",
                "零元素图案能在计算前\n先预告代数行为。",
                "先认出矩阵家族",
            ),
            (
                "对角矩阵只保留主对角线",
                "所有非对角元素都是零。\n对角乘积仍是对角矩阵。",
                "diag(a) diag(b) = diag(ab)",
            ),
            (
                "三角矩阵保留其中一侧的零元素",
                "上三角在对角线下方全为零。\n上三角乘积仍是上三角。",
                "上三角 * 上三角 = 上三角",
            ),
            (
                "单位矩阵是乘法中的不改变矩阵",
                "单位矩阵是在对角线上全为一。\n相容乘法会保持 A 不变。",
                "A I_n = A,  I_m A = A",
            ),
            (
                "初等矩阵包装一次行变换",
                "由 I 出发，做一次初等行变换。\n得到的矩阵就是初等矩阵。",
                "E = 对 I 做一次行变换",
            ),
            (
                "左乘与右乘效果不同",
                "EA 会把行变换作用到 A。\nAE 则会作用到相应的列。",
                "左乘：行；右乘：列",
            ),
        ],
        "visual": {
            "diagonal": "对角",
            "triangular": "三角",
            "identity": "单位",
            "zero": "零矩阵",
            "elementary": "初等",
            "off_diagonal_zero": "非对角元素全为 0",
            "below_zero": "对角线下方全为 0",
            "product": "乘积同族",
            "do_nothing": "不改变 A",
            "swap": "交换两行",
            "scale": "缩放一行",
            "add": "加上某行倍数",
            "row_effect": "EA 改变行",
            "column_effect": "AE 改变列",
            "practice": "先用分类工具，再看行化简步骤",
        },
        "conclusion": [
            ("对角", "只有主对角线可非零"),
            ("三角", "一侧零元素被保留"),
            ("初等", "一次行变换写成乘法"),
        ],
    },
}


D1 = [[2, 0, 0], [0, -1, 0], [0, 0, 4]]
D2 = [[3, 0, 0], [0, 5, 0], [0, 0, -2]]
D_PRODUCT = [[6, 0, 0], [0, -5, 0], [0, 0, -8]]
U1 = [[1, 2, -1], [0, 3, 4], [0, 0, 5]]
U_PRODUCT = [[2, "*", "*"], [0, 6, "*"], [0, 0, 15]]
IDENTITY = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
E_SWAP = [[0, 1, 0], [1, 0, 0], [0, 0, 1]]
E_SCALE = [[1, 0, 0], [0, 4, 0], [0, 0, 1]]
E_ADD = [[1, 0, 2], [0, 1, 0], [0, 0, 1]]
A2 = [[2, -1], [3, 4]]


class SpecialMatricesFamilyRecognitionStoryBase(Scene):
    """MATH1030 3.4: special matrix families and elementary matrices."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        label = Text(
            value,
            font=self.font,
            font_size=font_size,
            color=color,
            weight=weight,
            disable_ligatures=True,
        )
        if label.width > max_width:
            label.scale_to_fit_width(max_width)
        return label

    def matrix_grid(
        self,
        rows,
        highlights=(),
        muted=(),
        color=BLUE_B,
        cell_width=0.58,
        cell_height=0.45,
        font_size=18,
    ):
        row_count = len(rows)
        col_count = len(rows[0])
        cells = VGroup()
        values = VGroup()
        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - (col_count - 1) / 2) * cell_width
                y = ((row_count - 1) / 2 - row_index) * cell_height
                position = (row_index, col_index)
                is_highlight = position in highlights
                is_muted = position in muted
                stroke_color = YELLOW_B if is_highlight else color
                fill_color = YELLOW_E if is_highlight else BLACK
                opacity = 0.44 if is_highlight else 0.12
                if is_muted:
                    stroke_color = GREY_B
                    fill_color = GREY_E
                    opacity = 0.18
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.1,
                    stroke_color=stroke_color,
                    fill_color=fill_color,
                    fill_opacity=opacity,
                ).move_to([x, y, 0])
                value_color = GREY_A if is_muted else WHITE
                value_mob = self.label(
                    str(value),
                    font_size=font_size,
                    color=value_color,
                    max_width=cell_width * 0.78,
                ).move_to(cell)
                cells.add(cell)
                values.add(value_mob)

        left_bracket = Text("[", font=self.font, font_size=66).next_to(cells, LEFT, buff=0.04)
        right_bracket = Text("]", font=self.font, font_size=66).next_to(cells, RIGHT, buff=0.04)
        return VGroup(cells, values, left_bracket, right_bracket)

    def badge(self, title, body, color=TEAL_B, width=3.0, height=0.74):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.28,
        )
        title_mob = self.label(title, font_size=15, color=color, weight=MEDIUM, max_width=width * 0.86)
        body_mob = self.label(body, font_size=18, color=WHITE, max_width=width * 0.86)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.05).move_to(box)
        return VGroup(box, content)

    def state_card(self, index):
        title, body, formula = TEXT[self.locale]["states"][index]
        box = RoundedRectangle(
            corner_radius=0.10,
            width=6.5,
            height=1.42,
            stroke_color=TEAL_B,
            fill_color=BLACK,
            fill_opacity=0.34,
        )
        title_mob = self.label(title, font_size=21, color=TEAL_A, weight=MEDIUM, max_width=5.9)
        body_mob = self.label(body, font_size=14, color=GREY_A, max_width=5.9)
        formula_mob = self.label(formula, font_size=16, color=YELLOW_A, max_width=5.9)
        content = VGroup(title_mob, body_mob, formula_mob).arrange(DOWN, buff=0.06).move_to(box)
        return VGroup(box, content)

    def with_caption(self, matrix, caption, color=TEAL_A):
        caption_mob = self.label(caption, font_size=18, color=color, weight=MEDIUM, max_width=2.7)
        return VGroup(caption_mob, matrix).arrange(DOWN, buff=0.11)

    def family_map_panel(self):
        visual = TEXT[self.locale]["visual"]
        items = [
            (visual["diagonal"], visual["off_diagonal_zero"], BLUE_B),
            (visual["triangular"], visual["below_zero"], GREEN_B),
            (visual["identity"], "I_n", YELLOW_B),
            (visual["zero"], "O", PURPLE_B),
            (visual["elementary"], "E", RED_B),
        ]
        cards = VGroup(
            *[
                self.badge(title, body, color=color, width=2.35, height=0.82)
                for title, body, color in items
            ]
        ).arrange_in_grid(rows=2, cols=3, buff=(0.30, 0.24))
        return cards.move_to(ORIGIN + 0.1 * UP)

    def diagonal_panel(self):
        visual = TEXT[self.locale]["visual"]
        muted = {
            (0, 1),
            (0, 2),
            (1, 0),
            (1, 2),
            (2, 0),
            (2, 1),
        }
        left = self.with_caption(
            self.matrix_grid(D1, muted=muted, color=BLUE_B),
            "D",
            BLUE_A,
        )
        right = self.with_caption(
            self.matrix_grid(D_PRODUCT, muted=muted, color=GREEN_B),
            "D1 D2",
            GREEN_A,
        )
        arrow = Arrow(LEFT, RIGHT, color=YELLOW_B, buff=0.15).scale(0.68)
        tag = self.badge(visual["product"], "diagonal", color=YELLOW_B, width=3.0)
        row = VGroup(left, arrow, right).arrange(RIGHT, buff=0.38)
        return VGroup(row, tag).arrange(DOWN, buff=0.24).move_to(ORIGIN + 0.1 * UP)

    def triangular_panel(self):
        visual = TEXT[self.locale]["visual"]
        below = {(1, 0), (2, 0), (2, 1)}
        upper = self.with_caption(
            self.matrix_grid(U1, muted=below, color=GREEN_B),
            "U",
            GREEN_A,
        )
        product = self.with_caption(
            self.matrix_grid(U_PRODUCT, muted=below, color=PURPLE_B),
            "UV",
            PURPLE_A,
        )
        arrow = Arrow(LEFT, RIGHT, color=YELLOW_B, buff=0.14).scale(0.68)
        tag = self.badge(visual["below_zero"], visual["product"], color=YELLOW_B, width=3.25)
        row = VGroup(upper, arrow, product).arrange(RIGHT, buff=0.38)
        return VGroup(row, tag).arrange(DOWN, buff=0.24).move_to(ORIGIN + 0.1 * UP)

    def identity_panel(self):
        visual = TEXT[self.locale]["visual"]
        a = self.with_caption(
            self.matrix_grid(A2, color=BLUE_B, cell_width=0.62, cell_height=0.50, font_size=20),
            "A",
            BLUE_A,
        )
        i = self.with_caption(
            self.matrix_grid([[1, 0], [0, 1]], muted={(0, 1), (1, 0)}, color=YELLOW_B, cell_width=0.62, cell_height=0.50, font_size=20),
            "I_2",
            YELLOW_A,
        )
        result = self.with_caption(
            self.matrix_grid(A2, color=GREEN_B, cell_width=0.62, cell_height=0.50, font_size=20),
            "A I_2",
            GREEN_A,
        )
        times = self.label("*", font_size=28, color=YELLOW_A)
        equals = self.label("=", font_size=28, color=YELLOW_A)
        tag = self.badge(visual["do_nothing"], "A I_n = A", color=YELLOW_B, width=2.9)
        row = VGroup(a, times, i, equals, result).arrange(RIGHT, buff=0.22)
        return VGroup(row, tag).arrange(DOWN, buff=0.26).move_to(ORIGIN + 0.1 * UP)

    def elementary_panel(self):
        visual = TEXT[self.locale]["visual"]
        base = self.with_caption(
            self.matrix_grid(IDENTITY, muted={(0, 1), (0, 2), (1, 0), (1, 2), (2, 0), (2, 1)}, color=YELLOW_B, cell_width=0.48, cell_height=0.38, font_size=15),
            "I_3",
            YELLOW_A,
        )
        swap = self.with_caption(
            self.matrix_grid(E_SWAP, highlights={(0, 1), (1, 0)}, color=BLUE_B, cell_width=0.48, cell_height=0.38, font_size=15),
            visual["swap"],
            BLUE_A,
        )
        scale = self.with_caption(
            self.matrix_grid(E_SCALE, highlights={(1, 1)}, color=GREEN_B, cell_width=0.48, cell_height=0.38, font_size=15),
            visual["scale"],
            GREEN_A,
        )
        add = self.with_caption(
            self.matrix_grid(E_ADD, highlights={(0, 2)}, color=PURPLE_B, cell_width=0.48, cell_height=0.38, font_size=15),
            visual["add"],
            PURPLE_A,
        )
        arrow = Arrow(LEFT, RIGHT, color=YELLOW_B, buff=0.14).scale(0.6)
        examples = VGroup(swap, scale, add).arrange(RIGHT, buff=0.24)
        row = VGroup(base, arrow, examples).arrange(RIGHT, buff=0.34)
        return row.move_to(ORIGIN + 0.1 * UP)

    def multiplication_side_panel(self):
        visual = TEXT[self.locale]["visual"]
        left = self.badge("EA", visual["row_effect"], color=BLUE_B, width=2.55)
        right = self.badge("AE", visual["column_effect"], color=PURPLE_B, width=2.55)
        middle = self.matrix_grid(E_ADD, highlights={(0, 2)}, color=RED_B, cell_width=0.54, cell_height=0.42, font_size=16)
        row_arrow = Arrow(middle.get_left() + LEFT * 1.0, middle.get_left(), color=BLUE_B, buff=0.08).scale(0.82)
        col_arrow = Arrow(middle.get_right() + RIGHT * 1.0, middle.get_right(), color=PURPLE_B, buff=0.08).scale(0.82)
        top = self.label(visual["practice"], font_size=21, color=TEAL_A, weight=MEDIUM, max_width=6.0)
        body = VGroup(left, row_arrow, middle, col_arrow, right).arrange(RIGHT, buff=0.16)
        return VGroup(top, body).arrange(DOWN, buff=0.34).move_to(ORIGIN + 0.1 * UP)

    def conclusion_panel(self):
        cards = VGroup(
            *[
                self.badge(title, body, color=color, width=2.75, height=0.90)
                for (title, body), color in zip(
                    TEXT[self.locale]["conclusion"],
                    [BLUE_B, GREEN_B, RED_B],
                )
            ]
        ).arrange(RIGHT, buff=0.26)
        return cards.move_to(ORIGIN + 0.1 * UP)

    def construct(self):
        self.camera.background_color = "#111827"
        title = self.label(
            TEXT[self.locale]["title"],
            font_size=34,
            color=TEAL_A,
            weight=MEDIUM,
            max_width=7.5,
        ).to_edge(UP, buff=0.28)
        subtitle = self.label(
            TEXT[self.locale]["subtitle"],
            font_size=17,
            color=GREY_A,
            max_width=7.5,
        ).next_to(title, DOWN, buff=0.10)
        header = VGroup(title, subtitle)

        panels = [
            self.family_map_panel(),
            self.diagonal_panel(),
            self.triangular_panel(),
            self.identity_panel(),
            self.elementary_panel(),
            self.multiplication_side_panel(),
        ]
        cards = [self.state_card(index).to_edge(DOWN, buff=0.32) for index in range(len(panels))]

        self.play(FadeIn(header, shift=0.15 * DOWN), FadeIn(panels[0]), FadeIn(cards[0]), run_time=0.9)
        self.wait(0.45)

        current_panel = panels[0]
        current_card = cards[0]
        for index in range(1, len(panels)):
            self.play(
                FadeOut(current_panel, shift=0.15 * LEFT),
                FadeOut(current_card, shift=0.08 * DOWN),
                run_time=0.35,
            )
            self.play(
                FadeIn(panels[index], shift=0.15 * RIGHT),
                FadeIn(cards[index], shift=0.08 * UP),
                run_time=0.55,
            )
            self.wait(0.42)
            current_panel = panels[index]
            current_card = cards[index]

        conclusion = self.conclusion_panel()
        self.play(FadeOut(current_panel), FadeOut(current_card), FadeIn(conclusion), run_time=0.7)
        self.wait(0.75)


class SpecialMatricesFamilyRecognitionStoryEn(SpecialMatricesFamilyRecognitionStoryBase):
    locale = "en"
    font = "Avenir Next"


class SpecialMatricesFamilyRecognitionStoryZhHk(SpecialMatricesFamilyRecognitionStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class SpecialMatricesFamilyRecognitionStoryZhCn(SpecialMatricesFamilyRecognitionStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class SpecialMatricesFamilyRecognitionStory(SpecialMatricesFamilyRecognitionStoryEn):
    pass
