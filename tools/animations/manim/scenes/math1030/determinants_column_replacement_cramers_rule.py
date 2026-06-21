from manim import *


TEXT = {
    "en": {
        "title": "Cramer's rule: replace one column",
        "subtitle": "The numerator determinant isolates one coordinate.",
        "visual": {
            "system": "system",
            "columns": "columns of A",
            "replace": "replace column",
            "substitute": "substitute b",
            "linearity": "column linearity",
            "vanish": "repeated columns vanish",
            "keep": "keep",
            "ratio": "ratio",
            "key_relation": "key relation",
            "example": "source example",
            "column_1": "column 1",
            "result": "solution",
        },
        "states": [
            (
                "Read Ax=b by columns",
                "The equation says b is a linear combination of the columns of A.",
                "b=x1 a1+x2 a2+x3 a3",
            ),
            (
                "Build M1 by replacing one column",
                "Cramer's numerator replaces the first column of A by the right-hand side vector b.",
                "M1=[b, a2, a3]",
            ),
            (
                "Substitute the column equation for b",
                "The first column of M1 is x1 a1+x2 a2+x3 a3.",
                "det(M1)=det([x1a1+x2a2+x3a3, a2, a3])",
            ),
            (
                "Column linearity splits the determinant",
                "Only the column being replaced is split; the other columns stay fixed.",
                "x1 det(A)+x2 det([a2,a2,a3])+x3 det([a3,a2,a3])",
            ),
            (
                "Repeated columns kill the extra terms",
                "The second and third terms contain repeated columns, so their determinants are zero.",
                "det(M1)=x1 det(A)",
            ),
            (
                "The source example gives the coordinates",
                "With det(A)=6, the three replacement determinants are 15, -6, and 3.",
                "x=(15/6,-6/6,3/6)=(5/2,-1,1/2)",
            ),
        ],
        "conclusion": "Cramer's rule works because replacing one column by b turns det(Mj) into xj det(A); invertibility lets us divide by det(A).",
    },
    "zh-hk": {
        "title": "克拉默法則：替換一列",
        "subtitle": "分子行列式會隔離其中一個座標。",
        "visual": {
            "system": "方程",
            "columns": "A 的各列",
            "replace": "替換一列",
            "substitute": "代入 b",
            "linearity": "列線性",
            "vanish": "重複列消失",
            "keep": "保留",
            "ratio": "比值",
            "key_relation": "關鍵式",
            "example": "來源例子",
            "column_1": "第1列",
            "result": "解",
        },
        "states": [
            (
                "用列去讀 Ax=b",
                "這條方程表示 b 是 A 的各列向量的線性組合。",
                "b=x1 a1+x2 a2+x3 a3",
            ),
            (
                "把一列換成 b 得到 M1",
                "克拉默法則的分子，是把 A 的第一列換成右邊向量 b。",
                "M1=[b, a2, a3]",
            ),
            (
                "把 b 換成列向量組合",
                "M1 的第一列就是 x1 a1+x2 a2+x3 a3。",
                "det(M1)=det([x1a1+x2a2+x3a3, a2, a3])",
            ),
            (
                "列線性把行列式拆開",
                "只拆被替換的那一列；其餘兩列保持不變。",
                "x1 det(A)+x2 det([a2,a2,a3])+x3 det([a3,a2,a3])",
            ),
            (
                "重複列令多餘項變成零",
                "第二項與第三項都有重複列，所以它們的行列式都是零。",
                "det(M1)=x1 det(A)",
            ),
            (
                "來源例子給出各個座標",
                "當 det(A)=6 時，三個替換行列式分別是 15、-6、3。",
                "x=(15/6,-6/6,3/6)=(5/2,-1,1/2)",
            ),
        ],
        "conclusion": "克拉默法則成立，是因為把第 j 列換成 b 後，det(Mj) 會變成 xj det(A)；可逆性保證我們可以除以 det(A)。",
    },
    "zh-cn": {
        "title": "克拉默法则：替换一列",
        "subtitle": "分子行列式会隔离其中一个坐标。",
        "visual": {
            "system": "方程",
            "columns": "A 的各列",
            "replace": "替换一列",
            "substitute": "代入 b",
            "linearity": "列线性",
            "vanish": "重复列消失",
            "keep": "保留",
            "ratio": "比值",
            "key_relation": "关键式",
            "example": "来源例子",
            "column_1": "第1列",
            "result": "解",
        },
        "states": [
            (
                "用列去读 Ax=b",
                "这条方程表示 b 是 A 的各列向量的线性组合。",
                "b=x1 a1+x2 a2+x3 a3",
            ),
            (
                "把一列换成 b 得到 M1",
                "克拉默法则的分子，是把 A 的第一列换成右侧向量 b。",
                "M1=[b, a2, a3]",
            ),
            (
                "把 b 换成列向量组合",
                "M1 的第一列就是 x1 a1+x2 a2+x3 a3。",
                "det(M1)=det([x1a1+x2a2+x3a3, a2, a3])",
            ),
            (
                "列线性把行列式拆开",
                "只拆被替换的那一列；其余两列保持不变。",
                "x1 det(A)+x2 det([a2,a2,a3])+x3 det([a3,a2,a3])",
            ),
            (
                "重复列令多余项变成零",
                "第二项与第三项都有重复列，所以它们的行列式都是零。",
                "det(M1)=x1 det(A)",
            ),
            (
                "来源例子给出各个坐标",
                "当 det(A)=6 时，三个替换行列式分别是 15、-6、3。",
                "x=(15/6,-6/6,3/6)=(5/2,-1,1/2)",
            ),
        ],
        "conclusion": "克拉默法则成立，是因为把第 j 列换成 b 后，det(Mj) 会变成 xj det(A)；可逆性保证我们可以除以 det(A)。",
    },
}


