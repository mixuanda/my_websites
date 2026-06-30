from manim import *


TEXT = {
    "en": {
        "title": "Read solution-set types from RREF",
        "subtitle": "Check. Count. Classify.",
        "visual": {
            "variables": "variable columns",
            "augmented": "last column",
            "pivot": "pivot",
            "free": "free",
            "contradiction": "contradiction row",
            "impossible": "0 = 1",
            "no_solution": "no solution",
            "unique": "unique solution",
            "infinite": "infinitely many",
            "all_pivots": "all variables pivot",
            "no_free": "no free variables",
            "one_point": "one point",
            "parameter": "parameter line",
            "choose_t": "choose t freely",
            "consistent": "consistent?",
            "last_pivot": "last column pivot?",
            "count_pivots": "count variable pivots",
            "practice": "practice below",
            "check": "check contradiction",
            "count": "count pivots",
            "classify": "classify",
        },
        "states": [
            (
                "RREF is the reading form",
                "Read variables, last column, pivots, and free columns.",
                "[A|b] -> RREF",
            ),
            (
                "First test consistency",
                "A contradiction row means no solution.",
                "last column pivot -> inconsistent",
            ),
            (
                "Consistent and r = n",
                "Every variable column pivots: one solution vector.",
                "no free variables -> unique solution",
            ),
            (
                "Consistent and r < n",
                "A free variable gives a real parameter family.",
                "free variable -> infinitely many solutions",
            ),
            (
                "Only three terminal cases",
                "No fourth case; no exactly-two-solutions case.",
                "contradiction / r=n / r<n",
            ),
            (
                "Use the live classifier next",
                "Switch among the same reduced forms below.",
                "check -> count -> classify",
            ),
        ],
        "conclusion": "The classification is structural: contradiction rows decide consistency; otherwise pivot count decides whether the consistent solution set is one point or an infinite family.",
    },
    "zh-hk": {
        "title": "由 RREF 讀出解集類型",
        "subtitle": "先檢查一致性；再數主元變量與自由變量。",
        "visual": {
            "variables": "變量欄",
            "augmented": "最後一欄",
            "pivot": "主元",
            "free": "自由",
            "contradiction": "矛盾行",
            "impossible": "0 = 1",
            "no_solution": "無解",
            "unique": "唯一解",
            "infinite": "無限多解",
            "all_pivots": "每個變量都有主元",
            "no_free": "沒有自由變量",
            "one_point": "一個點",
            "parameter": "參數直線",
            "choose_t": "自由選 t",
            "consistent": "一致？",
            "last_pivot": "最後一欄是主元？",
            "count_pivots": "數變量主元",
            "practice": "下面練習",
            "check": "檢查矛盾",
            "count": "數主元",
            "classify": "分類",
        },
        "states": [
            (
                "RREF 是閱讀形式",
                "看變量欄、最後一欄、主元欄和自由欄。",
                "[A|b] -> RREF",
            ),
            (
                "先判斷一致性",
                "若有 [0 0 0 | d] 且 d != 0，便表示 0=d，所以無解。",
                "最後一欄主元 -> 不一致",
            ),
            (
                "一致且 r = n",
                "每個變量欄都有主元，所以 RREF 直接給出一個解向量。",
                "沒有自由變量 -> 唯一解",
            ),
            (
                "一致且 r < n",
                "至少有一個變量是自由的；每個實參數選擇都給出一個解。",
                "自由變量 -> 無限多解",
            ),
            (
                "只有三個終點",
                "無解、唯一解、或無限多解；不會剛好有兩個解。",
                "矛盾 / r=n / r<n",
            ),
            (
                "接著使用互動分類器",
                "下面的元件讓你在同三種化簡形式之間切換。",
                "檢查 -> 計數 -> 分類",
            ),
        ],
        "conclusion": "分類是結構性的：矛盾行決定一致性；否則由主元數決定一致解集是一個點還是一個無限族。",
    },
    "zh-cn": {
        "title": "由 RREF 读出解集类型",
        "subtitle": "先检查相容性；再数主元变量与自由变量。",
        "visual": {
            "variables": "变量列",
            "augmented": "最后一列",
            "pivot": "主元",
            "free": "自由",
            "contradiction": "矛盾行",
            "impossible": "0 = 1",
            "no_solution": "无解",
            "unique": "唯一解",
            "infinite": "无限多解",
            "all_pivots": "每个变量都有主元",
            "no_free": "没有自由变量",
            "one_point": "一个点",
            "parameter": "参数直线",
            "choose_t": "自由选 t",
            "consistent": "相容？",
            "last_pivot": "最后一列是主元？",
            "count_pivots": "数变量主元",
            "practice": "下面练习",
            "check": "检查矛盾",
            "count": "数主元",
            "classify": "分类",
        },
        "states": [
            (
                "RREF 是阅读形式",
                "看变量列、最后一列、主元列和自由列。",
                "[A|b] -> RREF",
            ),
            (
                "先判断相容性",
                "若有 [0 0 0 | d] 且 d != 0，便表示 0=d，所以无解。",
                "最后一列主元 -> 不相容",
            ),
            (
                "相容且 r = n",
                "每个变量列都有主元，所以 RREF 直接给出一个解向量。",
                "没有自由变量 -> 唯一解",
            ),
            (
                "相容且 r < n",
                "至少有一个变量是自由的；每个实参数选择都给出一个解。",
                "自由变量 -> 无限多解",
            ),
            (
                "只有三个终点",
                "无解、唯一解、或无限多解；不会恰好有两个解。",
                "矛盾 / r=n / r<n",
            ),
            (
                "接着使用互动分类器",
                "下面的组件让你在同三种化简形式之间切换。",
                "检查 -> 计数 -> 分类",
            ),
        ],
        "conclusion": "分类是结构性的：矛盾行决定相容性；否则由主元数决定相容解集是一个点还是一个无限族。",
    },
}


