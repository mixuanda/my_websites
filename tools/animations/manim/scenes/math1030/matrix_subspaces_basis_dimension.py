from manim import *


TEXT = {
    "en": {
        "title": "Matrix subspaces: free entries become a basis",
        "subtitle": "Treat a fixed-size matrix as one vector in a larger space.",
        "visual": {
            "ambient": "ambient space",
            "same_size": "same size",
            "standard_units": "standard matrix units",
            "entry_positions": "entry positions",
            "constraint": "symmetry constraint",
            "free_parameters": "free parameters",
            "split": "split by parameters",
            "basis": "basis",
            "dimension": "dimension",
            "compare": "compare spaces",
            "matrix_vector": "matrix as vector",
            "general_m22": "general M2,2 matrix",
            "sym2": "Sym2(R)",
            "fixed_matrices": "fixed matrices",
            "count": "count free choices",
            "key_rule": "key rule",
            "m22_dim": "dim M2,2(R)=4",
            "sym2_dim": "dim Sym2(R)=3",
            "ut3_dim": "dim UT3(R)=6",
            "skew3_dim": "dim Skew3(R)=3",
            "two_by_two_stays": "2 by 2 stays 2 by 2",
            "span_label": "span",
            "independent_label": "independent",
            "compare_entries": "compare entries",
            "free_entries": "4 free entries",
            "above_diagonal": "above diagonal",
            "opposite_pairs": "opposite pairs",
            "dimension_basis_size": "dimension = basis size",
        },
        "states": [
            (
                "Matrices can be vectors",
                "Inside M2,2(R), addition and scalar multiplication keep the matrix size fixed.",
                "A+B and alpha A stay in M2,2(R)",
            ),
            (
                "Standard units isolate entries",
                "Each free entry has its own matrix unit, so a full 2 by 2 matrix has four independent directions.",
                "[a b; c d]=aE11+bE12+cE21+dE22",
            ),
            (
                "A subspace imposes constraints",
                "In Sym2(R), symmetry forces the two off-diagonal entries to be equal.",
                "[a b; b c] has 3 free parameters",
            ),
            (
                "Split the matrix by parameters",
                "Write the general element as one parameter times one fixed matrix, plus the next parameter times the next fixed matrix.",
                "[a b; b c]=aB1+bB2+cB3",
            ),
            (
                "The fixed matrices form the basis",
                "They span every symmetric 2 by 2 matrix, and comparing entries proves independence.",
                "{B1,B2,B3} is a basis for Sym2(R)",
            ),
            (
                "Dimension counts free choices",
                "The dimension is the number of basis matrices, not merely the total number of entries.",
                "dim Sym2(R)=3",
            ),
        ],
        "conclusion": "For matrix subspaces, write the general matrix, identify the free parameters, split by those parameters, and count the fixed matrices that remain.",
    },
    "zh-hk": {
        "title": "矩陣子空間：自由項變成基底",
        "subtitle": "把固定大小的矩陣當作較大空間中的一個向量。",
        "visual": {
            "ambient": "環境空間",
            "same_size": "大小固定",
            "standard_units": "標準矩陣單位",
            "entry_positions": "項的位置",
            "constraint": "對稱限制",
            "free_parameters": "自由參數",
            "split": "按參數拆開",
            "basis": "基底",
            "dimension": "維數",
            "compare": "比較空間",
            "matrix_vector": "矩陣作為向量",
            "general_m22": "一般 M2,2 矩陣",
            "sym2": "Sym2(R)",
            "fixed_matrices": "固定矩陣",
            "count": "數自由選擇",
            "key_rule": "重點規則",
            "m22_dim": "dim M2,2(R)=4",
            "sym2_dim": "dim Sym2(R)=3",
            "ut3_dim": "dim UT3(R)=6",
            "skew3_dim": "dim Skew3(R)=3",
            "two_by_two_stays": "2 by 2 仍是 2 by 2",
            "span_label": "張成",
            "independent_label": "線性獨立",
            "compare_entries": "比較矩陣項",
            "free_entries": "4 個自由項",
            "above_diagonal": "對角線上方",
            "opposite_pairs": "相反號配對",
            "dimension_basis_size": "維數 = 基底大小",
        },
        "states": [
            (
                "矩陣也可以作為向量",
                "在 M2,2(R) 中，加法和純量乘法都會保持矩陣大小不變。",
                "A+B 和 alpha A 仍在 M2,2(R) 中",
            ),
            (
                "標準矩陣單位分離矩陣項",
                "每個自由項都有自己的矩陣單位，所以完整 2 by 2 矩陣有四個獨立方向。",
                "[a b; c d]=aE11+bE12+cE21+dE22",
            ),
            (
                "子空間加入限制",
                "在 Sym2(R) 中，對稱性迫使兩個非對角項相等。",
                "[a b; b c] 有 3 個自由參數",
            ),
            (
                "按參數拆開矩陣",
                "把一般元素寫成一個參數乘一個固定矩陣，再加下一個參數乘下一個固定矩陣。",
                "[a b; b c]=aB1+bB2+cB3",
            ),
            (
                "固定矩陣形成基底",
                "它們張成所有 2 by 2 對稱矩陣，而比較矩陣項可證明線性獨立。",
                "{B1,B2,B3} 是 Sym2(R) 的基底",
            ),
            (
                "維數數自由選擇",
                "維數是基底矩陣的數目，不只是矩陣項的總數。",
                "dim Sym2(R)=3",
            ),
        ],
        "conclusion": "處理矩陣子空間時，先寫出一般矩陣，找出自由參數，按參數拆成固定矩陣，最後數剩下的固定矩陣。",
    },
    "zh-cn": {
        "title": "矩阵子空间：自由项变成基",
        "subtitle": "把固定大小的矩阵当作较大空间中的一个向量。",
        "visual": {
            "ambient": "环境空间",
            "same_size": "大小固定",
            "standard_units": "标准矩阵单位",
            "entry_positions": "项的位置",
            "constraint": "对称限制",
            "free_parameters": "自由参数",
            "split": "按参数拆开",
            "basis": "基",
            "dimension": "维数",
            "compare": "比较空间",
            "matrix_vector": "矩阵作为向量",
            "general_m22": "一般 M2,2 矩阵",
            "sym2": "Sym2(R)",
            "fixed_matrices": "固定矩阵",
            "count": "数自由选择",
            "key_rule": "重点规则",
            "m22_dim": "dim M2,2(R)=4",
            "sym2_dim": "dim Sym2(R)=3",
            "ut3_dim": "dim UT3(R)=6",
            "skew3_dim": "dim Skew3(R)=3",
            "two_by_two_stays": "2 by 2 仍是 2 by 2",
            "span_label": "张成",
            "independent_label": "线性无关",
            "compare_entries": "比较矩阵项",
            "free_entries": "4 个自由项",
            "above_diagonal": "对角线上方",
            "opposite_pairs": "相反号配对",
            "dimension_basis_size": "维数 = 基大小",
        },
        "states": [
            (
                "矩阵也可以作为向量",
                "在 M2,2(R) 中，加法和标量乘法都会保持矩阵大小不变。",
                "A+B 和 alpha A 仍在 M2,2(R) 中",
            ),
            (
                "标准矩阵单位分离矩阵项",
                "每个自由项都有自己的矩阵单位，所以完整 2 by 2 矩阵有四个独立方向。",
                "[a b; c d]=aE11+bE12+cE21+dE22",
            ),
            (
                "子空间加入限制",
                "在 Sym2(R) 中，对称性迫使两个非对角项相等。",
                "[a b; b c] 有 3 个自由参数",
            ),
            (
                "按参数拆开矩阵",
                "把一般元素写成一个参数乘一个固定矩阵，再加下一个参数乘下一个固定矩阵。",
                "[a b; b c]=aB1+bB2+cB3",
            ),
            (
                "固定矩阵形成基",
                "它们张成所有 2 by 2 对称矩阵，而比较矩阵项可证明线性无关。",
                "{B1,B2,B3} 是 Sym2(R) 的基",
            ),
            (
                "维数数自由选择",
                "维数是基矩阵的数目，不只是矩阵项的总数。",
                "dim Sym2(R)=3",
            ),
        ],
        "conclusion": "处理矩阵子空间时，先写出一般矩阵，找出自由参数，按参数拆成固定矩阵，最后数剩下的固定矩阵。",
    },
}


