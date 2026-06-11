from manim import *


TEXT = {
    "en": {
        "title": "Linear combinations build a span",
        "subtitle": "Move the coefficients; collect every possible output.",
        "visual": {
            "coefficients": "coefficients",
            "generator": "generator",
            "line": "one direction",
            "plane": "two directions",
            "target": "target b",
            "membership": "membership",
            "miss": "not in the span",
            "widget": "try it below",
            "same_line": "same line",
            "coeff_values": "alpha=2, beta=-1",
            "line_samples": "... -2u, -u, 0, u, 2u ...",
            "plane_free": "alpha and beta move independently",
            "membership_equation": "find alpha, beta so alpha*u + beta*v = b",
            "miss_reason": "u and 2u stay on one line",
            "recap_line": "one nonzero vector -> line",
            "recap_plane": "two nonparallel vectors -> plane",
            "recap_widget": "change alpha and beta below",
            "recap_formula": "{alpha*u + beta*v : alpha, beta in R}",
        },
        "states": [
            (
                "Build one output",
                "A linear combination chooses coefficients and returns one vector.",
                "2u - v = (2, -1)",
            ),
            (
                "One generator sweeps a line",
                "All multiples tu stay on the line through the origin.",
                "Span{u} = {tu : t in R}",
            ),
            (
                "Two directions sweep a plane",
                "Nonparallel generators let α and β move independently.",
                "Span{u, v} = R²",
            ),
            (
                "Membership asks for coefficients",
                "A target belongs to the span exactly when the coefficient equation is solvable.",
                "alpha*u + beta*v = b",
            ),
            (
                "A smaller span can miss a target",
                "Collinear generators still make only one line, so off-line targets cannot be built.",
                "b not in Span{u, 2u}",
            ),
            (
                "Span means the full output set",
                "The live explorer below lets you vary α and β after this geometric picture is fixed.",
                "collect every alpha*u + beta*v",
            ),
        ],
        "conclusion": "The structural point is output, not notation: a span is every vector reachable by changing the coefficients in a linear combination.",
    },
    "zh-hk": {
        "title": "線性組合造出張成",
        "subtitle": "移動係數；收集所有可能輸出。",
        "visual": {
            "coefficients": "係數",
            "generator": "生成向量",
            "line": "一個方向",
            "plane": "兩個方向",
            "target": "目標 b",
            "membership": "屬於張成",
            "miss": "不屬於張成",
            "widget": "下方再試",
            "same_line": "同一直線",
            "coeff_values": "alpha=2, beta=-1",
            "line_samples": "... -2u, -u, 0, u, 2u ...",
            "plane_free": "alpha 與 beta 獨立移動",
            "membership_equation": "求 alpha, beta 使 alpha*u + beta*v = b",
            "miss_reason": "u 與 2u 留在同一直線",
            "recap_line": "一個非零向量 -> 直線",
            "recap_plane": "兩個非平行向量 -> 平面",
            "recap_widget": "下方改變 alpha 與 beta",
            "recap_formula": "{alpha*u + beta*v : alpha, beta in R}",
        },
        "states": [
            (
                "造出一個輸出",
                "線性組合選取係數，然後回傳一個向量。",
                "2u − v = (2, −1)",
            ),
            (
                "一個生成向量掃出直線",
                "所有倍數 tu 都留在通過原點的同一直線上。",
                "Span{u} = {tu : t in R}",
            ),
            (
                "兩個方向掃出平面",
                "非平行生成向量讓 α 與 β 可以獨立移動。",
                "Span{u, v} = R²",
            ),
            (
                "屬於張成就是求係數",
                "目標向量屬於張成，正好等於係數方程有解。",
                "alpha*u + beta*v = b",
            ),
            (
                "較小的張成會錯過目標",
                "共線生成向量仍只造出一條線，所以線外目標不能被造出。",
                "b 不屬於 Span{u, 2u}",
            ),
            (
                "張成是完整輸出集合",
                "下方互動探索讓你在這個幾何圖像之後改變 α 與 β。",
                "收集所有 alpha*u + beta*v",
            ),
        ],
        "conclusion": "結構重點是輸出，而不只是記號：張成就是改變線性組合係數後所有可到達的向量。",
    },
    "zh-cn": {
        "title": "线性组合造出张成",
        "subtitle": "移动系数；收集所有可能输出。",
        "visual": {
            "coefficients": "系数",
            "generator": "生成向量",
            "line": "一个方向",
            "plane": "两个方向",
            "target": "目标 b",
            "membership": "属于张成",
            "miss": "不属于张成",
            "widget": "下方再试",
            "same_line": "同一直线",
            "coeff_values": "alpha=2, beta=-1",
            "line_samples": "... -2u, -u, 0, u, 2u ...",
            "plane_free": "alpha 与 beta 独立移动",
            "membership_equation": "求 alpha, beta 使 alpha*u + beta*v = b",
            "miss_reason": "u 与 2u 留在同一直线",
            "recap_line": "一个非零向量 -> 直线",
            "recap_plane": "两个非平行向量 -> 平面",
            "recap_widget": "下方改变 alpha 与 beta",
            "recap_formula": "{alpha*u + beta*v : alpha, beta in R}",
        },
        "states": [
            (
                "造出一个输出",
                "线性组合选取系数，然后返回一个向量。",
                "2u − v = (2, −1)",
            ),
            (
                "一个生成向量扫出直线",
                "所有倍数 tu 都留在通过原点的同一直线上。",
                "Span{u} = {tu : t in R}",
            ),
            (
                "两个方向扫出平面",
                "非平行生成向量让 α 与 β 可以独立移动。",
                "Span{u, v} = R²",
            ),
            (
                "属于张成就是求系数",
                "目标向量属于张成，正好等于系数方程有解。",
                "alpha*u + beta*v = b",
            ),
            (
                "较小的张成会错过目标",
                "共线生成向量仍只造出一条线，所以线外目标不能被造出。",
                "b 不属于 Span{u, 2u}",
            ),
            (
                "张成是完整输出集合",
                "下方互动探索让你在这个几何图像之后改变 α 与 β。",
                "收集所有 alpha*u + beta*v",
            ),
        ],
        "conclusion": "结构重点是输出，而不只是记号：张成就是改变线性组合系数后所有可到达的向量。",
    },
}


