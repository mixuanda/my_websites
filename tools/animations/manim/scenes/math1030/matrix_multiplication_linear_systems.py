from manim import *


TEXT = {
    "en": {
        "title": "Matrix products package equations",
        "subtitle": "A row-by-column product becomes one equation per row.",
        "visual": {
            "left_matrix": "left matrix",
            "column_vector": "column vector",
            "result_vector": "result vector",
            "row_1": "row 1",
            "row_2": "row 2",
            "first_equation": "equation 1",
            "second_equation": "equation 2",
            "system": "system",
            "matrix_product": "matrix product",
            "full_product": "full product",
        },
        "states": [
            (
                "Check the matching size",
                "The 3 entries in a row of A match the 3 entries in x.",
                "2 x 3 times 3 x 1 gives 2 x 1",
            ),
            (
                "Pair row 1 with the vector",
                "The first output entry uses the whole first row, not one single entry.",
                "row 1 dot x",
            ),
            (
                "Read the first equation",
                "After setting Ax equal to b, the first output entry equals b1.",
                "a11*x1 + a12*x2 + a13*x3 = b1",
            ),
            (
                "Read the second equation",
                "The second row produces the second equation in the same way.",
                "a21*x1 + a22*x2 + a23*x3 = b2",
            ),
            (
                "Now Ax = b is a system",
                "The compact matrix equation is exactly a stack of row equations.",
                "two rows, two equations",
            ),
            (
                "A full AB repeats the idea",
                "Each column of B is multiplied by A, so AB is several Ax-style products side by side.",
                "columns of AB are A times columns of B",
            ),
        ],
        "conclusion": "The row-by-column rule is not just arithmetic: it is the reason a matrix equation can store an entire linear system.",
    },
    "zh-hk": {
        "title": "矩陣乘積打包方程",
        "subtitle": "行乘列的結果，就是每一行產生一條方程。",
        "visual": {
            "left_matrix": "左矩陣",
            "column_vector": "列向量",
            "result_vector": "結果向量",
            "row_1": "第 1 行",
            "row_2": "第 2 行",
            "first_equation": "方程 1",
            "second_equation": "方程 2",
            "system": "方程組",
            "matrix_product": "矩陣乘積",
            "full_product": "完整乘積",
        },
        "states": [
            (
                "先檢查吻合大小",
                "A 的每一行有 3 個元素，剛好配對 x 的 3 個元素。",
                "2 x 3 乘 3 x 1 得到 2 x 1",
            ),
            (
                "第 1 行與向量配對",
                "第一個輸出元素會用完整第 1 行，不是只用單一元素。",
                "第 1 行與 x 做內積",
            ),
            (
                "讀出第一條方程",
                "把 Ax 設成 b 後，第一個輸出元素就等於 b1。",
                "a11*x1 + a12*x2 + a13*x3 = b1",
            ),
            (
                "讀出第二條方程",
                "第 2 行用同樣方式產生第二條方程。",
                "a21*x1 + a22*x2 + a23*x3 = b2",
            ),
            (
                "Ax = b 就是一個方程組",
                "緊湊的矩陣方程，正是一疊按行讀出的方程。",
                "兩行，兩條方程",
            ),
            (
                "完整 AB 重複同一想法",
                "B 的每一列都被 A 乘一次，所以 AB 是多個 Ax 式乘積並排放在一起。",
                "AB 的每一列 = A 乘 B 的相應列",
            ),
        ],
        "conclusion": "行乘列規則不只是計算方法：它正是矩陣方程可以保存整個線性方程組的原因。",
    },
    "zh-cn": {
        "title": "矩阵乘积打包方程",
        "subtitle": "行乘列的结果，就是每一行产生一条方程。",
        "visual": {
            "left_matrix": "左矩阵",
            "column_vector": "列向量",
            "result_vector": "结果向量",
            "row_1": "第 1 行",
            "row_2": "第 2 行",
            "first_equation": "方程 1",
            "second_equation": "方程 2",
            "system": "方程组",
            "matrix_product": "矩阵乘积",
            "full_product": "完整乘积",
        },
        "states": [
            (
                "先检查匹配大小",
                "A 的每一行有 3 个元素，刚好配对 x 的 3 个元素。",
                "2 x 3 乘 3 x 1 得到 2 x 1",
            ),
            (
                "第 1 行与向量配对",
                "第一个输出元素会用完整第 1 行，不是只用单一元素。",
                "第 1 行与 x 做内积",
            ),
            (
                "读出第一条方程",
                "把 Ax 设成 b 后，第一个输出元素就等于 b1。",
                "a11*x1 + a12*x2 + a13*x3 = b1",
            ),
            (
                "读出第二条方程",
                "第 2 行用同样方式产生第二条方程。",
                "a21*x1 + a22*x2 + a23*x3 = b2",
            ),
            (
                "Ax = b 就是一个方程组",
                "紧凑的矩阵方程，正是一叠按行读出的方程。",
                "两行，两条方程",
            ),
            (
                "完整 AB 重复同一想法",
                "B 的每一列都被 A 乘一次，所以 AB 是多个 Ax 式乘积并排放在一起。",
                "AB 的每一列 = A 乘 B 的相应列",
            ),
        ],
        "conclusion": "行乘列规则不只是计算方法：它正是矩阵方程可以保存整个线性方程组的原因。",
    },
}


