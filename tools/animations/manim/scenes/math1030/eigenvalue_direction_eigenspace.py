from manim import *


TEXT = {
    "en": {
        "title": "Eigenvalues: directions that survive A",
        "subtitle": "An eigenvector keeps its line; the eigenspace is a null space.",
        "visual": {
            "ordinary": "ordinary vector",
            "ordinary_image": "Ax turns",
            "eigen": "eigenvector v",
            "eigen_image": "Av=λv",
            "same_line": "same line",
            "not_zero": "v != 0",
            "scale": "λ scales the vector",
            "reverse": "negative λ reverses direction",
            "line": "all nonzero multiples",
            "zero": "0 is added",
            "null": "null-space test",
            "eigenspace": "eigenspace",
            "source_example": "source example",
            "basis": "basis",
            "matrix": "C = [[3,2],[3,-2]]",
            "definition": "definition",
            "key_relation": "key relation",
            "output_collinear": "output stays collinear",
            "zero_excluded": "zero vector excluded",
            "subtract": "subtract λv",
            "identity": "use λv=λIv",
            "same_direction": "λ>0: same direction",
            "opposite_direction": "λ<0: opposite direction",
            "null_prompt": "find nonzero v in N(A-λI)",
            "not_collinear": "Ax not collinear",
        },
        "states": [
            (
                "Most vectors turn; eigenvectors do not",
                "For an eigenvector, the output of A stays on the same line through the origin.",
                "Av=λv",
            ),
            (
                "The definition compares two actions",
                "Matrix multiplication by A agrees with scalar multiplication by λ on one nonzero vector.",
                "v != 0",
            ),
            (
                "One eigenvector represents a whole direction",
                "Every nonzero multiple cv lies on the same eigendirection and has the same eigenvalue.",
                "A(cv)=λ(cv)",
            ),
            (
                "Move everything to one side",
                "The eigenvector condition becomes a homogeneous system for A-λI.",
                "(A-λI)v=0",
            ),
            (
                "The eigenspace is that null space",
                "After adding the zero vector, all eigenvectors for the same λ form a subspace.",
                "E_A(λ)=N(A-λI)",
            ),
            (
                "For the source matrix, each eigenvalue gives one line",
                "Row reduction finds a basis vector for each null space.",
                "λ=4, -3",
            ),
        ],
        "conclusion": "Eigenvalues are not just roots of a determinant; they are the scalars for which A-λI has a nontrivial null space.",
    },
    "zh-hk": {
        "title": "特徵值：在 A 下保留下來的方向",
        "subtitle": "特徵向量保留所在直線；特徵空間就是一個零空間。",
        "visual": {
            "ordinary": "普通向量",
            "ordinary_image": "Ax 轉向",
            "eigen": "特徵向量 v",
            "eigen_image": "Av=λv",
            "same_line": "同一直線",
            "not_zero": "v != 0",
            "scale": "λ 只做純量倍",
            "reverse": "負 λ 會反向",
            "line": "所有非零倍數",
            "zero": "加入 0",
            "null": "零空間測試",
            "eigenspace": "特徵空間",
            "source_example": "來源例子",
            "basis": "基",
            "matrix": "C = [[3,2],[3,-2]]",
            "definition": "定義",
            "key_relation": "關鍵式",
            "output_collinear": "輸出仍共線",
            "zero_excluded": "零向量排除",
            "subtract": "減去 λv",
            "identity": "用 λv=λIv",
            "same_direction": "λ>0：方向相同",
            "opposite_direction": "λ<0：方向相反",
            "null_prompt": "在 N(A-λI) 找非零 v",
            "not_collinear": "Ax 不共線",
        },
        "states": [
            (
                "大部分向量會轉向；特徵向量不會",
                "對特徵向量而言，A 的輸出仍在穿過原點的同一直線上。",
                "Av=λv",
            ),
            (
                "定義比較兩種作用",
                "在同一個非零向量上，A 的矩陣乘法等同於乘以純量 λ。",
                "v != 0",
            ),
            (
                "一個特徵向量代表整個方向",
                "每個非零倍數 cv 都在同一特徵方向上，並對應同一特徵值。",
                "A(cv)=λ(cv)",
            ),
            (
                "把所有項移到同一邊",
                "特徵向量條件會變成 A-λI 的齊次系統。",
                "(A-λI)v=0",
            ),
            (
                "特徵空間就是那個零空間",
                "把零向量加回去後，同一 λ 的所有特徵向量形成一個子空間。",
                "E_A(λ)=N(A-λI)",
            ),
            (
                "來源矩陣中，每個特徵值給出一條直線",
                "行化簡會為每個零空間找出一個基向量。",
                "λ=4, -3",
            ),
        ],
        "conclusion": "特徵值不只是行列式的根；它們是令 A-λI 有非平凡零空間的純量。",
    },
    "zh-cn": {
        "title": "特征值：在 A 下保留下来的方向",
        "subtitle": "特征向量保留所在直线；特征空间就是一个零空间。",
        "visual": {
            "ordinary": "普通向量",
            "ordinary_image": "Ax 转向",
            "eigen": "特征向量 v",
            "eigen_image": "Av=λv",
            "same_line": "同一直线",
            "not_zero": "v != 0",
            "scale": "λ 只做标量倍",
            "reverse": "负 λ 会反向",
            "line": "所有非零倍数",
            "zero": "加入 0",
            "null": "零空间测试",
            "eigenspace": "特征空间",
            "source_example": "来源例子",
            "basis": "基",
            "matrix": "C = [[3,2],[3,-2]]",
            "definition": "定义",
            "key_relation": "关键式",
            "output_collinear": "输出仍共线",
            "zero_excluded": "零向量排除",
            "subtract": "减去 λv",
            "identity": "用 λv=λIv",
            "same_direction": "λ>0：方向相同",
            "opposite_direction": "λ<0：方向相反",
            "null_prompt": "在 N(A-λI) 找非零 v",
            "not_collinear": "Ax 不共线",
        },
        "states": [
            (
                "大部分向量会转向；特征向量不会",
                "对特征向量而言，A 的输出仍在穿过原点的同一直线上。",
                "Av=λv",
            ),
            (
                "定义比较两种作用",
                "在同一个非零向量上，A 的矩阵乘法等同于乘以标量 λ。",
                "v != 0",
            ),
            (
                "一个特征向量代表整个方向",
                "每个非零倍数 cv 都在同一特征方向上，并对应同一特征值。",
                "A(cv)=λ(cv)",
            ),
            (
                "把所有项移到同一边",
                "特征向量条件会变成 A-λI 的齐次系统。",
                "(A-λI)v=0",
            ),
            (
                "特征空间就是那个零空间",
                "把零向量加回去后，同一 λ 的所有特征向量形成一个子空间。",
                "E_A(λ)=N(A-λI)",
            ),
            (
                "来源矩阵中，每个特征值给出一条直线",
                "行化简会为每个零空间找出一个基向量。",
                "λ=4, -3",
            ),
        ],
        "conclusion": "特征值不只是行列式的根；它们是使 A-λI 有非平凡零空间的标量。",
    },
}


