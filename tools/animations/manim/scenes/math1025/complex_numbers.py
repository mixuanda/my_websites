from manim import *


TEXT = {
    "en": {
        "title": "Complex arithmetic on the plane",
        "subtitle": "Add as vectors; multiply by scaling lengths and adding angles.",
        "summary_label": "Summary",
        "visual": {
            "real": "real axis",
            "imag": "imaginary axis",
            "point": "z = x + iy",
            "coordinate": "(x, y)",
            "z1": "z1 = 2+i",
            "z2": "z2 = 1+2i",
            "sum": "z1+z2 = 3+3i",
            "addition": "add coordinates",
            "modulus": "|z| = r",
            "argument": "arg(z)=theta",
            "polar": "z = r(cos theta + i sin theta)",
            "x_proj": "x = r cos theta",
            "y_proj": "y = r sin theta",
            "lengths": "lengths multiply",
            "angles": "angles add",
            "product": "z1z2",
            "rotation_scaling": "rotation + scaling",
            "formula": "r1*r2, theta1+theta2",
            "division": "division reverses the second rotation",
        },
        "states": [
            (
                "A complex number is a point",
                "The ordered pair (x,y) becomes the point or vector z=x+iy in the complex plane.",
                "z = x + iy <-> (x,y)",
            ),
            (
                "Addition follows the vector rule",
                "Add real parts and imaginary parts separately; the diagonal is the sum.",
                "(x1+x2) + i(y1+y2)",
            ),
            (
                "Modulus and argument read length and direction",
                "The modulus is distance from the origin; an argument is an angle up to full turns.",
                "|z|=r, arg(z)=theta+2k*pi",
            ),
            (
                "Polar form stores the same vector",
                "The coordinates are x=r cos theta and y=r sin theta.",
                "z=r(cos theta+i sin theta)",
            ),
            (
                "Multiplication multiplies lengths",
                "For nonzero factors, the product has modulus |z1||z2|.",
                "|z1z2|=|z1||z2|",
            ),
            (
                "Multiplication adds angles",
                "The product direction is obtained by adding arguments, modulo 2 pi.",
                "arg(z1z2)=arg(z1)+arg(z2)",
            ),
        ],
        "conclusion": "Complex addition has the geometry of vector addition, while complex multiplication is most transparent in polar form: multiply the moduli and add the arguments.",
    },
    "zh-hk": {
        "title": "複數運算的平面圖像",
        "subtitle": "加法按向量相加；乘法把長度相乘、幅角相加。",
        "summary_label": "總結",
        "visual": {
            "real": "實軸",
            "imag": "虛軸",
            "point": "z = x + iy",
            "coordinate": "(x, y)",
            "z1": "z1 = 2+i",
            "z2": "z2 = 1+2i",
            "sum": "z1+z2 = 3+3i",
            "addition": "坐標相加",
            "modulus": "|z| = r",
            "argument": "arg(z)=theta",
            "polar": "z = r(cos theta + i sin theta)",
            "x_proj": "x = r cos theta",
            "y_proj": "y = r sin theta",
            "lengths": "長度相乘",
            "angles": "幅角相加",
            "product": "z1z2",
            "rotation_scaling": "旋轉 + 縮放",
            "formula": "r1*r2, theta1+theta2",
            "division": "除法反向第二個旋轉",
        },
        "states": [
            (
                "複數是一個平面點",
                "有序對 (x,y) 變成複平面上的點或向量 z=x+iy。",
                "z = x + iy <-> (x,y)",
            ),
            (
                "加法遵循向量法則",
                "分別相加實部與虛部；對角線就是和。",
                "(x1+x2) + i(y1+y2)",
            ),
            (
                "模與幅角讀出長度和方向",
                "模是離原點的距離；幅角是相差整圈仍等價的角。",
                "|z|=r, arg(z)=theta+2k*pi",
            ),
            (
                "極式記錄同一支向量",
                "坐標是 x=r cos theta 與 y=r sin theta。",
                "z=r(cos theta+i sin theta)",
            ),
            (
                "乘法把長度相乘",
                "對非零因子，乘積的模是 |z1||z2|。",
                "|z1z2|=|z1||z2|",
            ),
            (
                "乘法把幅角相加",
                "乘積方向由相加幅角得到，並以模 2 pi 理解。",
                "arg(z1z2)=arg(z1)+arg(z2)",
            ),
        ],
        "conclusion": "複數加法具有向量加法的幾何；複數乘法在極式中最清楚：把模相乘，並把幅角相加。",
    },
    "zh-cn": {
        "title": "复数运算的平面图像",
        "subtitle": "加法按向量相加；乘法把长度相乘、辐角相加。",
        "summary_label": "总结",
        "visual": {
            "real": "实轴",
            "imag": "虚轴",
            "point": "z = x + iy",
            "coordinate": "(x, y)",
            "z1": "z1 = 2+i",
            "z2": "z2 = 1+2i",
            "sum": "z1+z2 = 3+3i",
            "addition": "坐标相加",
            "modulus": "|z| = r",
            "argument": "arg(z)=theta",
            "polar": "z = r(cos theta + i sin theta)",
            "x_proj": "x = r cos theta",
            "y_proj": "y = r sin theta",
            "lengths": "长度相乘",
            "angles": "辐角相加",
            "product": "z1z2",
            "rotation_scaling": "旋转 + 缩放",
            "formula": "r1*r2, theta1+theta2",
            "division": "除法反向第二个旋转",
        },
        "states": [
            (
                "复数是一个平面点",
                "有序对 (x,y) 变成复平面上的点或向量 z=x+iy。",
                "z = x + iy <-> (x,y)",
            ),
            (
                "加法遵循向量法则",
                "分别相加实部与虚部；对角线就是和。",
                "(x1+x2) + i(y1+y2)",
            ),
            (
                "模与辐角读出长度和方向",
                "模是离原点的距离；辐角是相差整圈仍等价的角。",
                "|z|=r, arg(z)=theta+2k*pi",
            ),
            (
                "极式记录同一支向量",
                "坐标是 x=r cos theta 与 y=r sin theta。",
                "z=r(cos theta+i sin theta)",
            ),
            (
                "乘法把长度相乘",
                "对非零因子，乘积的模是 |z1||z2|。",
                "|z1z2|=|z1||z2|",
            ),
            (
                "乘法把辐角相加",
                "乘积方向由相加辐角得到，并以模 2 pi 理解。",
                "arg(z1z2)=arg(z1)+arg(z2)",
            ),
        ],
        "conclusion": "复数加法具有向量加法的几何；复数乘法在极式中最清楚：把模相乘，并把辐角相加。",
    },
}


