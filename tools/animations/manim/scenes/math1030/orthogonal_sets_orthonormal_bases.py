from math import atan2

from manim import *


TEXT = {
    "en": {
        "title": "Orthogonal sets make coordinates readable",
        "subtitle": "Zero cross-products remove interference; normalization removes denominators.",
        "visual": {
            "zero": "zero inner product",
            "set": "orthogonal set",
            "independent": "independence",
            "coefficient": "coordinate reading",
            "normalize": "normalize",
            "orthonormal": "orthonormal basis",
            "nonzero": "nonzero + pairwise orthogonal",
            "cross": "cross terms vanish",
            "no_system": "no linear system",
            "denominator": "denominator disappears",
        },
        "states": [
            (
                "Zero inner product is the algebraic orthogonality test",
                "For x=(1,2) and y=(-2,1), the dot product is -2+2=0, so the vectors are perpendicular.",
                "<x,y>=0  means  x perpendicular y",
            ),
            (
                "An orthogonal set is nonzero and pairwise orthogonal",
                "The source example v1=(1,1,1), v2=(1,-1,0), v3=(1,1,-2) has every pairwise dot product equal to zero.",
                "<v1,v2>=<v1,v3>=<v2,v3>=0",
            ),
            (
                "Orthogonal nonzero sets are automatically independent",
                "Take the inner product of a linear relation with vi. Every cross term vanishes, leaving alpha_i ||vi||^2=0.",
                "alpha_i ||vi||^2 = 0  ->  alpha_i=0",
            ),
            (
                "Coordinates are read directly from inner products",
                "If v is in the span, alpha_i=<v,vi>/||vi||^2. No new linear system is needed.",
                "alpha_i = <v,vi>/||vi||^2",
            ),
            (
                "Normalize an orthogonal basis into an orthonormal basis",
                "Divide each nonzero orthogonal vector by its own length; the directions stay orthogonal and each length becomes 1.",
                "q_i = v_i / ||v_i||",
            ),
            (
                "In an orthonormal basis the denominators disappear",
                "Because ||q_i||=1, the coefficient of q_i is just <v,q_i>.",
                "v = <v,q1>q1 + ... + <v,qk>qk",
            ),
        ],
        "conclusion": "Orthogonality turns coordinate recovery into a set of separate inner-product readings. Orthonormality is the cleaned-up version: same directions, unit length, and no denominator.",
    },
    "zh-hk": {
        "title": "正交集令坐標可以直接讀出",
        "subtitle": "交叉內積為零消除干擾；正規化再消除分母。",
        "visual": {
            "zero": "內積為零",
            "set": "正交集",
            "independent": "線性無關",
            "coefficient": "讀出坐標",
            "normalize": "正規化",
            "orthonormal": "標準正交基",
            "nonzero": "非零 + 兩兩正交",
            "cross": "交叉項消失",
            "no_system": "不用解線性系統",
            "denominator": "分母消失",
        },
        "states": [
            (
                "內積為零是正交的代數判準",
                "對 x=(1,2) 與 y=(-2,1)，點積是 -2+2=0，所以兩向量垂直。",
                "<x,y>=0  表示  x 垂直 y",
            ),
            (
                "正交集要求非零，而且兩兩正交",
                "來源例子 v1=(1,1,1)、v2=(1,-1,0)、v3=(1,1,-2) 的兩兩內積全為零。",
                "<v1,v2>=<v1,v3>=<v2,v3>=0",
            ),
            (
                "非零正交集自動線性無關",
                "把一條線性關係與 vi 取內積。所有交叉項消失，只留下 alpha_i ||vi||^2=0。",
                "alpha_i ||vi||^2 = 0  ->  alpha_i=0",
            ),
            (
                "坐標可由內積直接讀出",
                "若 v 在張成空間內，alpha_i=<v,vi>/||vi||^2。不需要再解新的線性系統。",
                "alpha_i = <v,vi>/||vi||^2",
            ),
            (
                "把正交基正規化為標準正交基",
                "每個非零正交向量除以自身長度；方向仍然正交，而每個長度變成 1。",
                "q_i = v_i / ||v_i||",
            ),
            (
                "在標準正交基中，分母會消失",
                "因為 ||q_i||=1，q_i 的係數就是 <v,q_i>。",
                "v = <v,q1>q1 + ... + <v,qk>qk",
            ),
        ],
        "conclusion": "正交性把坐標恢復拆成一個個互不干擾的內積讀數。標準正交性是整理後的版本：方向相同、長度為一，而且不用分母。",
    },
    "zh-cn": {
        "title": "正交集让坐标可以直接读出",
        "subtitle": "交叉内积为零消除干扰；规范化再消除分母。",
        "visual": {
            "zero": "内积为零",
            "set": "正交集",
            "independent": "线性无关",
            "coefficient": "读出坐标",
            "normalize": "规范化",
            "orthonormal": "标准正交基",
            "nonzero": "非零 + 两两正交",
            "cross": "交叉项消失",
            "no_system": "不用解线性系统",
            "denominator": "分母消失",
        },
        "states": [
            (
                "内积为零是正交的代数判准",
                "对 x=(1,2) 与 y=(-2,1)，点积是 -2+2=0，所以两向量垂直。",
                "<x,y>=0  表示  x 垂直 y",
            ),
            (
                "正交集要求非零，而且两两正交",
                "来源例子 v1=(1,1,1)、v2=(1,-1,0)、v3=(1,1,-2) 的两两内积全为零。",
                "<v1,v2>=<v1,v3>=<v2,v3>=0",
            ),
            (
                "非零正交集自动线性无关",
                "把一条线性关系与 vi 取内积。所有交叉项消失，只留下 alpha_i ||vi||^2=0。",
                "alpha_i ||vi||^2 = 0  ->  alpha_i=0",
            ),
            (
                "坐标可由内积直接读出",
                "若 v 在张成空间内，alpha_i=<v,vi>/||vi||^2。不需要再解新的线性系统。",
                "alpha_i = <v,vi>/||vi||^2",
            ),
            (
                "把正交基规范化为标准正交基",
                "每个非零正交向量除以自身长度；方向仍然正交，而每个长度变成 1。",
                "q_i = v_i / ||v_i||",
            ),
            (
                "在标准正交基中，分母会消失",
                "因为 ||q_i||=1，q_i 的系数就是 <v,q_i>。",
                "v = <v,q1>q1 + ... + <v,qk>qk",
            ),
        ],
        "conclusion": "正交性把坐标恢复拆成一个个互不干扰的内积读数。标准正交性是整理后的版本：方向相同、长度为一，而且不用分母。",
    },
}


