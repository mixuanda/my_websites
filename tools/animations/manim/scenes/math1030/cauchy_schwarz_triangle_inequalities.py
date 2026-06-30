from math import atan2

from manim import *


TEXT = {
    "en": {
        "title": "Two inequalities control inner-product geometry",
        "subtitle": "Cauchy-Schwarz bounds inner products; triangle inequality bounds paths.",
        "visual": {
            "bound": "inner product",
            "lengths": "length product",
            "quadratic": "nonnegative quadratic",
            "discriminant": "discriminant cannot be positive",
            "line": "same line",
            "zero": "zero vector case",
            "direct": "direct path",
            "two_step": "two-step path",
            "proof": "Cauchy-Schwarz step",
            "expand": "expand",
            "therefore": "therefore",
            "cs_equality": "C-S equality",
            "dependent": "linearly dependent",
            "zero_equality": "w=0 equality",
            "w_zero_trivial": "w=0 immediate",
            "direct_compare": "direct <= two steps",
            "bound_step": "bound",
            "square": "perfect square",
            "root": "square root",
            "same": "same direction",
            "opposite": "opposite direction",
            "not_tight": "not equality",
            "zero_included": "u=0 or v=0",
            "tight": "equality",
        },
        "states": [
            (
                "C-S bound: inner product",
                "Magnitude <= length product.",
                "|<v,w>| <= ||v|| ||w||",
            ),
            (
                "Proof: nonnegative F(t)",
                "If w != 0, the discriminant is <= 0.",
                "Delta <= 0  ->  <v,w>^2 <= ||v||^2 ||w||^2",
            ),
            (
                "Equality: one line",
                "w=0, or tw-v=0 for some real t.",
                "v = t w",
            ),
            (
                "Triangle: direct vs two-step",
                "Direct path to u+v is no longer.",
                "||u+v|| <= ||u|| + ||v||",
            ),
            (
                "C-S controls the cross term",
                "<u,v> <= ||u||||v||.",
                "||u+v||^2 <= (||u||+||v||)^2",
            ),
            (
                "Triangle equality: same direction",
                "Zero case, or v=alpha u with alpha>=0.",
                "v = alpha u,  alpha >= 0",
            ),
        ],
        "conclusion": "The two estimates are linked: Cauchy-Schwarz controls the inner-product term, and that control becomes the triangle inequality after expanding the norm-square.",
    },
    "zh-hk": {
        "title": "兩條不等式控制內積幾何",
        "subtitle": "Cauchy-Schwarz 控制內積；三角不等式控制路徑長度。",
        "visual": {
            "bound": "內積上界",
            "lengths": "長度乘積",
            "quadratic": "非負二次式",
            "discriminant": "判別式不能為正",
            "line": "同一直線",
            "zero": "零向量情況",
            "direct": "直達路徑",
            "two_step": "兩步路徑",
            "proof": "Cauchy-Schwarz 步驟",
            "expand": "展開",
            "therefore": "因此",
            "cs_equality": "C-S 等號",
            "dependent": "v 與 w 線性相關",
            "zero_equality": "w=0 亦取等",
            "w_zero_trivial": "若 w=0：立即成立",
            "direct_compare": "直達 <= 兩步",
            "bound_step": "估計",
            "square": "完全平方",
            "root": "取平方根",
            "same": "同方向",
            "opposite": "反方向",
            "not_tight": "反方向不取等",
            "zero_included": "包括 u=0 或 v=0",
            "tight": "等號剛好成立",
        },
        "states": [
            (
                "Cauchy-Schwarz 給出每個內積的上界",
                "內積的絕對值永遠不會超過兩個向量長度的乘積。",
                "|<v,w>| <= ||v|| ||w||",
            ),
            (
                "證明由非負的範數平方開始",
                "對每個實數 t，F(t)=||tw-v||^2 都非負；當 w 非零時，它的判別式不能為正。",
                "Delta <= 0  ->  <v,w>^2 <= ||v||^2 ||w||^2",
            ),
            (
                "Cauchy-Schwarz 取等表示線性相關",
                "上界剛好成立，正是 w=0，或存在實數 t 令 tw-v=0 的時候。",
                "v = t w",
            ),
            (
                "三角不等式比較直達與兩步路徑",
                "由 0 直達 u+v，不會比先走 u 再走 v 更長。",
                "||u+v|| <= ||u|| + ||v||",
            ),
            (
                "Cauchy-Schwarz 提供代數估計",
                "展開 ||u+v||^2，再用 Cauchy-Schwarz 允許的最大值取代 <u,v>。",
                "||u+v||^2 <= (||u||+||v||)^2",
            ),
            (
                "三角不等式取等需要同一個非負方向",
                "等號只在零向量情況，或一個向量是另一個的非負純量倍時成立。",
                "v = alpha u,  alpha >= 0",
            ),
        ],
        "conclusion": "兩條估計是連在一起的：Cauchy-Schwarz 控制內積項，而這個控制在展開範數平方後變成三角不等式。",
    },
    "zh-cn": {
        "title": "两条不等式控制内积几何",
        "subtitle": "Cauchy-Schwarz 控制内积；三角不等式控制路径长度。",
        "visual": {
            "bound": "内积上界",
            "lengths": "长度乘积",
            "quadratic": "非负二次式",
            "discriminant": "判别式不能为正",
            "line": "同一直线",
            "zero": "零向量情形",
            "direct": "直达路径",
            "two_step": "两步路径",
            "proof": "Cauchy-Schwarz 步骤",
            "expand": "展开",
            "therefore": "因此",
            "cs_equality": "C-S 等号",
            "dependent": "v 与 w 线性相关",
            "zero_equality": "w=0 也取等",
            "w_zero_trivial": "若 w=0：立即成立",
            "direct_compare": "直达 <= 两步",
            "bound_step": "估计",
            "square": "完全平方",
            "root": "取平方根",
            "same": "同方向",
            "opposite": "反方向",
            "not_tight": "反方向不取等",
            "zero_included": "包括 u=0 或 v=0",
            "tight": "等号恰好成立",
        },
        "states": [
            (
                "Cauchy-Schwarz 给出每个内积的上界",
                "内积的绝对值永远不会超过两个向量长度的乘积。",
                "|<v,w>| <= ||v|| ||w||",
            ),
            (
                "证明由非负的范数平方开始",
                "对每个实数 t，F(t)=||tw-v||^2 都非负；当 w 非零时，它的判别式不能为正。",
                "Delta <= 0  ->  <v,w>^2 <= ||v||^2 ||w||^2",
            ),
            (
                "Cauchy-Schwarz 取等表示线性相关",
                "上界恰好成立，正是 w=0，或存在实数 t 使 tw-v=0 的时候。",
                "v = t w",
            ),
            (
                "三角不等式比较直达与两步路径",
                "由 0 直达 u+v，不会比先走 u 再走 v 更长。",
                "||u+v|| <= ||u|| + ||v||",
            ),
            (
                "Cauchy-Schwarz 提供代数估计",
                "展开 ||u+v||^2，再用 Cauchy-Schwarz 允许的最大值取代 <u,v>。",
                "||u+v||^2 <= (||u||+||v||)^2",
            ),
            (
                "三角不等式取等需要同一个非负方向",
                "等号只在零向量情形，或一个向量是另一个的非负标量倍时成立。",
                "v = alpha u,  alpha >= 0",
            ),
        ],
        "conclusion": "两条估计是连在一起的：Cauchy-Schwarz 控制内积项，而这个控制在展开范数平方后变成三角不等式。",
    },
}