class ComplexPlaneArithmeticStoryBase(Scene):
    """MATH1025 6.1: complex arithmetic, polar form, and geometry."""

    locale = "en"
    font = "Avenir Next"
    scale = 0.58

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def point(self, x, y, origin=ORIGIN):
        return origin + RIGHT * x * self.scale + UP * y * self.scale

    def plane(self, origin=ORIGIN, width=6.2, height=3.2, show_labels=True):
        labels = TEXT[self.locale]["visual"]
        frame = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=GRAY_B,
            stroke_opacity=0.65,
            fill_color=BLACK,
            fill_opacity=0.12,
        ).move_to(origin)
        x_axis = Line(origin + LEFT * width * 0.43, origin + RIGHT * width * 0.43, color=GRAY_B, stroke_width=2)
        y_axis = Line(origin + DOWN * height * 0.42, origin + UP * height * 0.42, color=GRAY_B, stroke_width=2)
        if not show_labels:
            return VGroup(frame, x_axis, y_axis)
        real = self.label(labels["real"], font_size=16, color=GRAY_A, max_width=1.7)
        real.move_to(origin + RIGHT * width * 0.37 + DOWN * 0.08)
        imag = self.label(labels["imag"], font_size=16, color=GRAY_A, max_width=1.7)
        imag.move_to(origin + UP * height * 0.34 + LEFT * 0.34)
        return VGroup(frame, x_axis, y_axis, real, imag)

    def vector(self, x, y, label, color=BLUE_B, origin=ORIGIN, start=None, label_shift=UR * 0.18):
        start = origin if start is None else start
        end = self.point(x, y, start)
        arrow = Arrow(
            start,
            end,
            buff=0,
            color=color,
            stroke_width=4,
            max_tip_length_to_length_ratio=0.14,
        )
        dot = Dot(end, radius=0.06, color=color)
        tag = self.label(label, font_size=20, color=color, weight=MEDIUM, max_width=2.1)
        tag.next_to(dot, label_shift, buff=0.08)
        return VGroup(arrow, dot, tag), end

    def explain_card(self, state):
        title, body, key = state
        box = RoundedRectangle(
            corner_radius=0.1,
            width=11.8,
            height=1.08,
            stroke_color=TEAL_B,
            stroke_width=1.5,
            fill_color=BLACK,
            fill_opacity=0.22,
        ).move_to(DOWN * 2.72)
        title_mob = self.label(title, font_size=22, color=TEAL_B, weight=MEDIUM, max_width=11.0)
        body_mob = self.label(body, font_size=19, color=WHITE, max_width=10.9)
        key_mob = self.label(key, font_size=18, color=YELLOW_B, weight=MEDIUM, max_width=10.7)
        content = VGroup(title_mob, body_mob, key_mob).arrange(DOWN, buff=0.045).move_to(box)
        return VGroup(box, content)

    def point_visual(self):
        labels = TEXT[self.locale]["visual"]
        origin = LEFT * 1.0 + DOWN * 0.05
        base = self.plane(origin=origin)
        z_vec, end = self.vector(2.6, 1.35, labels["point"], color=BLUE_B, origin=origin)
        x_drop = DashedLine(end, self.point(2.6, 0, origin), color=GRAY_B, dash_length=0.1)
        y_drop = DashedLine(end, self.point(0, 1.35, origin), color=GRAY_B, dash_length=0.1)
        coord = self.label(labels["coordinate"], font_size=22, color=YELLOW_B, weight=MEDIUM, max_width=1.6)
        coord.next_to(end, UP, buff=0.24)
        return VGroup(base, z_vec, x_drop, y_drop, coord).move_to(UP * 0.05)

    def addition_visual(self):
        labels = TEXT[self.locale]["visual"]
        origin = LEFT * 1.0 + DOWN * 0.08
        base = self.plane(origin=origin, show_labels=False)
        z1, z1_end = self.vector(2, 1, labels["z1"], color=BLUE_B, origin=origin, label_shift=DOWN * 0.18)
        z2, _ = self.vector(1, 2, labels["z2"], color=GREEN_B, origin=origin, label_shift=LEFT * 0.22)
        translated, _ = self.vector(1, 2, "", color=GREEN_B, origin=origin, start=z1_end)
        translated[2].set_opacity(0)
        sum_vec, _ = self.vector(3, 3, labels["sum"], color=YELLOW_B, origin=origin, label_shift=UR * 0.16)
        helper = DashedLine(self.point(1, 2, origin), self.point(3, 3, origin), color=GREEN_B, dash_length=0.1)
        tag = self.label(labels["addition"], font_size=22, color=WHITE, weight=MEDIUM, max_width=2.8)
        tag.next_to(base, UP, buff=0.08)
        visual = VGroup(base, z1, z2, translated, sum_vec, helper, tag)
        if visual.width > 7.2:
            visual.scale_to_fit_width(7.2)
        return visual.move_to(UP * 0.05)

    def modulus_argument_visual(self):
        labels = TEXT[self.locale]["visual"]
        origin = LEFT * 1.0 + DOWN * 0.08
        base = self.plane(origin=origin)
        z_vec, end = self.vector(2.6, 1.5, "z", color=BLUE_B, origin=origin)
        length = self.label(labels["modulus"], font_size=23, color=YELLOW_B, weight=MEDIUM, max_width=2.0)
        length.next_to(z_vec[0], DOWN, buff=0.12)
        arc = Arc(radius=0.65, start_angle=0, angle=0.52, color=GREEN_B, stroke_width=4).move_arc_center_to(origin)
        theta = self.label(labels["argument"], font_size=22, color=GREEN_B, weight=MEDIUM, max_width=2.5)
        theta.next_to(arc, RIGHT, buff=0.15).shift(UP * 0.05)
        return VGroup(base, z_vec, arc, theta, length).move_to(UP * 0.05)

    def polar_visual(self):
        labels = TEXT[self.locale]["visual"]
        origin = LEFT * 1.15 + DOWN * 0.05
        base = self.plane(origin=origin)
        z_vec, end = self.vector(2.7, 1.35, "z", color=BLUE_B, origin=origin)
        x_foot = self.point(2.7, 0, origin)
        y_foot = self.point(0, 1.35, origin)
        x_line = Line(origin, x_foot, color=YELLOW_B, stroke_width=4)
        y_line = Line(x_foot, end, color=GREEN_B, stroke_width=4)
        y_dashed = DashedLine(y_foot, end, color=GRAY_B, dash_length=0.1)
        arc = Arc(radius=0.58, start_angle=0, angle=0.46, color=GREEN_B, stroke_width=4).move_arc_center_to(origin)
        x_label = self.label(labels["x_proj"], font_size=18, color=YELLOW_B, max_width=2.2)
        x_label.next_to(x_line, DOWN, buff=0.1)
        y_label = self.label(labels["y_proj"], font_size=18, color=GREEN_B, max_width=2.2)
        y_label.next_to(y_line, RIGHT, buff=0.08)
        formula = self.label(labels["polar"], font_size=23, color=WHITE, weight=MEDIUM, max_width=5.4)
        formula.next_to(base, UP, buff=0.08)
        return VGroup(base, z_vec, x_line, y_line, y_dashed, arc, x_label, y_label, formula).move_to(UP * 0.05)

    def multiplication_length_visual(self):
        labels = TEXT[self.locale]["visual"]
        origin = LEFT * 1.0 + DOWN * 0.08
        base = self.plane(origin=origin, show_labels=False)
        z1, _ = self.vector(1.65, 0.95, "z1", color=BLUE_B, origin=origin, label_shift=DOWN * 0.18)
        z2, _ = self.vector(1.05, 1.5, "z2", color=GREEN_B, origin=origin, label_shift=LEFT * 0.22)
        product, _ = self.vector(2.45, 2.4, labels["product"], color=YELLOW_B, origin=origin, label_shift=UR * 0.14)
        tag = self.label(labels["lengths"], font_size=23, color=YELLOW_B, weight=MEDIUM, max_width=3.2)
        tag.next_to(base, UP, buff=0.08)
        formula = self.label("|z1z2| = |z1||z2|", font_size=21, color=WHITE, max_width=4.4)
        formula.next_to(base, RIGHT, buff=0.18)
        return VGroup(base, z1, z2, product, tag, formula).move_to(UP * 0.05)

    def multiplication_angle_visual(self):
        labels = TEXT[self.locale]["visual"]
        origin = LEFT * 1.0 + DOWN * 0.08
        base = self.plane(origin=origin, show_labels=False)
        z1, _ = self.vector(1.8, 0.85, "theta1", color=BLUE_B, origin=origin, label_shift=DOWN * 0.15)
        z2, _ = self.vector(1.0, 1.45, "theta2", color=GREEN_B, origin=origin, label_shift=LEFT * 0.22)
        product, _ = self.vector(2.25, 2.25, labels["product"], color=YELLOW_B, origin=origin, label_shift=UR * 0.12)
        arc1 = Arc(radius=0.47, start_angle=0, angle=0.44, color=BLUE_B, stroke_width=4).move_arc_center_to(origin)
        arc2 = Arc(radius=0.68, start_angle=0.44, angle=0.49, color=GREEN_B, stroke_width=4).move_arc_center_to(origin)
        arc3 = Arc(radius=0.93, start_angle=0, angle=0.93, color=YELLOW_B, stroke_width=4).move_arc_center_to(origin)
        tag = self.label(labels["angles"], font_size=23, color=YELLOW_B, weight=MEDIUM, max_width=3.0)
        tag.next_to(base, UP, buff=0.08)
        formula = self.label(labels["formula"], font_size=21, color=WHITE, max_width=3.8)
        formula.next_to(base, RIGHT, buff=0.18)
        note = self.label(labels["division"], font_size=18, color=GRAY_A, max_width=3.9)
        note.next_to(formula, DOWN, buff=0.16)
        return VGroup(base, z1, z2, product, arc1, arc2, arc3, tag, formula, note).move_to(UP * 0.05)

    def construct(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=WHITE, weight=BOLD, max_width=10.5)
        title.to_edge(UP, buff=0.2)
        subtitle = self.label(data["subtitle"], font_size=19, color=GRAY_B, max_width=10.5)
        subtitle.next_to(title, DOWN, buff=0.08)

        visuals = [
            self.point_visual,
            self.addition_visual,
            self.modulus_argument_visual,
            self.polar_visual,
            self.multiplication_length_visual,
            self.multiplication_angle_visual,
        ]

        current_visual = visuals[0]()
        current_card = self.explain_card(data["states"][0])
        self.play(FadeIn(title), FadeIn(subtitle), FadeIn(current_visual), FadeIn(current_card), run_time=1.0)
        self.wait(1.6)

        for index in range(1, len(visuals)):
            next_visual = visuals[index]()
            next_card = self.explain_card(data["states"][index])
            self.play(
                FadeOut(current_visual, shift=LEFT * 0.25),
                FadeOut(current_card, shift=DOWN * 0.12),
                FadeIn(next_visual, shift=LEFT * 0.25),
                FadeIn(next_card, shift=UP * 0.12),
                run_time=0.8,
            )
            current_visual = next_visual
            current_card = next_card
            self.wait(0.75)

        conclusion = self.explain_card((data["summary_label"], data["conclusion"], data["states"][-1][2]))
        self.play(Transform(current_card, conclusion), run_time=0.7)
        self.wait(1.0)


class ComplexPlaneArithmeticStoryEn(ComplexPlaneArithmeticStoryBase):
    locale = "en"
    font = "Avenir Next"


class ComplexPlaneArithmeticStoryZhHk(ComplexPlaneArithmeticStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class ComplexPlaneArithmeticStoryZhCn(ComplexPlaneArithmeticStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class ComplexPlaneArithmeticStory(ComplexPlaneArithmeticStoryEn):
    pass
