from manim import *


TEXT = {
    "en": {
        "title": "Characteristic polynomials: from roots to diagonalization tests",
        "subtitle": "The determinant finds eigenvalues; eigenspace dimensions decide whether they are enough.",
        "visual": {
            "input": "matrix input",
            "shift": "subtract xI",
            "det": "determinant",
            "poly": "polynomial",
            "roots": "roots",
            "eigenvalues": "eigenvalues",
            "algebraic": "algebraic multiplicity",
            "geometric": "geometric multiplicity",
            "null": "null space",
            "fail": "not enough eigenvectors",
            "pass": "enough eigenvectors",
            "test": "diagonalization test",
            "distinct": "distinct roots",
            "dimension": "dimension count",
            "warning": "repeated root is only a warning",
        },
        "states": [
            (
                "Package the determinant test into one polynomial",
                "A scalar lambda is an eigenvalue exactly when det(A-lambda I)=0, so p_A(x)=det(A-xI) records every candidate at once.",
                "p_A(x)=det(A-xI)",
            ),
            (
                "Factor the polynomial to read the eigenvalues",
                "For the source matrix, the determinant simplifies to x^2-x-12, so the roots are 4 and -3.",
                "p_A(x)=(x-4)(x+3)",
            ),
            (
                "A repeated root creates a multiplicity question",
                "For B=[[2,3],[0,2]], the only root is 2, but it appears twice in the characteristic polynomial.",
                "m_a(2)=2",
            ),
            (
                "The eigenspace dimension is a separate count",
                "Solving (B-2I)v=0 gives only one independent eigenvector, so geometric multiplicity is smaller.",
                "m_g(2)=1 < m_a(2)",
            ),
            (
                "Diagonalization succeeds only with enough eigendirections",
                "Add the dimensions of all eigenspaces. The sum must equal the size n of the matrix.",
                "dim E(lambda_1)+...+dim E(lambda_s)=n",
            ),
            (
                "Distinct eigenvalues are the fast sufficient test",
                "If an n by n matrix has n distinct eigenvalues, their eigenvectors are automatically independent.",
                "n distinct eigenvalues => diagonalizable",
            ),
        ],
        "conclusion": "The characteristic polynomial finds the possible diagonal entries, but diagonalization still asks whether the eigenspaces provide a full eigenbasis.",
    },
    "zh-hk": {
        "title": "特徵多項式：由根走到對角化測試",
        "subtitle": "行列式找出特徵值；特徵空間維數決定它們是否足夠。",
        "visual": {
            "input": "矩陣輸入",
            "shift": "減去 xI",
            "det": "行列式",
            "poly": "多項式",
            "roots": "根",
            "eigenvalues": "特徵值",
            "algebraic": "代數重數",
            "geometric": "幾何重數",
            "null": "零空間",
            "fail": "特徵向量不足",
            "pass": "特徵向量足夠",
            "test": "對角化測試",
            "distinct": "互異根",
            "dimension": "維數計數",
            "warning": "重根只是警號",
        },
        "states": [
            (
                "把行列式判準打包成一個多項式",
                "純量 lambda 是特徵值，當且僅當 det(A-lambda I)=0，所以 p_A(x)=det(A-xI) 一次過記錄所有候選值。",
                "p_A(x)=det(A-xI)",
            ),
            (
                "因式分解多項式以讀出特徵值",
                "對來源矩陣，行列式化簡為 x^2-x-12，因此根是 4 與 -3。",
                "p_A(x)=(x-4)(x+3)",
            ),
            (
                "重根帶來重數問題",
                "對 B=[[2,3],[0,2]]，唯一的根是 2，但它在特徵多項式中出現兩次。",
                "m_a(2)=2",
            ),
            (
                "特徵空間維數是另一個計數",
                "解 (B-2I)v=0 只得到一個線性無關特徵向量，所以幾何重數較小。",
                "m_g(2)=1 < m_a(2)",
            ),
            (
                "對角化只在特徵方向足夠時成功",
                "把所有特徵空間維數相加；總和必須等於矩陣大小 n。",
                "dim E(lambda_1)+...+dim E(lambda_s)=n",
            ),
            (
                "互異特徵值是快速充分測試",
                "如果 n 乘 n 矩陣有 n 個互異特徵值，對應特徵向量會自動線性無關。",
                "n 個互異特徵值 => 可對角化",
            ),
        ],
        "conclusion": "特徵多項式找出可能的對角線項；但對角化仍要問特徵空間能否提供完整特徵基底。",
    },
    "zh-cn": {
        "title": "特征多项式：由根走到对角化测试",
        "subtitle": "行列式找出特征值；特征空间维数决定它们是否足够。",
        "visual": {
            "input": "矩阵输入",
            "shift": "减去 xI",
            "det": "行列式",
            "poly": "多项式",
            "roots": "根",
            "eigenvalues": "特征值",
            "algebraic": "代数重数",
            "geometric": "几何重数",
            "null": "零空间",
            "fail": "特征向量不足",
            "pass": "特征向量足够",
            "test": "对角化测试",
            "distinct": "互异根",
            "dimension": "维数计数",
            "warning": "重根只是警号",
        },
        "states": [
            (
                "把行列式判准打包成一个多项式",
                "标量 lambda 是特征值，当且仅当 det(A-lambda I)=0，所以 p_A(x)=det(A-xI) 一次性记录所有候选值。",
                "p_A(x)=det(A-xI)",
            ),
            (
                "因式分解多项式以读出特征值",
                "对来源矩阵，行列式化简为 x^2-x-12，因此根是 4 与 -3。",
                "p_A(x)=(x-4)(x+3)",
            ),
            (
                "重根带来重数问题",
                "对 B=[[2,3],[0,2]]，唯一的根是 2，但它在特征多项式中出现两次。",
                "m_a(2)=2",
            ),
            (
                "特征空间维数是另一个计数",
                "解 (B-2I)v=0 只得到一个线性无关特征向量，所以几何重数较小。",
                "m_g(2)=1 < m_a(2)",
            ),
            (
                "对角化只在特征方向足够时成功",
                "把所有特征空间维数相加；总和必须等于矩阵大小 n。",
                "dim E(lambda_1)+...+dim E(lambda_s)=n",
            ),
            (
                "互异特征值是快速充分测试",
                "如果 n 乘 n 矩阵有 n 个互异特征值，对应特征向量会自动线性无关。",
                "n 个互异特征值 => 可对角化",
            ),
        ],
        "conclusion": "特征多项式找出可能的对角线项；但对角化仍要问特征空间能否提供完整特征基。",
    },
}


