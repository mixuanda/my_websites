from math import atan2

from manim import *


TEXT = {
    "en": {
        "title": "Inner products turn algebra into geometry",
        "subtitle": "One scalar reads dot product, length, unit direction, angle, and perpendicularity.",
        "visual": {
            "match": "matching coordinates",
            "scalar": "scalar output",
            "properties": "reliable operation",
            "linearity": "linearity",
            "symmetry": "symmetry",
            "positive": "positive definiteness",
            "self": "self-product",
            "norm": "norm",
            "unit": "unit vector",
            "angle": "angle",
            "orthogonal": "orthogonal",
            "zero_dot": "zero dot product",
            "nonzero": "nonzero vectors",
        },
        "states": [
            (
                "Multiply matching coordinates, then add",
                "For u=(1,2) and v=(3,1), the inner product is a single scalar: 1*3+2*1=5.",
                "<u,v> = 5",
            ),
            (
                "The operation has the properties geometry needs",
                "Linearity, symmetry, and positive definiteness make the dot product useful rather than arbitrary.",
                "<v,v> >= 0, with equality only for v=0",
            ),
            (
                "A vector measures its own length",
                "The norm is the square root of the self-product, so ||u||=sqrt(<u,u>)=sqrt(5).",
                "||u|| = sqrt(<u,u>)",
            ),
            (
                "Normalize by dividing by length",
                "If u is nonzero, then u/||u|| has length 1 and keeps the same direction.",
                "||u/||u|||| = 1",
            ),
            (
                "The same scalar reads the angle",
                "In R2 or R3, <u,v>=||u||||v|| cos(theta), so the dot product controls the angle.",
                "cos(theta)=<u,v>/(||u||||v||)",
            ),
            (
                "Zero inner product means perpendicular",
                "For nonzero vectors, <x,y>=0 gives cos(theta)=0, so the angle is 90 degrees.",
                "<x,y>=0  <=>  x perpendicular y",
            ),
        ],
        "conclusion": "Inner products are the algebraic device behind the geometry of this chapter: self-products give length, scaled vectors give unit directions, and inner products between vectors read angles and orthogonality.",
    },
    "zh-hk": {
        "title": "內積把代數變成幾何",
        "subtitle": "同一個純量同時讀出點積、長度、單位方向、夾角與垂直。",
        "visual": {
            "match": "對應坐標",
            "scalar": "純量輸出",
            "properties": "可靠運算",
            "linearity": "線性",
            "symmetry": "對稱",
            "positive": "正定性",
            "self": "自己與自己內積",
            "norm": "範數",
            "unit": "單位向量",
            "angle": "夾角",
            "orthogonal": "正交",
            "zero_dot": "內積為零",
            "nonzero": "非零向量",
        },
        "states": [
            (
                "對應坐標相乘，然後相加",
                "對 u=(1,2) 與 v=(3,1)，內積是一個純量：1*3+2*1=5。",
                "<u,v> = 5",
            ),
            (
                "這個運算具備幾何所需的性質",
                "線性、對稱與正定性令點積不是任意公式，而是可用的幾何工具。",
                "<v,v> >= 0，且等號只在 v=0 時成立",
            ),
            (
                "向量可以量度自己的長度",
                "範數是自己與自己內積的平方根，所以 ||u||=sqrt(<u,u>)=sqrt(5)。",
                "||u|| = sqrt(<u,u>)",
            ),
            (
                "除以長度得到單位向量",
                "若 u 非零，u/||u|| 的長度是 1，而且方向不變。",
                "||u/||u|||| = 1",
            ),
            (
                "同一個純量讀出夾角",
                "在 R2 或 R3 中，<u,v>=||u||||v|| cos(theta)，所以內積控制夾角。",
                "cos(theta)=<u,v>/(||u||||v||)",
            ),
            (
                "內積為零表示垂直",
                "對非零向量，<x,y>=0 給出 cos(theta)=0，因此夾角是 90 度。",
                "<x,y>=0  <=>  x 垂直 y",
            ),
        ],
        "conclusion": "內積是本章幾何背後的代數工具：自己與自己內積給出長度，除以長度給出單位方向，兩個向量的內積則讀出夾角與正交。",
    },
    "zh-cn": {
        "title": "内积把代数变成几何",
        "subtitle": "同一个标量同时读出点积、长度、单位方向、夹角与垂直。",
        "visual": {
            "match": "对应坐标",
            "scalar": "标量输出",
            "properties": "可靠运算",
            "linearity": "线性",
            "symmetry": "对称",
            "positive": "正定性",
            "self": "自己与自己内积",
            "norm": "范数",
            "unit": "单位向量",
            "angle": "夹角",
            "orthogonal": "正交",
            "zero_dot": "内积为零",
            "nonzero": "非零向量",
        },
        "states": [
            (
                "对应坐标相乘，然后相加",
                "对 u=(1,2) 与 v=(3,1)，内积是一个标量：1*3+2*1=5。",
                "<u,v> = 5",
            ),
            (
                "这个运算具备几何所需的性质",
                "线性、对称与正定性让点积不是任意公式，而是可用的几何工具。",
                "<v,v> >= 0，且等号只在 v=0 时成立",
            ),
            (
                "向量可以量度自己的长度",
                "范数是自己与自己内积的平方根，所以 ||u||=sqrt(<u,u>)=sqrt(5)。",
                "||u|| = sqrt(<u,u>)",
            ),
            (
                "除以长度得到单位向量",
                "若 u 非零，u/||u|| 的长度是 1，而且方向不变。",
                "||u/||u|||| = 1",
            ),
            (
                "同一个标量读出夹角",
                "在 R2 或 R3 中，<u,v>=||u||||v|| cos(theta)，所以内积控制夹角。",
                "cos(theta)=<u,v>/(||u||||v||)",
            ),
            (
                "内积为零表示垂直",
                "对非零向量，<x,y>=0 给出 cos(theta)=0，因此夹角是 90 度。",
                "<x,y>=0  <=>  x 垂直 y",
            ),
        ],
        "conclusion": "内积是本章几何背后的代数工具：自己与自己内积给出长度，除以长度给出单位方向，两个向量的内积则读出夹角与正交。",
    },
}


