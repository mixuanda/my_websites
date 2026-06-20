from manim import *


TEXT = {
    "en": {
        "title": "Basis and dimension: exactly enough",
        "subtitle": "Span gives reach; independence removes redundancy.",
        "visual": {
            "span": "spans W",
            "independent": "independent",
            "redundant": "redundant",
            "basis": "basis",
            "dimension": "dimension",
            "plane": "plane W",
            "target": "target x",
            "reach": "x = 2u1 + u2",
            "extra": "u3 = u1 + u2",
            "unchanged": "same span after deleting u3",
            "just_right": "spans W + independent",
            "basis_formula": "B={u1,u2} is a basis",
            "basis_b": "B={u1,u2}",
            "basis_c": "C={v1,v2}",
            "same_size": "both bases have 2 vectors",
            "dim_w": "dim(W)=2",
            "dim_n": "dim(W)=n",
            "n_independent": "n independent vectors",
            "n_spanning": "n vectors span W",
            "any_two": "any two imply the third",
            "r3": "dim(R3)=3",
            "pivots": "pivot in every column",
            "shortcut": "3 independent vectors -> basis",
        },
        "states": [
            (
                "Spanning means enough reach",
                "If every target in W is reachable from the list, the list is large enough.",
                "Span{u1,u2}=W",
            ),
            (
                "Independence removes extra baggage",
                "A vector already built from the others repeats information and can be deleted.",
                "u3 = u1 + u2",
            ),
            (
                "A basis is the just-right list",
                "The same list must both span the space and remain linearly independent.",
                "basis = spanning + independent",
            ),
            (
                "Dimension makes the count stable",
                "Different bases can look different, but they have the same number of vectors.",
                "dim(W) = number of basis vectors",
            ),
            (
                "The dimension shortcut saves work",
                "When the count already matches the dimension, checking either span or independence is enough.",
                "any two of: dim=n, independent, spanning",
            ),
            (
                "Use the shortcut in R3",
                "Three independent vectors in R3 automatically span R3, so they form a basis.",
                "dim(R3)=3 and independent -> basis",
            ),
        ],
        "conclusion": "A basis is not merely a useful list. It is exactly enough information to name every vector in the space once, and dimension records that exact count.",
    },
    "zh-hk": {
        "title": "基底與維數：剛好足夠",
        "subtitle": "張成給出可到達範圍；獨立排除冗餘。",
        "visual": {
            "span": "張成 W",
            "independent": "線性獨立",
            "redundant": "冗餘",
            "basis": "基底",
            "dimension": "維數",
            "plane": "平面 W",
            "target": "目標 x",
            "reach": "x = 2u1 + u2",
            "extra": "u3 = u1 + u2",
            "unchanged": "刪去 u3 後張成不變",
            "just_right": "張成 W + 線性獨立",
            "basis_formula": "B={u1,u2} 是基底",
            "basis_b": "B={u1,u2}",
            "basis_c": "C={v1,v2}",
            "same_size": "兩組基底都有 2 個向量",
            "dim_w": "dim(W)=2",
            "dim_n": "dim(W)=n",
            "n_independent": "n 個線性獨立向量",
            "n_spanning": "n 個向量張成 W",
            "any_two": "任意兩項推出第三項",
            "r3": "dim(R3)=3",
            "pivots": "每欄都有 pivot",
            "shortcut": "3 個獨立向量 -> 基底",
        },
        "states": [
            (
                "張成表示範圍足夠",
                "如果 W 中每個目標都可由列表到達，這個列表就夠大。",
                "Span{u1,u2}=W",
            ),
            (
                "線性獨立排除多餘負擔",
                "若某向量已可由其他向量造出，它只重覆資訊，可以刪去。",
                "u3 = u1 + u2",
            ),
            (
                "基底是剛剛好的列表",
                "同一列表必須張成空間，同時保持線性獨立。",
                "基底 = 張成 + 線性獨立",
            ),
            (
                "維數令數目穩定",
                "不同基底可以長得不同，但它們含有相同數目的向量。",
                "dim(W) = 基底向量數目",
            ),
            (
                "維數捷徑節省計算",
                "若數目已等於維數，只需再檢查張成或獨立其中一項。",
                "dim=n、獨立、張成：任取兩項",
            ),
            (
                "在 R3 中使用捷徑",
                "R3 中三個線性獨立向量會自動張成 R3，因此形成基底。",
                "dim(R3)=3 且獨立 -> 基底",
            ),
        ],
        "conclusion": "基底不只是方便的列表。它剛好提供一次性描述空間每個向量所需的全部資訊，而維數記錄這個精確數目。",
    },
    "zh-cn": {
        "title": "基与维数：刚好足够",
        "subtitle": "张成给出可到达范围；独立排除冗余。",
        "visual": {
            "span": "张成 W",
            "independent": "线性独立",
            "redundant": "冗余",
            "basis": "基",
            "dimension": "维数",
            "plane": "平面 W",
            "target": "目标 x",
            "reach": "x = 2u1 + u2",
            "extra": "u3 = u1 + u2",
            "unchanged": "删去 u3 后张成不变",
            "just_right": "张成 W + 线性独立",
            "basis_formula": "B={u1,u2} 是基",
            "basis_b": "B={u1,u2}",
            "basis_c": "C={v1,v2}",
            "same_size": "两组基都有 2 个向量",
            "dim_w": "dim(W)=2",
            "dim_n": "dim(W)=n",
            "n_independent": "n 个线性独立向量",
            "n_spanning": "n 个向量张成 W",
            "any_two": "任意两项推出第三项",
            "r3": "dim(R3)=3",
            "pivots": "每列都有 pivot",
            "shortcut": "3 个独立向量 -> 基",
        },
        "states": [
            (
                "张成表示范围足够",
                "如果 W 中每个目标都可由列表到达，这个列表就够大。",
                "Span{u1,u2}=W",
            ),
            (
                "线性独立排除多余负担",
                "若某向量已可由其他向量造出，它只重复信息，可以删去。",
                "u3 = u1 + u2",
            ),
            (
                "基是刚刚好的列表",
                "同一列表必须张成空间，同时保持线性独立。",
                "基 = 张成 + 线性独立",
            ),
            (
                "维数让数目稳定",
                "不同基可以长得不同，但它们含有相同数目的向量。",
                "dim(W) = 基向量数目",
            ),
            (
                "维数捷径节省计算",
                "若数目已等于维数，只需再检查张成或独立其中一项。",
                "dim=n、独立、张成：任取两项",
            ),
            (
                "在 R3 中使用捷径",
                "R3 中三个线性独立向量会自动张成 R3，因此形成基。",
                "dim(R3)=3 且独立 -> 基",
            ),
        ],
        "conclusion": "基不只是方便的列表。它刚好提供一次性描述空间每个向量所需的全部信息，而维数记录这个精确数目。",
    },
}