U = (2.2, 0.8)
V = (1.4, 1.8)
W = (2.5, 1.0)
COLLINEAR = (2.7, 0.95)
OPPOSITE = (-1.8, -0.65)


class CauchySchwarzTriangleInequalitiesStoryBase(Scene):
    """MATH1030 9.4: Cauchy-Schwarz and triangle inequality proof geometry."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=7.0):
        text = Text(
            value,
            font=self.font,
            font_size=font_size,
            color=color,
            weight=weight,
            disable_ligatures=True,
        )
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def formula_card(self, title, body, color=GREEN_B, width=4.4, height=0.88):
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

    def proof_badge(self, body, color=GREEN_B, width=3.9, height=0.72):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
        )
        text = self.label(body, font_size=17, color=WHITE, max_width=width * 0.88).move_to(box)
        return VGroup(box, text)

    def state_card(self, index):
        state = TEXT[self.locale]["states"][index]
        box = RoundedRectangle(
            corner_radius=0.1,
            width=12.25,
            height=1.24,
            stroke_color=GRAY_C,
            fill_color=BLACK,
            fill_opacity=0.28,
        )
        title = self.label(state[0], font_size=20, color=YELLOW_B, weight=MEDIUM, max_width=11.25)
        detail = self.label(state[1], font_size=15, color=GRAY_A, max_width=11.25)
        formula = self.label(state[2], font_size=21, color=GREEN_B, weight=MEDIUM, max_width=10.9)
        content = VGroup(title, detail, formula).arrange(DOWN, buff=0.07).move_to(box)
        return VGroup(box, content).to_edge(DOWN, buff=0.22)

    def plane(self):
        return NumberPlane(
            x_range=[-2.8, 3.2, 1],
            y_range=[-1.4, 2.7, 1],
            x_length=5.8,
            y_length=3.7,
            background_line_style={"stroke_color": BLUE_E, "stroke_opacity": 0.25, "stroke_width": 1},
            axis_config={"stroke_color": GRAY_B, "stroke_width": 1.4},
        )

    def arrow_on_plane(self, plane, vector, color, name, label_direction=UP, start=(0, 0)):
        arrow = Arrow(
            plane.c2p(start[0], start[1]),
            plane.c2p(start[0] + vector[0], start[1] + vector[1]),
            buff=0,
            color=color,
            stroke_width=5,
            max_tip_length_to_length_ratio=0.15,
        )
        tag = self.label(name, font_size=18, color=color, weight=MEDIUM, max_width=1.1)
        tag.next_to(arrow.get_end(), label_direction, buff=0.08)
        return VGroup(arrow, tag)

    def bound_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane()
        v_arrow = self.arrow_on_plane(plane, W, BLUE_B, "v")
        w_arrow = self.arrow_on_plane(plane, V, PURPLE_B, "w", label_direction=RIGHT)
        theta = Angle(Line(plane.c2p(0, 0), plane.c2p(*W)), Line(plane.c2p(0, 0), plane.c2p(*V)), radius=0.42, color=YELLOW_B)
        theta_label = self.label("theta", font_size=16, color=YELLOW_B, max_width=0.8).move_to(plane.c2p(0.65, 0.38))

        left_bar = Rectangle(width=2.15, height=0.34, color=BLUE_B, fill_color=BLUE_B, fill_opacity=0.65)
        right_bar = Rectangle(width=3.05, height=0.34, color=GREEN_B, fill_color=GREEN_B, fill_opacity=0.65)
        bars = VGroup(
            VGroup(left_bar, self.label("|<v,w>|", font_size=16, color=BLUE_B, max_width=2.1).next_to(left_bar, UP, buff=0.08)),
            VGroup(right_bar, self.label("||v|| ||w||", font_size=16, color=GREEN_B, max_width=2.8).next_to(right_bar, UP, buff=0.08)),
        ).arrange(DOWN, buff=0.35, aligned_edge=LEFT)
        cards = VGroup(
            self.formula_card(labels["bound"], "|<v,w>|", BLUE_B, width=3.5),
            self.formula_card(labels["lengths"], "||v|| ||w||", GREEN_B, width=3.8),
            bars,
        ).arrange(DOWN, buff=0.16)
        return VGroup(VGroup(plane, v_arrow, w_arrow, theta, theta_label), cards).arrange(RIGHT, buff=0.5).scale_to_fit_width(11.0)

    def quadratic_visual(self):
        labels = TEXT[self.locale]["visual"]
        top = VGroup(
            self.formula_card(labels["quadratic"], "F(t)=||tw-v||^2 >= 0", GREEN_B, width=5.2),
            self.formula_card(labels["zero"], labels["w_zero_trivial"], YELLOW_B, width=3.5),
        ).arrange(RIGHT, buff=0.22)
        expanded = self.formula_card(labels["expand"], "t^2<w,w> - 2t<v,w> + <v,v>", BLUE_B, width=7.3, height=0.86)
        arrow = Arrow(LEFT * 1.0, RIGHT * 1.0, color=GRAY_A, stroke_width=4, max_tip_length_to_length_ratio=0.13)
        result = self.formula_card(labels["discriminant"], "4<v,w>^2 - 4||v||^2||w||^2 <= 0", PURPLE_B, width=7.4)
        final = self.formula_card(labels["therefore"], "|<v,w>| <= ||v|| ||w||", GREEN_B, width=5.3)
        chain = VGroup(expanded, arrow, result).arrange(RIGHT, buff=0.28).scale_to_fit_width(11.0)
        return VGroup(top, chain, final).arrange(DOWN, buff=0.28).scale_to_fit_width(11.2)

    def equality_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane()
        line = Line(plane.c2p(-2.2, -0.75), plane.c2p(3.0, 1.0), color=GRAY_B, stroke_width=2)
        w_arrow = self.arrow_on_plane(plane, W, BLUE_B, "w")
        v_arrow = self.arrow_on_plane(plane, COLLINEAR, GREEN_B, "v=tw", label_direction=RIGHT)
        opposite = self.arrow_on_plane(plane, OPPOSITE, RED_B, "-cw", label_direction=DOWN)
        cards = VGroup(
            self.formula_card(labels["line"], "tw - v = 0", GREEN_B, width=3.7),
            self.formula_card(labels["cs_equality"], labels["dependent"], YELLOW_B, width=5.0),
            self.formula_card(labels["zero"], labels["zero_equality"], BLUE_B, width=4.1),
        ).arrange(DOWN, buff=0.18)
        return VGroup(VGroup(plane, line, w_arrow, v_arrow, opposite), cards).arrange(RIGHT, buff=0.42).scale_to_fit_width(11.1)

    def triangle_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane()
        u = self.arrow_on_plane(plane, U, BLUE_B, "u")
        v = self.arrow_on_plane(plane, V, PURPLE_B, "v", label_direction=RIGHT, start=U)
        direct = Arrow(plane.c2p(0, 0), plane.c2p(U[0] + V[0], U[1] + V[1]), buff=0, color=GREEN_B, stroke_width=6)
        direct_label = self.label("u+v", font_size=18, color=GREEN_B, weight=MEDIUM, max_width=1.2).next_to(direct.get_end(), UP, buff=0.08)
        two_step = VGroup(
            self.formula_card(labels["two_step"], "||u|| + ||v||", BLUE_B, width=3.8),
            self.formula_card(labels["direct"], "||u+v||", GREEN_B, width=3.2),
            self.proof_badge(labels["direct_compare"], YELLOW_B, width=4.0),
        ).arrange(DOWN, buff=0.18)
        return VGroup(VGroup(plane, u, v, direct, direct_label), two_step).arrange(RIGHT, buff=0.45).scale_to_fit_width(11.0)

    def triangle_proof_visual(self):
        labels = TEXT[self.locale]["visual"]
        start = self.formula_card(labels["expand"], "||u+v||^2 = ||u||^2 + 2<u,v> + ||v||^2", BLUE_B, width=7.7)
        cs = self.formula_card(labels["proof"], "<u,v> <= ||u|| ||v||", GREEN_B, width=5.3)
        result = self.formula_card(labels["bound_step"], "||u+v||^2 <= ||u||^2 + 2||u||||v|| + ||v||^2", PURPLE_B, width=8.5)
        square = self.formula_card(labels["square"], "(||u||+||v||)^2", YELLOW_B, width=4.7)
        root = self.formula_card(labels["root"], "||u+v|| <= ||u|| + ||v||", GREEN_B, width=5.4)
        top = VGroup(start, cs).arrange(DOWN, buff=0.22)
        bottom = VGroup(square, root).arrange(RIGHT, buff=0.28)
        return VGroup(top, result, bottom).arrange(DOWN, buff=0.28).scale_to_fit_width(11.4)

    def triangle_equality_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane()
        u = self.arrow_on_plane(plane, W, BLUE_B, "u")
        same = self.arrow_on_plane(plane, (1.5, 0.6), GREEN_B, "alpha u", label_direction=RIGHT, start=W)
        bad = self.arrow_on_plane(plane, OPPOSITE, RED_B, "-beta u", label_direction=DOWN)
        same_badge = self.formula_card(labels["same"], "alpha >= 0", GREEN_B, width=4.3)
        opposite_badge = self.formula_card(labels["opposite"], labels["not_tight"], RED_B, width=5.1)
        zero_badge = self.formula_card(labels["zero"], labels["zero_included"], BLUE_B, width=4.4)
        tight = self.formula_card(labels["tight"], "||u+alpha u|| = ||u|| + ||alpha u||", YELLOW_B, width=6.2)
        cards = VGroup(same_badge, opposite_badge, zero_badge, tight).arrange(DOWN, buff=0.16)
        return VGroup(VGroup(plane, u, same, bad), cards).arrange(RIGHT, buff=0.42).scale_to_fit_width(11.1)

    def visual_for(self, index):
        return [
            self.bound_visual,
            self.quadratic_visual,
            self.equality_visual,
            self.triangle_visual,
            self.triangle_proof_visual,
            self.triangle_equality_visual,
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


class CauchySchwarzTriangleInequalitiesStoryEn(CauchySchwarzTriangleInequalitiesStoryBase):
    locale = "en"
    font = "Avenir Next"


class CauchySchwarzTriangleInequalitiesStoryZhHk(CauchySchwarzTriangleInequalitiesStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class CauchySchwarzTriangleInequalitiesStoryZhCn(CauchySchwarzTriangleInequalitiesStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class CauchySchwarzTriangleInequalitiesStory(CauchySchwarzTriangleInequalitiesStoryEn):
    pass
