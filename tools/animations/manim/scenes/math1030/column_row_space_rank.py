from manim import *


TEXT = {
    "en": {
        "title": "Column space, row space, and rank",
        "subtitle": "One row reduction points to three different answers.",
        "visual": {
            "matrix_a": "original matrix A",
            "rref_r": "RREF R",
            "column_space": "column space C(A)",
            "row_space": "row space R(A)",
            "pivot_positions": "pivot positions",
            "original_columns": "use original columns",
            "nonzero_rows": "use nonzero RREF rows",
            "rank_count": "same count",
            "ambient_column": "columns live in R3",
            "ambient_row": "rows live in R4",
            "not_rref_columns": "not the RREF columns",
            "ax_vector": "Ax is a vector in R3",
            "row_entries": "rows have 4 entries",
            "row_reduce": "row reduce",
            "basis_ca": "{c1,c2} basis for C(A)",
            "relations": "c3=-c1+c2, c4=c1+c2",
            "column_relations": "column relations",
            "r_positions_only": "R only tells positions",
            "basis_ra": "{(1,0,-1,1),(0,1,1,1)}",
            "two_pivots": "2 pivots",
            "dim_ca": "dim C(A)=2",
            "dim_ra": "dim R(A)=2",
            "rank_two": "rank(A)=2",
            "key_rule": "key rule",
        },
        "states": [
            (
                "Column space records reachable outputs",
                "The columns of A span all right-hand sides b for which Ax=b is consistent.",
                "C(A)=Span{c1,c2,c3,c4}",
            ),
            (
                "Row space records row information",
                "Rows have four entries, so R(A) lives in a different ambient space from C(A).",
                "R(A)=Span{rows of A}",
            ),
            (
                "RREF locates the pivots",
                "Row reduction shows pivot positions in columns 1 and 2.",
                "pivot columns: 1, 2",
            ),
            (
                "Column-space basis comes from A",
                "Read the pivot positions from R, but take the actual basis columns from the original matrix A.",
                "basis for C(A): {c1,c2}",
            ),
            (
                "Row-space basis comes from R",
                "Row operations preserve row space, so the nonzero rows of R form a row-space basis.",
                "basis for R(A): nonzero rows of R",
            ),
            (
                "Rank is the common dimension",
                "The number of pivots, the column-space dimension, and the row-space dimension are all 2.",
                "rank(A)=dim C(A)=dim R(A)=2",
            ),
        ],
        "conclusion": "The RREF tells you positions and counts. For column space, return to the original matrix; for row space, keep the nonzero rows of the RREF.",
    },
    "zh-hk": {
        "title": "列空間、行空間與秩",
        "subtitle": "一次行化簡指向三個不同答案。",
        "visual": {
            "matrix_a": "原矩陣 A",
            "rref_r": "RREF R",
            "column_space": "列空間 C(A)",
            "row_space": "行空間 R(A)",
            "pivot_positions": "樞紐位置",
            "original_columns": "使用原矩陣的列",
            "nonzero_rows": "使用 RREF 非零行",
            "rank_count": "同一個數目",
            "ambient_column": "列在 R3 中",
            "ambient_row": "行在 R4 中",
            "not_rref_columns": "不是 RREF 的列",
            "ax_vector": "Ax 在 R3 中",
            "row_entries": "行有 4 個分量",
            "row_reduce": "行化簡",
            "basis_ca": "{c1,c2} 是 C(A) 的基底",
            "relations": "c3=-c1+c2, c4=c1+c2",
            "column_relations": "列關係",
            "r_positions_only": "R 只告訴位置",
            "basis_ra": "{(1,0,-1,1),(0,1,1,1)}",
            "two_pivots": "2 個樞紐",
            "dim_ca": "dim C(A)=2",
            "dim_ra": "dim R(A)=2",
            "rank_two": "rank(A)=2",
            "key_rule": "重點規則",
        },
        "states": [
            (
                "列空間記錄可到達輸出",
                "A 的列張成所有令 Ax=b 有解的右端向量 b。",
                "C(A)=Span{c1,c2,c3,c4}",
            ),
            (
                "行空間記錄行資訊",
                "每一行有四個分量，所以 R(A) 所在的環境空間不同於 C(A)。",
                "R(A)=Span{A 的各行}",
            ),
            (
                "RREF 找出樞紐位置",
                "行化簡顯示樞紐位置在第 1、2 列。",
                "樞紐列：1, 2",
            ),
            (
                "列空間基底要回到 A",
                "樞紐位置由 R 讀出，但真正的列空間基底要取自原矩陣 A。",
                "C(A) 的基底：{c1,c2}",
            ),
            (
                "行空間基底取自 R",
                "行變換保留行空間，所以 R 的非零行形成行空間基底。",
                "R(A) 的基底：R 的非零行",
            ),
            (
                "秩是共同維數",
                "樞紐數、列空間維數與行空間維數全都是 2。",
                "rank(A)=dim C(A)=dim R(A)=2",
            ),
        ],
        "conclusion": "RREF 告訴你位置和數目。列空間要回到原矩陣取列；行空間則保留 RREF 的非零行。",
    },
    "zh-cn": {
        "title": "列空间、行空间与秩",
        "subtitle": "一次行化简指向三个不同答案。",
        "visual": {
            "matrix_a": "原矩阵 A",
            "rref_r": "RREF R",
            "column_space": "列空间 C(A)",
            "row_space": "行空间 R(A)",
            "pivot_positions": "主元位置",
            "original_columns": "使用原矩阵的列",
            "nonzero_rows": "使用 RREF 非零行",
            "rank_count": "同一个数目",
            "ambient_column": "列在 R3 中",
            "ambient_row": "行在 R4 中",
            "not_rref_columns": "不是 RREF 的列",
            "ax_vector": "Ax 在 R3 中",
            "row_entries": "行有 4 个分量",
            "row_reduce": "行化简",
            "basis_ca": "{c1,c2} 是 C(A) 的基",
            "relations": "c3=-c1+c2, c4=c1+c2",
            "column_relations": "列关系",
            "r_positions_only": "R 只告诉位置",
            "basis_ra": "{(1,0,-1,1),(0,1,1,1)}",
            "two_pivots": "2 个主元",
            "dim_ca": "dim C(A)=2",
            "dim_ra": "dim R(A)=2",
            "rank_two": "rank(A)=2",
            "key_rule": "重点规则",
        },
        "states": [
            (
                "列空间记录可到达输出",
                "A 的列张成所有使 Ax=b 有解的右端向量 b。",
                "C(A)=Span{c1,c2,c3,c4}",
            ),
            (
                "行空间记录行信息",
                "每一行有四个分量，所以 R(A) 所在的环境空间不同于 C(A)。",
                "R(A)=Span{A 的各行}",
            ),
            (
                "RREF 找出主元位置",
                "行化简显示主元位置在第 1、2 列。",
                "主元列：1, 2",
            ),
            (
                "列空间基要回到 A",
                "主元位置由 R 读出，但真正的列空间基要取自原矩阵 A。",
                "C(A) 的基：{c1,c2}",
            ),
            (
                "行空间基取自 R",
                "行变换保持行空间，所以 R 的非零行形成行空间基。",
                "R(A) 的基：R 的非零行",
            ),
            (
                "秩是共同维数",
                "主元数、列空间维数与行空间维数全都是 2。",
                "rank(A)=dim C(A)=dim R(A)=2",
            ),
        ],
        "conclusion": "RREF 告诉你位置和数目。列空间要回到原矩阵取列；行空间则保留 RREF 的非零行。",
    },
}


