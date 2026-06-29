from manim import *


TEXT = {
    "en": {
        "title": "Diagonalization: use eigenvectors as coordinates",
        "subtitle": "A full eigenbasis turns the matrix action into a diagonal action.",
        "visual": {
            "source": "source matrix",
            "eigenbasis": "eigenbasis",
            "same_order": "same order",
            "columns": "columns of S",
            "diagonal": "diagonal entries",
            "column_package": "column package",
            "basis_change": "basis change",
            "no_mixing": "no coordinate mixing",
            "power": "powers become easy",
            "full_basis": "full basis required",
            "invertible": "S must be invertible",
            "not_enough": "not enough directions",
            "standard": "standard coordinates",
            "eigen": "eigenvector coordinates",
            "line1": "λ=4 direction",
            "line2": "λ=-3 direction",
        },
        "states": [
            (
                "Start with directions that survive C",
                "The source matrix has two independent eigendirections: one scales by 4 and the other reverses and scales by 3.",
                "Cv1=4v1,  Cv2=-3v2",
            ),
            (
                "Put the eigenvectors into S",
                "The columns of S are the eigenvectors, and the matching eigenvalues go down the diagonal in the same order.",
                "S=[v1 v2],  D=diag(4,-3)",
            ),
            (
                "AS=SD packages every eigenvector equation",
                "The first column compares Cv1 with 4v1; the second compares Cv2 with -3v2.",
                "CS = SD",
            ),
            (
                "Multiply by S inverse to see similarity",
                "Because S is invertible, the same relation becomes a diagonalization of C.",
                "S^{-1}CS = D",
            ),
            (
                "In eigenvector coordinates, C acts diagonally",
                "A coordinate column (a,b) becomes (4a,-3b); the coordinates do not mix.",
                "[x]_S -> D[x]_S",
            ),
            (
                "Diagonalization needs a full eigenbasis",
                "One eigendirection is useful, but not enough. We need n independent eigenvectors so S has an inverse.",
                "diagonalizable <=> eigenbasis",
            ),
        ],
        "conclusion": "Diagonalization is not a trick for guessing S. It is the basis-change form of a full set of independent eigenvector equations.",
    },
    "zh-hk": {
        "title": "對角化：用特徵向量作坐標",
        "subtitle": "完整特徵基底會把矩陣作用變成對角作用。",
        "visual": {
            "source": "來源矩陣",
            "eigenbasis": "特徵基底",
            "same_order": "次序一致",
            "columns": "S 的各列",
            "diagonal": "對角線項",
            "column_package": "按列打包",
            "basis_change": "基底變換",
            "no_mixing": "坐標不混合",
            "power": "冪次變容易",
            "full_basis": "需要完整基底",
            "invertible": "S 必須可逆",
            "not_enough": "方向不足",
            "standard": "標準坐標",
            "eigen": "特徵向量坐標",
            "line1": "λ=4 方向",
            "line2": "λ=-3 方向",
        },
        "states": [
            (
                "由 C 保留下來的方向開始",
                "來源矩陣有兩個線性無關的特徵方向：一個被乘以 4，另一個反向並被乘以 3。",
                "Cv1=4v1,  Cv2=-3v2",
            ),
            (
                "把特徵向量放入 S",
                "S 的各列是特徵向量；相應特徵值要用同一次序放在 D 的對角線上。",
                "S=[v1 v2],  D=diag(4,-3)",
            ),
            (
                "AS=SD 打包所有特徵向量方程",
                "第一列比較 Cv1 與 4v1；第二列比較 Cv2 與 -3v2。",
                "CS = SD",
            ),
            (
                "乘以 S 的逆便看見相似",
                "因為 S 可逆，同一條關係會變成 C 的一個對角化。",
                "S^{-1}CS = D",
            ),
            (
                "在特徵向量坐標中，C 作對角作用",
                "坐標列 (a,b) 會變成 (4a,-3b)；兩個坐標不會互相混合。",
                "[x]_S -> D[x]_S",
            ),
            (
                "對角化需要完整特徵基底",
                "一個特徵方向有用，但仍不足夠。我們需要 n 個線性無關特徵向量，使 S 有逆矩陣。",
                "可對角化 <=> 特徵基底",
            ),
        ],
        "conclusion": "對角化不是靠運氣猜 S；它是一整組線性無關特徵向量方程的基底變換形式。",
    },
    "zh-cn": {
        "title": "对角化：用特征向量作坐标",
        "subtitle": "完整特征基会把矩阵作用变成对角作用。",
        "visual": {
            "source": "来源矩阵",
            "eigenbasis": "特征基",
            "same_order": "次序一致",
            "columns": "S 的各列",
            "diagonal": "对角线项",
            "column_package": "按列打包",
            "basis_change": "基变换",
            "no_mixing": "坐标不混合",
            "power": "幂次变容易",
            "full_basis": "需要完整基",
            "invertible": "S 必须可逆",
            "not_enough": "方向不足",
            "standard": "标准坐标",
            "eigen": "特征向量坐标",
            "line1": "λ=4 方向",
            "line2": "λ=-3 方向",
        },
        "states": [
            (
                "由 C 保留下来的方向开始",
                "来源矩阵有两个线性无关的特征方向：一个被乘以 4，另一个反向并被乘以 3。",
                "Cv1=4v1,  Cv2=-3v2",
            ),
            (
                "把特征向量放入 S",
                "S 的各列是特征向量；相应特征值要用同一次序放在 D 的对角线上。",
                "S=[v1 v2],  D=diag(4,-3)",
            ),
            (
                "AS=SD 打包所有特征向量方程",
                "第一列比较 Cv1 与 4v1；第二列比较 Cv2 与 -3v2。",
                "CS = SD",
            ),
            (
                "乘以 S 的逆便看见相似",
                "因为 S 可逆，同一条关系会变成 C 的一个对角化。",
                "S^{-1}CS = D",
            ),
            (
                "在特征向量坐标中，C 作对角作用",
                "坐标列 (a,b) 会变成 (4a,-3b)；两个坐标不会互相混合。",
                "[x]_S -> D[x]_S",
            ),
            (
                "对角化需要完整特征基",
                "一个特征方向有用，但仍不足够。我们需要 n 个线性无关特征向量，使 S 有逆矩阵。",
                "可对角化 <=> 特征基",
            ),
        ],
        "conclusion": "对角化不是靠运气猜 S；它是一整组线性无关特征向量方程的基变换形式。",
    },
}


