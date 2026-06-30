from manim import *


TEXT = {
    "en": {
        "title": "Solution sets are intersections",
        "subtitle": "Conditions. Geometry. Safe rewrites.",
        "visual": {
            "condition": "condition",
            "solution_set": "solution set",
            "overlap": "all equations true",
            "unique": "unique solution",
            "empty": "empty set",
            "infinite": "infinitely many",
            "same_set": "same solution set",
            "inverse": "inverse operation",
            "one_row": "one equation per row",
            "explorer": "try the explorer below",
        },
        "states": [
            (
                "A system is a stack of conditions",
                "A tuple is a solution only if it satisfies every equation.",
                "S = S1 ∩ S2",
            ),
            (
                "Two lines can meet once",
                "The example has intersection point (2, 3).",
                "{(2,3)}",
            ),
            (
                "Parallel distinct lines do not meet",
                "No tuple satisfies both equations, so the system is inconsistent.",
                "solution set = ∅",
            ),
            (
                "Coincident lines give a whole family",
                "A parameter names the whole line.",
                "one real parameter",
            ),
            (
                "Elimination is safe because it is reversible",
                "Equation operations rewrite the system without changing its solution set.",
                "E2 <- E2 - (4/3)E1",
            ),
            (
                "Matrices package the same conditions",
                "The explorer below lets you translate equations into rows of [A|b].",
                "system -> augmented matrix",
            ),
        ],
        "conclusion": [("Equations", "change"), ("Solution set", "fixed")],
    },
    "zh-hk": {
        "title": "解集是條件交集",
        "subtitle": "條件、幾何圖像、安全改寫。",
        "visual": {
            "condition": "條件",
            "solution_set": "解集",
            "overlap": "全部方程成立",
            "unique": "唯一解",
            "empty": "空集",
            "infinite": "無限多解",
            "same_set": "同一解集",
            "inverse": "逆操作",
            "one_row": "每行一條方程",
            "explorer": "試下面探索器",
        },
        "states": [
            (
                "方程組是一疊條件",
                "有序元組必須滿足每一條方程，才算是解。",
                "S = S1 ∩ S2",
            ),
            (
                "兩條線可以只交於一點",
                "這個例子的交點是 (2, 3)。",
                "{(2,3)}",
            ),
            (
                "平行而不同的直線沒有交點",
                "沒有有序元組能同時滿足兩條方程，所以系統不一致。",
                "解集 = ∅",
            ),
            (
                "重合直線給出整個解族",
                "參數 t 標記整條線。",
                "一個實參數",
            ),
            (
                "消去法安全，因為每步可逆",
                "方程操作會改寫系統，但不改變它的解集。",
                "E2 <- E2 - (4/3)E1",
            ),
            (
                "矩陣包裝同一批條件",
                "下面探索器讓你把方程翻譯成 [A|b] 的行。",
                "方程組 -> 增廣矩陣",
            ),
        ],
        "conclusion": [("方程", "可改寫"), ("解集", "不變")],
    },
    "zh-cn": {
        "title": "解集是条件交集",
        "subtitle": "条件、几何图像、安全改写。",
        "visual": {
            "condition": "条件",
            "solution_set": "解集",
            "overlap": "全部方程成立",
            "unique": "唯一解",
            "empty": "空集",
            "infinite": "无限多解",
            "same_set": "同一解集",
            "inverse": "逆操作",
            "one_row": "每行一条方程",
            "explorer": "试下面探索器",
        },
        "states": [
            (
                "方程组是一叠条件",
                "有序元组必须满足每一条方程，才算是解。",
                "S = S1 ∩ S2",
            ),
            (
                "两条线可以只交于一点",
                "这个例子的交点是 (2, 3)。",
                "{(2,3)}",
            ),
            (
                "平行而不同的直线没有交点",
                "没有有序元组能同时满足两条方程，所以系统不相容。",
                "解集 = ∅",
            ),
            (
                "重合直线给出整个解族",
                "参数 t 标记整条线。",
                "一个实参数",
            ),
            (
                "消去法安全，因为每步可逆",
                "方程操作会改写系统，但不改变它的解集。",
                "E2 <- E2 - (4/3)E1",
            ),
            (
                "矩阵包装同一批条件",
                "下面探索器让你把方程翻译成 [A|b] 的行。",
                "方程组 -> 增广矩阵",
            ),
        ],
        "conclusion": [("方程", "可改写"), ("解集", "不变")],
    },
}


