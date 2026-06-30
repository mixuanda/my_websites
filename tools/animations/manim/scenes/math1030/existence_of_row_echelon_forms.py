from manim import *


TEXT = {
    "en": {
        "title": "Why REF and RREF always exist",
        "subtitle": "Place one pivot, reduce the smaller block, then clean pivots.",
        "labels": {
            "row_equiv": "row eq.",
            "matrix": "matrix C",
            "ref": "some REF",
            "rref": "some RREF",
            "zero_cols": "zero columns",
            "leftmost": "leftmost nonzero column",
            "pivot": "pivot beta",
            "swap": "swap row up",
            "clear": "clear below",
            "smaller": "smaller block V",
            "induction": "induction gives V#",
            "lift": "lift lower-row operations",
            "rank": "rank induction",
            "normalize": "normalize pivot",
            "above": "clear above",
            "same": "same pivot columns",
            "existence": "existence",
            "uniqueness": "not uniqueness yet",
            "reachable": "reachable target",
            "later": "later theorem",
        },
        "states": [
            (
                "Existence is a target guarantee",
                "Every matrix can reach REF, then RREF, by row-equivalent steps.",
                "C ~ C# ~ C'",
            ),
            (
                "Start the row-count induction",
                "If the matrix is not zero, choose the leftmost nonzero column and move its top nonzero entry into row 1.",
                "leftmost column j, pivot beta",
            ),
            (
                "One pivot leaves a smaller problem",
                "Clear below beta. The lower-right block V has fewer rows, so the induction hypothesis applies there.",
                "[ O beta u ; O 0 V ]",
            ),
            (
                "The smaller block becomes a staircase",
                "Row operations on V lift to lower-row operations on the whole matrix, leaving the first pivot fixed.",
                "V ~ V# gives a REF",
            ),
            (
                "REF cleans to RREF",
                "Rank induction cleans earlier pivots; then normalize the last pivot and clear above.",
                "last pivot -> 1; clear above",
            ),
            (
                "Pivot columns are preserved",
                "The cleanup changes entries, not the pivot-column positions. Uniqueness is a later, stronger theorem.",
                "d1,...,dr stay fixed",
            ),
        ],
    },
    "zh-hk": {
        "title": "為何 REF 與 RREF 必定存在",
        "subtitle": "放一個樞軸，化簡較小分塊，再清理樞軸欄。",
        "labels": {
            "row_equiv": "行等價",
            "matrix": "矩陣 C",
            "ref": "某個 REF",
            "rref": "某個 RREF",
            "zero_cols": "零欄",
            "leftmost": "最左非零欄",
            "pivot": "樞軸 beta",
            "swap": "換到第一行",
            "clear": "清下方",
            "smaller": "較小分塊 V",
            "induction": "歸納得 V#",
            "lift": "提升下方行變換",
            "rank": "秩歸納",
            "normalize": "樞軸化成 1",
            "above": "清上方",
            "same": "同一批樞軸欄",
            "existence": "存在性",
            "uniqueness": "尚非唯一性",
            "reachable": "可到達目標",
            "later": "之後定理",
        },
        "states": [
            (
                "存在性保證目標可到達",
                "每個矩陣都可到達行等價的 REF，再到達行等價的 RREF。",
                "C ~ C# ~ C'",
            ),
            (
                "開始行數歸納",
                "若矩陣不是零矩陣，就選最左非零欄，並把該欄最上方非零項移到第一行。",
                "最左欄 j，樞軸 beta",
            ),
            (
                "一個樞軸留下較小問題",
                "清掉 beta 下方項。右下分塊 V 行數較少，所以可用歸納假設處理。",
                "[ O beta u ; O 0 V ]",
            ),
            (
                "較小分塊成為階梯",
                "V 的行變換可提升成整個矩陣的下方行變換，第一個樞軸保持固定。",
                "V ~ V# 給出 REF",
            ),
            (
                "REF 可清理成 RREF",
                "秩歸納先處理早前樞軸欄，再把最後樞軸化成 1 並清上方。",
                "最後樞軸 -> 1，清上方",
            ),
            (
                "樞軸欄保持不變",
                "清理改變數值，但不改變樞軸欄位置。唯一性是之後更強的定理。",
                "d1,...,dr 保持固定",
            ),
        ],
    },
    "zh-cn": {
        "title": "为什么 REF 与 RREF 必定存在",
        "subtitle": "放一个主元，化简较小分块，再清理主元列。",
        "labels": {
            "row_equiv": "行等价",
            "matrix": "矩阵 C",
            "ref": "某个 REF",
            "rref": "某个 RREF",
            "zero_cols": "零列",
            "leftmost": "最左非零列",
            "pivot": "主元 beta",
            "swap": "换到第一行",
            "clear": "清下方",
            "smaller": "较小分块 V",
            "induction": "归纳得 V#",
            "lift": "提升下方行变换",
            "rank": "秩归纳",
            "normalize": "主元化成 1",
            "above": "清上方",
            "same": "同一批主元列",
            "existence": "存在性",
            "uniqueness": "尚非唯一性",
            "reachable": "可到达目标",
            "later": "之后定理",
        },
        "states": [
            (
                "存在性保证目标可到达",
                "每个矩阵都可到达行等价的 REF，再到达行等价的 RREF。",
                "C ~ C# ~ C'",
            ),
            (
                "开始行数归纳",
                "若矩阵不是零矩阵，就选最左非零列，并把该列最上方非零项移到第一行。",
                "最左列 j，主元 beta",
            ),
            (
                "一个主元留下较小问题",
                "清掉 beta 下方项。右下分块 V 行数较少，所以可用归纳假设处理。",
                "[ O beta u ; O 0 V ]",
            ),
            (
                "较小分块成为阶梯",
                "V 的行变换可提升成整个矩阵的下方行变换，第一个主元保持固定。",
                "V ~ V# 给出 REF",
            ),
            (
                "REF 可清理成 RREF",
                "秩归纳先处理早前主元列，再把最后主元化成 1 并清上方。",
                "最后主元 -> 1，清上方",
            ),
            (
                "主元列保持不变",
                "清理改变数值，但不改变主元列位置。唯一性是之后更强的定理。",
                "d1,...,dr 保持固定",
            ),
        ],
    },
}


