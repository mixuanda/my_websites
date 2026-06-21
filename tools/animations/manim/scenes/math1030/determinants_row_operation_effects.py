from manim import *


TEXT = {
    "en": {
        "title": "Determinants: row-operation effects",
        "subtitle": "Elimination is safe only when the determinant effects are tracked.",
        "visual": {
            "swap": "swap rows",
            "scale": "scale one row",
            "replace": "add multiple",
            "multiplier": "det multiplier",
            "unchanged": "unchanged",
            "triangular": "triangular read-off",
            "bridge": "elementary matrix bridge",
            "invertible": "invertible",
            "singular": "singular",
            "old": "old",
            "new": "new",
            "undo": "undo",
            "product": "product",
            "no_zero_row": "no zero row",
            "zero_row": "zero row",
            "inverse": "inverse",
            "iff": "det(A)!=0  <->  A invertible",
            "scale_formula": "det(new)=(-1/6) det(old)",
            "undo_formula": "det(old)=(-6) det(new)",
            "row1": "row1",
            "row2": "row2",
            "row3_plus": "row3+k row2",
        },
        "states": [
            (
                "Three row operations need three ledger entries",
                "A swap flips the sign, a row scaling multiplies the determinant, and row replacement leaves it unchanged.",
                "swap -> -1, scale -> beta, replace -> 1",
            ),
            (
                "A row swap reverses the sign",
                "After one swap the triangular determinant is 4, so the original determinant is -4.",
                "one swap: det(old)=-det(new)",
            ),
            (
                "Row replacement keeps the determinant",
                "In the source 3 by 3 example, elimination uses only replacement steps, so the diagonal product is the original determinant.",
                "det(A)=1(-2)(-3)=6",
            ),
            (
                "Scaling must be undone carefully",
                "If a row is multiplied by beta during elimination, the new determinant is beta times the old one.",
                "det(new)=beta det(old)",
            ),
            (
                "Elementary matrices package the rules",
                "For an elementary row-operation matrix E, the same ledger rule becomes det(EA)=det(E)det(A).",
                "det(EA)=det(E)det(A)",
            ),
            (
                "The ledger becomes an invertibility test",
                "Row reduction reaches either the identity with nonzero determinant or a zero row with determinant zero; then inverses have reciprocal determinants.",
                "det(A)!=0 <-> A invertible",
            ),
        ],
        "conclusion": "Row reduction becomes a determinant algorithm only after every row-operation effect has been recorded: zero determinant means singular, and an invertible matrix satisfies det(A^-1)=1/det(A).",
    },
    "zh-hk": {
        "title": "行列式：行變換記帳",
        "subtitle": "消元法只有在追蹤行列式影響時才安全。",
        "visual": {
            "swap": "交換兩行",
            "scale": "縮放一行",
            "replace": "加上倍數",
            "multiplier": "行列式倍數",
            "unchanged": "不變",
            "triangular": "三角矩陣讀值",
            "bridge": "基本矩陣橋樑",
            "invertible": "可逆",
            "singular": "奇異",
            "old": "舊矩陣",
            "new": "新矩陣",
            "undo": "補回",
            "product": "乘積",
            "no_zero_row": "沒有零行",
            "zero_row": "零行",
            "inverse": "逆矩陣",
            "iff": "det(A)!=0  <->  A 可逆",
            "scale_formula": "det(新)=(-1/6) det(舊)",
            "undo_formula": "det(舊)=(-6) det(新)",
            "row1": "第1行",
            "row2": "第2行",
            "row3_plus": "第3行+k第2行",
        },
        "states": [
            (
                "三種行變換有三條記帳規則",
                "換行會改變符號，縮放一行會乘上該倍數，行替換則不改變行列式。",
                "換行 -> -1，縮放 -> beta，替換 -> 1",
            ),
            (
                "換行一次會反轉符號",
                "換行後的三角矩陣行列式是 4，所以原本的行列式是 -4。",
                "換行一次：det(舊)=-det(新)",
            ),
            (
                "行替換保持行列式不變",
                "來源中的 3 乘 3 例子只用了行替換，所以對角線乘積就是原本的行列式。",
                "det(A)=1(-2)(-3)=6",
            ),
            (
                "縮放行必須小心補回",
                "若消元時把某行乘上 beta，新行列式就是 beta 倍舊行列式。",
                "det(新)=beta det(舊)",
            ),
            (
                "基本矩陣把規則包裝起來",
                "對基本行變換矩陣 E，同一條記帳規則可寫成 det(EA)=det(E)det(A)。",
                "det(EA)=det(E)det(A)",
            ),
            (
                "記帳規則變成可逆性測試",
                "行化簡最後不是到達行列式非零的單位矩陣，就是出現行列式為零的零行；之後逆矩陣的行列式是倒數。",
                "det(A)!=0 <-> A 可逆",
            ),
        ],
        "conclusion": "只有把每一步行變換的影響記下來，行化簡才會成為行列式算法：行列式為零代表奇異；可逆矩陣滿足 det(A^-1)=1/det(A)。",
    },
    "zh-cn": {
        "title": "行列式：行变换记账",
        "subtitle": "消元法只有在追踪行列式影响时才安全。",
        "visual": {
            "swap": "交换两行",
            "scale": "缩放一行",
            "replace": "加上倍数",
            "multiplier": "行列式倍数",
            "unchanged": "不变",
            "triangular": "三角矩阵读值",
            "bridge": "基本矩阵桥梁",
            "invertible": "可逆",
            "singular": "奇异",
            "old": "旧矩阵",
            "new": "新矩阵",
            "undo": "补回",
            "product": "乘积",
            "no_zero_row": "没有零行",
            "zero_row": "零行",
            "inverse": "逆矩阵",
            "iff": "det(A)!=0  <->  A 可逆",
            "scale_formula": "det(新)=(-1/6) det(旧)",
            "undo_formula": "det(旧)=(-6) det(新)",
            "row1": "第1行",
            "row2": "第2行",
            "row3_plus": "第3行+k第2行",
        },
        "states": [
            (
                "三种行变换有三条记账规则",
                "换行会改变符号，缩放一行会乘上该倍数，行替换则不改变行列式。",
                "换行 -> -1，缩放 -> beta，替换 -> 1",
            ),
            (
                "换行一次会反转符号",
                "换行后的三角矩阵行列式是 4，所以原本的行列式是 -4。",
                "换行一次：det(旧)=-det(新)",
            ),
            (
                "行替换保持行列式不变",
                "来源中的 3 乘 3 例子只用了行替换，所以对角线乘积就是原本的行列式。",
                "det(A)=1(-2)(-3)=6",
            ),
            (
                "缩放行必须小心补回",
                "若消元时把某行乘上 beta，新行列式就是 beta 倍旧行列式。",
                "det(新)=beta det(旧)",
            ),
            (
                "基本矩阵把规则包装起来",
                "对基本行变换矩阵 E，同一条记账规则可写成 det(EA)=det(E)det(A)。",
                "det(EA)=det(E)det(A)",
            ),
            (
                "记账规则变成可逆性测试",
                "行化简最后不是到达行列式非零的单位矩阵，就是出现行列式为零的零行；之后逆矩阵的行列式是倒数。",
                "det(A)!=0 <-> A 可逆",
            ),
        ],
        "conclusion": "只有把每一步行变换的影响记下来，行化简才会成为行列式算法：行列式为零代表奇异；可逆矩阵满足 det(A^-1)=1/det(A)。",
    },
}