class LinearCombinationSpanSweepStoryBase(Scene):
    """MATH1030 6.3: coefficients sweeping out a span."""

    locale = "en"
    font = "Avenir Next"
    scale = 0.48

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def point(self, x, y):
        return x * RIGHT * self.scale + y * UP * self.scale

    def formula_card(self, title, body, color=GREEN_B, width=5.9, height=0.86):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.22,
        )
        title_mob = self.label(title, font_size=18, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=22, max_width=width * 0.9)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content)

    def fit_visual(self, visual, max_width=7.25, max_height=3.35):
        if visual.width > max_width:
            visual.scale_to_fit_width(max_width)
        if visual.height > max_height:
            visual.scale_to_fit_height(max_height)
        return visual

    def plane_base(self, width=4.4, height=2.7):
        bg = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=GRAY_C,
            fill_color=BLACK,
            fill_opacity=0.2,
        )
        grid = VGroup()
        for x in range(-4, 5):
            grid.add(Line(self.point(x, -2.5), self.point(x, 2.5), stroke_width=0.45, color=GRAY_D).set_opacity(0.35))
        for y in range(-3, 4):
            grid.add(Line(self.point(-4.2, y), self.point(4.2, y), stroke_width=0.45, color=GRAY_D).set_opacity(0.35))
        axes = VGroup(
            Line(self.point(-4.25, 0), self.point(4.25, 0), stroke_width=1.2, color=GRAY_B),
            Line(self.point(0, -2.5), self.point(0, 2.5), stroke_width=1.2, color=GRAY_B),
        )
        return VGroup(bg, grid, axes)

    def vector_arrow(self, x, y, label, color, label_direction=UP):
        arrow = Arrow(
            self.point(0, 0),
            self.point(x, y),
            buff=0,
            color=color,
            max_tip_length_to_length_ratio=0.18,
            stroke_width=4,
        )
        tag = self.label(label, font_size=20, color=color, weight=MEDIUM, max_width=1.0)
        tag.next_to(arrow.get_end(), label_direction, buff=0.08)
        return VGroup(arrow, tag)

    def output_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane_base()
        u = self.vector_arrow(1, 0, "u", BLUE_B, DOWN)
        v = self.vector_arrow(0, 1, "v", GREEN_B, LEFT)
        result = self.vector_arrow(2, -1, "2u − v", PURPLE_B, RIGHT)
        path = VGroup(
            DashedLine(self.point(2, 0), self.point(2, -1), dash_length=0.06, stroke_width=2, color=PURPLE_B),
            Dot(self.point(2, -1), radius=0.055, color=PURPLE_B),
        )
        card = self.formula_card(labels["coefficients"], labels["coeff_values"], BLUE_B, width=3.8)
        return self.fit_visual(VGroup(VGroup(plane, u, v, path, result), card).arrange(DOWN, buff=0.24))

    def line_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane_base()
        line = Line(self.point(-3.2, -1.28), self.point(3.2, 1.28), stroke_width=5, color=BLUE_B).set_opacity(0.8)
        dots = VGroup(*[Dot(self.point(t, 0.4 * t), radius=0.045, color=YELLOW_B) for t in [-3, -2, -1, 0, 1, 2, 3]])
        u = self.vector_arrow(1.6, 0.64, "u", BLUE_B, UP)
        card = self.formula_card(labels["line"], labels["line_samples"], BLUE_B, width=6.1)
        return self.fit_visual(VGroup(VGroup(plane, line, dots, u), card).arrange(DOWN, buff=0.24))

    def plane_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane_base()
        u = self.vector_arrow(1.45, 0.15, "u", BLUE_B, DOWN)
        v = self.vector_arrow(0.55, 1.15, "v", GREEN_B, LEFT)
        lattice = VGroup()
        for a in range(-2, 3):
            for b in range(-1, 2):
                lattice.add(Dot(self.point(1.45 * a + 0.55 * b, 0.15 * a + 1.15 * b), radius=0.035, color=YELLOW_B))
        area = Polygon(
            self.point(-3.7, -1.7),
            self.point(3.7, -1.7),
            self.point(3.7, 1.7),
            self.point(-3.7, 1.7),
            stroke_width=0,
            fill_color=GREEN_E,
            fill_opacity=0.18,
        )
        card = self.formula_card(labels["plane"], labels["plane_free"], GREEN_B, width=6.1)
        return self.fit_visual(VGroup(VGroup(plane, area, lattice, u, v), card).arrange(DOWN, buff=0.24))

    def membership_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane_base()
        u = self.vector_arrow(1.2, 0.2, "u", BLUE_B, DOWN)
        v = self.vector_arrow(0.25, 1.05, "v", GREEN_B, LEFT)
        b_point = self.point(1.7, 1.25)
        b_arrow = Arrow(self.point(0, 0), b_point, buff=0, color=PURPLE_B, stroke_width=4)
        b_label = self.label("b", font_size=20, color=PURPLE_B, weight=MEDIUM, max_width=0.5).next_to(b_point, RIGHT, buff=0.08)
        path = VGroup(
            Line(self.point(0, 0), self.point(1.2, 0.2), stroke_width=3, color=BLUE_B),
            Line(self.point(1.2, 0.2), b_point, stroke_width=3, color=GREEN_B),
            Dot(b_point, radius=0.055, color=PURPLE_B),
        )
        card = self.formula_card(labels["membership"], labels["membership_equation"], PURPLE_B, width=6.4)
        return self.fit_visual(VGroup(VGroup(plane, path, u, v, b_arrow, b_label), card).arrange(DOWN, buff=0.24))

    def miss_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane_base()
        line = Line(self.point(-3.8, 0), self.point(3.8, 0), stroke_width=5, color=BLUE_B).set_opacity(0.82)
        u = self.vector_arrow(1.3, 0, "u", BLUE_B, DOWN)
        two_u = self.vector_arrow(2.6, 0, "2u", GREEN_B, DOWN)
        b_point = self.point(1.2, 1.25)
        b = VGroup(
            Dot(b_point, radius=0.065, color=RED_B),
            self.label("b", font_size=20, color=RED_B, weight=MEDIUM, max_width=0.5).next_to(b_point, RIGHT, buff=0.08),
            DashedLine(self.point(1.2, 0), b_point, dash_length=0.06, stroke_width=2, color=RED_B),
        )
        card = self.formula_card(labels["miss"], labels["miss_reason"], RED_B, width=6.1)
        return self.fit_visual(VGroup(VGroup(plane, line, u, two_u, b), card).arrange(DOWN, buff=0.24))

    def recap_visual(self):
        labels = TEXT[self.locale]["visual"]
        cards = VGroup(
            self.formula_card(labels["line"], labels["recap_line"], BLUE_B, width=2.35, height=1.05),
            self.formula_card(labels["plane"], labels["recap_plane"], GREEN_B, width=2.55, height=1.05),
            self.formula_card(labels["widget"], labels["recap_widget"], PURPLE_B, width=2.45, height=1.05),
        ).arrange(RIGHT, buff=0.18)
        formula = self.formula_card("Span{u, v}", labels["recap_formula"], YELLOW_B, width=6.8)
        return self.fit_visual(VGroup(cards, formula).arrange(DOWN, buff=0.32))

    def state_visual(self, index):
        if index == 0:
            return self.output_visual()
        if index == 1:
            return self.line_visual()
        if index == 2:
            return self.plane_visual()
        if index == 3:
            return self.membership_visual()
        if index == 4:
            return self.miss_visual()
        return self.recap_visual()

    def construct(self):
        copy = TEXT[self.locale]
        title = self.label(copy["title"], font_size=36, weight=BOLD, max_width=7.2)
        subtitle = self.label(copy["subtitle"], font_size=22, color=GRAY_B, max_width=7.35)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.16).to_edge(UP)

        self.play(FadeIn(header, shift=DOWN * 0.2))

        current = None
        for index, (caption, focus, operation) in enumerate(copy["states"]):
            caption_mob = self.label(caption, font_size=27, weight=MEDIUM, max_width=7.0)
            visual = self.state_visual(index)
            focus_mob = self.label(focus, font_size=20, color=GRAY_B, max_width=7.25)
            operation_mob = self.label(operation, font_size=23, color=BLUE_B, max_width=7.25)
            group = VGroup(caption_mob, visual, focus_mob, operation_mob).arrange(DOWN, buff=0.2)
            group.next_to(header, DOWN, buff=0.28)

            if current is None:
                self.play(FadeIn(group, shift=UP * 0.15))
            else:
                self.play(FadeOut(current, shift=UP * 0.1), FadeIn(group, shift=UP * 0.1))

            current = group
            self.wait(1.02 if index < len(copy["states"]) - 1 else 1.45)

        conclusion = self.label(copy["conclusion"], font_size=24, color=GREEN_B, max_width=7.4).to_edge(DOWN)
        self.play(FadeIn(conclusion, shift=UP * 0.2))
        self.wait(1.2)


class LinearCombinationSpanSweepStoryEn(LinearCombinationSpanSweepStoryBase):
    locale = "en"


class LinearCombinationSpanSweepStoryZhHk(LinearCombinationSpanSweepStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class LinearCombinationSpanSweepStoryZhCn(LinearCombinationSpanSweepStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class LinearCombinationSpanSweepStory(LinearCombinationSpanSweepStoryEn):
    """Backwards-compatible alias for one-off English render commands."""
