from manim import *


TEXT = {
    "en": {
        "title": "Determinants: expand, prune, collapse",
        "subtitle": "Cofactor expansion reduces one determinant to smaller ones.",
        "visual": {
            "signs": "checkerboard signs",
            "minor": "minor",
            "cofactor": "cofactor",
            "expand": "expand",
            "branch": "branch",
            "result": "combine",
            "zero": "zero branch",
            "sparse": "sparse row",
            "collapse": "one nonzero entry",
            "triangular": "triangular matrix",
            "key_rule": "key rule",
        },
        "states": [
            (
                "A determinant is recursive",
                "Delete one row and one column to make a minor; attach the checkerboard sign to make a cofactor.",
                "minor -> cofactor -> expansion",
            ),
            (
                "First-row expansion becomes a tree",
                "For the worked 3 by 3 matrix, each first-row entry starts one smaller determinant branch.",
                "det(B)=3M11 - 2M12 + (-1)M13",
            ),
            (
                "Every branch ends at 2 by 2",
                "The smaller determinants are 8, 26, and -1, so the expansion combines to -27.",
                "3(8) - 2(26) + (-1)(-1) = -27",
            ),
            (
                "Zeros prune branches",
                "Expanding along a row or column with zeros removes terms before any smaller determinant is computed.",
                "0A21 + 5A22 + 2A23 + 5A24",
            ),
            (
                "One surviving entry collapses the size",
                "If a row or column has only one nonzero entry, the determinant becomes one signed smaller determinant.",
                "ckl(-1)^(k+l) det(C(k|l))",
            ),
            (
                "Triangular matrices keep collapsing",
                "Repeated one-entry expansion reads the determinant from the diagonal.",
                "det(T)=2 x 5 x (-1) = -10",
            ),
        ],
        "conclusion": "Cofactor expansion is a recursive definition and a computation strategy: choose sparse rows or columns so zero branches disappear before they cost work.",
    },
    "zh-hk": {
        "title": "行列式：展開、剪枝、縮小",
        "subtitle": "餘因子展開把一個行列式化成較小的行列式。",
        "visual": {
            "signs": "棋盤符號",
            "minor": "子式",
            "cofactor": "餘因子",
            "expand": "展開",
            "branch": "分支",
            "result": "合併",
            "zero": "零分支",
            "sparse": "稀疏行",
            "collapse": "唯一非零項",
            "triangular": "三角矩陣",
            "key_rule": "重點規則",
        },
        "states": [
            (
                "行列式是遞迴定義",
                "刪去一行一列得到子式；再配上棋盤符號，就得到餘因子。",
                "子式 -> 餘因子 -> 展開",
            ),
            (
                "第一行展開是一棵樹",
                "對這個 3 乘 3 例子，第一行每個項都開出一個較小的行列式分支。",
                "det(B)=3M11 - 2M12 + (-1)M13",
            ),
            (
                "每個分支最後到 2 乘 2",
                "三個較小行列式是 8、26、-1，所以合併後得到 -27。",
                "3(8) - 2(26) + (-1)(-1) = -27",
            ),
            (
                "零項會剪掉分支",
                "沿有零的行或列展開，能在計算較小行列式之前先刪掉一些項。",
                "0A21 + 5A22 + 2A23 + 5A24",
            ),
            (
                "只剩一個非零項時直接縮小",
                "若某行或列只有一個非零項，整個行列式只剩一個帶符號的較小行列式。",
                "ckl(-1)^(k+l) det(C(k|l))",
            ),
            (
                "三角矩陣會一路縮小",
                "反覆做單一非零項展開，就能直接讀出對角線乘積。",
                "det(T)=2 x 5 x (-1) = -10",
            ),
        ],
        "conclusion": "餘因子展開既是遞迴定義，也是計算策略：選零多的行或列，讓零分支先消失，才不用花力氣計算它們。",
    },
    "zh-cn": {
        "title": "行列式：展开、剪枝、缩小",
        "subtitle": "余因子展开把一个行列式化成较小的行列式。",
        "visual": {
            "signs": "棋盘符号",
            "minor": "子式",
            "cofactor": "余因子",
            "expand": "展开",
            "branch": "分支",
            "result": "合并",
            "zero": "零分支",
            "sparse": "稀疏行",
            "collapse": "唯一非零项",
            "triangular": "三角矩阵",
            "key_rule": "重点规则",
        },
        "states": [
            (
                "行列式是递归定义",
                "删去一行一列得到子式；再配上棋盘符号，就得到余因子。",
                "子式 -> 余因子 -> 展开",
            ),
            (
                "第一行展开是一棵树",
                "对这个 3 乘 3 例子，第一行每个项都开出一个较小的行列式分支。",
                "det(B)=3M11 - 2M12 + (-1)M13",
            ),
            (
                "每个分支最后到 2 乘 2",
                "三个较小行列式是 8、26、-1，所以合并后得到 -27。",
                "3(8) - 2(26) + (-1)(-1) = -27",
            ),
            (
                "零项会剪掉分支",
                "沿有零的行或列展开，能在计算较小行列式之前先删掉一些项。",
                "0A21 + 5A22 + 2A23 + 5A24",
            ),
            (
                "只剩一个非零项时直接缩小",
                "若某行或列只有一个非零项，整个行列式只剩一个带符号的较小行列式。",
                "ckl(-1)^(k+l) det(C(k|l))",
            ),
            (
                "三角矩阵会一路缩小",
                "反复做单一非零项展开，就能直接读出对角线乘积。",
                "det(T)=2 x 5 x (-1) = -10",
            ),
        ],
        "conclusion": "余因子展开既是递归定义，也是计算策略：选零多的行或列，让零分支先消失，才不用花力气计算它们。",
    },
}