class DeterminantsRowOperationEffectsStoryBase(Scene):
    """MATH1030 7.2: determinant bookkeeping under row operations."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=7.0):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def formula_card(self, title, body, color=GREEN_B, width=6.0, height=1.02):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.25,
        )
        title_mob = self.label(title, font_size=16, color=color, weight=MEDIUM, max_width=width * 0.9)
        body_mob = self.label(body, font_size=19, color=WHITE, max_width=width * 0.9)
        return VGroup(box, VGroup(title_mob, body_mob).arrange(DOWN, buff=0.14).move_to(box))

    def matrix_grid(self, rows, color=BLUE_B, highlights=(), faded=()):
        row_count = len(rows)
        col_count = len(rows[0])
        if col_count == 1:
            cell_width = 1.55
        else:
            cell_width = 0.54 if col_count >= 4 else 0.62
        cell_height = 0.42 if row_count >= 4 else 0.48
        cells = VGroup()
        values = VGroup()
        highlights = set(highlights)
        faded = set(faded)

        for row_index, row in enumerate(rows):
            for col_index, value in enumerate(row):
                x = (col_index - (col_count - 1) / 2) * cell_width
                y = ((row_count - 1) / 2 - row_index) * cell_height
                is_highlight = (row_index, col_index) in highlights
                is_faded = (row_index, col_index) in faded
                cell = Rectangle(
                    width=cell_width,
                    height=cell_height,
                    stroke_width=1.1,
                    stroke_color=YELLOW_B if is_highlight else color,
                    fill_color=YELLOW_E if is_highlight else BLACK,
                    fill_opacity=0.42 if is_highlight else 0.16,
                ).move_to([x, y, 0])
                value_mob = self.label(str(value), font_size=18, max_width=cell_width * 0.74).move_to(cell)
                if is_faded:
                    cell.set_opacity(0.18)
                    value_mob.set_opacity(0.25)
                cells.add(cell)
                values.add(value_mob)

        return VGroup(cells, values)

    def matrix_panel(self, title, rows, color=BLUE_B, highlights=(), faded=(), scale=1.0):
        grid = self.matrix_grid(rows, color=color, highlights=highlights, faded=faded).scale(scale)
        title_mob = self.label(title, font_size=19, color=color, weight=MEDIUM, max_width=3.6)
        group = VGroup(title_mob, grid).arrange(DOWN, buff=0.12)
        frame = RoundedRectangle(
            corner_radius=0.08,
            width=max(group.width + 0.38, 2.0),
            height=group.height + 0.28,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.16,
        ).move_to(group)
        return VGroup(frame, group)

    def rule_cards(self):
        v = TEXT[self.locale]["visual"]
        cards = VGroup(
            self.formula_card(v["swap"], "x -1", RED_B, width=3.15, height=1.12),
            self.formula_card(v["scale"], "x beta", YELLOW_B, width=3.15, height=1.12),
            self.formula_card(v["replace"], "x 1", GREEN_B, width=3.15, height=1.12),
        ).arrange(RIGHT, buff=0.22)
        heading = self.label(v["multiplier"], font_size=22, color=TEAL_B, weight=BOLD, max_width=6.5)
        return VGroup(heading, cards).arrange(DOWN, buff=0.24)

    def swap_visual(self):
        v = TEXT[self.locale]["visual"]
        before = self.matrix_panel("B", [["0", "1"], ["4", "3"]], color=BLUE_B, highlights={(0, 0), (1, 0)})
        after = self.matrix_panel("R1<->R2", [["4", "3"], ["0", "1"]], color=GREEN_B, highlights={(0, 0), (1, 0)})
        arrow = Arrow(LEFT, RIGHT, buff=0.16, color=WHITE).scale(0.8)
        ledger = self.formula_card(v["swap"], "det(new)=4, det(B)=-4", RED_B, width=5.2).next_to(
            VGroup(before, arrow, after).arrange(RIGHT, buff=0.34), DOWN, buff=0.26
        )
        return VGroup(VGroup(before, arrow, after), ledger)

    def replacement_visual(self):
        before = self.matrix_panel(
            "A",
            [["1", "3", "5"], ["1", "1", "1"], ["3", "5", "4"]],
            color=BLUE_B,
            highlights={(1, 0), (2, 0)},
        ).scale(0.9)
        middle = self.matrix_panel(
            "R2-R1, R3-3R1",
            [["1", "3", "5"], ["0", "-2", "-4"], ["0", "-4", "-11"]],
            color=YELLOW_B,
            highlights={(1, 1), (2, 1)},
        ).scale(0.9)
        after = self.matrix_panel(
            "R3-2R2",
            [["1", "3", "5"], ["0", "-2", "-4"], ["0", "0", "-3"]],
            color=GREEN_B,
            highlights={(0, 0), (1, 1), (2, 2)},
        ).scale(0.9)
        arrows = VGroup(Arrow(LEFT, RIGHT, color=WHITE).scale(0.55), Arrow(LEFT, RIGHT, color=WHITE).scale(0.55))
        row = VGroup(before, arrows[0], middle, arrows[1], after).arrange(RIGHT, buff=0.2)
        ledger = self.formula_card(TEXT[self.locale]["visual"]["unchanged"], "det(A)=1(-2)(-3)=6", GREEN_B, width=6.0)
        ledger.next_to(row, DOWN, buff=0.22)
        return VGroup(row, ledger)

    def scaling_visual(self):
        v = TEXT[self.locale]["visual"]
        before = self.matrix_panel(v["old"], [["1", "3"], ["0", "-6"]], color=BLUE_B, highlights={(1, 1)})
        after = self.matrix_panel(v["new"], [["1", "3"], ["0", "1"]], color=YELLOW_B, highlights={(1, 1)})
        beta = self.formula_card("(-1/6) R2", v["scale_formula"], YELLOW_B, width=5.1)
        recover = self.formula_card(v["undo"], v["undo_formula"], GREEN_B, width=5.1)
        top = VGroup(before, Arrow(LEFT, RIGHT, color=WHITE).scale(0.75), after).arrange(RIGHT, buff=0.36)
        bottom = VGroup(beta, recover).arrange(DOWN, buff=0.15).next_to(top, DOWN, buff=0.22)
        return VGroup(top, bottom)

    def elementary_bridge(self):
        v = TEXT[self.locale]["visual"]
        e = self.matrix_panel("E", [["1", "0", "0"], ["0", "1", "0"], ["0", "k", "1"]], color=PURPLE_B, highlights={(2, 1)})
        a = self.matrix_panel("A", [["a11", "a12"], ["a21", "a22"], ["a31", "a32"]], color=BLUE_B).scale(0.86)
        ea = self.matrix_panel("EA", [[v["row1"]], [v["row2"]], [v["row3_plus"]]], color=GREEN_B).scale(0.86)
        equation = self.formula_card(v["bridge"], "det(EA)=det(E)det(A)", PURPLE_B, width=6.3)
        product = self.formula_card(v["product"], "det(BC)=det(B)det(C)", TEAL_B, width=6.3)
        row = VGroup(e, self.label("x", font_size=26), a, Arrow(LEFT, RIGHT, color=WHITE).scale(0.55), ea).arrange(RIGHT, buff=0.22)
        lower = VGroup(equation, product).arrange(DOWN, buff=0.14).next_to(row, DOWN, buff=0.22)
        return VGroup(row, lower)

    def invertibility_visual(self):
        v = TEXT[self.locale]["visual"]
        left = self.matrix_panel(
            v["invertible"],
            [["1", "*", "*"], ["0", "1", "*"], ["0", "0", "1"]],
            color=GREEN_B,
            highlights={(0, 0), (1, 1), (2, 2)},
        )
        right = self.matrix_panel(
            v["singular"],
            [["1", "*", "*"], ["0", "1", "*"], ["0", "0", "0"]],
            color=RED_B,
            highlights={(2, 0), (2, 1), (2, 2)},
        )
        left_rule = self.formula_card(v["no_zero_row"], "det != 0", GREEN_B, width=3.6)
        right_rule = self.formula_card(v["zero_row"], "det = 0", RED_B, width=3.6)
        left_group = VGroup(left, left_rule).arrange(DOWN, buff=0.2)
        right_group = VGroup(right, right_rule).arrange(DOWN, buff=0.2)
        iff = self.label(v["iff"], font_size=24, color=TEAL_B, weight=BOLD, max_width=7.0)
        inverse = self.formula_card(v["inverse"], "det(A^-1)=1/det(A)", YELLOW_B, width=5.6, height=0.68)
        group = VGroup(VGroup(left_group, right_group).arrange(RIGHT, buff=0.85), iff, inverse).arrange(DOWN, buff=0.22)
        return group

    def state_panel(self, index):
        title, body, formula = TEXT[self.locale]["states"][index]
        title_mob = self.label(title, font_size=25, color=YELLOW_B, weight=BOLD, max_width=7.2)
        body_mob = self.label(body, font_size=16, color=GRAY_B, max_width=9.4)
        formula_mob = self.formula_card(TEXT[self.locale]["visual"]["multiplier"], formula, GREEN_B, width=5.8, height=0.62)
        group = VGroup(title_mob, body_mob, formula_mob).arrange(DOWN, buff=0.1)
        group.to_edge(DOWN, buff=0.25)
        return group

    def construct(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=TEAL_B, weight=BOLD, max_width=9.6).to_edge(UP, buff=0.28)
        subtitle = self.label(data["subtitle"], font_size=18, color=GRAY_B, max_width=8.9).next_to(title, DOWN, buff=0.06)
        self.play(FadeIn(title, shift=DOWN * 0.15), FadeIn(subtitle, shift=DOWN * 0.1), run_time=0.5)

        scenes = [
            self.rule_cards(),
            self.swap_visual(),
            self.replacement_visual(),
            self.scaling_visual(),
            self.elementary_bridge(),
            self.invertibility_visual(),
        ]

        current_visual = None
        current_panel = None
        for index, visual in enumerate(scenes):
            visual.scale(0.82)
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

        conclusion = self.label(data["conclusion"], font_size=24, color=YELLOW_B, weight=MEDIUM, max_width=9.6)
        conclusion.to_edge(DOWN, buff=0.42)
        self.play(ReplacementTransform(current_panel, conclusion), run_time=0.6)
        self.wait(0.7)


class DeterminantsRowOperationEffectsStoryEn(DeterminantsRowOperationEffectsStoryBase):
    locale = "en"


class DeterminantsRowOperationEffectsStoryZhHk(DeterminantsRowOperationEffectsStoryBase):
    locale = "zh-hk"


class DeterminantsRowOperationEffectsStoryZhCn(DeterminantsRowOperationEffectsStoryBase):
    locale = "zh-cn"


class DeterminantsRowOperationEffectsStory(DeterminantsRowOperationEffectsStoryEn):
    pass
