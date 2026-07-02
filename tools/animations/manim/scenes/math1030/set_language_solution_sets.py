from manim import *


TEXT = {
    "en": {
        "title": "Set language",
        "subtitle": "Objects, conditions, and proof directions.",
        "states": [
            (
                "Membership is not subset language",
                "A vector belongs to a set; a smaller collection may be contained in another set.",
                "x ∈ S   vs   S ⊆ T",
            ),
            (
                "Set-builder notation has two jobs",
                "Blue names objects; green selects them.",
                "{x ∈ R^n : Ax=b}",
            ),
            (
                "A solution set is a set statement",
                "Unique, empty, and parameterized outcomes are all descriptions of S(A,b).",
                "S(A,b) = {x ∈ R^n : Ax=b}",
            ),
            (
                "Null space and span are also sets",
                "Equations and parameters define the collections; the list itself is not the set.",
                "N(A),  Span{u1,...,uq}",
            ),
            (
                "Subset proofs start with one arbitrary element",
                "Take x ∈ S, unpack the definition, then show the defining condition for T.",
                "x ∈ S  ->  x ∈ T",
            ),
            (
                "Set equality needs both directions",
                "Prove S ⊆ T and T ⊆ S; redundant vectors are removed by this routine.",
                "S = T  iff  S ⊆ T and T ⊆ S",
            ),
        ],
        "labels": {
            "element": "element",
            "set": "set",
            "subset": "subset",
            "ambient": "ambient space",
            "condition": "selection condition",
            "objects": "allowed objects",
            "kept": "kept by test",
            "unique": "singleton",
            "empty": "empty set",
            "family": "parameter family",
            "null": "equation-defined",
            "span": "parameter-defined",
            "proof": "proof routine",
            "unpack": "unpack definition",
            "show": "show target condition",
            "two": "two inclusions",
            "forward": "S ⊆ T",
            "back": "T ⊆ S",
            "redundant": "v already in span",
        },
        "conclusion": [
            ("write the set", "ambient + condition"),
            ("prove inclusion", "arbitrary element"),
            ("prove equality", "both directions"),
        ],
    },
    "zh-hk": {
        "title": "集合語言",
        "subtitle": "物件、條件與證明方向。",
        "states": [
            (
                "屬於不是子集語言",
                "向量屬於集合；較小的集合才可能包含在另一集合內。",
                "x ∈ S   vs   S ⊆ T",
            ),
            (
                "集合描述有兩個任務",
                "所在空間說明允許哪類物件；條件挑出要保留的物件。",
                "{x ∈ R^n : Ax=b}",
            ),
            (
                "解集是一個集合陳述",
                "唯一解、空集合、參數式，都在描述 S(A,b)。",
                "S(A,b) = {x ∈ R^n : Ax=b}",
            ),
            (
                "零空間與張成也都是集合",
                "方程與參數定義集合；原來的列表本身不是集合全部。",
                "N(A),  Span{u1,...,uq}",
            ),
            (
                "子集證明由任意元素開始",
                "取 x 屬於 S，拆開定義，再證明它滿足 T 的條件。",
                "x ∈ S  ->  x ∈ T",
            ),
            (
                "集合相等需要兩個方向",
                "證明 S ⊆ T 與 T ⊆ S；冗餘向量也是這樣刪去。",
                "S = T  iff  S ⊆ T and T ⊆ S",
            ),
        ],
        "labels": {
            "element": "元素",
            "set": "集合",
            "subset": "子集",
            "ambient": "所在空間",
            "condition": "挑選條件",
            "objects": "可用物件",
            "kept": "通過測試",
            "unique": "單元素集合",
            "empty": "空集合",
            "family": "參數族",
            "null": "由方程定義",
            "span": "由參數定義",
            "proof": "證明套路",
            "unpack": "拆開定義",
            "show": "證明目標條件",
            "two": "兩個包含",
            "forward": "S ⊆ T",
            "back": "T ⊆ S",
            "redundant": "v 已在張成內",
        },
        "conclusion": [
            ("寫出集合", "空間 + 條件"),
            ("證明包含", "任意元素"),
            ("證明相等", "兩個方向"),
        ],
    },
    "zh-cn": {
        "title": "集合语言",
        "subtitle": "对象、条件与证明方向。",
        "states": [
            (
                "属于不是子集语言",
                "向量属于集合；较小的集合才可能包含在另一集合内。",
                "x ∈ S   vs   S ⊆ T",
            ),
            (
                "集合描述有两个任务",
                "所在空间说明允许哪类对象；条件挑出要保留的对象。",
                "{x ∈ R^n : Ax=b}",
            ),
            (
                "解集是一个集合陈述",
                "唯一解、空集合、参数式，都在描述 S(A,b)。",
                "S(A,b) = {x ∈ R^n : Ax=b}",
            ),
            (
                "零空间与张成也都是集合",
                "方程与参数定义集合；原来的列表本身不是集合全部。",
                "N(A),  Span{u1,...,uq}",
            ),
            (
                "子集证明由任意元素开始",
                "取 x 属于 S，拆开定义，再证明它满足 T 的条件。",
                "x ∈ S  ->  x ∈ T",
            ),
            (
                "集合相等需要两个方向",
                "证明 S ⊆ T 与 T ⊆ S；冗余向量也是这样删去。",
                "S = T  iff  S ⊆ T and T ⊆ S",
            ),
        ],
        "labels": {
            "element": "元素",
            "set": "集合",
            "subset": "子集",
            "ambient": "所在空间",
            "condition": "挑选条件",
            "objects": "可用对象",
            "kept": "通过测试",
            "unique": "单元素集合",
            "empty": "空集合",
            "family": "参数族",
            "null": "由方程定义",
            "span": "由参数定义",
            "proof": "证明套路",
            "unpack": "拆开定义",
            "show": "证明目标条件",
            "two": "两个包含",
            "forward": "S ⊆ T",
            "back": "T ⊆ S",
            "redundant": "v 已在张成内",
        },
        "conclusion": [
            ("写出集合", "空间 + 条件"),
            ("证明包含", "任意元素"),
            ("证明相等", "两个方向"),
        ],
    },
}


