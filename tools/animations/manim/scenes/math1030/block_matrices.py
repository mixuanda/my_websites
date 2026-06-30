from manim import *


TEXT = {
    "en": {
        "title": "Block matrices",
        "subtitle": "Cuts -> sizes -> products.",
        "states": [
            (
                "A partition creates the blocks",
                "Horizontal and vertical cuts group entries into rectangular submatrices.",
                "A = [[A11, A12], [A21, A22]]",
            ),
            (
                "Addition needs the same partition",
                "Every block must have a corresponding block of the same size.",
                "A + B = [Aij + Bij]",
            ),
            (
                "Scalar multiplication is blockwise",
                "One scalar reaches every block, hence every entry inside each block.",
                "cA = [c Aij]",
            ),
            (
                "Block multiplication follows the ordinary pattern",
                "Treat blocks like entries only after the relevant block products are defined.",
                "C11 = A11B11 + A12B21",
            ),
            (
                "Compatibility is the real size check",
                "The columns of Aik must match the rows of Bkj for each inner block index.",
                "Aik: mi x pk,  Bkj: pk x nj",
            ),
            (
                "Column blocks keep many products organized",
                "Partitioning B into columns lets AB be read one column product at a time.",
                "AB = [Ab1, Ab2, ..., Abr]",
            ),
        ],
        "visual": {
            "row_cuts": "row cuts",
            "col_cuts": "column cuts",
            "same": "same partition",
            "scalar": "scalar c",
            "compatible": "compatible",
            "product": "block product",
            "formula": "formula",
            "columns": "column blocks",
            "systems": "same A, many right sides",
            "output": "output blocks",
        },
        "conclusion": [
            ("partition", "creates blocks"),
            ("same cuts", "blockwise addition"),
            ("matched pk", "block multiplication"),
        ],
    },
    "zh-hk": {
        "title": "分塊矩陣",
        "subtitle": "分割 -> 大小 -> 區塊乘積。",
        "states": [
            (
                "先有分割，才有區塊",
                "水平與垂直切線把元素分成長方形子矩陣。",
                "A = [[A11, A12], [A21, A22]]",
            ),
            (
                "加法需要相同分割",
                "每個區塊都要有同樣大小的對應區塊。",
                "A + B = [Aij + Bij]",
            ),
            (
                "純量乘法可逐塊進行",
                "一個純量作用到每個區塊，也就是作用到區塊內每個元素。",
                "cA = [c Aij]",
            ),
            (
                "分塊乘法沿用普通模式",
                "只有在相關區塊乘積有定義後，才可把區塊當作元素處理。",
                "C11 = A11B11 + A12B21",
            ),
            (
                "相容性才是真正的大小檢查",
                "每個內側索引 k 都要求 Aik 的列數等於 Bkj 的行數。",
                "Aik: mi x pk,  Bkj: pk x nj",
            ),
            (
                "列分塊讓多個乘積保持整齊",
                "把 B 分成幾列後，AB 可逐列讀成多個 Abj。",
                "AB = [Ab1, Ab2, ..., Abr]",
            ),
        ],
        "visual": {
            "row_cuts": "行分割",
            "col_cuts": "列分割",
            "same": "相同分割",
            "scalar": "純量 c",
            "compatible": "大小相容",
            "product": "區塊乘積",
            "formula": "公式",
            "columns": "列區塊",
            "systems": "同一 A，多個右端",
            "output": "輸出區塊",
        },
        "conclusion": [
            ("分割", "產生區塊"),
            ("同樣切線", "逐塊加法"),
            ("pk 吻合", "分塊乘法"),
        ],
    },
    "zh-cn": {
        "title": "分块矩阵",
        "subtitle": "分割 -> 大小 -> 区块乘积。",
        "states": [
            (
                "先有分割，才有区块",
                "水平与垂直切线把元素分成长方形子矩阵。",
                "A = [[A11, A12], [A21, A22]]",
            ),
            (
                "加法需要相同分割",
                "每个区块都要有同样大小的对应区块。",
                "A + B = [Aij + Bij]",
            ),
            (
                "数乘可以逐块进行",
                "一个标量作用到每个区块，也就是作用到区块内每个元素。",
                "cA = [c Aij]",
            ),
            (
                "分块乘法沿用普通模式",
                "只有在相关区块乘积有定义后，才可把区块当作元素处理。",
                "C11 = A11B11 + A12B21",
            ),
            (
                "相容性才是真正的大小检查",
                "每个内侧索引 k 都要求 Aik 的列数等于 Bkj 的行数。",
                "Aik: mi x pk,  Bkj: pk x nj",
            ),
            (
                "列分块让多个乘积保持整齐",
                "把 B 分成几列后，AB 可逐列读成多个 Abj。",
                "AB = [Ab1, Ab2, ..., Abr]",
            ),
        ],
        "visual": {
            "row_cuts": "行分割",
            "col_cuts": "列分割",
            "same": "相同分割",
            "scalar": "标量 c",
            "compatible": "大小相容",
            "product": "区块乘积",
            "formula": "公式",
            "columns": "列区块",
            "systems": "同一 A，多个右端",
            "output": "输出区块",
        },
        "conclusion": [
            ("分割", "产生区块"),
            ("同样切线", "逐块加法"),
            ("pk 匹配", "分块乘法"),
        ],
    },
}