class ExistenceOfRowEchelonFormsStoryBase(Scene):
    """MATH1030 2.5: existence of REF and RREF."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=27, color=WHITE, weight=NORMAL, max_width=6.8):
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

    def make_card(self, title, subtitle=None, width=2.5, height=1.1, color=BLUE_B):
        box = RoundedRectangle(
            width=width,
            height=height,
            corner_radius=0.1,
            stroke_color=color,
            stroke_width=2.5,
            fill_color=BLACK,
            fill_opacity=0.22,
        )
        title_text = self.label(title, font_size=27, color=WHITE, weight=BOLD, max_width=width - 0.25)
        parts = VGroup(title_text)
        if subtitle:
            subtitle_text = self.label(subtitle, font_size=18, color=GREY_B, max_width=width - 0.25)
            subtitle_text.next_to(title_text, DOWN, buff=0.08)
            parts.add(subtitle_text)
        parts.move_to(box)
        return VGroup(box, parts)

    def state_panel(self, index):
        state = TEXT[self.locale]["states"][index]
        panel = RoundedRectangle(
            width=9.4,
            height=1.12,
            corner_radius=0.08,
            stroke_color=GREY_B,
            stroke_width=2,
            fill_color=BLACK,
            fill_opacity=0.26,
        ).to_edge(DOWN, buff=0.18)
        title = self.label(state[0], font_size=25, color=YELLOW, weight=BOLD, max_width=8.6)
        body = self.label(state[1], font_size=16, color=WHITE, max_width=8.6)
        formula = self.label(state[2], font_size=16, color=GREEN_B, max_width=8.6)
        body.next_to(title, DOWN, buff=0.09)
        formula.next_to(body, DOWN, buff=0.07)
        group = VGroup(title, body, formula).move_to(panel)
        return VGroup(panel, group)

    def matrix_grid(self, rows, pivot_positions=(), shaded_cols=(), green_block=None, red_cells=()):
        cell_w = 0.64
        cell_h = 0.48
        n_rows = len(rows)
        n_cols = len(rows[0])
        cells = VGroup()
        values = VGroup()
        markers = VGroup()
        center_x = (n_cols - 1) / 2
        center_y = (n_rows - 1) / 2
        for r, row in enumerate(rows):
            for c, value in enumerate(row):
                x = (c - center_x) * cell_w
                y = (center_y - r) * cell_h
                is_pivot = (r, c) in pivot_positions
                is_shaded = c in shaded_cols
                is_red = (r, c) in red_cells
                fill_color = YELLOW_E if is_pivot else BLUE_E if is_shaded else RED_E if is_red else BLACK
                stroke_color = YELLOW_B if is_pivot else BLUE_D if is_shaded else RED_B if is_red else GREY_B
                cell = Rectangle(
                    width=cell_w,
                    height=cell_h,
                    stroke_color=stroke_color,
                    stroke_width=1.15,
                    fill_color=fill_color,
                    fill_opacity=0.45 if (is_pivot or is_shaded or is_red) else 0.16,
                ).move_to([x, y, 0])
                number = self.label(str(value), font_size=22, max_width=cell_w * 0.7).move_to(cell)
                cells.add(cell)
                values.add(number)
                if is_pivot:
                    markers.add(Dot(color=YELLOW, radius=0.055).move_to(cell.get_corner(UL) + RIGHT * 0.09 + DOWN * 0.09))

        matrix = VGroup(cells, values, markers)
        left = Text("[", font=self.font, font_size=76).next_to(cells, LEFT, buff=0.08)
        right = Text("]", font=self.font, font_size=76).next_to(cells, RIGHT, buff=0.08)
        group = VGroup(matrix, left, right)
        if green_block:
            r0, c0, r1, c1 = green_block
            x_left = (c0 - center_x) * cell_w - cell_w / 2
            x_right = (c1 - center_x) * cell_w + cell_w / 2
            y_top = (center_y - r0) * cell_h + cell_h / 2
            y_bottom = (center_y - r1) * cell_h - cell_h / 2
            block = Rectangle(
                width=x_right - x_left,
                height=y_top - y_bottom,
                stroke_color=GREEN_B,
                stroke_width=3,
                fill_opacity=0,
            ).move_to([(x_left + x_right) / 2, (y_top + y_bottom) / 2, 0])
            group.add(block)
        return group

    def title_group(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=WHITE, weight=BOLD, max_width=8.8)
        subtitle = self.label(data["subtitle"], font_size=17, color=GREY_B, max_width=8.4)
        subtitle.next_to(title, DOWN, buff=0.08)
        return VGroup(title, subtitle).to_edge(UP, buff=0.18)

    def arrow_label(self, start, end, text):
        arrow = Arrow(start, end, color=GREY_B, stroke_width=3, buff=0.18, max_tip_length_to_length_ratio=0.12)
        label = self.label(text, font_size=16, color=GREY_B, max_width=1.8).next_to(arrow, UP, buff=0.05)
        return VGroup(arrow, label)

    def construct(self):
        self.camera.background_color = "#0b1020"
        labels = TEXT[self.locale]["labels"]

        heading = self.title_group()
        self.play(FadeIn(heading, shift=DOWN * 0.2), run_time=0.5)

        panel = self.state_panel(0)
        c_card = self.make_card(labels["matrix"], "C", color=BLUE_B).move_to(LEFT * 3.2 + UP * 0.45)
        ref_card = self.make_card(labels["ref"], "C#", color=YELLOW_B).move_to(UP * 0.45)
        rref_card = self.make_card(labels["rref"], "C'", color=GREEN_B).move_to(RIGHT * 3.2 + UP * 0.45)
        arrow1 = Arrow(c_card.get_right(), ref_card.get_left(), color=GREY_B, stroke_width=3, buff=0.2, max_tip_length_to_length_ratio=0.12)
        arrow2 = Arrow(ref_card.get_right(), rref_card.get_left(), color=GREY_B, stroke_width=3, buff=0.2, max_tip_length_to_length_ratio=0.12)
        self.play(FadeIn(panel), FadeIn(c_card), FadeIn(ref_card), FadeIn(rref_card), GrowArrow(arrow1), GrowArrow(arrow2))
        self.wait(0.7)

        first_panel = self.state_panel(1)
        matrix1 = self.matrix_grid(
            [
                ["0", "0", "2", "*", "*"],
                ["0", "0", "0", "*", "*"],
                ["0", "0", "5", "*", "*"],
                ["0", "0", "1", "*", "*"],
            ],
            pivot_positions=[(0, 2)],
            shaded_cols=[0, 1],
        ).move_to(LEFT * 2.4 + UP * 0.35)
        tags = VGroup(
            self.make_card(labels["zero_cols"], width=2.25, height=0.72, color=BLUE_D),
            self.make_card(labels["leftmost"], width=2.75, height=0.72, color=YELLOW_B),
            self.make_card(labels["swap"], width=2.15, height=0.72, color=GREEN_B),
        ).arrange(DOWN, buff=0.18).move_to(RIGHT * 2.65 + UP * 0.25)
        self.play(FadeOut(panel), FadeOut(c_card), FadeOut(ref_card), FadeOut(rref_card), FadeOut(arrow1), FadeOut(arrow2))
        self.play(FadeIn(first_panel), FadeIn(matrix1), FadeIn(tags))
        self.wait(0.75)

        clear_panel = self.state_panel(2)
        block_matrix = self.matrix_grid(
            [
                ["0", "0", "beta", "u", "u"],
                ["0", "0", "0", "v", "v"],
                ["0", "0", "0", "v", "v"],
                ["0", "0", "0", "v", "v"],
            ],
            pivot_positions=[(0, 2)],
            shaded_cols=[0, 1],
            green_block=(1, 3, 3, 4),
        ).move_to(LEFT * 1.75 + UP * 0.35)
        clear_tags = VGroup(
            self.make_card(labels["clear"], width=2.35, height=0.78, color=YELLOW_B),
            self.make_card(labels["smaller"], width=2.75, height=0.78, color=GREEN_B),
        ).arrange(DOWN, buff=0.22).move_to(RIGHT * 2.75 + UP * 0.25)
        self.play(FadeOut(first_panel), FadeOut(matrix1), FadeOut(tags))
        self.play(FadeIn(clear_panel), FadeIn(block_matrix), FadeIn(clear_tags))
        self.wait(0.75)

        recursive_panel = self.state_panel(3)
        before = self.matrix_grid(
            [
                ["0", "0", "beta", "u", "u"],
                ["0", "0", "0", "v", "v"],
                ["0", "0", "0", "v", "v"],
                ["0", "0", "0", "v", "v"],
            ],
            pivot_positions=[(0, 2)],
            green_block=(1, 3, 3, 4),
        ).scale(0.82).move_to(LEFT * 3 + UP * 0.35)
        after = self.matrix_grid(
            [
                ["0", "0", "beta", "u", "u"],
                ["0", "0", "0", "1", "*"],
                ["0", "0", "0", "0", "1"],
                ["0", "0", "0", "0", "0"],
            ],
            pivot_positions=[(0, 2), (1, 3), (2, 4)],
        ).scale(0.82).move_to(RIGHT * 3 + UP * 0.35)
        recur_arrow = self.arrow_label(before.get_right(), after.get_left(), labels["induction"])
        lift_label = self.label(labels["lift"], font_size=20, color=GREEN_B, weight=BOLD, max_width=4.8).move_to(DOWN * 1.15)
        self.play(FadeOut(clear_panel), FadeOut(block_matrix), FadeOut(clear_tags))
        self.play(FadeIn(recursive_panel), FadeIn(before), GrowArrow(recur_arrow[0]), FadeIn(recur_arrow[1]), FadeIn(after), FadeIn(lift_label))
        self.wait(0.8)

        cleanup_panel = self.state_panel(4)
        ref_matrix = self.matrix_grid(
            [
                ["2", "*", "4", "*", "8"],
                ["0", "0", "3", "*", "5"],
                ["0", "0", "0", "0", "7"],
                ["0", "0", "0", "0", "0"],
            ],
            pivot_positions=[(0, 0), (1, 2), (2, 4)],
        ).scale(0.86).move_to(LEFT * 2.75 + UP * 0.35)
        rref_matrix = self.matrix_grid(
            [
                ["1", "*", "0", "*", "0"],
                ["0", "0", "1", "*", "0"],
                ["0", "0", "0", "0", "1"],
                ["0", "0", "0", "0", "0"],
            ],
            pivot_positions=[(0, 0), (1, 2), (2, 4)],
        ).scale(0.86).move_to(RIGHT * 2.75 + UP * 0.35)
        cleanup_arrow = self.arrow_label(ref_matrix.get_right(), rref_matrix.get_left(), labels["normalize"])
        above_tag = self.make_card(labels["above"], width=2.45, height=0.72, color=GREEN_B).move_to(DOWN * 1.05)
        self.play(FadeOut(recursive_panel), FadeOut(before), FadeOut(after), FadeOut(recur_arrow), FadeOut(lift_label))
        self.play(FadeIn(cleanup_panel), FadeIn(ref_matrix), GrowArrow(cleanup_arrow[0]), FadeIn(cleanup_arrow[1]), FadeIn(rref_matrix), FadeIn(above_tag))
        self.wait(0.85)

        final_panel = self.state_panel(5)
        pivot_cols = VGroup()
        for x in [-3.25, -0.9, 1.45]:
            pivot_cols.add(Rectangle(width=0.48, height=1.75, stroke_color=YELLOW_B, stroke_width=3, fill_color=YELLOW_E, fill_opacity=0.18).move_to([x, 0.65, 0]))
        same_text = self.label(labels["same"], font_size=28, color=YELLOW, weight=BOLD, max_width=5.0).move_to(UP * 1.7)
        exist_card = self.make_card(labels["existence"], labels["reachable"], width=3.0, height=0.95, color=GREEN_B).move_to(LEFT * 2.05 + DOWN * 1.35)
        unique_card = self.make_card(labels["uniqueness"], labels["later"], width=3.0, height=0.95, color=RED_B).move_to(RIGHT * 2.05 + DOWN * 1.35)
        self.play(FadeOut(cleanup_panel), FadeOut(ref_matrix), FadeOut(rref_matrix), FadeOut(cleanup_arrow), FadeOut(above_tag))
        self.play(FadeIn(final_panel), FadeIn(same_text), FadeIn(pivot_cols), FadeIn(exist_card), FadeIn(unique_card))
        self.wait(1.0)


class ExistenceOfRowEchelonFormsStoryEn(ExistenceOfRowEchelonFormsStoryBase):
    locale = "en"
    font = "Avenir Next"


class ExistenceOfRowEchelonFormsStoryZhHk(ExistenceOfRowEchelonFormsStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class ExistenceOfRowEchelonFormsStoryZhCn(ExistenceOfRowEchelonFormsStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class ExistenceOfRowEchelonFormsStory(ExistenceOfRowEchelonFormsStoryEn):
    pass