class DiagonalizationSimilarityEigenbasisStoryBase(Scene):
    """MATH1030 8.2: diagonalization as a change of basis to an eigenbasis."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def phrase(self, en, zh_hk, zh_cn):
        return {"en": en, "zh-hk": zh_hk, "zh-cn": zh_cn}[self.locale]

    def formula_card(self, title, body, color=GREEN_B, width=5.8, height=0.84):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
        )
        title_mob = self.label(title, font_size=16, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=21, max_width=width * 0.9)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content)

    def matrix_grid(self, rows, color=BLUE_B, highlights=(), cell_width=0.58, cell_height=0.44):
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
                value_mob = self.label(value, font_size=19, max_width=cell_width * 0.74).move_to(cell)
                cells.add(cell)
                values.add(value_mob)
        return VGroup(cells, values)

    def titled_matrix(self, title, rows, color=BLUE_B, highlights=(), width=2.0):
        matrix = self.matrix_grid(rows, color=color, highlights=highlights)
        title_mob = self.label(title, font_size=18, color=color, weight=MEDIUM, max_width=width)
        group = VGroup(title_mob, matrix).arrange(DOWN, buff=0.16)
        return group

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
        detail = self.label(state[1], font_size=15, color=GRAY_A, max_width=11.0)
        formula = self.label(state[2], font_size=21, color=GREEN_B, weight=MEDIUM, max_width=10.8)
        content = VGroup(title, detail, formula).arrange(DOWN, buff=0.07).move_to(box)
        return VGroup(box, content).to_edge(DOWN, buff=0.24)

    def eigenbasis_plane(self):
        v = TEXT[self.locale]["visual"]
        plane = NumberPlane(
            x_range=[-3, 3, 1],
            y_range=[-2, 2, 1],
            x_length=5.0,
            y_length=3.15,
            axis_config={"stroke_color": GRAY_B, "stroke_width": 1, "stroke_opacity": 0.46},
            background_line_style={"stroke_color": BLUE_E, "stroke_opacity": 0.18, "stroke_width": 1},
        )
        origin = Dot(plane.c2p(0, 0), radius=0.04, color=GRAY_A)
        line1 = Line(plane.c2p(-2.5, -1.25), plane.c2p(2.5, 1.25), color=GREEN_B, stroke_width=3)
        line2 = Line(plane.c2p(0.9, -2.0), plane.c2p(-0.9, 2.0), color=PURPLE_B, stroke_width=3)
        line1.set_opacity(0.46)
        line2.set_opacity(0.46)
        v1 = Arrow(plane.c2p(0, 0), plane.c2p(1.2, 0.6), buff=0, color=GREEN_B, stroke_width=5)
        cv1 = Arrow(plane.c2p(0, 0), plane.c2p(2.35, 1.18), buff=0, color=GREEN_A, stroke_width=6)
        v2 = Arrow(plane.c2p(0, 0), plane.c2p(-0.48, 1.45), buff=0, color=PURPLE_B, stroke_width=5)
        cv2 = Arrow(plane.c2p(0, 0), plane.c2p(0.72, -2.05), buff=0, color=PURPLE_A, stroke_width=6)
        label1 = self.label(v["line1"], font_size=16, color=GREEN_B, weight=MEDIUM, max_width=2.2)
        label2 = self.label(v["line2"], font_size=16, color=PURPLE_A, weight=MEDIUM, max_width=2.2)
        label1.next_to(line1.get_end(), DOWN, buff=0.08)
        label2.next_to(line2.get_end(), UP, buff=0.08)
        return VGroup(plane, origin, line1, line2, v1, cv1, v2, cv2, label1, label2)

    def source_visual(self):
        v = TEXT[self.locale]["visual"]
        plane = self.eigenbasis_plane()
        source = self.titled_matrix("C", [["3", "2"], ["3", "-2"]], color=BLUE_B)
        rel1 = self.formula_card(v["source"], "C=[[3,2],[3,-2]]", BLUE_B, width=3.45, height=0.74)
        rel2 = self.formula_card(v["eigenbasis"], "v1=(2,1), v2=(-1,3)", GREEN_B, width=3.95, height=0.74)
        rel3 = self.formula_card(v["same_order"], "Cv1=4v1, Cv2=-3v2", PURPLE_B, width=3.95, height=0.74)
        cards = VGroup(source, rel1, rel2, rel3).arrange(DOWN, buff=0.16)
        group = VGroup(plane, cards).arrange(RIGHT, buff=0.75)
        return group.move_to(UP * 0.2)

    def build_s_d_visual(self):
        v = TEXT[self.locale]["visual"]
        s_matrix = self.titled_matrix(
            "S=[v1 v2]",
            [["2", "-1"], ["1", "3"]],
            color=GREEN_B,
            highlights={(0, 0), (1, 0), (0, 1), (1, 1)},
            width=2.5,
        )
        d_matrix = self.titled_matrix(
            "D",
            [["4", "0"], ["0", "-3"]],
            color=PURPLE_B,
            highlights={(0, 0), (1, 1)},
            width=1.2,
        )
        arrow = Arrow(LEFT, RIGHT, color=GRAY_A, buff=0.18).scale(0.8)
        top = VGroup(s_matrix, arrow, d_matrix).arrange(RIGHT, buff=0.55)
        card1 = self.formula_card(
            v["columns"],
            self.phrase("col1=v1, col2=v2", "第1列=v1，第2列=v2", "第1列=v1，第2列=v2"),
            GREEN_B,
            width=3.35,
            height=0.74,
        )
        card2 = self.formula_card(
            v["diagonal"],
            self.phrase("diag entries: 4, -3", "對角線項：4, -3", "对角线项：4, -3"),
            PURPLE_B,
            width=3.35,
            height=0.74,
        )
        card3 = self.formula_card(
            v["same_order"],
            self.phrase("v_j matches D_jj", "v_j 配對 D_jj", "v_j 配对 D_jj"),
            YELLOW_B,
            width=3.35,
            height=0.74,
        )
        bottom = VGroup(card1, card2, card3).arrange(RIGHT, buff=0.18)
        return VGroup(top, bottom).arrange(DOWN, buff=0.48).move_to(UP * 0.18)

    def column_package_visual(self):
        v = TEXT[self.locale]["visual"]
        left = VGroup(
            self.titled_matrix("CS", [["8", "-3"], ["4", "9"]], color=BLUE_B),
            self.label("=", font_size=28, color=GRAY_A),
            self.titled_matrix("[Cv1 Cv2]", [["8", "-3"], ["4", "9"]], color=GREEN_B),
        ).arrange(RIGHT, buff=0.28)
        right = VGroup(
            self.titled_matrix("SD", [["8", "-3"], ["4", "9"]], color=PURPLE_B),
            self.label("=", font_size=28, color=GRAY_A),
            self.titled_matrix("[4v1 -3v2]", [["8", "-3"], ["4", "9"]], color=YELLOW_B),
        ).arrange(RIGHT, buff=0.28)
        brace_left = self.formula_card(
            v["column_package"],
            self.phrase("same two columns", "兩邊列向量相同", "两边列向量相同"),
            GREEN_B,
            width=3.6,
            height=0.72,
        )
        equation = self.formula_card("AS=SD", "CS = SD", YELLOW_B, width=3.0, height=0.72)
        brace_right = self.formula_card(
            v["same_order"],
            self.phrase("column j matches λ_j", "第 j 列配對 λ_j", "第 j 列配对 λ_j"),
            PURPLE_B,
            width=3.8,
            height=0.72,
        )
        return VGroup(left, right, VGroup(brace_left, equation, brace_right).arrange(RIGHT, buff=0.18)).arrange(
            DOWN, buff=0.34
        ).move_to(UP * 0.15)

    def similarity_visual(self):
        v = TEXT[self.locale]["visual"]
        chain = VGroup(
            self.formula_card(v["column_package"], "CS = SD", GREEN_B, width=3.2, height=0.82),
            self.label("=>", font_size=28, color=GRAY_A, weight=BOLD),
            self.formula_card(v["basis_change"], "S^{-1}CS = D", YELLOW_B, width=3.6, height=0.82),
        ).arrange(RIGHT, buff=0.38)
        matrices = VGroup(
            self.titled_matrix("S^{-1}", [["3/7", "1/7"], ["-1/7", "2/7"]], color=GRAY_A, width=1.8),
            self.label(" C ", font_size=26, color=BLUE_B, weight=MEDIUM),
            self.titled_matrix("S", [["2", "-1"], ["1", "3"]], color=GREEN_B, width=1.2),
            self.label(" = ", font_size=26, color=GRAY_A, weight=MEDIUM),
            self.titled_matrix("D", [["4", "0"], ["0", "-3"]], color=PURPLE_B, highlights={(0, 0), (1, 1)}),
        ).arrange(RIGHT, buff=0.2)
        return VGroup(chain, matrices).arrange(DOWN, buff=0.58).move_to(UP * 0.12)

    def diagonal_action_visual(self):
        v = TEXT[self.locale]["visual"]
        standard = self.formula_card(v["standard"], "x = S[a,b]^T", BLUE_B, width=3.65, height=0.78)
        eigen = self.formula_card(v["eigen"], "[x]_S = (a,b)^T", GREEN_B, width=3.65, height=0.78)
        action = VGroup(
            self.titled_matrix("[x]_S", [["a"], ["b"]], color=GREEN_B, width=1.3),
            self.label(" -> ", font_size=24, color=GRAY_A),
            self.titled_matrix("D[x]_S", [["4a"], ["-3b"]], color=PURPLE_B, width=1.4),
        ).arrange(RIGHT, buff=0.24)
        no_mixing = self.formula_card(
            v["no_mixing"],
            self.phrase(
                "first coordinate uses only a; second uses only b",
                "第一個坐標只用 a；第二個只用 b",
                "第一个坐标只用 a；第二个只用 b",
            ),
            YELLOW_B,
            width=6.6,
            height=0.78,
        )
        power = self.formula_card(v["power"], "D^m=diag(4^m,(-3)^m)", PURPLE_B, width=4.4, height=0.78)
        return VGroup(VGroup(standard, eigen).arrange(RIGHT, buff=0.28), action, no_mixing, power).arrange(
            DOWN, buff=0.28
        ).move_to(UP * 0.08)

    def full_basis_visual(self):
        v = TEXT[self.locale]["visual"]
        good = VGroup(
            self.eigenbasis_plane().scale(0.7),
            self.formula_card(
                v["full_basis"],
                self.phrase("2 independent eigenvectors", "2 個線性無關特徵向量", "2 个线性无关特征向量"),
                GREEN_B,
                width=3.4,
                height=0.72,
            ),
            self.formula_card(
                v["invertible"],
                self.phrase("S has an inverse", "S 有逆矩陣", "S 有逆矩阵"),
                YELLOW_B,
                width=3.4,
                height=0.72,
            ),
        ).arrange(DOWN, buff=0.16)
        bad_line = NumberPlane(
            x_range=[-2, 2, 1],
            y_range=[-1.5, 1.5, 1],
            x_length=3.1,
            y_length=2.0,
            axis_config={"stroke_color": GRAY_B, "stroke_width": 1, "stroke_opacity": 0.42},
            background_line_style={"stroke_color": BLUE_E, "stroke_opacity": 0.12, "stroke_width": 1},
        )
        line = Line(bad_line.c2p(-1.8, 0), bad_line.c2p(1.8, 0), color=RED_B, stroke_width=4)
        one_arrow = Arrow(bad_line.c2p(0, 0), bad_line.c2p(1.2, 0), buff=0, color=RED_A, stroke_width=5)
        bad = VGroup(
            VGroup(bad_line, line, one_arrow),
            self.formula_card(
                v["not_enough"],
                self.phrase("only one eigendirection", "只有一個特徵方向", "只有一个特征方向"),
                RED_B,
                width=3.4,
                height=0.72,
            ),
            self.formula_card(
                v["invertible"],
                self.phrase("no full S", "無法建立完整 S", "无法建立完整 S"),
                RED_B,
                width=3.4,
                height=0.72,
            ),
        ).arrange(DOWN, buff=0.16)
        arrow = self.label("vs", font_size=24, color=GRAY_A, weight=MEDIUM)
        return VGroup(good, arrow, bad).arrange(RIGHT, buff=0.45).move_to(UP * 0.06)

    def visual_for(self, index):
        return [
            self.source_visual,
            self.build_s_d_visual,
            self.column_package_visual,
            self.similarity_visual,
            self.diagonal_action_visual,
            self.full_basis_visual,
        ][index]()

    def construct(self):
        self.camera.background_color = "#111827"
        t = TEXT[self.locale]
        title = self.label(t["title"], font_size=30, color=YELLOW_B, weight=BOLD, max_width=12.0)
        subtitle = self.label(t["subtitle"], font_size=17, color=GRAY_A, max_width=11.4)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.12).to_edge(UP, buff=0.28)

        self.play(FadeIn(header, shift=DOWN * 0.12), run_time=0.7)

        current_visual = self.visual_for(0)
        current_state = self.state_card(0)
        self.play(FadeIn(current_visual, shift=UP * 0.12), FadeIn(current_state, shift=UP * 0.08), run_time=0.7)
        self.wait(1.15)

        for index in range(1, 6):
            next_visual = self.visual_for(index)
            next_state = self.state_card(index)
            self.play(
                FadeOut(current_visual, shift=UP * 0.08),
                FadeOut(current_state, shift=DOWN * 0.08),
                run_time=0.28,
            )
            self.play(FadeIn(next_visual, shift=UP * 0.1), FadeIn(next_state, shift=UP * 0.06), run_time=0.62)
            self.wait(1.05)
            current_visual = next_visual
            current_state = next_state

        conclusion = self.formula_card(
            self.phrase("key idea", "關鍵想法", "关键想法"),
            t["conclusion"],
            GREEN_B,
            width=10.5,
            height=1.0,
        )
        conclusion.move_to(UP * 0.05)
        self.play(FadeOut(current_visual), FadeOut(current_state), FadeIn(conclusion, shift=UP * 0.1), run_time=0.7)
        self.wait(1.0)


class DiagonalizationSimilarityEigenbasisStoryEn(DiagonalizationSimilarityEigenbasisStoryBase):
    locale = "en"
    font = "Avenir Next"


class DiagonalizationSimilarityEigenbasisStoryZhHk(DiagonalizationSimilarityEigenbasisStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class DiagonalizationSimilarityEigenbasisStoryZhCn(DiagonalizationSimilarityEigenbasisStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class DiagonalizationSimilarityEigenbasisStory(DiagonalizationSimilarityEigenbasisStoryEn):
    pass