class BlockMatrixPartitionProductStoryBase(Scene):
    """MATH1030 3.5: block partitions and compatible block multiplication."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        label = Text(
            value,
            font=self.font,
            font_size=font_size,
            color=color,
            weight=weight,
            disable_ligatures=True,
        )
        if label.width > max_width:
            label.scale_to_fit_width(max_width)
        return label

    def block_matrix(
        self,
        row_heights,
        col_widths,
        labels,
        colors=None,
        highlights=(),
        font_size=22,
    ):
        total_width = sum(col_widths)
        total_height = sum(row_heights)
        cells = VGroup()
        values = VGroup()
        y_top = total_height / 2
        for row_index, row_height in enumerate(row_heights):
            y = y_top - sum(row_heights[:row_index]) - row_height / 2
            x_left = -total_width / 2
            for col_index, col_width in enumerate(col_widths):
                x = x_left + sum(col_widths[:col_index]) + col_width / 2
                key = (row_index, col_index)
                color = colors[row_index][col_index] if colors else BLUE_B
                is_highlight = key in highlights
                rect = Rectangle(
                    width=col_width,
                    height=row_height,
                    stroke_width=1.6 if is_highlight else 1.2,
                    stroke_color=YELLOW_B if is_highlight else color,
                    fill_color=YELLOW_E if is_highlight else color,
                    fill_opacity=0.40 if is_highlight else 0.18,
                ).move_to([x, y, 0])
                text = self.label(
                    labels[row_index][col_index],
                    font_size=font_size,
                    color=WHITE,
                    max_width=col_width * 0.78,
                ).move_to(rect)
                cells.add(rect)
                values.add(text)

        left_bracket = Text("[", font=self.font, font_size=84).scale_to_fit_height(total_height * 1.16)
        right_bracket = Text("]", font=self.font, font_size=84).scale_to_fit_height(total_height * 1.16)
        left_bracket.next_to(cells, LEFT, buff=0.06)
        right_bracket.next_to(cells, RIGHT, buff=0.06)
        return VGroup(cells, values, left_bracket, right_bracket)

    def badge(self, title, body, color=GREEN_B, width=3.4, height=0.86):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.26,
        )
        title_mob = self.label(title, font_size=14, color=color, weight=MEDIUM, max_width=width * 0.84)
        body_mob = self.label(body, font_size=19, max_width=width * 0.84)
        content = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.06).move_to(box)
        return VGroup(box, content)

    def single_line_badge(self, value, color=GREEN_B, width=3.1):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=0.54,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.26,
        )
        content = self.label(value, font_size=19, color=color, weight=MEDIUM, max_width=width * 0.86).move_to(box)
        return VGroup(box, content)

    def state_card(self, index):
        state = TEXT[self.locale]["states"][index]
        box = RoundedRectangle(
            corner_radius=0.1,
            width=12.2,
            height=1.12,
            stroke_color=GRAY_C,
            fill_color=BLACK,
            fill_opacity=0.32,
        )
        title = self.label(state[0], font_size=22, color=YELLOW_B, weight=BOLD, max_width=11.3)
        body = self.label(state[1], font_size=17, color=WHITE, max_width=11.55)
        formula = self.label(state[2], font_size=16, color=GREEN_B, max_width=11.2)
        content = VGroup(title, body, formula).arrange(DOWN, buff=0.08).move_to(box)
        return VGroup(box, content).to_edge(DOWN, buff=0.24)

    def fit_visual(self, visual, max_width=10.8, max_height=3.9):
        if visual.width > max_width:
            visual.scale_to_fit_width(max_width)
        if visual.height > max_height:
            visual.scale_to_fit_height(max_height)
        return visual

    def base_block(self, highlights=()):
        colors = [[BLUE_E, TEAL_E], [PURPLE_E, GREEN_E]]
        labels = [["A11", "A12"], ["A21", "A22"]]
        return self.block_matrix([0.82, 1.05], [1.35, 1.95], labels, colors=colors, highlights=highlights)

    def partition_visual(self):
        labels = TEXT[self.locale]["visual"]
        matrix = self.base_block()
        row_badges = VGroup(
            self.badge(labels["row_cuts"], "m1 + m2", BLUE_B, width=3.0),
            self.badge(labels["col_cuts"], "p1 + p2", TEAL_B, width=3.0),
        ).arrange(RIGHT, buff=0.24)
        return self.fit_visual(VGroup(matrix, row_badges).arrange(DOWN, buff=0.32))

    def addition_visual(self):
        labels = TEXT[self.locale]["visual"]
        matrix_a = self.base_block().scale(0.72)
        matrix_b = self.block_matrix(
            [0.82, 1.05],
            [1.35, 1.95],
            [["B11", "B12"], ["B21", "B22"]],
            colors=[[BLUE_E, TEAL_E], [PURPLE_E, GREEN_E]],
        ).scale(0.72)
        result = self.block_matrix(
            [0.82, 1.05],
            [1.35, 1.95],
            [["A11+B11", "A12+B12"], ["A21+B21", "A22+B22"]],
            colors=[[BLUE_E, TEAL_E], [PURPLE_E, GREEN_E]],
        ).scale(0.72)
        plus = self.label("+", font_size=30, color=GRAY_B, weight=BOLD, max_width=0.5)
        equals = self.label("=", font_size=30, color=GREEN_B, weight=BOLD, max_width=0.5)
        row = VGroup(matrix_a, plus, matrix_b, equals, result).arrange(RIGHT, buff=0.14)
        badge = self.badge(labels["same"], "Aij <-> Bij", GREEN_B, width=4.2)
        return self.fit_visual(VGroup(row, badge).arrange(DOWN, buff=0.24))

    def scalar_visual(self):
        labels = TEXT[self.locale]["visual"]
        matrix_a = self.base_block().scale(0.86)
        result = self.block_matrix(
            [0.82, 1.05],
            [1.35, 1.95],
            [["cA11", "cA12"], ["cA21", "cA22"]],
            colors=[[BLUE_E, TEAL_E], [PURPLE_E, GREEN_E]],
        ).scale(0.86)
        scalar = self.single_line_badge("c", YELLOW_B, width=1.1)
        times = self.label("*", font_size=30, color=GRAY_B, weight=BOLD, max_width=0.5)
        equals = self.label("=", font_size=30, color=GREEN_B, weight=BOLD, max_width=0.5)
        row = VGroup(scalar, times, matrix_a, equals, result).arrange(RIGHT, buff=0.18)
        badge = self.badge(labels["scalar"], "cAij", YELLOW_B, width=3.2)
        return self.fit_visual(VGroup(row, badge).arrange(DOWN, buff=0.24))

    def multiplication_visual(self):
        labels = TEXT[self.locale]["visual"]
        matrix_a = self.base_block(highlights={(0, 0), (0, 1)}).scale(0.70)
        matrix_b = self.block_matrix(
            [0.80, 1.04],
            [1.35, 1.75],
            [["B11", "B12"], ["B21", "B22"]],
            colors=[[BLUE_E, TEAL_E], [PURPLE_E, GREEN_E]],
            highlights={(0, 0), (1, 0)},
        ).scale(0.70)
        result = self.block_matrix(
            [0.80, 1.04],
            [1.55, 1.55],
            [["C11", "C12"], ["C21", "C22"]],
            colors=[[ORANGE, TEAL_E], [PURPLE_E, GREEN_E]],
            highlights={(0, 0)},
        ).scale(0.70)
        times = self.label("*", font_size=28, color=GRAY_B, weight=BOLD, max_width=0.5)
        equals = self.label("=", font_size=28, color=GREEN_B, weight=BOLD, max_width=0.5)
        row = VGroup(matrix_a, times, matrix_b, equals, result).arrange(RIGHT, buff=0.13)
        formula = self.badge(labels["formula"], "C11 = A11B11 + A12B21", YELLOW_B, width=6.7)
        return self.fit_visual(VGroup(row, formula).arrange(DOWN, buff=0.24))

    def compatibility_visual(self):
        labels = TEXT[self.locale]["visual"]
        a_block = self.badge("Aik", "mi x pk", BLUE_B, width=2.7, height=0.92)
        b_block = self.badge("Bkj", "pk x nj", GREEN_B, width=2.7, height=0.92)
        result = self.badge("AikBkj", "mi x nj", PURPLE_B, width=3.0, height=0.92)
        arrow_1 = Arrow(LEFT, RIGHT, color=YELLOW_B, stroke_width=4, max_tip_length_to_length_ratio=0.16)
        arrow_2 = Arrow(LEFT, RIGHT, color=GREEN_B, stroke_width=4, max_tip_length_to_length_ratio=0.16)
        chain = VGroup(a_block, arrow_1, b_block, arrow_2, result).arrange(RIGHT, buff=0.20)
        match = self.badge(labels["compatible"], "same pk", GREEN_B, width=3.1)
        formula = self.badge(labels["product"], "Cij = sum_k Aik Bkj", YELLOW_B, width=5.6)
        return self.fit_visual(VGroup(chain, VGroup(match, formula).arrange(RIGHT, buff=0.22)).arrange(DOWN, buff=0.34))

    def column_visual(self):
        labels = TEXT[self.locale]["visual"]
        a = self.badge("A", "m x n", BLUE_B, width=1.7, height=0.92)
        b = self.block_matrix(
            [1.35],
            [0.95, 0.95, 0.95],
            [["b1", "b2", "b3"]],
            colors=[[GREEN_E, TEAL_E, PURPLE_E]],
        ).scale(0.88)
        result = self.block_matrix(
            [1.35],
            [1.08, 1.08, 1.08],
            [["Ab1", "Ab2", "Ab3"]],
            colors=[[GREEN_E, TEAL_E, PURPLE_E]],
        ).scale(0.88)
        times = self.label("*", font_size=30, color=GRAY_B, weight=BOLD, max_width=0.5)
        equals = self.label("=", font_size=30, color=GREEN_B, weight=BOLD, max_width=0.5)
        row = VGroup(a, times, b, equals, result).arrange(RIGHT, buff=0.16)
        captions = VGroup(
            self.badge(labels["columns"], "B = [b1 b2 b3]", GREEN_B, width=3.8),
            self.badge(labels["systems"], "AX = B", YELLOW_B, width=3.1),
        ).arrange(RIGHT, buff=0.22)
        return self.fit_visual(VGroup(row, captions).arrange(DOWN, buff=0.28))

    def visual_for(self, index):
        if index == 0:
            return self.partition_visual()
        if index == 1:
            return self.addition_visual()
        if index == 2:
            return self.scalar_visual()
        if index == 3:
            return self.multiplication_visual()
        if index == 4:
            return self.compatibility_visual()
        return self.column_visual()

    def construct(self):
        copy = TEXT[self.locale]
        self.camera.background_color = "#111827"

        title = self.label(copy["title"], font_size=36, color=BLUE_B, weight=BOLD, max_width=10.9)
        subtitle = self.label(copy["subtitle"], font_size=21, color=GRAY_A, max_width=10.9)
        header = VGroup(title, subtitle).arrange(DOWN, buff=0.10).to_edge(UP, buff=0.28)
        self.play(FadeIn(header, shift=DOWN * 0.15), run_time=0.6)

        active_visual = None
        active_card = None
        for index in range(len(copy["states"])):
            visual = self.visual_for(index).move_to(ORIGIN + UP * 0.25)
            card = self.state_card(index)

            if active_visual is None:
                self.play(FadeIn(visual, shift=UP * 0.15), FadeIn(card, shift=UP * 0.12), run_time=0.65)
            else:
                self.play(
                    FadeOut(active_visual, shift=LEFT * 0.18),
                    FadeOut(active_card, shift=DOWN * 0.12),
                    FadeIn(visual, shift=RIGHT * 0.18),
                    FadeIn(card, shift=UP * 0.12),
                    run_time=0.62,
                )
            self.wait(0.55)
            active_visual = visual
            active_card = card

        conclusion_rows = VGroup()
        for left_text, right_text in copy["conclusion"]:
            left = self.single_line_badge(left_text, BLUE_B, width=3.0)
            arrow = Arrow(LEFT, RIGHT, color=GREEN_B, stroke_width=4, max_tip_length_to_length_ratio=0.16)
            right = self.single_line_badge(right_text, GREEN_B, width=3.5)
            conclusion_rows.add(VGroup(left, arrow, right).arrange(RIGHT, buff=0.18))
        conclusion = conclusion_rows.arrange(DOWN, buff=0.22).move_to(ORIGIN + UP * 0.20)
        final_card = self.state_card(5)

        self.play(
            FadeOut(active_visual, shift=UP * 0.18),
            FadeOut(active_card, shift=DOWN * 0.12),
            FadeIn(conclusion, shift=UP * 0.12),
            FadeIn(final_card, shift=UP * 0.12),
            run_time=0.7,
        )
        self.wait(0.85)


class BlockMatrixPartitionProductStoryEn(BlockMatrixPartitionProductStoryBase):
    locale = "en"
    font = "Avenir Next"


class BlockMatrixPartitionProductStoryZhHk(BlockMatrixPartitionProductStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class BlockMatrixPartitionProductStoryZhCn(BlockMatrixPartitionProductStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class BlockMatrixPartitionProductStory(BlockMatrixPartitionProductStoryEn):
    """Backwards-compatible alias for one-off English render commands."""