U = (1, 2)
V = (3, 1)
P = (-2, 1)


class InnerProductNormAngleStoryBase(Scene):
    """MATH1030 9.1: dot product, norm, unit vector, angle, and orthogonality."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=7.0):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def formula_card(self, title, body, color=GREEN_B, width=4.3, height=0.88):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
        )
        title_mob = self.label(title, font_size=16, color=color, weight=MEDIUM, max_width=width * 0.88)
        body_mob = self.label(body, font_size=21, max_width=width * 0.86)
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

    def vector_card(self, name, values, color=BLUE_B, width=1.9, height=0.9):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
        )
        title = self.label(name, font_size=21, color=color, weight=MEDIUM, max_width=width * 0.8)
        vector = self.label(f"({values[0]}, {values[1]})", font_size=22, max_width=width * 0.82)
        content = VGroup(title, vector).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content)

    def property_badge(self, title, body, color):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=3.45,
            height=0.88,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.22,
        )
        title_mob = self.label(title, font_size=16, color=color, weight=MEDIUM, max_width=3.1)
        body_mob = self.label(body, font_size=17, max_width=3.1)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content)

    def dot_product_visual(self):
        labels = TEXT[self.locale]["visual"]
        cards = VGroup(
            self.vector_card("u", U, BLUE_B),
            self.label("·", font_size=38, color=GRAY_A, weight=BOLD, max_width=0.4),
            self.vector_card("v", V, PURPLE_B),
            self.label("=", font_size=34, color=GRAY_A, weight=BOLD, max_width=0.4),
            self.formula_card(labels["scalar"], "1*3 + 2*1 = 5", GREEN_B, width=3.15),
        ).arrange(RIGHT, buff=0.22)
        note = self.formula_card(labels["match"], "u1v1 + u2v2", YELLOW_B, width=3.4, height=0.76)
        return VGroup(cards, note).arrange(DOWN, buff=0.32).scale_to_fit_width(10.8)

    def properties_visual(self):
        labels = TEXT[self.locale]["visual"]
        badges = VGroup(
            self.property_badge(labels["linearity"], "<av+bw,u>=a<v,u>+b<w,u>", BLUE_B),
            self.property_badge(labels["symmetry"], "<v,w>=<w,v>", PURPLE_B),
            self.property_badge(labels["positive"], "<v,v>=v1^2+...+vm^2", GREEN_B),
        ).arrange(DOWN, buff=0.18)
        header = self.formula_card(labels["properties"], "inner product axioms", TEAL_B, width=4.4, height=0.82)
        return VGroup(header, badges).arrange(DOWN, buff=0.28).scale_to_fit_height(3.45)

    def plane(self):
        plane = NumberPlane(
            x_range=[-2.5, 3.5, 1],
            y_range=[-0.5, 2.6, 1],
            x_length=5.7,
            y_length=3.2,
            background_line_style={"stroke_color": BLUE_E, "stroke_opacity": 0.28, "stroke_width": 1},
            axis_config={"stroke_color": GRAY_B, "stroke_width": 1.5},
        )
        return plane

    def arrow_on_plane(self, plane, vector, color, name, label_buff=0.12):
        arrow = Arrow(
            plane.c2p(0, 0),
            plane.c2p(vector[0], vector[1]),
            buff=0,
            color=color,
            stroke_width=5,
            max_tip_length_to_length_ratio=0.16,
        )
        tag = self.label(name, font_size=18, color=color, weight=MEDIUM, max_width=1.15)
        tag.next_to(arrow.get_end(), UP, buff=label_buff)
        return VGroup(arrow, tag)

    def norm_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane()
        arrow = self.arrow_on_plane(plane, U, BLUE_B, "u")
        cards = VGroup(
            self.formula_card(labels["self"], "<u,u>=1^2+2^2=5", YELLOW_B, width=4.0),
            self.formula_card(labels["norm"], "||u||=sqrt(5)", GREEN_B, width=3.25),
        ).arrange(DOWN, buff=0.18)
        visual = VGroup(plane, arrow)
        return VGroup(visual, cards).arrange(RIGHT, buff=0.55).scale_to_fit_width(10.4)

    def unit_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane()
        arrow = self.arrow_on_plane(plane, U, BLUE_B, "u")
        unit = (1 / 5**0.5, 2 / 5**0.5)
        unit_arrow = self.arrow_on_plane(plane, unit, GREEN_B, "u/||u||", label_buff=0.02)
        unit_arrow[0].set_stroke(width=6)
        cards = VGroup(
            self.formula_card(labels["unit"], "u/||u||=(1,2)/sqrt(5)", GREEN_B, width=4.5),
            self.formula_card(labels["norm"], "length = 1", YELLOW_B, width=2.75, height=0.76),
        ).arrange(DOWN, buff=0.18)
        return VGroup(VGroup(plane, arrow, unit_arrow), cards).arrange(RIGHT, buff=0.48).scale_to_fit_width(10.8)

    def angle_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane()
        u_arrow = self.arrow_on_plane(plane, U, BLUE_B, "u")
        v_arrow = self.arrow_on_plane(plane, V, PURPLE_B, "v")
        start = atan2(V[1], V[0])
        sweep = atan2(U[1], U[0]) - start
        arc = Arc(radius=0.55, start_angle=start, angle=sweep, color=YELLOW_B, stroke_width=5)
        arc.move_arc_center_to(plane.c2p(0, 0))
        theta = self.label("theta", font_size=16, color=YELLOW_B, weight=MEDIUM, max_width=0.8)
        theta.move_to(plane.c2p(0.75, 0.47))
        cards = VGroup(
            self.formula_card(labels["angle"], "<u,v>=||u||||v|| cos(theta)", YELLOW_B, width=4.8),
            self.formula_card("u=(1,2), v=(3,1)", "cos(theta)=1/sqrt(2)", GREEN_B, width=4.5),
        ).arrange(DOWN, buff=0.18)
        return VGroup(VGroup(plane, u_arrow, v_arrow, arc, theta), cards).arrange(RIGHT, buff=0.5).scale_to_fit_width(11.2)

    def orthogonal_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane()
        u_arrow = self.arrow_on_plane(plane, U, BLUE_B, "x")
        p_arrow = self.arrow_on_plane(plane, P, RED_B, "y")
        right_angle = Square(side_length=0.32, color=YELLOW_B, stroke_width=4)
        right_angle.rotate(atan2(U[1], U[0]))
        right_angle.move_to(plane.c2p(0.18, 0.27))
        cards = VGroup(
            self.formula_card(labels["zero_dot"], "x=(1,2), y=(-2,1)", YELLOW_B, width=4.35),
            self.formula_card(labels["orthogonal"], "<x,y>=-2+2=0", GREEN_B, width=3.75),
        ).arrange(DOWN, buff=0.18)
        return VGroup(VGroup(plane, u_arrow, p_arrow, right_angle), cards).arrange(RIGHT, buff=0.48).scale_to_fit_width(11.2)

    def visual_for(self, index):
        return [
            self.dot_product_visual,
            self.properties_visual,
            self.norm_visual,
            self.unit_visual,
            self.angle_visual,
            self.orthogonal_visual,
        ][index]()

    def construct(self):
        self.camera.background_color = "#111827"
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=31, color=WHITE, weight=BOLD, max_width=12.0)
        subtitle = self.label(data["subtitle"], font_size=17, color=GRAY_A, max_width=11.4)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.12).to_edge(UP, buff=0.28)

        self.play(FadeIn(header, shift=DOWN * 0.12), run_time=0.7)

        visual = self.visual_for(0).move_to(ORIGIN + UP * 0.24)
        card = self.state_card(0)
        self.play(FadeIn(visual, shift=UP * 0.16), FadeIn(card, shift=UP * 0.12), run_time=0.8)
        self.wait(1.0)

        for index in range(1, 6):
            new_visual = self.visual_for(index).move_to(ORIGIN + UP * 0.24)
            new_card = self.state_card(index)
            self.play(
                FadeOut(visual, shift=LEFT * 0.18),
                FadeOut(card, shift=LEFT * 0.12),
                FadeIn(new_visual, shift=RIGHT * 0.18),
                FadeIn(new_card, shift=RIGHT * 0.12),
                run_time=0.75,
            )
            visual = new_visual
            card = new_card
            self.wait(1.0)

        conclusion_box = RoundedRectangle(
            corner_radius=0.1,
            width=11.4,
            height=1.05,
            stroke_color=GREEN_B,
            fill_color=BLACK,
            fill_opacity=0.34,
        )
        conclusion = self.label(data["conclusion"], font_size=18, color=WHITE, max_width=10.7)
        conclusion_group = VGroup(conclusion_box, conclusion.move_to(conclusion_box)).move_to(ORIGIN + DOWN * 0.05)

        self.play(FadeOut(visual), FadeOut(card), FadeIn(conclusion_group, shift=UP * 0.12), run_time=0.8)
        self.wait(1.3)


class InnerProductNormAngleStoryEn(InnerProductNormAngleStoryBase):
    locale = "en"
    font = "Avenir Next"


class InnerProductNormAngleStoryZhHk(InnerProductNormAngleStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class InnerProductNormAngleStoryZhCn(InnerProductNormAngleStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class InnerProductNormAngleStory(InnerProductNormAngleStoryEn):
    pass