A_SYMBOLIC = [["a11", "a12", "a13"], ["a21", "a22", "a23"]]
X_VECTOR = [["x1"], ["x2"], ["x3"]]
AX_VECTOR = [["R1*x"], ["R2*x"]]
B_VECTOR = [["b1"], ["b2"]]
B_MATRIX = [["u1", "v1"], ["u2", "v2"], ["u3", "v3"]]
AB_COLUMNS = [["(Au)1", "(Av)1"], ["(Au)2", "(Av)2"]]


class MatrixProductLinearSystemStoryBase(Scene):
    """MATH1030 3.2: matrix products as row equations and Ax=b."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def matrix_grid(self, rows, highlights=(), color=BLUE_B, cell_width=0.74, cell_height=0.48):
        row_count = len(rows)
        col_count = len(rows[0])
        cells = VGroup()
        values = VGroup()
        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - (col_count - 1) / 2) * cell_width
                y = ((row_count - 1) / 2 - row_index) * cell_height
                is_highlight = (row_index, col_index) in highlights
                fill_color = YELLOW_E if is_highlight else BLACK
                stroke_color = YELLOW_B if is_highlight else color
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.25,
                    stroke_color=stroke_color,
                    fill_color=fill_color,
                    fill_opacity=0.42 if is_highlight else 0.18,
                ).move_to([x, y, 0])
                value_mob = self.label(
                    value,
                    font_size=20,
                    max_width=cell_width * 0.76,
                ).move_to(cell)
                cells.add(cell)
                values.add(value_mob)

        left_bracket = Text("[", font=self.font, font_size=78).next_to(cells, LEFT, buff=0.06)
        right_bracket = Text("]", font=self.font, font_size=78).next_to(cells, RIGHT, buff=0.06)
        return VGroup(cells, values, left_bracket, right_bracket)

    def formula_card(self, title, body, color=GREEN_B, width=6.3, height=0.92):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.22,
        )
        title_mob = self.label(title, font_size=18, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=21, max_width=width * 0.9)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.1).move_to(box)
        return VGroup(box, content)

    def fit_visual(self, visual, max_width=7.25, max_height=3.25):
        if visual.width > max_width:
            visual.scale_to_fit_width(max_width)
        if visual.height > max_height:
            visual.scale_to_fit_height(max_height)
        return visual

    def matrix_product_visual(self, a_highlights=(), x_highlights=(), result_highlights=()):
        labels = TEXT[self.locale]["visual"]
        matrix_a = self.matrix_grid(A_SYMBOLIC, highlights=a_highlights, color=BLUE_B).scale(0.95)
        vector_x = self.matrix_grid(X_VECTOR, highlights=x_highlights, color=GREEN_B, cell_width=0.7).scale(0.95)
        result = self.matrix_grid(AX_VECTOR, highlights=result_highlights, color=PURPLE_B, cell_width=2.55).scale(0.83)
        a_label = self.label("A", font_size=23, color=BLUE_B, weight=BOLD, max_width=0.7).next_to(matrix_a, DOWN, buff=0.16)
        x_label = self.label("x", font_size=23, color=GREEN_B, weight=BOLD, max_width=0.7).next_to(vector_x, DOWN, buff=0.16)
        ax_label = self.label("Ax", font_size=23, color=PURPLE_B, weight=BOLD, max_width=0.8).next_to(result, DOWN, buff=0.16)
        times = self.label("*", font_size=30, color=GRAY_B, weight=BOLD, max_width=0.5)
        equals = self.label("=>", font_size=30, color=GREEN_B, weight=BOLD, max_width=0.7)
        row = VGroup(
            VGroup(matrix_a, a_label),
            times,
            VGroup(vector_x, x_label),
            equals,
            VGroup(result, ax_label),
        ).arrange(RIGHT, buff=0.18)
        caption = self.formula_card(labels["matrix_product"], "A(2 x 3) * x(3 x 1) -> Ax(2 x 1)", BLUE_B, width=6.8)
        return self.fit_visual(VGroup(row, caption).arrange(DOWN, buff=0.22))

    def row_pairing_visual(self, row_index):
        labels = TEXT[self.locale]["visual"]
        a_highlights = {(row_index, 0), (row_index, 1), (row_index, 2)}
        x_highlights = {(0, 0), (1, 0), (2, 0)}
        result_highlights = {(row_index, 0)}
        product = self.matrix_product_visual(a_highlights, x_highlights, result_highlights)
        row_label = labels["row_1"] if row_index == 0 else labels["row_2"]
        equation_label = labels["first_equation"] if row_index == 0 else labels["second_equation"]
        formula = (
            "a11*x1 + a12*x2 + a13*x3"
            if row_index == 0
            else "a21*x1 + a22*x2 + a23*x3"
        )
        detail = self.formula_card(row_label, formula, YELLOW_B, width=5.8)
        if row_index == 0:
            equation = self.formula_card(equation_label, f"{formula} = b1", GREEN_B, width=6.4)
        else:
            equation = self.formula_card(equation_label, f"{formula} = b2", GREEN_B, width=6.4)
        return self.fit_visual(VGroup(product, detail, equation).arrange(DOWN, buff=0.16), max_height=3.45)

    def system_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = self.matrix_grid(AX_VECTOR, color=PURPLE_B, cell_width=2.55).scale(0.86)
        equals = self.label("=", font_size=34, color=GREEN_B, weight=BOLD, max_width=0.5)
        right = self.matrix_grid(B_VECTOR, color=GREEN_B, cell_width=0.7).scale(0.95)
        matrix_equation = VGroup(left, equals, right).arrange(RIGHT, buff=0.18)
        equations = VGroup(
            self.formula_card(labels["first_equation"], "a11*x1 + a12*x2 + a13*x3 = b1", BLUE_B, width=6.8, height=0.84),
            self.formula_card(labels["second_equation"], "a21*x1 + a22*x2 + a23*x3 = b2", GREEN_B, width=6.8, height=0.84),
        ).arrange(DOWN, buff=0.15)
        return self.fit_visual(VGroup(matrix_equation, equations).arrange(DOWN, buff=0.2))

    def full_product_visual(self):
        labels = TEXT[self.locale]["visual"]
        matrix_a = self.matrix_grid(A_SYMBOLIC, color=BLUE_B).scale(0.85)
        matrix_b = self.matrix_grid(B_MATRIX, highlights={(0, 0), (1, 0), (2, 0)}, color=GREEN_B, cell_width=0.66).scale(0.85)
        product = self.matrix_grid(AB_COLUMNS, highlights={(0, 0), (1, 0)}, color=PURPLE_B, cell_width=1.05).scale(0.85)
        row = VGroup(
            matrix_a,
            self.label("*", font_size=28, color=GRAY_B, weight=BOLD, max_width=0.4),
            matrix_b,
            self.label("=>", font_size=30, color=GREEN_B, weight=BOLD, max_width=0.7),
            product,
        ).arrange(RIGHT, buff=0.18)
        detail = self.formula_card(labels["full_product"], "B = [u  v]  so  AB = [A*u  A*v]", GREEN_B, width=6.8)
        return self.fit_visual(VGroup(row, detail).arrange(DOWN, buff=0.24))

    def state_visual(self, index):
        if index == 0:
            return self.matrix_product_visual()
        if index == 1:
            return self.row_pairing_visual(0)
        if index == 2:
            return self.row_pairing_visual(0)
        if index == 3:
            return self.row_pairing_visual(1)
        if index == 4:
            return self.system_visual()
        return self.full_product_visual()

    def construct(self):
        copy = TEXT[self.locale]
        title = self.label(copy["title"], font_size=36, weight=BOLD, max_width=7.2)
        subtitle = self.label(copy["subtitle"], font_size=22, color=GRAY_B, max_width=7.4)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.16).to_edge(UP)

        self.play(FadeIn(header, shift=DOWN * 0.2))

        current = None
        for index, (caption, focus, operation) in enumerate(copy["states"]):
            caption_mob = self.label(caption, font_size=28, weight=MEDIUM, max_width=7.0)
            visual = self.state_visual(index).scale(1.0)
            focus_mob = self.label(focus, font_size=20, color=GRAY_B, max_width=7.25)
            operation_mob = self.label(operation, font_size=23, color=BLUE_B, max_width=7.25)
            group = VGroup(caption_mob, visual, focus_mob, operation_mob).arrange(
                DOWN,
                buff=0.23,
            )
            group.next_to(header, DOWN, buff=0.32)

            if current is None:
                self.play(FadeIn(group, shift=UP * 0.15))
            else:
                self.play(FadeOut(current, shift=UP * 0.1), FadeIn(group, shift=UP * 0.1))

            current = group
            self.wait(1.02 if index < len(copy["states"]) - 1 else 1.45)

        conclusion = self.label(copy["conclusion"], font_size=24, color=GREEN_B, max_width=7.4).to_edge(DOWN)
        self.play(FadeIn(conclusion, shift=UP * 0.2))
        self.wait(1.2)


class MatrixProductLinearSystemStoryEn(MatrixProductLinearSystemStoryBase):
    locale = "en"


class MatrixProductLinearSystemStoryZhHk(MatrixProductLinearSystemStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class MatrixProductLinearSystemStoryZhCn(MatrixProductLinearSystemStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class MatrixProductLinearSystemStory(MatrixProductLinearSystemStoryEn):
    """Backwards-compatible alias for one-off English render commands."""