class SetLanguageSolutionSetsStoryBase(Scene):
    """MATH1030 4.2: set-builder notation and set-proof routines."""

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

    def state_card(self, index):
        title, body, formula = TEXT[self.locale]["states"][index]
        box = RoundedRectangle(
            corner_radius=0.1,
            width=11.55,
            height=1.02,
            stroke_color=GRAY_B,
            fill_color=BLACK,
            fill_opacity=0.30,
        )
        title_mob = self.label(title, font_size=24, color=YELLOW_B, weight=BOLD, max_width=10.7)
        body_mob = self.label(body, font_size=17, color=WHITE, max_width=10.7)
        formula_mob = self.label(formula, font_size=18, color=GREEN_B, weight=MEDIUM, max_width=10.7)
        return VGroup(box, VGroup(title_mob, body_mob, formula_mob).arrange(DOWN, buff=0.04).move_to(box))

    def mini_card(self, title, body, color=BLUE_B, width=3.35, height=0.95):
        box = RoundedRectangle(
            corner_radius=0.08,
            width=width,
            height=height,
            stroke_color=color,
            fill_color=BLACK,
            fill_opacity=0.22,
        )
        title_mob = self.label(title, font_size=15, color=color, weight=MEDIUM, max_width=width * 0.84)
        body_mob = self.label(body, font_size=22, max_width=width * 0.84)
        return VGroup(box, VGroup(title_mob, body_mob).arrange(DOWN, buff=0.08).move_to(box))

    def title_block(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=36, color=TEAL_A, weight=BOLD, max_width=9.6)
        subtitle = self.label(data["subtitle"], font_size=18, color=WHITE, max_width=9.6)
        return VGroup(title, subtitle).arrange(DOWN, buff=0.08).to_edge(UP, buff=0.28)

    def membership_visual(self):
        labels = TEXT[self.locale]["labels"]
        set_circle = Circle(radius=1.1, stroke_color=BLUE_B, fill_color=BLUE_E, fill_opacity=0.18)
        set_label = self.label("S", font_size=34, color=BLUE_B, weight=BOLD).move_to(set_circle)
        x_dot = Dot(set_circle.get_center() + 0.36 * LEFT + 0.25 * UP, color=GREEN_B)
        x_label = self.label("x", font_size=20, color=GREEN_B).next_to(x_dot, UP, buff=0.08)
        membership = self.mini_card(labels["element"], "x ∈ S", GREEN_B)
        membership.next_to(set_circle, LEFT, buff=0.75)
        big_set = RoundedRectangle(
            corner_radius=0.18,
            width=2.7,
            height=1.9,
            stroke_color=PURPLE_B,
            fill_color=PURPLE_E,
            fill_opacity=0.16,
        )
        small_set = RoundedRectangle(
            corner_radius=0.14,
            width=1.45,
            height=0.88,
            stroke_color=YELLOW_B,
            fill_color=YELLOW_E,
            fill_opacity=0.22,
        ).move_to(big_set)
        subset = self.mini_card(labels["subset"], "S ⊆ T", YELLOW_B)
        subset.next_to(big_set, RIGHT, buff=0.55)
        group = VGroup(membership, VGroup(set_circle, set_label, x_dot, x_label), big_set, small_set, subset)
        return group.arrange(RIGHT, buff=0.50).move_to(ORIGIN).shift(UP * 0.22)

    def set_builder_visual(self):
        labels = TEXT[self.locale]["labels"]
        formula = self.label("{ x ∈ R^n  :  Ax = b }", font_size=38, color=WHITE, weight=BOLD, max_width=10.8)
        left = SurroundingRectangle(formula[1:8], color=BLUE_B, buff=0.08)
        right = SurroundingRectangle(formula[-6:-1], color=GREEN_B, buff=0.08)
        ambient = self.mini_card(labels["ambient"], labels["objects"], BLUE_B, width=3.2)
        condition = self.mini_card(labels["condition"], labels["kept"], GREEN_B, width=3.2)
        ambient.next_to(left, DOWN, buff=0.45)
        condition.next_to(right, DOWN, buff=0.45)
        arrows = VGroup(
            Arrow(ambient.get_top(), left.get_bottom(), buff=0.08, color=BLUE_B, stroke_width=4),
            Arrow(condition.get_top(), right.get_bottom(), buff=0.08, color=GREEN_B, stroke_width=4),
        )
        return VGroup(formula, left, right, ambient, condition, arrows).move_to(ORIGIN).shift(UP * 0.05)

    def solution_set_visual(self):
        labels = TEXT[self.locale]["labels"]
        cards = VGroup(
            self.mini_card(labels["unique"], "S={x0}", GREEN_B, width=2.8),
            self.mini_card(labels["empty"], "S=empty", RED_B, width=2.8),
            self.mini_card(labels["family"], "p+s u+t v", YELLOW_B, width=3.25),
        ).arrange(RIGHT, buff=0.45)
        top = self.label("S(A,b) = {x ∈ R^n : Ax=b}", font_size=34, color=TEAL_A, weight=BOLD, max_width=10.6)
        arrow = Arrow(top.get_bottom(), cards.get_top(), buff=0.18, color=TEAL_A, stroke_width=4)
        return VGroup(top, arrow, cards).arrange(DOWN, buff=0.42).move_to(ORIGIN).shift(UP * 0.1)

    def null_span_visual(self):
        labels = TEXT[self.locale]["labels"]
        null_card = self.mini_card(labels["null"], "N(A)={x:Ax=0}", BLUE_B, width=4.35, height=1.05)
        span_card = self.mini_card(labels["span"], "Span{ui}={sum ai ui}", PURPLE_B, width=4.35, height=1.05)
        not_list = self.label("not just a list", font_size=20, color=YELLOW_B, weight=MEDIUM, max_width=4.2)
        if self.locale == "zh-hk":
            not_list = self.label("不是原列表本身", font_size=20, color=YELLOW_B, weight=MEDIUM, max_width=4.2)
        elif self.locale == "zh-cn":
            not_list = self.label("不是原列表本身", font_size=20, color=YELLOW_B, weight=MEDIUM, max_width=4.2)
        brace = BraceBetweenPoints(LEFT * 4.8 + DOWN * 0.9, RIGHT * 4.8 + DOWN * 0.9, color=YELLOW_B)
        return VGroup(VGroup(null_card, span_card).arrange(RIGHT, buff=0.7), brace, not_list.next_to(brace, DOWN, buff=0.12)).move_to(ORIGIN)

    def subset_proof_visual(self):
        labels = TEXT[self.locale]["labels"]
        steps = VGroup(
            self.mini_card("1", "take x ∈ S", BLUE_B, width=2.55),
            self.mini_card("2", labels["unpack"], YELLOW_B, width=2.55),
            self.mini_card("3", labels["show"], GREEN_B, width=2.55),
            self.mini_card("4", "x ∈ T", GREEN_B, width=2.55),
        ).arrange(RIGHT, buff=0.28)
        arrows = VGroup()
        for first, second in zip(steps[:-1], steps[1:]):
            arrows.add(Arrow(first.get_right(), second.get_left(), buff=0.08, color=GRAY_B, stroke_width=3))
        caption = self.label(labels["proof"], font_size=28, color=TEAL_A, weight=BOLD, max_width=9.6)
        example = self.label("t ∈ N(C) -> At=0 and Bt=0 -> t ∈ N(alpha A + beta B)", font_size=22, color=WHITE, max_width=10.2)
        if self.locale == "zh-hk":
            example = self.label("t ∈ N(C) -> At=0 且 Bt=0 -> t ∈ N(alpha A + beta B)", font_size=22, color=WHITE, max_width=10.2)
        elif self.locale == "zh-cn":
            example = self.label("t ∈ N(C) -> At=0 且 Bt=0 -> t ∈ N(alpha A + beta B)", font_size=22, color=WHITE, max_width=10.2)
        return VGroup(caption, VGroup(steps, arrows), example).arrange(DOWN, buff=0.42).move_to(ORIGIN).shift(UP * 0.02)

    def equality_visual(self):
        labels = TEXT[self.locale]["labels"]
        left = self.mini_card(labels["forward"], "x ∈ S -> x ∈ T", BLUE_B, width=3.7)
        right = self.mini_card(labels["back"], "y ∈ T -> y ∈ S", GREEN_B, width=3.7)
        top = self.label("S = T", font_size=40, color=TEAL_A, weight=BOLD, max_width=4.2)
        both = self.label(labels["two"], font_size=22, color=YELLOW_B, weight=MEDIUM, max_width=4.6)
        redundant = self.mini_card(labels["redundant"], "v = beta1 u1 + ... + betaq uq", YELLOW_B, width=6.8)
        arrows = VGroup(
            Arrow(left.get_top(), top.get_left() + 0.18 * DOWN, buff=0.10, color=BLUE_B, stroke_width=4),
            Arrow(right.get_top(), top.get_right() + 0.18 * DOWN, buff=0.10, color=GREEN_B, stroke_width=4),
        )
        row = VGroup(left, right).arrange(RIGHT, buff=0.55)
        return VGroup(top, both.next_to(top, DOWN, buff=0.08), row, arrows, redundant).arrange(DOWN, buff=0.34).move_to(ORIGIN).shift(UP * 0.04)

    def conclusion_visual(self):
        items = VGroup()
        colors = [BLUE_B, GREEN_B, YELLOW_B]
        for index, (top, bottom) in enumerate(TEXT[self.locale]["conclusion"]):
            items.add(self.mini_card(top, bottom, colors[index], width=3.25, height=1.05))
        return items.arrange(RIGHT, buff=0.55).move_to(ORIGIN)

    def construct(self):
        self.camera.background_color = "#111827"
        title = self.title_block()
        self.play(FadeIn(title, shift=DOWN * 0.15), run_time=0.45)

        visuals = [
            self.membership_visual(),
            self.set_builder_visual(),
            self.solution_set_visual(),
            self.null_span_visual(),
            self.subset_proof_visual(),
            self.equality_visual(),
        ]

        current_visual = visuals[0]
        current_card = self.state_card(0).to_edge(DOWN, buff=0.18)
        self.play(FadeIn(current_visual), FadeIn(current_card), run_time=0.55)
        self.wait(0.45)

        for index in range(1, len(visuals)):
            next_visual = visuals[index]
            next_card = self.state_card(index).to_edge(DOWN, buff=0.18)
            self.play(
                FadeOut(current_visual, shift=LEFT * 0.16),
                FadeOut(current_card, shift=LEFT * 0.16),
                FadeIn(next_visual, shift=RIGHT * 0.16),
                FadeIn(next_card, shift=RIGHT * 0.16),
                run_time=0.55,
            )
            self.wait(0.42)
            current_visual = next_visual
            current_card = next_card

        conclusion = self.conclusion_visual()
        final_card = self.state_card(5).to_edge(DOWN, buff=0.18)
        self.play(
            FadeOut(current_visual),
            FadeOut(current_card),
            FadeIn(conclusion, shift=UP * 0.12),
            FadeIn(final_card),
            run_time=0.55,
        )
        self.wait(0.6)


class SetLanguageSolutionSetsStoryEn(SetLanguageSolutionSetsStoryBase):
    locale = "en"
    font = "Avenir Next"


class SetLanguageSolutionSetsStoryZhHk(SetLanguageSolutionSetsStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class SetLanguageSolutionSetsStoryZhCn(SetLanguageSolutionSetsStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class SetLanguageSolutionSetsStory(SetLanguageSolutionSetsStoryEn):
    pass