class EigenvalueDirectionEigenspaceStoryBase(Scene):
    """MATH1030 8.1: eigenvectors as preserved directions and eigenspaces as null spaces."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def formula_card(self, title, body, color=GREEN_B, width=5.4, height=0.82):
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

    def vector_plane(self, width=5.3, height=3.0):
        plane = NumberPlane(
            x_range=[-3, 3, 1],
            y_range=[-2, 2, 1],
            x_length=width,
            y_length=height,
            axis_config={"stroke_color": GRAY_B, "stroke_width": 1, "stroke_opacity": 0.45},
            background_line_style={"stroke_color": BLUE_E, "stroke_opacity": 0.18, "stroke_width": 1},
        )
        origin = Dot(plane.c2p(0, 0), radius=0.04, color=GRAY_A)
        return plane, origin

    def vector_arrow(self, plane, end, color, label=None, label_shift=UP * 0.16):
        arrow = Arrow(
            plane.c2p(0, 0),
            plane.c2p(end[0], end[1]),
            buff=0,
            color=color,
            stroke_width=5,
            max_tip_length_to_length_ratio=0.15,
        )
        if label is None:
            return arrow
        label_mob = self.label(label, font_size=16, color=color, weight=MEDIUM, max_width=1.8)
        label_mob.next_to(arrow.get_end(), label_shift, buff=0.08)
        return VGroup(arrow, label_mob)

    def direction_visual(self):
        v = TEXT[self.locale]["visual"]
        ordinary_plane, ordinary_origin = self.vector_plane(width=3.4, height=2.1)
        ordinary_v = self.vector_arrow(ordinary_plane, (0.65, 0.95), RED_B)
        ordinary_image = self.vector_arrow(ordinary_plane, (2.0, 0.35), RED_A)
        ordinary_title = self.label(v["ordinary"], font_size=17, color=RED_B, weight=MEDIUM, max_width=2.8)
        ordinary_note = self.formula_card(v["ordinary_image"], v["not_collinear"], RED_B, width=3.15, height=0.66)
        ordinary_case = VGroup(ordinary_title, VGroup(ordinary_plane, ordinary_origin, ordinary_v, ordinary_image), ordinary_note).arrange(
            DOWN, buff=0.12
        )

        eigen_plane, eigen_origin = self.vector_plane(width=3.4, height=2.1)
        eig_line = Line(eigen_plane.c2p(-2.4, -1.2), eigen_plane.c2p(2.4, 1.2), color=GREEN_B, stroke_width=3)
        eig_line.set_opacity(0.72)
        eigen_v = self.vector_arrow(eigen_plane, (1.0, 0.5), GREEN_B)
        eigen_image = self.vector_arrow(eigen_plane, (2.0, 1.0), TEAL_B)
        eigen_title = self.label(v["eigen"], font_size=17, color=GREEN_B, weight=MEDIUM, max_width=2.8)
        eigen_note = self.formula_card(v["eigen_image"], v["output_collinear"], TEAL_B, width=3.15, height=0.66)
        eigen_case = VGroup(
            eigen_title,
            VGroup(eigen_plane, eigen_origin, eig_line, eigen_v, eigen_image),
            eigen_note,
        ).arrange(DOWN, buff=0.12)

        return VGroup(ordinary_case, eigen_case).arrange(RIGHT, buff=0.78)

    def definition_visual(self):
        v = TEXT[self.locale]["visual"]
        center = self.formula_card(v["definition"], "Av=λv", TEAL_B, width=3.4, height=1.0)
        nonzero = self.formula_card(v["not_zero"], v["zero_excluded"], RED_B, width=3.1, height=0.82)
        scale = self.formula_card(v["scale"], v["same_direction"], GREEN_B, width=3.4, height=0.82)
        reverse = self.formula_card(v["reverse"], v["opposite_direction"], YELLOW_B, width=3.4, height=0.82)
        row = VGroup(nonzero, center, scale).arrange(RIGHT, buff=0.18)
        return VGroup(row, reverse).arrange(DOWN, buff=0.18)

    def line_visual(self):
        v = TEXT[self.locale]["visual"]
        plane, origin = self.vector_plane(width=5.5, height=3.1)
        line = Line(plane.c2p(-2.7, -1.35), plane.c2p(2.7, 1.35), color=GREEN_B, stroke_width=4)
        line.set_opacity(0.72)
        dots = VGroup(
            *[
                Dot(plane.c2p(t, 0.5 * t), radius=0.045, color=YELLOW_B)
                for t in [-2, -1, 1, 2]
            ]
        )
        arrows = VGroup(
            self.vector_arrow(plane, (1.15, 0.58), GREEN_B, "v", DOWN * 0.12),
            self.vector_arrow(plane, (2.25, 1.12), TEAL_B, "2v", UP * 0.12),
            self.vector_arrow(plane, (-1.45, -0.72), YELLOW_B, "-cv", DOWN * 0.12),
        )
        card = self.formula_card(v["line"], "cv, c != 0", GREEN_B, width=4.2, height=0.74)
        card.next_to(plane, DOWN, buff=0.18)
        return VGroup(plane, origin, line, dots, arrows, card)

    def nullspace_visual(self):
        v = TEXT[self.locale]["visual"]
        start = self.formula_card(v["eigen_image"], "Av=λv", TEAL_B, width=3.0, height=0.78)
        subtract = self.formula_card(v["subtract"], "Av-λv=0", YELLOW_B, width=3.4, height=0.78)
        identity = self.formula_card(v["identity"], "(A-λI)v=0", GREEN_B, width=3.6, height=0.78)
        arrow1 = Arrow(LEFT, RIGHT, buff=0, color=WHITE).scale(0.35)
        arrow2 = Arrow(LEFT, RIGHT, buff=0, color=WHITE).scale(0.35)
        chain = VGroup(start, arrow1, subtract, arrow2, identity).arrange(RIGHT, buff=0.16)
        null = self.formula_card(v["null"], v["null_prompt"], GREEN_B, width=5.9, height=0.78)
        return VGroup(chain, null).arrange(DOWN, buff=0.24)

    def eigenspace_visual(self):
        v = TEXT[self.locale]["visual"]
        plane, origin = self.vector_plane(width=5.7, height=3.1)
        line = Line(plane.c2p(-2.7, -1.35), plane.c2p(2.7, 1.35), color=GREEN_B, stroke_width=4)
        line.set_opacity(0.76)
        zero_label = self.label(v["zero"], font_size=16, color=GRAY_A, weight=MEDIUM, max_width=1.5)
        zero_label.next_to(origin, DOWN, buff=0.1)
        markers = VGroup(
            Dot(plane.c2p(-1.6, -0.8), radius=0.05, color=YELLOW_B),
            Dot(plane.c2p(1.1, 0.55), radius=0.05, color=YELLOW_B),
            Dot(plane.c2p(2.0, 1.0), radius=0.05, color=YELLOW_B),
        )
        formula = self.formula_card(v["eigenspace"], "E_A(λ)=N(A-λI)", GREEN_B, width=4.6, height=0.74)
        formula.next_to(plane, DOWN, buff=0.18)
        return VGroup(plane, origin, line, zero_label, markers, formula)

    def example_visual(self):
        v = TEXT[self.locale]["visual"]
        matrix = self.formula_card(v["source_example"], v["matrix"], TEAL_B, width=4.8, height=0.82)
        lambda4 = self.formula_card("λ=4", "E_C(4)=span{(2,1)}", GREEN_B, width=4.0, height=0.82)
        lambda_minus3 = self.formula_card("λ=-3", "E_C(-3)=span{(1,-3)}", YELLOW_B, width=4.0, height=0.82)
        row = VGroup(lambda4, lambda_minus3).arrange(RIGHT, buff=0.18)
        equations = self.formula_card(v["null"], "(C-λI)x=0", BLUE_B, width=4.0, height=0.74)

        plane, origin = self.vector_plane(width=5.6, height=2.45)
        line_one = Line(plane.c2p(-2.4, -1.2), plane.c2p(2.4, 1.2), color=GREEN_B, stroke_width=3)
        line_two = Line(plane.c2p(-0.75, 2.25), plane.c2p(0.75, -2.25), color=YELLOW_B, stroke_width=3)
        line_two.set_opacity(0.78)
        line_one.set_opacity(0.78)
        return VGroup(matrix, row, equations, VGroup(plane, origin, line_one, line_two)).arrange(DOWN, buff=0.14)

    def state_panel(self, index):
        title, body, formula = TEXT[self.locale]["states"][index]
        title_mob = self.label(title, font_size=24, color=YELLOW_B, weight=BOLD, max_width=7.7)
        body_mob = self.label(body, font_size=16, color=GRAY_B, max_width=9.2)
        formula_mob = self.formula_card(TEXT[self.locale]["visual"]["key_relation"], formula, GREEN_B, width=5.7, height=0.6)
        group = VGroup(title_mob, body_mob, formula_mob).arrange(DOWN, buff=0.1)
        group.to_edge(DOWN, buff=0.24)
        return group

    def construct(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=TEAL_B, weight=BOLD, max_width=9.6).to_edge(UP, buff=0.28)
        subtitle = self.label(data["subtitle"], font_size=18, color=GRAY_B, max_width=9.1).next_to(title, DOWN, buff=0.06)
        self.play(FadeIn(title, shift=DOWN * 0.15), FadeIn(subtitle, shift=DOWN * 0.1), run_time=0.5)

        scenes = [
            self.direction_visual(),
            self.definition_visual(),
            self.line_visual(),
            self.nullspace_visual(),
            self.eigenspace_visual(),
            self.example_visual(),
        ]

        current_visual = None
        current_panel = None
        for index, visual in enumerate(scenes):
            visual.scale(0.82)
            visual.move_to(ORIGIN + UP * 0.28)
            panel = self.state_panel(index)
            if current_visual is None:
                self.play(FadeIn(visual, shift=UP * 0.12), FadeIn(panel, shift=UP * 0.12), run_time=0.6)
            else:
                self.play(
                    ReplacementTransform(current_visual, visual),
                    ReplacementTransform(current_panel, panel),
                    run_time=0.55,
                )
            self.wait(1.05)
            current_visual = visual
            current_panel = panel

        conclusion = self.label(data["conclusion"], font_size=24, color=YELLOW_B, weight=MEDIUM, max_width=9.4)
        conclusion.to_edge(DOWN, buff=0.42)
        self.play(ReplacementTransform(current_panel, conclusion), run_time=0.6)
        self.wait(0.7)


class EigenvalueDirectionEigenspaceStoryEn(EigenvalueDirectionEigenspaceStoryBase):
    locale = "en"


class EigenvalueDirectionEigenspaceStoryZhHk(EigenvalueDirectionEigenspaceStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class EigenvalueDirectionEigenspaceStoryZhCn(EigenvalueDirectionEigenspaceStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class EigenvalueDirectionEigenspaceStory(EigenvalueDirectionEigenspaceStoryEn):
    pass