class EquationsSolutionSetsStoryBase(Scene):
    """MATH1030 1.1: solution sets, geometry, and equivalent rewrites."""

    locale = "en"
    font = "Avenir Next"

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

    def badge(self, title, body, color=GREEN_B, width=4.1, height=0.88):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.30,
        )
        title_mob = self.label(title, font_size=15, color=color, weight=MEDIUM, max_width=width * 0.86)
        body_mob = self.label(body, font_size=19, color=WHITE, max_width=width * 0.86)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.06).move_to(box)
        return VGroup(box, content)

    def equation_card(self, equation, title=None, color=BLUE_B, width=4.4):
        box = RoundedRectangle(
            corner_radius=0.09,
            width=width,
            height=0.86 if title is None else 1.06,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.26,
        )
        equation_mob = self.label(equation, font_size=24, color=WHITE, max_width=width * 0.84)
        if title is None:
            content = equation_mob.move_to(box)
        else:
            title_mob = self.label(title, font_size=14, color=color, weight=MEDIUM, max_width=width * 0.84)
            content = VGroup(title_mob, equation_mob).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content)

    def matrix_grid(self, rows):
        cell_width = 0.74
        cell_height = 0.52
        cells = VGroup()
        values = VGroup()
        n_cols = len(rows[0])
        n_rows = len(rows)
        center_x = (n_cols - 1) / 2
        center_y = (n_rows - 1) / 2

        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - center_x) * cell_width
                y = (center_y - row_index) * cell_height
                is_augmented = col_index == n_cols - 1
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.25,
                    stroke_color=BLUE_B if is_augmented else GREY_B,
                    fill_color=BLACK,
                    fill_opacity=0.18,
                ).move_to([x, y, 0])
                number = self.label(str(value), font_size=25, max_width=cell_width * 0.66).move_to(cell)
                cells.add(cell)
                values.add(number)

        divider_x = (n_cols - 1.5 - center_x) * cell_width
        divider = Line(
            [divider_x, -(center_y + 0.46) * cell_height, 0],
            [divider_x, (center_y + 0.46) * cell_height, 0],
            color=BLUE_B,
            stroke_width=4,
        )
        left_bracket = Text("[", font=self.font, font_size=72).next_to(cells, LEFT, buff=0.08)
        right_bracket = Text("]", font=self.font, font_size=72).next_to(cells, RIGHT, buff=0.08)
        return VGroup(cells, values, divider, left_bracket, right_bracket)

    def state_card(self, index):
        state = TEXT[self.locale]["states"][index]
        box = RoundedRectangle(
            corner_radius=0.1,
            width=12.25,
            height=1.14,
            stroke_color=GRAY_C,
            fill_color=BLACK,
            fill_opacity=0.32,
        )
        title = self.label(state[0], font_size=22, color=YELLOW_B, weight=BOLD, max_width=11.3)
        body = self.label(state[1], font_size=17, color=WHITE, max_width=11.55)
        formula = self.label(state[2], font_size=16, color=GREEN_B, max_width=11.0)
        content = VGroup(title, body, formula).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content).to_edge(DOWN, buff=0.24)

    def axes(self):
        return NumberPlane(
            x_range=[-1, 6, 1],
            y_range=[-2, 6, 1],
            x_length=5.1,
            y_length=3.65,
            background_line_style={"stroke_color": BLUE_E, "stroke_width": 1, "stroke_opacity": 0.22},
            axis_config={"stroke_color": GRAY_B, "stroke_width": 1.3},
        )

    def conditions_visual(self):
        labels = TEXT[self.locale]["visual"]
        cards = VGroup(
            self.equation_card("x + y = 5", labels["condition"] + " 1", BLUE_B),
            self.equation_card("2x - 3y = -5", labels["condition"] + " 2", BLUE_B),
        ).arrange(DOWN, buff=0.18)

        ellipse_a = Ellipse(width=2.9, height=1.85, color=BLUE_B, fill_color=BLUE_E, fill_opacity=0.24)
        ellipse_b = Ellipse(width=2.9, height=1.85, color=GREEN_B, fill_color=GREEN_E, fill_opacity=0.24).shift(RIGHT * 1.3)
        sets = VGroup(ellipse_a, ellipse_b)
        s1 = self.label("S1", font_size=23, color=BLUE_B, weight=BOLD, max_width=0.7).move_to(ellipse_a.get_center() + LEFT * 0.55)
        s2 = self.label("S2", font_size=23, color=GREEN_B, weight=BOLD, max_width=0.7).move_to(ellipse_b.get_center() + RIGHT * 0.55)
        overlap = self.badge(labels["solution_set"], labels["overlap"], YELLOW_B, width=3.55, height=0.82).next_to(sets, DOWN, buff=0.22)
        set_group = VGroup(sets, s1, s2, overlap)
        main = VGroup(cards, set_group).arrange(RIGHT, buff=1.05)
        arrow = Arrow(cards.get_right(), set_group.get_left(), buff=0.22, color=GRAY_A, stroke_width=3)
        return VGroup(main, arrow).scale_to_fit_width(10.8)

    def line_scene(self, kind):
        labels = TEXT[self.locale]["visual"]
        axes = self.axes()

        def line_for(func, color, dashed=False):
            line = axes.plot(func, x_range=[-0.7, 5.5], color=color, stroke_width=4.8)
            return DashedVMobject(line, num_dashes=34) if dashed else line

        if kind == "unique":
            l1 = line_for(lambda x: 5 - x, BLUE_B)
            l2 = line_for(lambda x: (2 * x + 5) / 3, GREEN_B)
            point = Dot(axes.c2p(2, 3), color=YELLOW, radius=0.085)
            point_label = self.label("(2, 3)", font_size=20, color=YELLOW_B, weight=BOLD, max_width=1.4).next_to(point, UR, buff=0.10)
            result = self.badge(labels["solution_set"], labels["unique"], GREEN_B, width=3.85)
            visual = VGroup(axes, l1, l2, point, point_label)
        elif kind == "empty":
            l1 = line_for(lambda x: (2 * x + 5) / 3, BLUE_B)
            l2 = line_for(lambda x: (2 * x) / 3, RED_B)
            gap = VGroup(
                self.label("∅", font_size=52, color=RED_B, weight=BOLD, max_width=1.0),
                self.label(labels["empty"], font_size=22, color=RED_B, weight=BOLD, max_width=2.8),
            ).arrange(DOWN, buff=0.02).move_to(axes.c2p(4.35, 3.25))
            result = self.badge(labels["solution_set"], labels["empty"], RED_B, width=3.65)
            visual = VGroup(axes, l1, l2, gap)
        else:
            l1 = line_for(lambda x: (2 * x + 5) / 3, GREEN_B)
            l2 = line_for(lambda x: (2 * x + 5) / 3, YELLOW_B, dashed=True)
            points = VGroup(*[
                Dot(axes.c2p(x, (2 * x + 5) / 3), color=YELLOW, radius=0.065)
                for x in [0.2, 1.4, 2.6, 3.8, 5.0]
            ])
            result = self.badge(labels["solution_set"], labels["infinite"], GREEN_B, width=3.95)
            visual = VGroup(axes, l1, l2, points)

        equations = {
            "unique": ["x + y = 5", "2x - 3y = -5"],
            "empty": ["2x - 3y = -5", "2x - 3y = 0"],
            "infinite": ["2x - 3y = -5", "-2x + 3y = 5"],
        }[kind]
        equation_cards = VGroup(
            self.equation_card(equations[0], color=BLUE_B, width=3.85),
            self.equation_card(equations[1], color=GREEN_B if kind != "empty" else RED_B, width=3.85),
            result,
        ).arrange(DOWN, buff=0.16)
        return VGroup(visual, equation_cards).arrange(RIGHT, buff=0.48).scale_to_fit_width(10.9)

    def rewrite_visual(self):
        labels = TEXT[self.locale]["visual"]
        original = VGroup(
            self.equation_card("3x + 4y = 2", "E1", BLUE_B, width=4.3),
            self.equation_card("4x + 5y = 3", "E2", BLUE_B, width=4.3),
        ).arrange(DOWN, buff=0.16)
        transformed = VGroup(
            self.equation_card("3x + 4y = 2", "E1", GREEN_B, width=4.3),
            self.equation_card("-1/3 y = 1/3", "E2'", GREEN_B, width=4.3),
        ).arrange(DOWN, buff=0.16)
        op = self.badge("E2 <- E2 - (4/3)E1", labels["same_set"], YELLOW_B, width=4.25, height=0.86)
        inv = self.badge("E2 <- E2 + (4/3)E1", labels["inverse"], GREEN_B, width=4.25, height=0.86)
        middle = VGroup(op, inv).arrange(DOWN, buff=0.18)
        main = VGroup(original, middle, transformed).arrange(RIGHT, buff=0.58)
        arrows = VGroup(
            Arrow(original.get_right(), transformed.get_left(), buff=0.18, color=YELLOW_B, stroke_width=3),
            CurvedArrow(transformed.get_bottom() + DOWN * 0.08, original.get_bottom() + DOWN * 0.08, color=GREEN_B, stroke_width=3),
        )
        return VGroup(main, arrows).scale_to_fit_width(11.0)

    def bridge_visual(self):
        labels = TEXT[self.locale]["visual"]
        system = VGroup(
            self.equation_card("x + 2y = 5", "E1", BLUE_B, width=4.0),
            self.equation_card("3x - y = 4", "E2", BLUE_B, width=4.0),
        ).arrange(DOWN, buff=0.14)
        matrix = self.matrix_grid([[1, 2, 5], [3, -1, 4]]).scale(1.12)
        row_badge = self.badge("[A|b]", labels["one_row"], BLUE_B, width=3.7, height=0.84)
        explorer = self.badge(labels["solution_set"], labels["explorer"], GREEN_B, width=4.1, height=0.84)
        matrix_group = VGroup(matrix, row_badge, explorer).arrange(DOWN, buff=0.20)
        main = VGroup(system, matrix_group).arrange(RIGHT, buff=1.2)
        arrow = Arrow(system.get_right(), matrix_group.get_left(), buff=0.24, color=GRAY_A, stroke_width=3)
        return VGroup(main, arrow).scale_to_fit_width(10.8)

    def visual_for(self, index):
        return [
            self.conditions_visual,
            lambda: self.line_scene("unique"),
            lambda: self.line_scene("empty"),
            lambda: self.line_scene("infinite"),
            self.rewrite_visual,
            self.bridge_visual,
        ][index]()

    def construct(self):
        self.camera.background_color = "#111827"
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=32, color=WHITE, weight=BOLD, max_width=12.0)
        subtitle = self.label(data["subtitle"], font_size=18, color=GRAY_A, max_width=11.6)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.12).to_edge(UP, buff=0.28)

        self.play(FadeIn(header, shift=DOWN * 0.12), run_time=0.7)

        visual = self.visual_for(0).move_to(ORIGIN + UP * 0.23)
        card = self.state_card(0)
        self.play(FadeIn(visual, shift=UP * 0.16), FadeIn(card, shift=UP * 0.12), run_time=0.8)
        self.wait(1.0)

        for index in range(1, 6):
            new_visual = self.visual_for(index).move_to(ORIGIN + UP * 0.23)
            new_card = self.state_card(index)
            self.play(FadeOut(visual, shift=LEFT * 0.12), FadeOut(card, shift=LEFT * 0.1), run_time=0.34)
            self.play(FadeIn(new_visual, shift=RIGHT * 0.12), FadeIn(new_card, shift=RIGHT * 0.1), run_time=0.46)
            visual = new_visual
            card = new_card
            self.wait(1.0)

        conclusion_box = RoundedRectangle(
            corner_radius=0.1,
            width=11.35,
            height=1.14,
            stroke_color=GREEN_B,
            fill_color=BLACK,
            fill_opacity=0.34,
        )
        rows = VGroup()
        for left_text, right_text in data["conclusion"]:
            left = VGroup(*[
                self.label(word, font_size=20, color=BLUE_B, weight=MEDIUM, max_width=2.3)
                for word in left_text.split(" ")
            ]).arrange(RIGHT, buff=0.08)
            arrow = Arrow(ORIGIN, RIGHT * 0.58, buff=0, color=GRAY_A, stroke_width=2.5)
            right = self.label(right_text, font_size=20, color=WHITE, weight=MEDIUM, max_width=2.4)
            rows.add(VGroup(left, arrow, right).arrange(RIGHT, buff=0.18))
        conclusion = rows.arrange(DOWN, buff=0.10).move_to(conclusion_box)
        conclusion_group = VGroup(conclusion_box, conclusion).move_to(ORIGIN + DOWN * 0.04)

        self.play(FadeOut(visual), FadeOut(card), FadeIn(conclusion_group, shift=UP * 0.12), run_time=0.8)
        self.wait(1.3)


class EquationsSolutionSetsStoryEn(EquationsSolutionSetsStoryBase):
    locale = "en"
    font = "Avenir Next"


class EquationsSolutionSetsStoryZhHk(EquationsSolutionSetsStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class EquationsSolutionSetsStoryZhCn(EquationsSolutionSetsStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class EquationsSolutionSetsStory(EquationsSolutionSetsStoryEn):
    pass