class CharacteristicPolynomialDiagonalizationTestStoryBase(Scene):
    """MATH1030 8.3: characteristic polynomial roots and diagonalization tests."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def phrase(self, en, zh_hk, zh_cn):
        return {"en": en, "zh-hk": zh_hk, "zh-cn": zh_cn}[self.locale]

    def formula_card(self, title, body, color=GREEN_B, width=5.6, height=0.82):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
        )
        title_mob = self.label(title, font_size=16, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=21, max_width=width * 0.88)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content)

    def state_card(self, index):
        state = TEXT[self.locale]["states"][index]
        box = RoundedRectangle(
            corner_radius=0.1,
            width=12.2,
            height=1.22,
            stroke_color=GRAY_C,
            fill_color=BLACK,
            fill_opacity=0.28,
        )
        title = self.label(state[0], font_size=20, color=YELLOW_B, weight=MEDIUM, max_width=11.2)
        detail = self.label(state[1], font_size=15, color=GRAY_A, max_width=11.1)
        formula = self.label(state[2], font_size=21, color=GREEN_B, weight=MEDIUM, max_width=10.8)
        content = VGroup(title, detail, formula).arrange(DOWN, buff=0.07).move_to(box)
        return VGroup(box, content).to_edge(DOWN, buff=0.24)

    def matrix_grid(self, rows, color=BLUE_B, highlights=(), cell_width=0.62, cell_height=0.44):
        row_count = len(rows)
        col_count = len(rows[0])
        cells = VGroup()
        values = VGroup()
        highlights = set(highlights)
        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - (col_count - 1) / 2) * cell_width
                y = ((row_count - 1) / 2 - row_index) * cell_height
                is_highlight = (row_index, col_index) in highlights
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.2,
                    stroke_color=YELLOW_B if is_highlight else color,
                    fill_color=YELLOW_E if is_highlight else BLACK,
                    fill_opacity=0.36 if is_highlight else 0.16,
                ).move_to([x, y, 0])
                value_mob = self.label(value, font_size=18, max_width=cell_width * 0.78).move_to(cell)
                cells.add(cell)
                values.add(value_mob)
        return VGroup(cells, values)

    def titled_matrix(self, title, rows, color=BLUE_B, highlights=(), width=2.3):
        matrix = self.matrix_grid(rows, color=color, highlights=highlights)
        title_mob = self.label(title, font_size=17, color=color, weight=MEDIUM, max_width=width)
        return VGroup(title_mob, matrix).arrange(DOWN, buff=0.15)

    def arrow_label(self, text, color=GRAY_A):
        arrow = Arrow(LEFT * 0.55, RIGHT * 0.55, buff=0.12, color=color, stroke_width=2.5)
        label = self.label(text, font_size=13, color=color, weight=MEDIUM, max_width=1.15)
        label.next_to(arrow, UP, buff=0.05)
        return VGroup(arrow, label)

    def determinant_pipeline(self):
        v = TEXT[self.locale]["visual"]
        matrix_a = self.titled_matrix("A", [["3", "2"], ["3", "-2"]], BLUE_B)
        shifted = self.titled_matrix("A-xI", [["3-x", "2"], ["3", "-2-x"]], PURPLE_B, highlights={(0, 0), (1, 1)}, width=2.5)
        det_card = self.formula_card(v["det"], "(3-x)(-2-x)-6", TEAL_B, width=3.35, height=0.74)
        poly_card = self.formula_card(v["poly"], "x^2-x-12", GREEN_B, width=2.7, height=0.74)
        group = VGroup(
            matrix_a,
            self.arrow_label(v["shift"], PURPLE_B),
            shifted,
            self.arrow_label(v["det"], TEAL_B),
            det_card,
            self.arrow_label(v["poly"], GREEN_B),
            poly_card,
        ).arrange(RIGHT, buff=0.24)
        group.scale_to_fit_width(11.4)
        return group

    def roots_panel(self):
        v = TEXT[self.locale]["visual"]
        line = NumberLine(x_range=[-4, 5, 1], length=5.8, color=GRAY_B, include_ticks=True, include_numbers=False)
        marks = VGroup()
        for x, label, color in [(-3, "-3", PURPLE_B), (4, "4", GREEN_B)]:
            dot = Dot(line.n2p(x), color=color, radius=0.08)
            tag = self.label(label, font_size=18, color=color, weight=MEDIUM, max_width=0.7).next_to(dot, UP, buff=0.1)
            marks.add(VGroup(dot, tag))
        roots = self.formula_card(v["roots"], "x=4, -3", YELLOW_B, width=2.4, height=0.74)
        eigen = self.formula_card(v["eigenvalues"], "lambda=4, -3", GREEN_B, width=2.8, height=0.74)
        cards = VGroup(roots, self.arrow_label(v["eigenvalues"], GREEN_B), eigen).arrange(RIGHT, buff=0.22)
        return VGroup(line, marks, cards).arrange(DOWN, buff=0.22)

    def repeated_root_panel(self):
        v = TEXT[self.locale]["visual"]
        matrix_b = self.titled_matrix("B", [["2", "3"], ["0", "2"]], BLUE_B, highlights={(0, 0), (1, 1)})
        poly = self.formula_card(v["algebraic"], "p_B(x)=(2-x)^2", YELLOW_B, width=3.65, height=0.78)
        root = self.formula_card(
            v["warning"],
            self.phrase("root 2 appears twice", "根 2 出現兩次", "根 2 出现两次"),
            ORANGE,
            width=3.65,
            height=0.78,
        )
        return VGroup(matrix_b, VGroup(poly, root).arrange(DOWN, buff=0.18)).arrange(RIGHT, buff=0.42)

    def null_space_panel(self):
        v = TEXT[self.locale]["visual"]
        shifted = self.titled_matrix("B-2I", [["0", "3"], ["0", "0"]], PURPLE_B, highlights={(0, 1)})
        null = self.formula_card(v["null"], "v=(t,0)", TEAL_B, width=2.7, height=0.74)
        geom = self.formula_card(v["geometric"], "dim E_B(2)=1", GREEN_B, width=3.15, height=0.74)
        fail = self.formula_card(v["fail"], "1 < 2", RED_B, width=2.1, height=0.74)
        return VGroup(shifted, self.arrow_label(v["null"], TEAL_B), null, geom, fail).arrange(RIGHT, buff=0.28)

    def dimension_test_panel(self):
        v = TEXT[self.locale]["visual"]
        fail_title = self.label("B", font_size=22, color=RED_B, weight=MEDIUM, max_width=1.0)
        fail_bar = VGroup(
            Rectangle(width=0.85, height=0.55, stroke_color=RED_B, fill_color=RED_E, fill_opacity=0.45),
            self.label("1", font_size=21, color=RED_B, weight=MEDIUM, max_width=0.5),
        )
        fail_bar[1].move_to(fail_bar[0])
        fail_note = self.formula_card(v["fail"], "1 != 2", RED_B, width=2.2, height=0.72)
        fail_group = VGroup(fail_title, fail_bar, fail_note).arrange(DOWN, buff=0.16)

        pass_title = self.label("A", font_size=22, color=GREEN_B, weight=MEDIUM, max_width=1.0)
        pass_bars = VGroup()
        for label, color in [("1", GREEN_B), ("2", TEAL_B)]:
            rect = Rectangle(width=0.85, height=0.55, stroke_color=color, fill_color=color, fill_opacity=0.35)
            num = self.label(label, font_size=21, color=WHITE, weight=MEDIUM, max_width=0.5).move_to(rect)
            pass_bars.add(VGroup(rect, num))
        plus = self.label("+", font_size=26, color=GRAY_A, max_width=0.4)
        equals = self.label("= 3", font_size=23, color=GREEN_B, weight=MEDIUM, max_width=0.9)
        pass_line = VGroup(pass_bars[0], plus, pass_bars[1], equals).arrange(RIGHT, buff=0.13)
        pass_note = self.formula_card(v["pass"], "dim E(4)+dim E(1)=3", GREEN_B, width=4.0, height=0.72)
        pass_group = VGroup(pass_title, pass_line, pass_note).arrange(DOWN, buff=0.16)

        return VGroup(fail_group, pass_group).arrange(RIGHT, buff=1.25)

    def final_test_panel(self):
        v = TEXT[self.locale]["visual"]
        root_box = self.formula_card(
            v["distinct"],
            self.phrase("n roots", "n 個根", "n 个根"),
            YELLOW_B,
            width=2.3,
            height=0.76,
        )
        indep_box = self.formula_card(
            v["eigenvalues"],
            self.phrase("n independent vectors", "n 個線性無關向量", "n 个线性无关向量"),
            TEAL_B,
            width=3.6,
            height=0.76,
        )
        diag_box = self.formula_card(
            v["test"],
            self.phrase("diagonalizable", "可對角化", "可对角化"),
            GREEN_B,
            width=2.9,
            height=0.76,
        )
        top = VGroup(root_box, self.arrow_label("", GRAY_A), indep_box, self.arrow_label("", GRAY_A), diag_box).arrange(RIGHT, buff=0.2)
        criterion = self.formula_card(v["dimension"], "sum dim E_A(lambda_i)=n", GREEN_B, width=5.2, height=0.82)
        return VGroup(top, criterion).arrange(DOWN, buff=0.34)

    def construct(self):
        t = TEXT[self.locale]
        title = self.label(t["title"], font_size=27, color=YELLOW_B, weight=MEDIUM, max_width=11.4)
        subtitle = self.label(t["subtitle"], font_size=16, color=GRAY_A, max_width=10.4)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.12).to_edge(UP, buff=0.28)
        self.play(FadeIn(header, shift=DOWN * 0.15), run_time=0.8)

        visuals = [
            self.determinant_pipeline(),
            VGroup(self.formula_card("p_A(x)", "(x-4)(x+3)", GREEN_B, width=3.3), self.roots_panel()).arrange(DOWN, buff=0.32),
            self.repeated_root_panel(),
            self.null_space_panel(),
            self.dimension_test_panel(),
            self.final_test_panel(),
        ]
        state = self.state_card(0)
        visual = visuals[0].move_to(UP * 0.45)
        self.play(FadeIn(visual, shift=UP * 0.12), FadeIn(state), run_time=0.75)
        self.wait(1.0)

        for index in range(1, 6):
            next_visual = visuals[index].move_to(UP * 0.45)
            next_state = self.state_card(index)
            self.play(
                FadeOut(visual, shift=LEFT * 0.2),
                FadeOut(state, shift=DOWN * 0.1),
                run_time=0.35,
            )
            visual = next_visual
            state = next_state
            self.play(FadeIn(visual, shift=RIGHT * 0.2), FadeIn(state, shift=UP * 0.08), run_time=0.55)
            self.wait(1.0)

        self.play(FadeOut(visual), FadeOut(state), run_time=0.35)
        conclusion_box = RoundedRectangle(
            corner_radius=0.12,
            width=10.8,
            height=1.5,
            stroke_color=GREEN_B,
            fill_color=BLACK,
            fill_opacity=0.32,
        )
        conclusion = self.label(t["conclusion"], font_size=20, color=GREEN_B, weight=MEDIUM, max_width=9.7)
        conclusion_group = VGroup(conclusion_box, conclusion.move_to(conclusion_box)).move_to(ORIGIN)
        self.play(FadeIn(conclusion_group, shift=UP * 0.1), run_time=0.65)
        self.wait(1.1)


class CharacteristicPolynomialDiagonalizationTestStoryEn(CharacteristicPolynomialDiagonalizationTestStoryBase):
    locale = "en"


class CharacteristicPolynomialDiagonalizationTestStoryZhHk(CharacteristicPolynomialDiagonalizationTestStoryBase):
    locale = "zh-hk"


class CharacteristicPolynomialDiagonalizationTestStoryZhCn(CharacteristicPolynomialDiagonalizationTestStoryBase):
    locale = "zh-cn"


class CharacteristicPolynomialDiagonalizationTestStory(CharacteristicPolynomialDiagonalizationTestStoryEn):
    pass
