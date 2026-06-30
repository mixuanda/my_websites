from manim import *


TEXT = {
    "en": {
        "title": "Homogeneous systems",
        "subtitle": "Ax=0 reveals the null space.",
        "states": [
            (
                "The zero vector is always present",
                "A homogeneous system sends x=0 to the zero right-hand side.",
                "A0 = 0",
            ),
            (
                "RREF exposes the free variables",
                "The zero augmented column stays zero, so the coefficient matrix carries the work.",
                "[A | 0] -> [R | 0]",
            ),
            (
                "Free variables become directions",
                "Each independent parameter contributes one null-space direction.",
                "x = s q1 + t q2",
            ),
            (
                "The null space is the whole solution set",
                "N(A) collects every vector that A sends to zero.",
                "N(A) = {x : Ax=0}",
            ),
            (
                "A nonhomogeneous solution set is shifted",
                "One particular solution places the null-space directions at Ax=b.",
                "S(A,b) = p + N(A)",
            ),
            (
                "Null space measures freedom",
                "No nonzero null vector gives uniqueness; one direction already gives infinitely many.",
                "N(A)={0}  or  p+tq",
            ),
        ],
        "visual": {
            "input": "input x",
            "map": "multiply by A",
            "zero": "zero output",
            "pivots": "pivot variables",
            "free": "free variables",
            "directions": "directions",
            "passes_origin": "passes through 0",
            "particular": "particular p",
            "translate": "translated family",
            "unique": "unique when N(A)={0}",
            "infinite": "infinitely many when q != 0",
            "null": "null space",
        },
        "conclusion": [
            ("Ax=0", "directions"),
            ("p", "placement"),
            ("p+N(A)", "all solutions"),
        ],
    },
    "zh-hk": {
        "title": "齊次方程組",
        "subtitle": "Ax=0 顯示零空間。",
        "states": [
            (
                "零向量永遠在內",
                "齊次系統會把 x=0 送到零右端。",
                "A0 = 0",
            ),
            (
                "RREF 顯示自由變量",
                "增廣的零列保持為零，所以可集中處理係數矩陣。",
                "[A | 0] -> [R | 0]",
            ),
            (
                "自由變量變成方向",
                "每個獨立參數都給出一個零空間方向。",
                "x = s q1 + t q2",
            ),
            (
                "零空間就是整個齊次解集",
                "N(A) 收集所有被 A 送到零的向量。",
                "N(A) = {x : Ax=0}",
            ),
            (
                "非齊次解集是平移後的集合",
                "一個特解把零空間方向放到 Ax=b 的位置。",
                "S(A,b) = p + N(A)",
            ),
            (
                "零空間量度自由度",
                "沒有非零零向量則唯一；一個方向已給出無限多解。",
                "N(A)={0} 或 p+tq",
            ),
        ],
        "visual": {
            "input": "輸入 x",
            "map": "乘以 A",
            "zero": "零輸出",
            "pivots": "主元變量",
            "free": "自由變量",
            "directions": "方向",
            "passes_origin": "通過 0",
            "particular": "特解 p",
            "translate": "平移後解族",
            "unique": "N(A)={0} 時唯一",
            "infinite": "q != 0 時無限多",
            "null": "零空間",
        },
        "conclusion": [
            ("Ax=0", "方向"),
            ("p", "位置"),
            ("p+N(A)", "全部解"),
        ],
    },
    "zh-cn": {
        "title": "齐次方程组",
        "subtitle": "Ax=0 显示零空间。",
        "states": [
            (
                "零向量永远在内",
                "齐次系统会把 x=0 送到零右端。",
                "A0 = 0",
            ),
            (
                "RREF 显示自由变量",
                "增广的零列保持为零，所以可集中处理系数矩阵。",
                "[A | 0] -> [R | 0]",
            ),
            (
                "自由变量变成方向",
                "每个独立参数都给出一个零空间方向。",
                "x = s q1 + t q2",
            ),
            (
                "零空间就是整个齐次解集",
                "N(A) 收集所有被 A 送到零的向量。",
                "N(A) = {x : Ax=0}",
            ),
            (
                "非齐次解集是平移后的集合",
                "一个特解把零空间方向放到 Ax=b 的位置。",
                "S(A,b) = p + N(A)",
            ),
            (
                "零空间量度自由度",
                "没有非零零向量则唯一；一个方向已给出无限多解。",
                "N(A)={0} 或 p+tq",
            ),
        ],
        "visual": {
            "input": "输入 x",
            "map": "乘以 A",
            "zero": "零输出",
            "pivots": "主元变量",
            "free": "自由变量",
            "directions": "方向",
            "passes_origin": "通过 0",
            "particular": "特解 p",
            "translate": "平移后解族",
            "unique": "N(A)={0} 时唯一",
            "infinite": "q != 0 时无限多",
            "null": "零空间",
        },
        "conclusion": [
            ("Ax=0", "方向"),
            ("p", "位置"),
            ("p+N(A)", "全部解"),
        ],
    },
}


