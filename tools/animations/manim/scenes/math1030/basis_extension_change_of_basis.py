from manim import *


TEXT = {
    "en": {
        "title": "Change of basis: same vector, new coordinates",
        "subtitle": "A change-of-basis matrix translates coordinate language.",
        "visual": {
            "plane": "same plane W",
            "u_basis": "U-basis",
            "v_basis": "V-basis",
            "ordered": "ordered bases",
            "columns": "columns of S",
            "matrix_rule": "matrix rule",
            "convert": "convert coordinates",
            "same_vector": "same vector",
            "direction": "direction matters",
            "key_rule": "key rule",
            "u1_column": "u1 in V-coordinates",
            "u2_column": "u2 in V-coordinates",
            "forward": "U-coordinates -> V-coordinates",
            "backward": "V-coordinates -> U-coordinates",
            "not_move": "x does not move",
        },
        "states": [
            (
                "Two bases describe one plane",
                "The bases U=(u1,u2) and V=(v1,v2) both describe the same subspace W.",
                "basis changes compare coordinate systems",
            ),
            (
                "Columns of S are coordinate recipes",
                "The first column says u1=v1+v2; the second says u2=-v1+v2.",
                "S = [[1,-1],[1,1]]",
            ),
            (
                "The matrix equality packages both recipes",
                "Writing U=VS means each U-basis vector has been rewritten in the V-basis.",
                "U = V S",
            ),
            (
                "Convert the coordinate column",
                "If [x]_U=(3,2)^T, multiply by S to express the same vector in V-coordinates.",
                "[x]_V = S[x]_U = (1,5)^T",
            ),
            (
                "The vector has not changed",
                "The ambient vector is still x; only the coordinate description has changed.",
                "3u1+2u2 = v1+5v2",
            ),
            (
                "Use the inverse for the reverse trip",
                "S sends U-coordinates to V-coordinates, while S^{-1} sends V-coordinates back to U-coordinates.",
                "[x]_U = S^{-1}[x]_V",
            ),
        ],
        "conclusion": "A change-of-basis matrix does not move the vector in space. It rewrites the coordinate column from one ordered basis into another.",
    },
    "zh-hk": {
        "title": "基變換：同一向量，新的坐標",
        "subtitle": "基變換矩陣是在翻譯坐標語言。",
        "visual": {
            "plane": "同一平面 W",
            "u_basis": "U 基底",
            "v_basis": "V 基底",
            "ordered": "有序基底",
            "columns": "S 的各列",
            "matrix_rule": "矩陣規則",
            "convert": "轉換坐標",
            "same_vector": "同一向量",
            "direction": "方向要分清",
            "key_rule": "重點規則",
            "u1_column": "u1 的 V-坐標",
            "u2_column": "u2 的 V-坐標",
            "forward": "U-坐標 -> V-坐標",
            "backward": "V-坐標 -> U-坐標",
            "not_move": "x 沒有移動",
        },
        "states": [
            (
                "兩組基底描述同一平面",
                "U=(u1,u2) 和 V=(v1,v2) 都描述同一個子空間 W。",
                "基變換是在比較坐標系統",
            ),
            (
                "S 的各列是坐標配方",
                "第一列表示 u1=v1+v2；第二列表示 u2=-v1+v2。",
                "S = [[1,-1],[1,1]]",
            ),
            (
                "矩陣等式包起兩個配方",
                "寫成 U=VS，意思是每個 U 基底向量都已改寫成 V 基底表示。",
                "U = V S",
            ),
            (
                "轉換坐標列",
                "若 [x]_U=(3,2)^T，乘以 S 便可用 V-坐標描述同一個向量。",
                "[x]_V = S[x]_U = (1,5)^T",
            ),
            (
                "向量本身沒有改變",
                "環境空間中的向量仍然是 x；改變的只是坐標描述。",
                "3u1+2u2 = v1+5v2",
            ),
            (
                "反方向要用逆矩陣",
                "S 把 U-坐標送到 V-坐標；S^{-1} 則把 V-坐標送回 U-坐標。",
                "[x]_U = S^{-1}[x]_V",
            ),
        ],
        "conclusion": "基變換矩陣不是把空間中的向量移走，而是把坐標列由一組有序基底翻譯到另一組有序基底。",
    },
    "zh-cn": {
        "title": "基变换：同一向量，新的坐标",
        "subtitle": "基变换矩阵是在翻译坐标语言。",
        "visual": {
            "plane": "同一平面 W",
            "u_basis": "U 基",
            "v_basis": "V 基",
            "ordered": "有序基",
            "columns": "S 的各列",
            "matrix_rule": "矩阵规则",
            "convert": "转换坐标",
            "same_vector": "同一向量",
            "direction": "方向要分清",
            "key_rule": "重点规则",
            "u1_column": "u1 的 V-坐标",
            "u2_column": "u2 的 V-坐标",
            "forward": "U-坐标 -> V-坐标",
            "backward": "V-坐标 -> U-坐标",
            "not_move": "x 没有移动",
        },
        "states": [
            (
                "两组基描述同一平面",
                "U=(u1,u2) 和 V=(v1,v2) 都描述同一个子空间 W。",
                "基变换是在比较坐标系统",
            ),
            (
                "S 的各列是坐标配方",
                "第一列表示 u1=v1+v2；第二列表示 u2=-v1+v2。",
                "S = [[1,-1],[1,1]]",
            ),
            (
                "矩阵等式包起两个配方",
                "写成 U=VS，意思是每个 U 基向量都已改写成 V 基表示。",
                "U = V S",
            ),
            (
                "转换坐标列",
                "若 [x]_U=(3,2)^T，乘以 S 便可用 V-坐标描述同一个向量。",
                "[x]_V = S[x]_U = (1,5)^T",
            ),
            (
                "向量本身没有改变",
                "环境空间中的向量仍然是 x；改变的只是坐标描述。",
                "3u1+2u2 = v1+5v2",
            ),
            (
                "反方向要用逆矩阵",
                "S 把 U-坐标送到 V-坐标；S^{-1} 则把 V-坐标送回 U-坐标。",
                "[x]_U = S^{-1}[x]_V",
            ),
        ],
        "conclusion": "基变换矩阵不是把空间中的向量移走，而是把坐标列由一组有序基翻译到另一组有序基。",
    },
}