class DeterminantsColumnReplacementCramersRuleStoryBase(Scene):
    """MATH1030 7.3: Cramer's rule via column replacement."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def formula_card(self, title, body, color=GREEN_B, width=6.3, height=0.9):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.24,
        )
        title_mob = self.label(title, font_size=16, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=20, max_width=width * 0.9)
        return VGroup(box, VGroup(title_mob, body_mob).arrange(DOWN, buff=0.1).move_to(box))

    def column_card(self, label, entries=None, color=BLUE_B, width=1.18, height=1.92):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.2,
        )
        if entries:
            cells = VGroup()
            values = VGroup()
            cell_height = (height - 0.42) / len(entries)
            for index, value in enumerate(entries):
                y = height / 2 - 0.38 - cell_height * (index + 0.5)
                cell = Rectangle(
                    width=width - 0.2,
                    height=cell_height,
                    stroke_width=0.8,
                    stroke_color=color,
                    fill_color=BLACK,
                    fill_opacity=0.15,
                ).move_to(box.get_center() + UP * y)
                values.add(self.label(value, font_size=17, max_width=width * 0.7).move_to(cell))
                cells.add(cell)
            label_mob = self.label(label, font_size=17, color=color, weight=MEDIUM, max_width=width * 0.9)
            label_mob.move_to(box.get_top() + DOWN * 0.2)
            content = VGroup(label_mob, cells, values)
        else:
            label_mob = self.label(label, font_size=27, color=color, weight=BOLD, max_width=width * 0.78)
            content = label_mob.move_to(box)
        return VGroup(box, content)

    def matrix_columns(self, title, columns, colors=None):
        colors = colors or [BLUE_B] * len(columns)
        cards = VGroup(
            *[
                self.column_card(label, entries, color=colors[index])
                for index, (label, entries) in enumerate(columns)
            ]
        ).arrange(RIGHT, buff=0.08)
        title_mob = self.label(title, font_size=18, color=GRAY_B, weight=MEDIUM, max_width=4.9)
        return VGroup(title_mob, cards).arrange(DOWN, buff=0.14)

    def arrow(self):
        return Arrow(LEFT, RIGHT, buff=0, max_tip_length_to_length_ratio=0.18, color=WHITE).scale(0.55)

    def columns_visual(self):
        v = TEXT[self.locale]["visual"]
        a_matrix = self.matrix_columns(
            "A",
            [("a1", None), ("a2", None), ("a3", None)],
            [BLUE_B, BLUE_B, BLUE_B],
        )
        b_card = self.column_card("b", None, GREEN_B)
        equation = self.formula_card(v["system"], "Ax=b", TEAL_B, width=2.4, height=0.7)
        combination = self.formula_card(v["columns"], "b=x1 a1+x2 a2+x3 a3", GREEN_B, width=5.9, height=0.78)
        top = VGroup(a_matrix, self.arrow(), b_card).arrange(RIGHT, buff=0.38)
        return VGroup(equation, top, combination).arrange(DOWN, buff=0.22)

    def replacement_visual(self):
        v = TEXT[self.locale]["visual"]
        original = self.matrix_columns("A", [("a1", None), ("a2", None), ("a3", None)])
        replaced = self.matrix_columns(
            "M1",
            [("b", None), ("a2", None), ("a3", None)],
            [GREEN_B, BLUE_B, BLUE_B],
        )
        first = self.formula_card(v["column_1"], "a1 -> b", YELLOW_B, width=3.2, height=0.7)
        top = VGroup(original, self.arrow(), replaced).arrange(RIGHT, buff=0.36)
        return VGroup(top, first).arrange(DOWN, buff=0.2)

    def substitute_visual(self):
        v = TEXT[self.locale]["visual"]
        m1 = self.matrix_columns(
            "M1",
            [("b", None), ("a2", None), ("a3", None)],
            [GREEN_B, BLUE_B, BLUE_B],
        )
        expanded = self.matrix_columns(
            "M1",
            [("x1a1+x2a2+x3a3", None), ("a2", None), ("a3", None)],
            [YELLOW_B, BLUE_B, BLUE_B],
        )
        rule = self.formula_card(v["substitute"], "b=x1a1+x2a2+x3a3", GREEN_B, width=5.7, height=0.76)
        return VGroup(VGroup(m1, self.arrow(), expanded).arrange(RIGHT, buff=0.3), rule).arrange(DOWN, buff=0.2)

    def linearity_visual(self):
        v = TEXT[self.locale]["visual"]
        term1 = self.formula_card("x1", "det([a1,a2,a3])", GREEN_B, width=3.3, height=0.82)
        term2 = self.formula_card("x2", "det([a2,a2,a3])", RED_B, width=3.3, height=0.82)
        term3 = self.formula_card("x3", "det([a3,a2,a3])", RED_B, width=3.3, height=0.82)
        terms = VGroup(term1, term2, term3).arrange(RIGHT, buff=0.16)
        formula = self.formula_card(v["linearity"], "det(M1)= term1 + term2 + term3", YELLOW_B, width=6.6, height=0.76)
        return VGroup(terms, formula).arrange(DOWN, buff=0.22)

    def vanish_visual(self):
        v = TEXT[self.locale]["visual"]
        good = self.formula_card(v["keep"], "x1 det(A)", GREEN_B, width=2.8, height=0.76)
        zero1 = self.formula_card("0", "det([a2,a2,a3])", RED_B, width=3.2, height=0.76)
        zero2 = self.formula_card("0", "det([a3,a2,a3])", RED_B, width=3.2, height=0.76)
        cross1 = Cross(zero1, stroke_color=RED_A, stroke_width=5)
        cross2 = Cross(zero2, stroke_color=RED_A, stroke_width=5)
        vanish = VGroup(good, VGroup(zero1, cross1), VGroup(zero2, cross2)).arrange(RIGHT, buff=0.18)
        result = self.formula_card(v["ratio"], "x1=det(M1)/det(A)", GREEN_B, width=5.8, height=0.78)
        return VGroup(vanish, result).arrange(DOWN, buff=0.25)

    def source_example_visual(self):
        v = TEXT[self.locale]["visual"]
        a = self.matrix_columns(
            "A",
            [("c1", ["1", "1", "1"]), ("c2", ["2", "0", "1"]), ("c3", ["3", "1", "-1"])],
        )
        b = self.column_card("b", ["2", "3", "1"], GREEN_B)
        dets = VGroup(
            self.formula_card("det(A)", "6", BLUE_B, width=2.1, height=0.68),
            self.formula_card("det(M1)", "15", GREEN_B, width=2.1, height=0.68),
            self.formula_card("det(M2)", "-6", GREEN_B, width=2.1, height=0.68),
            self.formula_card("det(M3)", "3", GREEN_B, width=2.1, height=0.68),
        ).arrange(RIGHT, buff=0.12)
        solution = self.formula_card(v["result"], "x=(5/2, -1, 1/2)", YELLOW_B, width=5.4, height=0.76)
        top = VGroup(a, b).arrange(RIGHT, buff=0.4)
        return VGroup(top, dets, solution).arrange(DOWN, buff=0.18)

    def state_panel(self, index):
        title, body, formula = TEXT[self.locale]["states"][index]
        title_mob = self.label(title, font_size=25, color=YELLOW_B, weight=BOLD, max_width=7.4)
        body_mob = self.label(body, font_size=16, color=GRAY_B, max_width=9.3)
        formula_mob = self.formula_card(
            TEXT[self.locale]["visual"]["key_relation"],
            formula,
            GREEN_B,
            width=6.6,
            height=0.62,
        )
        group = VGroup(title_mob, body_mob, formula_mob).arrange(DOWN, buff=0.1)
        group.to_edge(DOWN, buff=0.24)
        return group

    def construct(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=TEAL_B, weight=BOLD, max_width=9.6).to_edge(UP, buff=0.28)
        subtitle = self.label(data["subtitle"], font_size=18, color=GRAY_B, max_width=8.9).next_to(title, DOWN, buff=0.06)
        self.play(FadeIn(title, shift=DOWN * 0.15), FadeIn(subtitle, shift=DOWN * 0.1), run_time=0.5)

        scenes = [
            self.columns_visual(),
            self.replacement_visual(),
            self.substitute_visual(),
            self.linearity_visual(),
            self.vanish_visual(),
            self.source_example_visual(),
        ]

        current_visual = None
        current_panel = None
        for index, visual in enumerate(scenes):
            visual.scale(0.8)
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

        conclusion = self.label(data["conclusion"], font_size=24, color=YELLOW_B, weight=MEDIUM, max_width=9.5)
        conclusion.to_edge(DOWN, buff=0.42)
        self.play(ReplacementTransform(current_panel, conclusion), run_time=0.6)
        self.wait(0.7)


class DeterminantsColumnReplacementCramersRuleStoryEn(DeterminantsColumnReplacementCramersRuleStoryBase):
    locale = "en"


class DeterminantsColumnReplacementCramersRuleStoryZhHk(DeterminantsColumnReplacementCramersRuleStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class DeterminantsColumnReplacementCramersRuleStoryZhCn(DeterminantsColumnReplacementCramersRuleStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class DeterminantsColumnReplacementCramersRuleStory(DeterminantsColumnReplacementCramersRuleStoryEn):
    pass