VECTORS = {
    "v1": (1, 1, 1),
    "v2": (1, -1, 0),
    "v3": (1, 1, -2),
    "v": (1, 2, 3),
}


class OrthogonalSetsOrthonormalBasesStoryBase(Scene):
    """MATH1030 9.2: orthogonal sets, direct coordinates, and orthonormal bases."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def formula_card(self, title, body, color=GREEN_B, width=4.6, height=0.88):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
        )
        title_mob = self.label(title, font_size=16, color=color, weight=MEDIUM, max_width=width * 0.88)
        body_mob = self.label(body, font_size=20, max_width=width * 0.86)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content)

    def state_card(self, index):
        state = TEXT[self.locale]["states"][index]
        box = RoundedRectangle(
            corner_radius=0.1,
            width=12.25,
            height=1.22,
            stroke_color=GRAY_C,
            fill_color=BLACK,
            fill_opacity=0.28,
        )
        title = self.label(state[0], font_size=20, color=YELLOW_B, weight=MEDIUM, max_width=11.25)
        detail = self.label(state[1], font_size=15, color=GRAY_A, max_width=11.2)
        formula = self.label(state[2], font_size=21, color=GREEN_B, weight=MEDIUM, max_width=10.85)
        content = VGroup(title, detail, formula).arrange(DOWN, buff=0.07).move_to(box)
        return VGroup(box, content).to_edge(DOWN, buff=0.24)

    def vector_card(self, name, values, color=BLUE_B, width=2.15, height=0.9):
        body = f"({', '.join(str(value) for value in values)})"
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
        )
        title = self.label(name, font_size=20, color=color, weight=MEDIUM, max_width=width * 0.78)
        vector = self.label(body, font_size=20, max_width=width * 0.82)
        content = VGroup(title, vector).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content)

    def proof_badge(self, body, color=GREEN_B, width=3.8):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=0.7,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
        )
        text = self.label(body, font_size=18, color=WHITE, max_width=width * 0.88).move_to(box)
        return VGroup(box, text)

    def plane(self):
        return NumberPlane(
            x_range=[-2.7, 2.9, 1],
            y_range=[-0.5, 2.55, 1],
            x_length=5.4,
            y_length=3.05,
            background_line_style={"stroke_color": BLUE_E, "stroke_opacity": 0.28, "stroke_width": 1},
            axis_config={"stroke_color": GRAY_B, "stroke_width": 1.5},
        )

    def arrow_on_plane(self, plane, vector, color, name, label_direction=UP):
        arrow = Arrow(
            plane.c2p(0, 0),
            plane.c2p(vector[0], vector[1]),
            buff=0,
            color=color,
            stroke_width=5,
            max_tip_length_to_length_ratio=0.16,
        )
        tag = self.label(name, font_size=18, color=color, weight=MEDIUM, max_width=1.1)
        tag.next_to(arrow.get_end(), label_direction, buff=0.08)
        return VGroup(arrow, tag)

    def zero_dot_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane()
        x = (1, 2)
        y = (-2, 1)
        x_arrow = self.arrow_on_plane(plane, x, BLUE_B, "x")
        y_arrow = self.arrow_on_plane(plane, y, RED_B, "y", label_direction=LEFT)
        angle = atan2(x[1], x[0])
        marker = Square(side_length=0.32, color=YELLOW_B, stroke_width=4)
        marker.rotate(angle)
        marker.move_to(plane.c2p(0.18, 0.27))
        cards = VGroup(
            self.formula_card(labels["zero"], "x=(1,2), y=(-2,1)", YELLOW_B, width=4.35),
            self.formula_card("dot", "1(-2)+2(1)=0", GREEN_B, width=3.75),
        ).arrange(DOWN, buff=0.18)
        return VGroup(VGroup(plane, x_arrow, y_arrow, marker), cards).arrange(RIGHT, buff=0.5).scale_to_fit_width(11.0)

    def orthogonal_set_visual(self):
        labels = TEXT[self.locale]["visual"]
        vectors = VGroup(
            self.vector_card("v1", VECTORS["v1"], BLUE_B),
            self.vector_card("v2", VECTORS["v2"], PURPLE_B),
            self.vector_card("v3", VECTORS["v3"], TEAL_B),
        ).arrange(RIGHT, buff=0.22)
        dots = VGroup(
            self.proof_badge("<v1,v2>=1-1+0=0", BLUE_B, width=4.1),
            self.proof_badge("<v1,v3>=1+1-2=0", PURPLE_B, width=4.1),
            self.proof_badge("<v2,v3>=1-1+0=0", TEAL_B, width=4.1),
        ).arrange(DOWN, buff=0.16)
        header = self.formula_card(labels["set"], labels["nonzero"], GREEN_B, width=5.2, height=0.82)
        return VGroup(VGroup(header, vectors).arrange(DOWN, buff=0.24), dots).arrange(RIGHT, buff=0.5).scale_to_fit_width(11.0)

    def independence_visual(self):
        labels = TEXT[self.locale]["visual"]
        relation = self.formula_card(
            labels["independent"],
            "alpha1 v1 + ... + alphak vk = 0",
            YELLOW_B,
            width=5.7,
            height=0.92,
        )
        arrow = Arrow(LEFT * 1.1, RIGHT * 1.1, color=GRAY_A, stroke_width=4)
        take_inner = self.formula_card("take < , vi >", "cross terms -> 0", BLUE_B, width=3.9, height=0.82)
        result = self.formula_card(labels["cross"], "alpha_i ||vi||^2 = 0", GREEN_B, width=4.35, height=0.9)
        final = self.formula_card(labels["nonzero"], "alpha_i = 0 for every i", TEAL_B, width=4.6, height=0.82)
        row = VGroup(relation, arrow, take_inner).arrange(RIGHT, buff=0.26)
        return VGroup(row, result, final).arrange(DOWN, buff=0.28).scale_to_fit_width(11.4)

    def coefficient_visual(self):
        labels = TEXT[self.locale]["visual"]
        vector_row = VGroup(
            self.vector_card("v", VECTORS["v"], YELLOW_B, width=1.9),
            self.label("in span", font_size=20, color=GRAY_A, max_width=1.4),
            self.vector_card("v1", VECTORS["v1"], BLUE_B),
            self.vector_card("v2", VECTORS["v2"], PURPLE_B),
            self.vector_card("v3", VECTORS["v3"], TEAL_B),
        ).arrange(RIGHT, buff=0.18)
        formula = self.formula_card(labels["coefficient"], "alpha_i=<v,vi>/||vi||^2", GREEN_B, width=5.1, height=0.86)
        coefficients = VGroup(
            self.proof_badge("alpha1 = 6/3 = 2", BLUE_B, width=3.3),
            self.proof_badge("alpha2 = -1/2", PURPLE_B, width=3.3),
            self.proof_badge("alpha3 = -3/6 = -1/2", TEAL_B, width=3.8),
        ).arrange(RIGHT, buff=0.18)
        expansion = self.formula_card(labels["no_system"], "v = 2v1 - 1/2 v2 - 1/2 v3", YELLOW_B, width=5.9, height=0.82)
        return VGroup(vector_row, formula, coefficients, expansion).arrange(DOWN, buff=0.25).scale_to_fit_width(11.2)

    def normalize_visual(self):
        labels = TEXT[self.locale]["visual"]
        top = VGroup(
            self.vector_card("v1", VECTORS["v1"], BLUE_B),
            self.formula_card("||v1||", "sqrt(3)", BLUE_B, width=2.35, height=0.76),
            self.vector_card("v2", VECTORS["v2"], PURPLE_B),
            self.formula_card("||v2||", "sqrt(2)", PURPLE_B, width=2.35, height=0.76),
            self.vector_card("v3", VECTORS["v3"], TEAL_B),
            self.formula_card("||v3||", "sqrt(6)", TEAL_B, width=2.35, height=0.76),
        ).arrange(RIGHT, buff=0.12)
        rule = self.formula_card(labels["normalize"], "q_i = v_i / ||v_i||", GREEN_B, width=4.6, height=0.82)
        bottom = VGroup(
            self.proof_badge("q1 = v1/sqrt(3)", BLUE_B, width=3.3),
            self.proof_badge("q2 = v2/sqrt(2)", PURPLE_B, width=3.3),
            self.proof_badge("q3 = v3/sqrt(6)", TEAL_B, width=3.3),
        ).arrange(RIGHT, buff=0.18)
        length = self.formula_card(labels["orthonormal"], "||q_i||=1 and <qi,qj>=0", YELLOW_B, width=5.3, height=0.82)
        return VGroup(top, rule, bottom, length).arrange(DOWN, buff=0.22).scale_to_fit_width(11.2)

    def orthonormal_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = VGroup(
            self.formula_card("orthogonal", "alpha_i=<v,vi>/||vi||^2", BLUE_B, width=4.9),
            self.formula_card("orthonormal", "beta_i=<v,qi>", GREEN_B, width=3.7),
        ).arrange(DOWN, buff=0.22)
        table = VGroup(
            self.proof_badge("||q1||^2 = 1", BLUE_B, width=3.0),
            self.proof_badge("||q2||^2 = 1", PURPLE_B, width=3.0),
            self.proof_badge("||q3||^2 = 1", TEAL_B, width=3.0),
        ).arrange(DOWN, buff=0.16)
        formula = self.formula_card(labels["denominator"], "v = <v,q1>q1 + <v,q2>q2 + <v,q3>q3", YELLOW_B, width=6.0)
        return VGroup(VGroup(left, table).arrange(RIGHT, buff=0.55), formula).arrange(DOWN, buff=0.3).scale_to_fit_width(11.2)

    def visual_for(self, index):
        return [
            self.zero_dot_visual,
            self.orthogonal_set_visual,
            self.independence_visual,
            self.coefficient_visual,
            self.normalize_visual,
            self.orthonormal_visual,
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


class OrthogonalSetsOrthonormalBasesStoryEn(OrthogonalSetsOrthonormalBasesStoryBase):
    locale = "en"
    font = "Avenir Next"


class OrthogonalSetsOrthonormalBasesStoryZhHk(OrthogonalSetsOrthonormalBasesStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class OrthogonalSetsOrthonormalBasesStoryZhCn(OrthogonalSetsOrthonormalBasesStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class OrthogonalSetsOrthonormalBasesStory(OrthogonalSetsOrthonormalBasesStoryEn):
    pass