class DeterminantsCofactorExpansionStoryBase(Scene):
    """MATH1030 7.1: determinants by minors, cofactors, and sparse expansion."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def formula_card(self, title, body, color=GREEN_B, width=5.9, height=0.9):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.25,
        )
        title_mob = self.label(title, font_size=17, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=21, max_width=width * 0.9)
        return VGroup(box, VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box))

    def matrix_grid(self, rows, color=BLUE_B, highlights=(), faded=()):
        row_count = len(rows)
        col_count = len(rows[0])
        cell_width = 0.56 if col_count >= 4 else 0.62
        cell_height = 0.42 if row_count >= 4 else 0.48
        cells = VGroup()
        values = VGroup()
        highlights = set(highlights)
        faded = set(faded)

        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - (col_count - 1) / 2) * cell_width
                y = ((row_count - 1) / 2 - row_index) * cell_height
                is_highlight = (row_index, col_index) in highlights
                is_faded = (row_index, col_index) in faded
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.1,
                    stroke_color=YELLOW_B if is_highlight else color,
                    fill_color=YELLOW_E if is_highlight else BLACK,
                    fill_opacity=0.42 if is_highlight else 0.16,
                ).move_to([x, y, 0])
                value_mob = self.label(value, font_size=19, max_width=cell_width * 0.72).move_to(cell)
                if is_faded:
                    cell.set_opacity(0.18)
                    value_mob.set_opacity(0.25)
                cells.add(cell)
                values.add(value_mob)

        return VGroup(cells, values)

    def matrix_panel(self, title, rows, color=BLUE_B, highlights=(), faded=(), scale=1.0):
        grid = self.matrix_grid(rows, color=color, highlights=highlights, faded=faded).scale(scale)
        title_mob = self.label(title, font_size=19, color=color, weight=MEDIUM, max_width=3.4)
        group = VGroup(title_mob, grid).arrange(DOWN, buff=0.12)
        frame = RoundedRectangle(
            corner_radius=0.08,
            width=max(group.width + 0.38, 2.0),
            height=group.height + 0.28,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.16,
        ).move_to(group)
        return VGroup(frame, group)

    def sign_board(self):
        board = self.matrix_grid(
            [["+","-","+"],["-","+","-"],["+","-","+"]],
            color=GREEN_B,
            highlights={(0, 0), (0, 2), (1, 1), (2, 0), (2, 2)},
        ).scale(0.9)
        title = self.label(TEXT[self.locale]["visual"]["signs"], font_size=18, color=GREEN_B, weight=MEDIUM, max_width=2.6)
        return VGroup(title, board).arrange(DOWN, buff=0.12)

    def deletion_visual(self):
        rows = [["a11", "a12", "a13"], ["a21", "a22", "a23"], ["a31", "a32", "a33"]]
        original = self.matrix_panel("A", rows, color=BLUE_B, highlights={(0, 1)})
        strike_row = Rectangle(width=original[1][1].width + 0.12, height=0.13, color=RED_C, fill_color=RED_C, fill_opacity=0.65)
        strike_col = Rectangle(width=0.13, height=original[1][1].height + 0.12, color=RED_C, fill_color=RED_C, fill_opacity=0.65)
        strike_row.move_to(original[1][1].get_center() + UP * 0.48)
        strike_col.move_to(original[1][1].get_center() + RIGHT * 0.0)
        minor = self.matrix_panel(TEXT[self.locale]["visual"]["minor"], [["a21", "a23"], ["a31", "a33"]], color=YELLOW_B)
        arrow = Arrow(LEFT, RIGHT, buff=0.12, color=WHITE).scale(0.7)
        group = VGroup(VGroup(original, strike_row, strike_col), arrow, minor).arrange(RIGHT, buff=0.48)
        signs = self.sign_board().next_to(group, DOWN, buff=0.25)
        return VGroup(group, signs)

    def expansion_tree(self):
        matrix = self.matrix_panel(
            "B",
            [["3", "2", "-1"], ["4", "1", "6"], ["-3", "-1", "2"]],
            color=BLUE_B,
            highlights={(0, 0), (0, 1), (0, 2)},
        ).scale(0.92)

        terms = VGroup(
            self.formula_card("M11", "3 det[[1,6],[-1,2]]", color=GREEN_B, width=3.2, height=0.72),
            self.formula_card("M12", "-2 det[[4,6],[-3,2]]", color=YELLOW_B, width=3.2, height=0.72),
            self.formula_card("M13", "+(-1) det[[4,1],[-3,-1]]", color=PURPLE_B, width=3.2, height=0.72),
        ).arrange(DOWN, buff=0.13)
        arrow = Arrow(LEFT, RIGHT, buff=0.15, color=WHITE).scale(0.85)
        return VGroup(matrix, arrow, terms).arrange(RIGHT, buff=0.42)

    def branch_results(self):
        branches = VGroup(
            self.formula_card("det[[1,6],[-1,2]]", "1x2 - 6(-1) = 8", color=GREEN_B, width=3.7, height=0.72),
            self.formula_card("det[[4,6],[-3,2]]", "4x2 - 6(-3) = 26", color=YELLOW_B, width=3.7, height=0.72),
            self.formula_card("det[[4,1],[-3,-1]]", "4(-1) - 1(-3) = -1", color=PURPLE_B, width=3.7, height=0.72),
        ).arrange(DOWN, buff=0.15)
        combine = self.formula_card(TEXT[self.locale]["visual"]["result"], "24 - 52 + 1 = -27", color=BLUE_B, width=3.9, height=0.82)
        arrow = Arrow(LEFT, RIGHT, buff=0.16, color=WHITE).scale(0.78)
        return VGroup(branches, arrow, combine).arrange(RIGHT, buff=0.38)

    def zero_prune_visual(self):
        matrix = self.matrix_panel(
            "C",
            [["1", "9", "7", "7"], ["0", "5", "2", "5"], ["1", "9", "8", "0"], ["1", "9", "8", "3"]],
            color=BLUE_B,
            highlights={(1, 0), (1, 1), (1, 2), (1, 3)},
            scale=0.86,
        )
        terms = VGroup(
            self.formula_card(TEXT[self.locale]["visual"]["zero"], "0 A21", color=RED_B, width=2.4, height=0.64),
            self.formula_card(TEXT[self.locale]["visual"]["branch"], "5 A22", color=GREEN_B, width=2.4, height=0.64),
            self.formula_card(TEXT[self.locale]["visual"]["branch"], "2 A23", color=YELLOW_B, width=2.4, height=0.64),
            self.formula_card(TEXT[self.locale]["visual"]["branch"], "5 A24", color=PURPLE_B, width=2.4, height=0.64),
        ).arrange(RIGHT, buff=0.14)
        cross = Line(terms[0].get_left() + UP * 0.03, terms[0].get_right() + DOWN * 0.03, color=RED_C, stroke_width=6)
        terms_group = VGroup(terms, cross)
        return VGroup(matrix, terms_group).arrange(DOWN, buff=0.32)

    def collapse_visual(self):
        matrix = self.matrix_panel(
            "C",
            [["0", "1", "0", "0"], ["0", "0", "5", "2"], ["0", "2", "1", "4"], ["0", "0", "3", "4"]],
            color=BLUE_B,
            highlights={(0, 1)},
            faded={(0, 0), (0, 2), (0, 3)},
            scale=0.9,
        )
        formula = self.formula_card(
            TEXT[self.locale]["visual"]["collapse"],
            "det(C)=c12(-1)^3 det(C(1|2))",
            color=GREEN_B,
            width=5.7,
            height=0.85,
        )
        return VGroup(matrix, formula).arrange(DOWN, buff=0.32)

    def triangular_visual(self):
        matrix = self.matrix_panel(
            "T",
            [["2", "3", "4"], ["0", "5", "7"], ["0", "0", "-1"]],
            color=BLUE_B,
            highlights={(0, 0), (1, 1), (2, 2)},
        ).scale(0.95)
        diagonal = VGroup(
            self.formula_card("step 1", "2 det[[5,7],[0,-1]]", color=GREEN_B, width=3.2, height=0.68),
            self.formula_card("step 2", "2 x 5 det[[-1]]", color=YELLOW_B, width=3.2, height=0.68),
            self.formula_card("step 3", "2 x 5 x (-1)", color=PURPLE_B, width=3.2, height=0.68),
        ).arrange(DOWN, buff=0.12)
        arrow = Arrow(LEFT, RIGHT, buff=0.15, color=WHITE).scale(0.75)
        return VGroup(matrix, arrow, diagonal).arrange(RIGHT, buff=0.38)

    def scene_group(self, index):
        labels = TEXT[self.locale]["visual"]
        if index == 0:
            return self.deletion_visual()
        if index == 1:
            return self.expansion_tree()
        if index == 2:
            return self.branch_results()
        if index == 3:
            return self.zero_prune_visual()
        if index == 4:
            return self.collapse_visual()
        return self.triangular_visual()

    def construct(self):
        strings = TEXT[self.locale]
        title = self.label(strings["title"], font_size=29, color=BLUE_B, weight=BOLD, max_width=9.8)
        subtitle = self.label(strings["subtitle"], font_size=19, color=GRAY_B, max_width=9.6)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.1).to_edge(UP, buff=0.28)
        self.add(header)

        for index, (heading, body, rule) in enumerate(strings["states"]):
            visual = self.scene_group(index).scale(0.94)
            visual.move_to(UP * 0.42)
            heading_mob = self.label(heading, font_size=25, color=YELLOW_B, weight=MEDIUM, max_width=9.4)
            body_mob = self.label(body, font_size=17, color=GRAY_B, max_width=9.5)
            rule_mob = self.formula_card(strings["visual"]["key_rule"], rule, color=GREEN_B, width=6.4, height=0.74)
            footer = VGroup(heading_mob, body_mob, rule_mob).arrange(DOWN, buff=0.16).to_edge(DOWN, buff=0.28)
            group = VGroup(visual, footer)
            self.play(FadeIn(group, shift=UP * 0.12), run_time=0.8 if index == 0 else 0.55)
            self.wait(1.8 if index == 0 else 1.0)
            self.play(FadeOut(group, shift=DOWN * 0.1), run_time=0.32)

        conclusion = self.formula_card(
            strings["visual"]["key_rule"],
            strings["conclusion"],
            color=BLUE_B,
            width=9.4,
            height=1.05,
        )
        conclusion.move_to(ORIGIN)
        self.play(FadeIn(conclusion, scale=0.98), run_time=0.6)
        self.wait(1.1)


class DeterminantsCofactorExpansionStoryEn(DeterminantsCofactorExpansionStoryBase):
    locale = "en"


class DeterminantsCofactorExpansionStoryZhHk(DeterminantsCofactorExpansionStoryBase):
    locale = "zh-hk"


class DeterminantsCofactorExpansionStoryZhCn(DeterminantsCofactorExpansionStoryBase):
    locale = "zh-cn"


class DeterminantsCofactorExpansionStory(DeterminantsCofactorExpansionStoryEn):
    pass