class BasisExtensionChangeOfBasisStoryBase(Scene):
    """MATH1030 6.8: basis extension context and change-of-basis coordinates."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def formula_card(self, title, body, color=GREEN_B, width=5.9, height=0.88):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
        )
        title_mob = self.label(title, font_size=17, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=21, max_width=width * 0.9)
        return VGroup(box, VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box))

    def matrix_grid(self, rows, color=BLUE_B, highlights=()):
        row_count = len(rows)
        col_count = len(rows[0])
        cell_width = 0.62
        cell_height = 0.48
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
                    fill_opacity=0.42 if is_highlight else 0.16,
                ).move_to([x, y, 0])
                value_mob = self.label(value, font_size=20, max_width=cell_width * 0.72).move_to(cell)
                cells.add(cell)
                values.add(value_mob)

        left = Text("[", font=self.font, font_size=66).next_to(cells, LEFT, buff=0.05)
        right = Text("]", font=self.font, font_size=66).next_to(cells, RIGHT, buff=0.05)
        return VGroup(cells, values, left, right)

    def matrix_panel(self, title, rows, color=BLUE_B, highlights=()):
        title_mob = self.label(title, font_size=19, color=color, weight=MEDIUM, max_width=2.4)
        matrix = self.matrix_grid(rows, color=color, highlights=highlights)
        return VGroup(title_mob, matrix).arrange(DOWN, buff=0.14)

    def small_operator(self, value, width=0.55):
        return self.label(value, font_size=27, color=GRAY_A, weight=MEDIUM, max_width=width)

    def arrow_vector(self, end, color, label):
        arrow = Arrow(ORIGIN, end, buff=0, stroke_width=5, color=color, max_tip_length_to_length_ratio=0.14)
        label_mob = self.label(label, font_size=19, color=color, weight=MEDIUM, max_width=0.9).next_to(arrow.get_end(), UP, buff=0.05)
        return VGroup(arrow, label_mob)

    def basis_plane(self):
        labels = TEXT[self.locale]["visual"]
        plane = Polygon(
            LEFT * 2.75 + DOWN * 1.15,
            RIGHT * 2.75 + DOWN * 1.15,
            RIGHT * 2.35 + UP * 1.1,
            LEFT * 2.35 + UP * 1.1,
            stroke_color=BLUE_B,
            fill_color=BLUE_E,
            fill_opacity=0.12,
        )
        plane_label = self.label(labels["plane"], font_size=19, color=BLUE_B, weight=MEDIUM).next_to(plane, UP, buff=0.06)
        origin_dot = Dot(ORIGIN, radius=0.045, color=GRAY_A)

        u1 = self.arrow_vector(RIGHT * 1.65 + UP * 0.48, BLUE_B, "u1")
        u2 = self.arrow_vector(LEFT * 0.72 + UP * 0.98, PURPLE_B, "u2")
        v1 = self.arrow_vector(RIGHT * 1.1 + DOWN * 0.62, GREEN_B, "v1")
        v2 = self.arrow_vector(RIGHT * 0.55 + UP * 1.05, YELLOW_B, "v2")
        x_arrow = self.arrow_vector(RIGHT * 1.9 + UP * 0.9, WHITE, "x")

        return VGroup(plane, plane_label, origin_dot, v1, v2, u1, u2, x_arrow)

    def basis_language_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.basis_plane()
        cards = VGroup(
            self.formula_card(labels["u_basis"], "U=(u1,u2)", color=BLUE_B, width=2.8),
            self.formula_card(labels["v_basis"], "V=(v1,v2)", color=GREEN_B, width=2.8),
        ).arrange(RIGHT, buff=0.28)
        return VGroup(plane, cards).arrange(DOWN, buff=0.24)

    def columns_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = VGroup(
            self.formula_card(labels["u1_column"], "u1 = v1 + v2", color=BLUE_B, width=3.4),
            self.formula_card(labels["u2_column"], "u2 = -v1 + v2", color=PURPLE_B, width=3.4),
        ).arrange(DOWN, buff=0.18)
        matrix = self.matrix_panel("S", [["1", "-1"], ["1", "1"]], color=GREEN_B, highlights=((0, 0), (1, 0)))
        columns = VGroup(
            self.formula_card("col 1", "[1; 1]", color=BLUE_B, width=1.9),
            self.formula_card("col 2", "[-1; 1]", color=PURPLE_B, width=1.9),
        ).arrange(RIGHT, buff=0.14)
        right = VGroup(matrix, columns).arrange(DOWN, buff=0.18)
        return VGroup(left, right).arrange(RIGHT, buff=0.42)

    def matrix_rule_visual(self):
        labels = TEXT[self.locale]["visual"]
        u = self.formula_card(labels["u_basis"], "U=[u1 u2]", color=BLUE_B, width=2.6)
        v = self.formula_card(labels["v_basis"], "V=[v1 v2]", color=GREEN_B, width=2.6)
        s = self.matrix_panel("S", [["1", "-1"], ["1", "1"]], color=YELLOW_B)
        row = VGroup(u, self.small_operator("=", width=0.3), v, s).arrange(RIGHT, buff=0.18)
        note = self.formula_card(labels["matrix_rule"], "U = V S", color=GREEN_B, width=4.4)
        return VGroup(row, note).arrange(DOWN, buff=0.28)

    def coordinate_conversion_visual(self):
        labels = TEXT[self.locale]["visual"]
        xu = self.matrix_panel("[x]_U", [["3"], ["2"]], color=BLUE_B)
        s = self.matrix_panel("S", [["1", "-1"], ["1", "1"]], color=YELLOW_B)
        xv = self.matrix_panel("[x]_V", [["1"], ["5"]], color=GREEN_B)
        row = VGroup(xv, self.small_operator("=", width=0.3), s, xu).arrange(RIGHT, buff=0.18)
        note = self.formula_card(labels["convert"], "[x]_V = S[x]_U", color=GREEN_B, width=4.8)
        return VGroup(row, note).arrange(DOWN, buff=0.28)

    def same_vector_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.basis_plane().scale(0.9)
        cards = VGroup(
            self.formula_card(labels["u_basis"], "x = 3u1 + 2u2", color=BLUE_B, width=3.1),
            self.formula_card(labels["not_move"], "x", color=WHITE, width=1.4),
            self.formula_card(labels["v_basis"], "x = v1 + 5v2", color=GREEN_B, width=3.1),
        ).arrange(RIGHT, buff=0.18)
        if cards.width > 7.0:
            cards.scale_to_fit_width(7.0)
        return VGroup(plane, cards).arrange(DOWN, buff=0.22)

    def direction_visual(self):
        labels = TEXT[self.locale]["visual"]
        forward = self.formula_card(labels["forward"], "[x]_V = S[x]_U", color=GREEN_B, width=3.5)
        backward = self.formula_card(labels["backward"], "[x]_U = S^{-1}[x]_V", color=PURPLE_B, width=3.5)
        arrow = Arrow(LEFT * 0.72, RIGHT * 0.72, color=GRAY_B, stroke_width=3)
        top = VGroup(forward, arrow, backward).arrange(RIGHT, buff=0.18)
        order = self.formula_card(labels["ordered"], "(u1,u2) != (u2,u1)", color=YELLOW_B, width=5.4)
        return VGroup(top, order).arrange(DOWN, buff=0.34)

    def fit_visual(self, visual, max_width=7.55, max_height=3.35):
        if visual.width > max_width:
            visual.scale_to_fit_width(max_width)
        if visual.height > max_height:
            visual.scale_to_fit_height(max_height)
        return visual

    def make_visual(self, index):
        builders = [
            self.basis_language_visual,
            self.columns_visual,
            self.matrix_rule_visual,
            self.coordinate_conversion_visual,
            self.same_vector_visual,
            self.direction_visual,
        ]
        return self.fit_visual(builders[index]())

    def construct(self):
        data = TEXT[self.locale]
        labels = data["visual"]
        title = self.label(data["title"], font_size=33, color=BLUE_B, weight=BOLD, max_width=7.55)
        subtitle = self.label(data["subtitle"], font_size=19, color=GRAY_A, max_width=7.55)
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


class BasisExtensionChangeOfBasisStoryEn(BasisExtensionChangeOfBasisStoryBase):
    locale = "en"
    font = "Avenir Next"


class BasisExtensionChangeOfBasisStoryZhHk(BasisExtensionChangeOfBasisStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class BasisExtensionChangeOfBasisStoryZhCn(BasisExtensionChangeOfBasisStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class BasisExtensionChangeOfBasisStory(BasisExtensionChangeOfBasisStoryEn):
    pass