class HomogeneousSystemsNullSpaceStoryBase(Scene):
    """MATH1030 4.1: homogeneous systems, null space, and solution structure."""

    locale = "en"
    font = "Avenir Next"
    scale = 0.48

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
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

    def point(self, x, y):
        return x * RIGHT * self.scale + y * UP * self.scale

    def formula_card(self, title, body, color=GREEN_B, width=5.6, height=0.86):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.25,
        )
        title_mob = self.label(title, font_size=16, color=color, weight=MEDIUM, max_width=width * 0.88)
        body_mob = self.label(body, font_size=22, max_width=width * 0.88)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.07).move_to(box)
        return VGroup(box, content)

    def state_card(self, index):
        title, body, formula = TEXT[self.locale]["states"][index]
        box = RoundedRectangle(
            corner_radius=0.1,
            width=11.55,
            height=1.0,
            stroke_color=GRAY_B,
            fill_color=BLACK,
            fill_opacity=0.28,
        )
        title_mob = self.label(title, font_size=24, color=YELLOW_B, weight=BOLD, max_width=10.7)
        body_mob = self.label(body, font_size=17, color=WHITE, max_width=10.7)
        formula_mob = self.label(formula, font_size=18, color=GREEN_B, weight=MEDIUM, max_width=10.7)
        content = VGroup(title_mob, body_mob, formula_mob).arrange(DOWN, buff=0.04).move_to(box)
        return VGroup(box, content)

    def matrix_card(self, rows, highlights=()):
        cell_w = 0.54
        cell_h = 0.42
        cells = VGroup()
        values = VGroup()
        n_rows = len(rows)
        n_cols = len(rows[0])
        center_x = (n_cols - 1) / 2
        center_y = (n_rows - 1) / 2
        for r, row in enumerate(rows):
            for c, value in enumerate(row):
                x = (c - center_x) * cell_w
                y = (center_y - r) * cell_h
                color = YELLOW_B if (r, c) in highlights else (BLUE_B if c == n_cols - 1 else GRAY_B)
                fill = YELLOW_E if (r, c) in highlights else BLACK
                cell = Rectangle(
                    width=cell_w,
                    height=cell_h,
                    stroke_color=color,
                    stroke_width=1.4,
                    fill_color=fill,
                    fill_opacity=0.32 if (r, c) in highlights else 0.17,
                ).move_to([x, y, 0])
                number = self.label(value, font_size=18, max_width=cell_w * 0.72).move_to(cell)
                cells.add(cell)
                values.add(number)
        divider_x = (n_cols - 1.5 - center_x) * cell_w
        divider = Line(
            [divider_x, -(center_y + 0.55) * cell_h, 0],
            [divider_x, (center_y + 0.55) * cell_h, 0],
            color=BLUE_B,
            stroke_width=3,
        )
        left = Text("[", font=self.font, font_size=55).scale_to_fit_height(cells.height * 1.18)
        right = Text("]", font=self.font, font_size=55).scale_to_fit_height(cells.height * 1.18)
        left.next_to(cells, LEFT, buff=0.05)
        right.next_to(cells, RIGHT, buff=0.05)
        return VGroup(cells, values, divider, left, right)

    def plane_base(self, width=4.4, height=2.65):
        bg = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=GRAY_C,
            fill_color=BLACK,
            fill_opacity=0.20,
        )
        grid = VGroup()
        for x in range(-4, 5):
            grid.add(Line(self.point(x, -2.4), self.point(x, 2.4), stroke_width=0.45, color=GRAY_D).set_opacity(0.35))
        for y in range(-3, 4):
            grid.add(Line(self.point(-4.2, y), self.point(4.2, y), stroke_width=0.45, color=GRAY_D).set_opacity(0.35))
        axes = VGroup(
            Line(self.point(-4.15, 0), self.point(4.15, 0), stroke_width=1.2, color=GRAY_B),
            Line(self.point(0, -2.35), self.point(0, 2.35), stroke_width=1.2, color=GRAY_B),
        )
        return VGroup(bg, grid, axes)

    def vector_arrow(self, x, y, label, color, label_direction=UP):
        arrow = Arrow(
            self.point(0, 0),
            self.point(x, y),
            buff=0,
            color=color,
            stroke_width=4,
            max_tip_length_to_length_ratio=0.18,
        )
        tag = self.label(label, font_size=19, color=color, weight=MEDIUM, max_width=1.2)
        tag.next_to(arrow.get_end(), label_direction, buff=0.08)
        return VGroup(arrow, tag)

    def fit_visual(self, visual, max_width=7.25, max_height=3.2):
        if visual.width > max_width:
            visual.scale_to_fit_width(max_width)
        if visual.height > max_height:
            visual.scale_to_fit_height(max_height)
        return visual

    def zero_visual(self):
        labels = TEXT[self.locale]["visual"]
        x_card = self.formula_card(labels["input"], "x=0", BLUE_B, width=2.3)
        a_card = self.formula_card(labels["map"], "A", PURPLE_B, width=2.0)
        zero_card = self.formula_card(labels["zero"], "0", GREEN_B, width=2.3)
        arrow1 = Arrow(LEFT, RIGHT, buff=0.18, color=GRAY_B)
        arrow2 = Arrow(LEFT, RIGHT, buff=0.18, color=GRAY_B)
        row = VGroup(x_card, arrow1, a_card, arrow2, zero_card).arrange(RIGHT, buff=0.24)
        note = self.formula_card("Ax=0", "trivial solution: x=0", YELLOW_B, width=5.3, height=0.72)
        return self.fit_visual(VGroup(row, note).arrange(DOWN, buff=0.32))

    def rref_visual(self):
        labels = TEXT[self.locale]["visual"]
        before = self.matrix_card(
            [["1", "2", "-1", "0"], ["2", "4", "-2", "0"]],
            highlights=[(0, 3), (1, 3)],
        )
        after = self.matrix_card(
            [["1", "2", "-1", "0"], ["0", "0", "0", "0"]],
            highlights=[(0, 0), (0, 3), (1, 3)],
        )
        arrow = Arrow(LEFT, RIGHT, buff=0.18, color=GRAY_B)
        matrices = VGroup(before, arrow, after).arrange(RIGHT, buff=0.35)
        badges = VGroup(
            self.formula_card(labels["pivots"], "x1", BLUE_B, width=2.2, height=0.68),
            self.formula_card(labels["free"], "x2, x3", GREEN_B, width=2.7, height=0.68),
        ).arrange(RIGHT, buff=0.22)
        return self.fit_visual(VGroup(matrices, badges).arrange(DOWN, buff=0.28))

    def directions_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane_base()
        q1 = self.vector_arrow(-2, 1, "q1", GREEN_B, LEFT)
        q2 = self.vector_arrow(1.2, 1.35, "q2", BLUE_B, RIGHT)
        samples = VGroup()
        for x, y in [(-2, 1), (1.2, 1.35), (-0.8, 2.35), (3.2, 1.7), (-3.2, -0.35), (0, 0)]:
            samples.add(Dot(self.point(x, y), radius=0.05, color=YELLOW_B))
        formula = self.formula_card(labels["directions"], "x=sq1+tq2", YELLOW_B, width=4.2)
        return self.fit_visual(VGroup(VGroup(plane, samples, q1, q2), formula).arrange(DOWN, buff=0.23))

    def null_space_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane_base()
        line1 = Line(self.point(-4.0, -1.7), self.point(4.0, 1.7), color=GREEN_B, stroke_width=5).set_opacity(0.78)
        line2 = Line(self.point(-3.2, 2.1), self.point(3.2, -2.1), color=BLUE_B, stroke_width=5).set_opacity(0.48)
        origin = Dot(self.point(0, 0), radius=0.075, color=YELLOW_B)
        origin_label = self.label("0", font_size=19, color=YELLOW_B).next_to(origin, DOWN, buff=0.05)
        title = self.formula_card(labels["null"], "N(A)={x: Ax=0}", GREEN_B, width=5.2)
        note = self.formula_card(labels["passes_origin"], "closed directions", BLUE_B, width=4.2, height=0.72)
        return self.fit_visual(VGroup(VGroup(plane, line1, line2, origin, origin_label), VGroup(title, note).arrange(RIGHT, buff=0.2)).arrange(DOWN, buff=0.22))

    def translate_visual(self):
        labels = TEXT[self.locale]["visual"]
        plane = self.plane_base()
        direction = Line(self.point(-3.6, -1.4), self.point(3.6, 1.4), color=GREEN_B, stroke_width=5).set_opacity(0.68)
        shifted = direction.copy().shift(self.point(0.8, 1.0))
        shifted.set_color(YELLOW_B)
        p_arrow = Arrow(self.point(0, 0), self.point(0.8, 1.0), buff=0, color=YELLOW_B, stroke_width=4)
        p_label = self.label("p", font_size=20, color=YELLOW_B, weight=MEDIUM).next_to(p_arrow.get_end(), UP, buff=0.04)
        ghost = direction.copy().set_opacity(0.25)
        formula = self.formula_card(labels["translate"], "S(A,b)=p+N(A)", YELLOW_B, width=5.2)
        note = self.formula_card(labels["particular"], "Ap=b", BLUE_B, width=2.4, height=0.72)
        return self.fit_visual(VGroup(VGroup(plane, ghost, shifted, p_arrow, p_label), VGroup(formula, note).arrange(RIGHT, buff=0.22)).arrange(DOWN, buff=0.22))

    def freedom_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = RoundedRectangle(
            corner_radius=0.09,
            width=4.6,
            height=2.4,
            stroke_color=BLUE_B,
            fill_color=BLACK,
            fill_opacity=0.22,
        )
        right = RoundedRectangle(
            corner_radius=0.09,
            width=4.6,
            height=2.4,
            stroke_color=GREEN_B,
            fill_color=BLACK,
            fill_opacity=0.22,
        )
        left_content = VGroup(
            self.label(labels["unique"], font_size=22, color=BLUE_B, weight=BOLD, max_width=4.0),
            self.label("N(A)={0}", font_size=27, color=WHITE, max_width=4.0),
            self.label("only p", font_size=20, color=YELLOW_B, max_width=3.7),
        ).arrange(DOWN, buff=0.15).move_to(left)
        right_content = VGroup(
            self.label(labels["infinite"], font_size=22, color=GREEN_B, weight=BOLD, max_width=4.0),
            self.label("q != 0", font_size=26, color=WHITE, max_width=4.0),
            self.label("p+tq", font_size=23, color=YELLOW_B, max_width=3.7),
        ).arrange(DOWN, buff=0.15).move_to(right)
        return self.fit_visual(VGroup(VGroup(left, left_content), VGroup(right, right_content)).arrange(RIGHT, buff=0.35))

    def conclusion_visual(self):
        rows = []
        for left, right in TEXT[self.locale]["conclusion"]:
            rows.append(
                VGroup(
                    self.formula_card(left, "", BLUE_B, width=2.25, height=0.62),
                    Arrow(LEFT, RIGHT, buff=0.14, color=GRAY_B),
                    self.formula_card(right, "", GREEN_B, width=2.85, height=0.62),
                ).arrange(RIGHT, buff=0.14)
            )
        return VGroup(*rows).arrange(DOWN, buff=0.18)

    def construct(self):
        self.camera.background_color = "#111827"
        copy = TEXT[self.locale]

        title = self.label(copy["title"], font_size=34, color=BLUE_B, weight=BOLD, max_width=9.6)
        subtitle = self.label(copy["subtitle"], font_size=19, color=WHITE, max_width=9.6)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.06).to_edge(UP, buff=0.15)

        visuals = [
            self.zero_visual(),
            self.rref_visual(),
            self.directions_visual(),
            self.null_space_visual(),
            self.translate_visual(),
            self.freedom_visual(),
        ]
        for visual in visuals:
            visual.move_to(ORIGIN + UP * 0.15)
        cards = [self.state_card(i).to_edge(DOWN, buff=0.16) for i in range(len(visuals))]

        self.play(FadeIn(header, shift=DOWN * 0.15), run_time=0.55)
        current_visual = visuals[0]
        current_card = cards[0]
        self.play(FadeIn(current_visual, scale=0.98), FadeIn(current_card, shift=UP * 0.12), run_time=0.65)
        self.wait(0.35)

        for index in range(1, len(visuals)):
            next_visual = visuals[index]
            next_card = cards[index]
            self.play(
                FadeOut(current_visual, shift=LEFT * 0.18),
                FadeOut(current_card, shift=DOWN * 0.1),
                FadeIn(next_visual, shift=RIGHT * 0.18),
                FadeIn(next_card, shift=UP * 0.1),
                run_time=0.72,
            )
            self.wait(0.32)
            current_visual = next_visual
            current_card = next_card

        conclusion = self.conclusion_visual().move_to(ORIGIN + DOWN * 0.08)
        self.play(
            FadeOut(current_visual, shift=UP * 0.12),
            FadeOut(current_card, shift=DOWN * 0.12),
            FadeIn(conclusion, scale=0.98),
            run_time=0.65,
        )
        self.wait(0.7)


class HomogeneousSystemsNullSpaceStoryEn(HomogeneousSystemsNullSpaceStoryBase):
    locale = "en"
    font = "Avenir Next"


class HomogeneousSystemsNullSpaceStoryZhHk(HomogeneousSystemsNullSpaceStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class HomogeneousSystemsNullSpaceStoryZhCn(HomogeneousSystemsNullSpaceStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class HomogeneousSystemsNullSpaceStory(HomogeneousSystemsNullSpaceStoryEn):
    pass