A_MATRIX = [["1", "2", "1", "3"], ["0", "1", "1", "1"], ["1", "3", "2", "4"]]
R_MATRIX = [["1", "0", "-1", "1"], ["0", "1", "1", "1"], ["0", "0", "0", "0"]]


class ColumnRowSpaceRankStoryBase(Scene):
    """MATH1030 6.6: read column space, row space, and rank from one RREF."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def matrix_grid(self, rows, highlights=(), row_highlights=(), col_highlights=(), color=BLUE_B):
        row_count = len(rows)
        col_count = len(rows[0])
        cell_width = 0.5
        cell_height = 0.42
        cells = VGroup()
        values = VGroup()
        highlight_set = set(highlights)
        row_set = set(row_highlights)
        col_set = set(col_highlights)

        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - (col_count - 1) / 2) * cell_width
                y = ((row_count - 1) / 2 - row_index) * cell_height
                is_highlight = (
                    (row_index, col_index) in highlight_set
                    or row_index in row_set
                    or col_index in col_set
                )
                fill_color = YELLOW_E if is_highlight else BLACK
                stroke_color = YELLOW_B if is_highlight else color
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.1,
                    stroke_color=stroke_color,
                    fill_color=fill_color,
                    fill_opacity=0.45 if is_highlight else 0.16,
                ).move_to([x, y, 0])
                value_mob = self.label(value, font_size=17, max_width=cell_width * 0.78).move_to(cell)
                cells.add(cell)
                values.add(value_mob)

        left_bracket = Text("[", font=self.font, font_size=66).next_to(cells, LEFT, buff=0.05)
        right_bracket = Text("]", font=self.font, font_size=66).next_to(cells, RIGHT, buff=0.05)
        return VGroup(cells, values, left_bracket, right_bracket)

    def formula_card(self, title, body, color=GREEN_B, width=6.5, height=0.86):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.22,
        )
        title_mob = self.label(title, font_size=17, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=21, max_width=width * 0.9)
        return VGroup(box, VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box))

    def matrix_panel(self, title, rows, highlights=(), row_highlights=(), col_highlights=(), color=BLUE_B):
        label = self.label(title, font_size=20, color=color, weight=MEDIUM, max_width=3.2)
        matrix = self.matrix_grid(
            rows,
            highlights=highlights,
            row_highlights=row_highlights,
            col_highlights=col_highlights,
            color=color,
        )
        return VGroup(label, matrix).arrange(DOWN, buff=0.18)

    def arrow_label(self, value, color=GRAY_B):
        arrow = Arrow(LEFT * 0.9, RIGHT * 0.9, color=color, stroke_width=3.2)
        label = self.label(value, font_size=17, color=color, weight=MEDIUM, max_width=2.0)
        label.next_to(arrow, UP, buff=0.08)
        return VGroup(arrow, label)

    def two_matrix_layout(self, left_panel, right_panel, arrow_text=None):
        arrow_text = arrow_text or TEXT[self.locale]["visual"]["row_reduce"]
        arrow = self.arrow_label(arrow_text)
        group = VGroup(left_panel, arrow, right_panel).arrange(RIGHT, buff=0.42)
        if group.width > 7.6:
            group.scale_to_fit_width(7.6)
        return group

    def columns_visual(self):
        labels = TEXT[self.locale]["visual"]
        panel = self.matrix_panel(labels["matrix_a"], A_MATRIX, col_highlights=(0, 1), color=BLUE_B)
        notes = VGroup(
            self.formula_card(labels["column_space"], "C(A)=Span{c1,c2,c3,c4}", color=GREEN_B, width=5.6),
            self.formula_card(labels["ambient_column"], labels["ax_vector"], color=TEAL_B, width=5.6),
        ).arrange(DOWN, buff=0.18)
        return VGroup(panel, notes).arrange(RIGHT, buff=0.58)

    def rows_visual(self):
        labels = TEXT[self.locale]["visual"]
        panel = self.matrix_panel(labels["matrix_a"], A_MATRIX, row_highlights=(0, 1, 2), color=PURPLE_B)
        notes = VGroup(
            self.formula_card(labels["row_space"], "R(A)=Span{r1,r2,r3}", color=PURPLE_B, width=5.6),
            self.formula_card(labels["ambient_row"], labels["row_entries"], color=TEAL_B, width=5.6),
        ).arrange(DOWN, buff=0.18)
        return VGroup(panel, notes).arrange(RIGHT, buff=0.58)

    def pivot_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = self.matrix_panel(labels["matrix_a"], A_MATRIX, color=BLUE_B)
        right = self.matrix_panel(labels["rref_r"], R_MATRIX, highlights=((0, 0), (1, 1)), color=GREEN_B)
        layout = self.two_matrix_layout(left, right)
        note = self.formula_card(labels["pivot_positions"], "columns 1 and 2", color=YELLOW_B, width=5.4)
        return VGroup(layout, note).arrange(DOWN, buff=0.32)

    def column_basis_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = self.matrix_panel(labels["matrix_a"], A_MATRIX, col_highlights=(0, 1), color=BLUE_B)
        right = self.matrix_panel(labels["rref_r"], R_MATRIX, highlights=((0, 0), (1, 1)), color=GREEN_B)
        layout = self.two_matrix_layout(left, right)
        notes = VGroup(
            self.formula_card(labels["original_columns"], labels["basis_ca"], color=BLUE_B, width=4.6),
            self.formula_card(labels["not_rref_columns"], labels["r_positions_only"], color=RED_B, width=4.6),
            self.formula_card(labels["column_relations"], labels["relations"], color=TEAL_B, width=4.6),
        ).arrange(RIGHT, buff=0.22)
        return VGroup(layout, notes).arrange(DOWN, buff=0.32)

    def row_basis_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = self.matrix_panel(labels["matrix_a"], A_MATRIX, color=PURPLE_B)
        right = self.matrix_panel(labels["rref_r"], R_MATRIX, row_highlights=(0, 1), color=GREEN_B)
        layout = self.two_matrix_layout(left, right)
        note = self.formula_card(labels["nonzero_rows"], labels["basis_ra"], color=PURPLE_B, width=6.4)
        return VGroup(layout, note).arrange(DOWN, buff=0.32)

    def rank_visual(self):
        labels = TEXT[self.locale]["visual"]
        r_panel = self.matrix_panel(labels["rref_r"], R_MATRIX, highlights=((0, 0), (1, 1)), row_highlights=(0, 1), color=GREEN_B)
        counts = VGroup(
            self.formula_card(labels["pivot_positions"], labels["two_pivots"], color=YELLOW_B, width=3.0),
            self.formula_card(labels["column_space"], labels["dim_ca"], color=BLUE_B, width=3.0),
            self.formula_card(labels["row_space"], labels["dim_ra"], color=PURPLE_B, width=3.0),
        ).arrange(RIGHT, buff=0.18)
        final = self.formula_card(labels["rank_count"], labels["rank_two"], color=GREEN_B, width=4.6)
        return VGroup(r_panel, counts, final).arrange(DOWN, buff=0.24)

    def fit_visual(self, visual, max_width=7.55, max_height=3.35):
        if visual.width > max_width:
            visual.scale_to_fit_width(max_width)
        if visual.height > max_height:
            visual.scale_to_fit_height(max_height)
        return visual

    def make_visual(self, index):
        builders = [
            self.columns_visual,
            self.rows_visual,
            self.pivot_visual,
            self.column_basis_visual,
            self.row_basis_visual,
            self.rank_visual,
        ]
        return self.fit_visual(builders[index]())

    def construct(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=BLUE_B, weight=BOLD, max_width=7.4)
        subtitle = self.label(data["subtitle"], font_size=19, color=GRAY_A, max_width=7.4)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.12).to_edge(UP, buff=0.28)

        state_title, state_body, formula = data["states"][0]
        state_label = self.label(state_title, font_size=25, color=YELLOW_B, weight=MEDIUM, max_width=7.4)
        body_label = self.label(state_body, font_size=19, color=WHITE, max_width=7.4)
        formula = self.formula_card(TEXT[self.locale]["visual"]["key_rule"], formula, color=GREEN_B, width=6.9)
        footer = VGroup(state_label, body_label, formula).arrange(DOWN, buff=0.14).to_edge(DOWN, buff=0.28)

        visual = self.make_visual(0).move_to(UP * 0.22)

        self.play(FadeIn(header, shift=DOWN * 0.15), FadeIn(visual, shift=UP * 0.12), FadeIn(footer, shift=UP * 0.12), run_time=0.9)
        self.wait(1.0)

        for index, (next_title, next_body, next_formula) in enumerate(data["states"][1:], start=1):
            next_visual = self.make_visual(index).move_to(UP * 0.22)
            next_footer = VGroup(
                self.label(next_title, font_size=25, color=YELLOW_B, weight=MEDIUM, max_width=7.4),
                self.label(next_body, font_size=19, color=WHITE, max_width=7.4),
                self.formula_card(TEXT[self.locale]["visual"]["key_rule"], next_formula, color=GREEN_B, width=6.9),
            ).arrange(DOWN, buff=0.14).to_edge(DOWN, buff=0.28)

            self.play(FadeOut(visual, shift=LEFT * 0.18), FadeOut(footer, shift=DOWN * 0.12), run_time=0.28)
            visual = next_visual
            footer = next_footer
            self.play(FadeIn(visual, shift=RIGHT * 0.18), FadeIn(footer, shift=UP * 0.12), run_time=0.48)
            self.wait(0.8)

        conclusion = self.label(data["conclusion"], font_size=22, color=WHITE, weight=MEDIUM, max_width=7.35)
        conclusion_box = RoundedRectangle(
            corner_radius=0.08,
            width=7.6,
            height=1.18,
            stroke_color=BLUE_B,
            fill_color=BLUE_E,
            fill_opacity=0.24,
        ).move_to(DOWN * 0.1)
        conclusion.move_to(conclusion_box)
        final = VGroup(conclusion_box, conclusion)

        self.play(FadeOut(visual), FadeOut(footer), FadeIn(final, shift=UP * 0.16), run_time=0.75)
        self.wait(1.1)


class ColumnRowSpaceRankStoryEn(ColumnRowSpaceRankStoryBase):
    locale = "en"
    font = "Avenir Next"


class ColumnRowSpaceRankStoryZhHk(ColumnRowSpaceRankStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class ColumnRowSpaceRankStoryZhCn(ColumnRowSpaceRankStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class ColumnRowSpaceRankStory(ColumnRowSpaceRankStoryEn):
    pass