M22 = [["a", "b"], ["c", "d"]]
SYM2 = [["a", "b"], ["b", "c"]]
E11 = [["1", "0"], ["0", "0"]]
E12 = [["0", "1"], ["0", "0"]]
E21 = [["0", "0"], ["1", "0"]]
E22 = [["0", "0"], ["0", "1"]]
B1 = [["1", "0"], ["0", "0"]]
B2 = [["0", "1"], ["1", "0"]]
B3 = [["0", "0"], ["0", "1"]]


class MatrixSubspaceBasisDimensionStoryBase(Scene):
    """MATH1030 6.7: matrix subspaces, bases, and dimension."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def matrix_grid(self, rows, highlights=(), tied=(), color=BLUE_B):
        row_count = len(rows)
        col_count = len(rows[0])
        cell_width = 0.58
        cell_height = 0.48
        cells = VGroup()
        values = VGroup()
        highlights = set(highlights)
        tied = set(tied)

        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - (col_count - 1) / 2) * cell_width
                y = ((row_count - 1) / 2 - row_index) * cell_height
                is_highlight = (row_index, col_index) in highlights
                is_tied = (row_index, col_index) in tied
                fill_color = YELLOW_E if is_highlight else TEAL_E if is_tied else BLACK
                stroke_color = YELLOW_B if is_highlight else TEAL_B if is_tied else color
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.2,
                    stroke_color=stroke_color,
                    fill_color=fill_color,
                    fill_opacity=0.45 if is_highlight or is_tied else 0.16,
                ).move_to([x, y, 0])
                value_mob = self.label(value, font_size=20, max_width=cell_width * 0.72).move_to(cell)
                cells.add(cell)
                values.add(value_mob)

        left = Text("[", font=self.font, font_size=70).next_to(cells, LEFT, buff=0.05)
        right = Text("]", font=self.font, font_size=70).next_to(cells, RIGHT, buff=0.05)
        return VGroup(cells, values, left, right)

    def matrix_panel(self, title, rows, highlights=(), tied=(), color=BLUE_B):
        title_mob = self.label(title, font_size=19, color=color, weight=MEDIUM, max_width=2.5)
        matrix = self.matrix_grid(rows, highlights=highlights, tied=tied, color=color)
        return VGroup(title_mob, matrix).arrange(DOWN, buff=0.16)

    def formula_card(self, title, body, color=GREEN_B, width=6.6, height=0.85):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.23,
        )
        title_mob = self.label(title, font_size=17, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=21, max_width=width * 0.9)
        return VGroup(box, VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box))

    def small_operator(self, value):
        return self.label(value, font_size=26, color=GRAY_A, weight=MEDIUM, max_width=0.5)

    def matrices_as_vectors_visual(self):
        labels = TEXT[self.locale]["visual"]
        a = self.matrix_panel("A", [["1", "2"], ["0", "1"]], color=BLUE_B)
        b = self.matrix_panel("B", [["0", "1"], ["3", "0"]], color=PURPLE_B)
        sum_panel = self.matrix_panel("A+B", [["1", "3"], ["3", "1"]], color=GREEN_B)
        row = VGroup(a, self.small_operator("+"), b, self.small_operator("="), sum_panel).arrange(RIGHT, buff=0.18)
        notes = VGroup(
            self.formula_card(labels["ambient"], "M2,2(R)", color=BLUE_B, width=3.2),
            self.formula_card(labels["same_size"], labels["two_by_two_stays"], color=GREEN_B, width=3.8),
        ).arrange(RIGHT, buff=0.24)
        return VGroup(row, notes).arrange(DOWN, buff=0.35)

    def standard_units_visual(self):
        labels = TEXT[self.locale]["visual"]
        general = self.matrix_panel(labels["general_m22"], M22, highlights=((0, 0), (0, 1), (1, 0), (1, 1)), color=BLUE_B)
        units = VGroup(
            self.matrix_panel("E11", E11, highlights=((0, 0),), color=GREEN_B),
            self.matrix_panel("E12", E12, highlights=((0, 1),), color=GREEN_B),
            self.matrix_panel("E21", E21, highlights=((1, 0),), color=GREEN_B),
            self.matrix_panel("E22", E22, highlights=((1, 1),), color=GREEN_B),
        ).arrange(RIGHT, buff=0.12)
        if units.width > 5.0:
            units.scale_to_fit_width(5.0)
        formula = self.formula_card(labels["standard_units"], "aE11+bE12+cE21+dE22", color=GREEN_B, width=6.1)
        return VGroup(VGroup(general, units).arrange(RIGHT, buff=0.42), formula).arrange(DOWN, buff=0.28)

    def symmetry_constraint_visual(self):
        labels = TEXT[self.locale]["visual"]
        general = self.matrix_panel(labels["general_m22"], M22, highlights=((0, 1), (1, 0)), color=BLUE_B)
        sym = self.matrix_panel(labels["sym2"], SYM2, tied=((0, 1), (1, 0)), color=TEAL_B)
        arrow = Arrow(LEFT * 0.8, RIGHT * 0.8, color=GRAY_B, stroke_width=3)
        arrow_label = self.label("A^T=A", font_size=19, color=GRAY_A, max_width=1.6).next_to(arrow, UP, buff=0.08)
        top = VGroup(general, VGroup(arrow, arrow_label), sym).arrange(RIGHT, buff=0.34)
        note = self.formula_card(labels["free_parameters"], "a, b, c", color=YELLOW_B, width=4.1)
        return VGroup(top, note).arrange(DOWN, buff=0.32)

    def split_visual(self):
        labels = TEXT[self.locale]["visual"]
        sym = self.matrix_panel(labels["sym2"], SYM2, tied=((0, 1), (1, 0)), color=TEAL_B)
        b1 = self.matrix_panel("B1", B1, highlights=((0, 0),), color=BLUE_B)
        b2 = self.matrix_panel("B2", B2, highlights=((0, 1), (1, 0)), color=PURPLE_B)
        b3 = self.matrix_panel("B3", B3, highlights=((1, 1),), color=GREEN_B)
        basis_row = VGroup(
            self.label("a", font_size=22, color=BLUE_B),
            b1,
            self.small_operator("+"),
            self.label("b", font_size=22, color=PURPLE_B),
            b2,
            self.small_operator("+"),
            self.label("c", font_size=22, color=GREEN_B),
            b3,
        ).arrange(RIGHT, buff=0.1)
        if basis_row.width > 6.9:
            basis_row.scale_to_fit_width(6.9)
        return VGroup(sym, self.small_operator("="), basis_row, self.formula_card(labels["split"], "aB1+bB2+cB3", color=GREEN_B, width=4.8)).arrange(DOWN, buff=0.17)

    def basis_visual(self):
        labels = TEXT[self.locale]["visual"]
        basis = VGroup(
            self.matrix_panel("B1", B1, highlights=((0, 0),), color=BLUE_B),
            self.matrix_panel("B2", B2, highlights=((0, 1), (1, 0)), color=PURPLE_B),
            self.matrix_panel("B3", B3, highlights=((1, 1),), color=GREEN_B),
        ).arrange(RIGHT, buff=0.4)
        span_card = self.formula_card(labels["basis"], "{B1,B2,B3}", color=YELLOW_B, width=4.7)
        proof_cards = VGroup(
            self.formula_card(labels["span_label"], "aB1+bB2+cB3", color=BLUE_B, width=3.2),
            self.formula_card(labels["independent_label"], labels["compare_entries"], color=PURPLE_B, width=3.2),
        ).arrange(RIGHT, buff=0.22)
        return VGroup(basis, span_card, proof_cards).arrange(DOWN, buff=0.22)

    def dimension_visual(self):
        labels = TEXT[self.locale]["visual"]
        cards = VGroup(
            self.formula_card(labels["m22_dim"], labels["free_entries"], color=BLUE_B, width=3.2),
            self.formula_card(labels["sym2_dim"], "a, b, c", color=GREEN_B, width=3.2),
            self.formula_card(labels["ut3_dim"], labels["above_diagonal"], color=PURPLE_B, width=3.2),
            self.formula_card(labels["skew3_dim"], labels["opposite_pairs"], color=YELLOW_B, width=3.2),
        ).arrange_in_grid(rows=2, cols=2, buff=0.22)
        final = self.formula_card(labels["count"], labels["dimension_basis_size"], color=GREEN_B, width=5.6)
        return VGroup(cards, final).arrange(DOWN, buff=0.26)

    def fit_visual(self, visual, max_width=7.55, max_height=3.35):
        if visual.width > max_width:
            visual.scale_to_fit_width(max_width)
        if visual.height > max_height:
            visual.scale_to_fit_height(max_height)
        return visual

    def make_visual(self, index):
        builders = [
            self.matrices_as_vectors_visual,
            self.standard_units_visual,
            self.symmetry_constraint_visual,
            self.split_visual,
            self.basis_visual,
            self.dimension_visual,
        ]
        return self.fit_visual(builders[index]())

    def construct(self):
        data = TEXT[self.locale]
        labels = data["visual"]
        title = self.label(data["title"], font_size=33, color=BLUE_B, weight=BOLD, max_width=7.5)
        subtitle = self.label(data["subtitle"], font_size=19, color=GRAY_A, max_width=7.5)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.12).to_edge(UP, buff=0.28)

        state_title, state_body, formula_text = data["states"][0]
        visual = self.make_visual(0).move_to(UP * 0.22)
        footer = VGroup(
            self.label(state_title, font_size=25, color=YELLOW_B, weight=MEDIUM, max_width=7.4),
            self.label(state_body, font_size=19, color=WHITE, max_width=7.4),
            self.formula_card(labels["key_rule"], formula_text, color=GREEN_B, width=6.9),
        ).arrange(DOWN, buff=0.14).to_edge(DOWN, buff=0.28)

        self.play(FadeIn(header, shift=DOWN * 0.15), FadeIn(visual, shift=UP * 0.12), FadeIn(footer, shift=UP * 0.12), run_time=0.9)
        self.wait(1.55)

        for index, (next_title, next_body, next_formula) in enumerate(data["states"][1:], start=1):
            next_visual = self.make_visual(index).move_to(UP * 0.22)
            next_footer = VGroup(
                self.label(next_title, font_size=25, color=YELLOW_B, weight=MEDIUM, max_width=7.4),
                self.label(next_body, font_size=19, color=WHITE, max_width=7.4),
                self.formula_card(labels["key_rule"], next_formula, color=GREEN_B, width=6.9),
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


class MatrixSubspaceBasisDimensionStoryEn(MatrixSubspaceBasisDimensionStoryBase):
    locale = "en"
    font = "Avenir Next"


class MatrixSubspaceBasisDimensionStoryZhHk(MatrixSubspaceBasisDimensionStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class MatrixSubspaceBasisDimensionStoryZhCn(MatrixSubspaceBasisDimensionStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class MatrixSubspaceBasisDimensionStory(MatrixSubspaceBasisDimensionStoryEn):
    pass