class SolutionSetTypesTrichotomyStoryBase(Scene):
    """MATH1030 2.4: solution-set trichotomy from RREF."""

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

    def matrix_grid(
        self,
        rows,
        pivots=(),
        free_cols=(),
        contradiction_row=None,
        scale_numbers=1.0,
    ):
        cell_width = 0.72
        cell_height = 0.52
        cells = VGroup()
        values = VGroup()
        markers = VGroup()
        n_cols = len(rows[0])
        n_rows = len(rows)
        center_x = (n_cols - 1) / 2
        center_y = (n_rows - 1) / 2

        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - center_x) * cell_width
                y = (center_y - row_index) * cell_height
                is_augmented = col_index == n_cols - 1
                is_pivot = (row_index, col_index) in pivots
                is_free = col_index in free_cols
                is_contradiction = contradiction_row == row_index
                fill_color = RED_E if is_contradiction else YELLOW_E if is_pivot else GREEN_E if is_free else BLACK
                stroke_color = RED_B if is_contradiction else YELLOW_B if is_pivot else GREEN_B if is_free else BLUE_E if is_augmented else GREY_B
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.2,
                    stroke_color=stroke_color,
                    fill_color=fill_color,
                    fill_opacity=0.44 if (is_pivot or is_free or is_contradiction) else 0.18,
                ).move_to([x, y, 0])
                number = self.label(
                    str(value),
                    font_size=25 * scale_numbers,
                    max_width=cell_width * 0.66,
                ).move_to(cell)
                cells.add(cell)
                values.add(number)
                if is_pivot:
                    markers.add(Dot(color=YELLOW, radius=0.06).move_to(cell.get_corner(UL) + RIGHT * 0.1 + DOWN * 0.1))

        divider_x = (n_cols - 1.5 - center_x) * cell_width
        divider = Line(
            [divider_x, -(center_y + 0.46) * cell_height, 0],
            [divider_x, (center_y + 0.46) * cell_height, 0],
            color=BLUE_B,
            stroke_width=4,
        )
        left_bracket = Text("[", font=self.font, font_size=74).next_to(cells, LEFT, buff=0.08)
        right_bracket = Text("]", font=self.font, font_size=74).next_to(cells, RIGHT, buff=0.08)
        return VGroup(cells, values, divider, left_bracket, right_bracket, markers)

    def badge(self, title, body, color=GREEN_B, width=4.2, height=0.92):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.26,
        )
        title_mob = self.label(title, font_size=16, color=color, weight=MEDIUM, max_width=width * 0.88)
        body_mob = self.label(body, font_size=20, color=WHITE, max_width=width * 0.86)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content)

    def state_card(self, index):
        state = TEXT[self.locale]["states"][index]
        box = RoundedRectangle(
            corner_radius=0.1,
            width=12.25,
            height=1.18,
            stroke_color=GRAY_C,
            fill_color=BLACK,
            fill_opacity=0.30,
        )
        title = self.label(state[0], font_size=22, color=YELLOW_B, weight=BOLD, max_width=11.3)
        body = self.label(state[1], font_size=17, color=WHITE, max_width=11.5)
        formula = self.label(state[2], font_size=16, color=GREEN_B, max_width=11.0)
        content = VGroup(title, body, formula).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content).to_edge(DOWN, buff=0.25)

    def mini_axes(self):
        axes = NumberPlane(
            x_range=[-3, 3, 1],
            y_range=[-2, 2, 1],
            x_length=4.45,
            y_length=2.9,
            background_line_style={"stroke_color": BLUE_E, "stroke_width": 1, "stroke_opacity": 0.22},
            axis_config={"stroke_color": GRAY_B, "stroke_width": 1.3},
        )
        return axes

    def rref_reading_visual(self):
        labels = TEXT[self.locale]["visual"]
        matrix = self.matrix_grid(
            [[1, 0, 2, 5], [0, 1, -1, 3], [0, 0, 0, 0]],
            pivots=[(0, 0), (1, 1)],
            free_cols=[2],
        ).scale(1.08)
        variable_label = self.badge(labels["variables"], labels["pivot"] + " / " + labels["free"], YELLOW_B, width=4.2)
        augmented_label = self.badge(labels["augmented"], "[ b ]", BLUE_B, width=3.35)
        cards = VGroup(variable_label, augmented_label).arrange(DOWN, buff=0.18)
        return VGroup(matrix, cards).arrange(RIGHT, buff=0.58).scale_to_fit_width(10.8)

    def contradiction_visual(self):
        labels = TEXT[self.locale]["visual"]
        matrix = self.matrix_grid(
            [[1, 0, -2, 1], [0, 1, 3, 4], [0, 0, 0, 1]],
            pivots=[(0, 0), (1, 1), (2, 3)],
            contradiction_row=2,
        )
        row = self.badge(labels["contradiction"], labels["impossible"], RED_B, width=3.7)
        lines = VGroup(
            Line(LEFT * 1.45 + UP * 0.55, RIGHT * 1.45 + UP * 1.05, color=RED_B, stroke_width=5),
            Line(LEFT * 1.45 + DOWN * 0.55, RIGHT * 1.45 + DOWN * -0.05, color=RED_B, stroke_width=5),
            self.label(labels["no_solution"], font_size=24, color=RED_B, weight=BOLD, max_width=3.2).shift(DOWN * 1.25),
        )
        return VGroup(matrix, row, lines).arrange(RIGHT, buff=0.42).scale_to_fit_width(11.0)

    def unique_visual(self):
        labels = TEXT[self.locale]["visual"]
        matrix = self.matrix_grid(
            [[1, 0, 0, 2], [0, 1, 0, -1], [0, 0, 1, 3]],
            pivots=[(0, 0), (1, 1), (2, 2)],
        )
        axes = self.mini_axes()
        dot = Dot(axes.c2p(1.25, -0.75), color=YELLOW, radius=0.08)
        point_label = self.label(labels["one_point"], font_size=18, color=YELLOW_B, max_width=2.2).next_to(dot, UR, buff=0.12)
        card = self.badge(labels["all_pivots"], labels["no_free"], GREEN_B, width=4.2)
        return VGroup(matrix, VGroup(axes, dot, point_label), card).arrange(RIGHT, buff=0.42).scale_to_fit_width(11.0)

    def infinite_visual(self):
        labels = TEXT[self.locale]["visual"]
        matrix = self.matrix_grid(
            [[1, 0, 2, 5], [0, 1, -1, 3], [0, 0, 0, 0]],
            pivots=[(0, 0), (1, 1)],
            free_cols=[2],
        )
        axes = self.mini_axes()
        line = Line(axes.c2p(-2.2, -1.15), axes.c2p(2.2, 1.05), color=GREEN_B, stroke_width=5)
        dots = VGroup(*[Dot(axes.c2p(x, 0.5 * x - 0.05), color=YELLOW, radius=0.06) for x in [-1.6, -0.5, 0.7, 1.8]])
        line_label = self.label(labels["parameter"], font_size=18, color=GREEN_B, max_width=2.8).next_to(line, UP, buff=0.1)
        card = self.badge(labels["free"], labels["choose_t"], GREEN_B, width=3.7)
        return VGroup(matrix, VGroup(axes, line, dots, line_label), card).arrange(RIGHT, buff=0.42).scale_to_fit_width(11.0)

    def decision_tree_visual(self):
        labels = TEXT[self.locale]["visual"]

        def tree_box(title, body, color, width=3.15):
            return self.badge(title, body, color=color, width=width, height=0.95)

        start = tree_box(labels["consistent"], labels["last_pivot"], BLUE_B, width=3.45)
        no_solution = tree_box(labels["no_solution"], "0=d", RED_B, width=3.25)
        count = tree_box(labels["count_pivots"], "r ? n", YELLOW_B, width=3.45)
        unique = tree_box(labels["unique"], "r = n", GREEN_B, width=3.1)
        infinite = tree_box(labels["infinite"], "r < n", GREEN_B, width=3.1)
        top = VGroup(start, no_solution).arrange(RIGHT, buff=1.05)
        bottom = VGroup(unique, count, infinite).arrange(RIGHT, buff=0.55)
        tree = VGroup(top, bottom).arrange(DOWN, buff=0.72)

        arrows = VGroup(
            Arrow(start.get_right(), no_solution.get_left(), buff=0.08, color=RED_B, stroke_width=3),
            Arrow(start.get_bottom(), count.get_top(), buff=0.08, color=BLUE_B, stroke_width=3),
            Arrow(count.get_left(), unique.get_right(), buff=0.08, color=GREEN_B, stroke_width=3),
            Arrow(count.get_right(), infinite.get_left(), buff=0.08, color=GREEN_B, stroke_width=3),
        )
        return VGroup(tree, arrows).scale_to_fit_width(10.7)

    def widget_bridge_visual(self):
        labels = TEXT[self.locale]["visual"]
        matrices = VGroup(
            self.matrix_grid([[1, 0, 2], [0, 1, -1]], pivots=[(0, 0), (1, 1)]).scale(0.62),
            self.matrix_grid([[1, 2, 5], [0, 0, 0]], pivots=[(0, 0)], free_cols=[1]).scale(0.62),
            self.matrix_grid([[1, 0, 3], [0, 0, 1]], pivots=[(0, 0), (1, 2)], contradiction_row=1).scale(0.62),
        ).arrange(RIGHT, buff=0.35)
        labels_row = VGroup(
            self.label(labels["unique"], font_size=18, color=GREEN_B, weight=BOLD, max_width=2.2),
            self.label(labels["infinite"], font_size=18, color=GREEN_B, weight=BOLD, max_width=2.4),
            self.label(labels["no_solution"], font_size=18, color=RED_B, weight=BOLD, max_width=2.2),
        ).arrange(RIGHT, buff=0.9)
        steps = VGroup(
            self.badge(labels["check"], labels["count"], BLUE_B, width=3.2),
            self.label("=>", font_size=30, color=GRAY_A, max_width=0.7),
            self.badge(labels["classify"], labels["practice"], GREEN_B, width=3.2),
        ).arrange(RIGHT, buff=0.22)
        return VGroup(matrices, labels_row, steps).arrange(DOWN, buff=0.28).scale_to_fit_width(10.5)

    def visual_for(self, index):
        return [
            self.rref_reading_visual,
            self.contradiction_visual,
            self.unique_visual,
            self.infinite_visual,
            self.decision_tree_visual,
            self.widget_bridge_visual,
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


class SolutionSetTypesTrichotomyStoryEn(SolutionSetTypesTrichotomyStoryBase):
    locale = "en"
    font = "Avenir Next"


class SolutionSetTypesTrichotomyStoryZhHk(SolutionSetTypesTrichotomyStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class SolutionSetTypesTrichotomyStoryZhCn(SolutionSetTypesTrichotomyStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class SolutionSetTypesTrichotomyStory(SolutionSetTypesTrichotomyStoryEn):
    pass