class BasisDimensionJustRightStoryBase(Scene):
    """MATH1030 6.5: basis as spanning plus independence, dimension as count."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def formula_card(self, title, body, color=GREEN_B, width=5.9, height=0.9):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
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

    def plane_point(self, a, b):
        origin = LEFT * 2.0 + DOWN * 0.9
        u_vec = RIGHT * 1.32 + UP * 0.22
        v_vec = RIGHT * 0.48 + UP * 0.94
        return origin + a * u_vec + b * v_vec

    def plane_surface(self):
        labels = TEXT[self.locale]["visual"]
        surface = Polygon(
            self.plane_point(-1.35, -1.05),
            self.plane_point(1.45, -1.05),
            self.plane_point(1.45, 1.05),
            self.plane_point(-1.35, 1.05),
            stroke_color=GREEN_B,
            stroke_width=1.3,
            fill_color=GREEN_E,
            fill_opacity=0.18,
        )
        grid = VGroup()
        for a in [-1.0, -0.5, 0, 0.5, 1.0]:
            grid.add(Line(self.plane_point(a, -1.0), self.plane_point(a, 1.0), stroke_width=0.7, color=GREEN_C).set_opacity(0.44))
        for b in [-0.75, -0.25, 0.25, 0.75]:
            grid.add(Line(self.plane_point(-1.25, b), self.plane_point(1.35, b), stroke_width=0.7, color=GREEN_C).set_opacity(0.44))
        label = self.label(labels["plane"], font_size=20, color=GREEN_B, weight=MEDIUM, max_width=2.3)
        label.next_to(surface, UP, buff=0.1)
        return VGroup(surface, grid, label)

    def vector_arrow(self, end, label, color, label_direction=UP):
        arrow = Arrow(
            self.plane_point(0, 0),
            end,
            buff=0,
            color=color,
            max_tip_length_to_length_ratio=0.18,
            stroke_width=4,
        )
        tag = self.label(label, font_size=20, color=color, weight=MEDIUM, max_width=1.1)
        tag.next_to(arrow.get_end(), label_direction, buff=0.08)
        return VGroup(arrow, tag)

    def span_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane_surface()
        u1 = self.vector_arrow(self.plane_point(1.0, 0), "u1", BLUE_B, DOWN)
        u2 = self.vector_arrow(self.plane_point(0, 1.0), "u2", GREEN_B, LEFT)
        target = Dot(self.plane_point(2.0, 1.0), radius=0.065, color=YELLOW_B)
        target_label = self.label(labels["target"], font_size=18, color=YELLOW_B, weight=MEDIUM, max_width=1.5)
        target_label.next_to(target, RIGHT, buff=0.1)
        path = VGroup(
            DashedLine(self.plane_point(1.0, 0), self.plane_point(2.0, 0), dash_length=0.06, color=YELLOW_B, stroke_width=2),
            DashedLine(self.plane_point(2.0, 0), self.plane_point(2.0, 1.0), dash_length=0.06, color=YELLOW_B, stroke_width=2),
        )
        card = self.formula_card(labels["span"], labels["reach"], BLUE_B, width=4.1)
        return self.fit_visual(VGroup(VGroup(plane, u1, u2, path, target, target_label), card).arrange(DOWN, buff=0.24))

    def redundancy_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane_surface()
        u1 = self.vector_arrow(self.plane_point(1.0, 0), "u1", BLUE_B, DOWN)
        u2 = self.vector_arrow(self.plane_point(0, 1.0), "u2", GREEN_B, LEFT)
        u3 = self.vector_arrow(self.plane_point(1.0, 1.0), "u3", RED_B, RIGHT)
        step = VGroup(
            DashedLine(self.plane_point(1.0, 0), self.plane_point(1.0, 1.0), dash_length=0.06, color=RED_B, stroke_width=2),
            Dot(self.plane_point(1.0, 1.0), radius=0.055, color=RED_B),
        )
        cards = VGroup(
            self.formula_card(labels["redundant"], labels["extra"], RED_B, width=3.2),
            self.formula_card(labels["span"], labels["unchanged"], GREEN_B, width=3.6),
        ).arrange(RIGHT, buff=0.18)
        return self.fit_visual(VGroup(VGroup(plane, u1, u2, u3, step), cards).arrange(DOWN, buff=0.22))

    def basis_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = VGroup(
            self.formula_card(labels["span"], "Span{u1,u2}=W", BLUE_B, width=2.9, height=0.92),
            self.formula_card(labels["independent"], "c1u1+c2u2=0 -> c1=c2=0", GREEN_B, width=3.6, height=0.92),
        ).arrange(DOWN, buff=0.22)
        arrow = Arrow(LEFT * 0.8, RIGHT * 0.8, color=YELLOW_B, stroke_width=4)
        right = self.formula_card(labels["basis"], labels["basis_formula"], YELLOW_B, width=3.4, height=1.15)
        group = VGroup(left, arrow, right).arrange(RIGHT, buff=0.34)
        note = self.formula_card(labels["basis"], labels["just_right"], PURPLE_B, width=5.5)
        return self.fit_visual(VGroup(group, note).arrange(DOWN, buff=0.32))

    def dimension_visual(self):
        labels = TEXT[self.locale]["visual"]
        b = VGroup(
            self.formula_card(labels["basis"], labels["basis_b"], BLUE_B, width=2.55, height=0.9),
            self.label("u1, u2", font_size=25, color=BLUE_B, weight=MEDIUM, max_width=2.4),
        ).arrange(DOWN, buff=0.1)
        c = VGroup(
            self.formula_card(labels["basis"], labels["basis_c"], GREEN_B, width=2.55, height=0.9),
            self.label("v1, v2", font_size=25, color=GREEN_B, weight=MEDIUM, max_width=2.4),
        ).arrange(DOWN, buff=0.1)
        count = self.formula_card(labels["dimension"], labels["same_size"], YELLOW_B, width=4.6)
        dim = self.formula_card(labels["dimension"], labels["dim_w"], PURPLE_B, width=2.7, height=0.9)
        return self.fit_visual(VGroup(VGroup(b, c).arrange(RIGHT, buff=0.7), count, dim).arrange(DOWN, buff=0.28))

    def shortcut_visual(self):
        labels = TEXT[self.locale]["visual"]
        cards = VGroup(
            self.formula_card(labels["dimension"], labels["dim_n"], BLUE_B, width=2.25, height=1.0),
            self.formula_card(labels["independent"], labels["n_independent"], GREEN_B, width=2.45, height=1.0),
            self.formula_card(labels["span"], labels["n_spanning"], PURPLE_B, width=2.45, height=1.0),
        ).arrange(RIGHT, buff=0.18)
        arrows = VGroup(
            Arrow(LEFT * 2.0 + DOWN * 0.45, DOWN * 0.55, color=YELLOW_B, stroke_width=3),
            Arrow(RIGHT * 2.0 + DOWN * 0.45, DOWN * 0.55, color=YELLOW_B, stroke_width=3),
        )
        result = self.formula_card(labels["basis"], labels["any_two"], YELLOW_B, width=5.25)
        return self.fit_visual(VGroup(cards, arrows, result).arrange(DOWN, buff=0.18))

    def r3_visual(self):
        labels = TEXT[self.locale]["visual"]
        matrix_lines = VGroup(
            self.label("[ 1  2  3 ]", font_size=25, color=WHITE, max_width=5.8),
            self.label("[ 0  1 -2 ]", font_size=25, color=WHITE, max_width=5.8),
            self.label("[ 0  0  1 ]", font_size=25, color=WHITE, max_width=5.8),
        ).arrange(DOWN, buff=0.08, aligned_edge=LEFT)
        pivots = VGroup(
            self.formula_card("u1", labels["pivots"], BLUE_B, width=1.9, height=0.78),
            self.formula_card("u2", labels["pivots"], GREEN_B, width=1.9, height=0.78),
            self.formula_card("u3", labels["pivots"], PURPLE_B, width=1.9, height=0.78),
        ).arrange(RIGHT, buff=0.16)
        cards = VGroup(
            self.formula_card(labels["dimension"], labels["r3"], YELLOW_B, width=2.5),
            self.formula_card(labels["basis"], labels["shortcut"], GREEN_B, width=3.7),
        ).arrange(RIGHT, buff=0.22)
        return self.fit_visual(VGroup(matrix_lines, pivots, cards).arrange(DOWN, buff=0.28))

    def state_visual(self, index):
        if index == 0:
            return self.span_visual()
        if index == 1:
            return self.redundancy_visual()
        if index == 2:
            return self.basis_visual()
        if index == 3:
            return self.dimension_visual()
        if index == 4:
            return self.shortcut_visual()
        return self.r3_visual()

    def construct(self):
        copy = TEXT[self.locale]
        title = self.label(copy["title"], font_size=35, weight=BOLD, max_width=7.25)
        subtitle = self.label(copy["subtitle"], font_size=21, color=GRAY_B, max_width=7.35)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.15).to_edge(UP)

        self.play(FadeIn(header, shift=DOWN * 0.2))

        current = None
        for index, (caption, focus, operation) in enumerate(copy["states"]):
            caption_mob = self.label(caption, font_size=26, weight=MEDIUM, max_width=7.0)
            visual = self.state_visual(index)
            focus_mob = self.label(focus, font_size=20, color=GRAY_B, max_width=7.25)
            operation_mob = self.label(operation, font_size=23, color=BLUE_B, max_width=7.25)
            group = VGroup(caption_mob, visual, focus_mob, operation_mob).arrange(DOWN, buff=0.19)
            group.next_to(header, DOWN, buff=0.27)

            if current is None:
                self.play(FadeIn(group, shift=UP * 0.15))
            else:
                self.play(FadeOut(current, shift=UP * 0.1), FadeIn(group, shift=UP * 0.1))

            current = group
            self.wait(1.02 if index < len(copy["states"]) - 1 else 1.45)

        conclusion = self.label(copy["conclusion"], font_size=23, color=GREEN_B, max_width=7.4).to_edge(DOWN)
        self.play(FadeIn(conclusion, shift=UP * 0.2))
        self.wait(1.2)


class BasisDimensionJustRightStoryEn(BasisDimensionJustRightStoryBase):
    locale = "en"


class BasisDimensionJustRightStoryZhHk(BasisDimensionJustRightStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class BasisDimensionJustRightStoryZhCn(BasisDimensionJustRightStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class BasisDimensionJustRightStory(BasisDimensionJustRightStoryEn):
    """Backwards-compatible alias for one-off English render commands."""
