from manim import *


TEXT = {
    "en": {
        "title": "Read a function as arrows",
        "subtitle": "Domain, target, image, preimage, and composition are one diagram.",
        "summary_label": "Summary",
        "visual": {
            "domain": "domain X",
            "target": "target Y",
            "function": "function: one output per input",
            "graph": "graph(f) = {(a,1),(b,2),(c,2)}",
            "graph_subset": "graph(f) subset X x Y",
            "image": "image(f) = {1,2}",
            "preimage": "preimage({2}) = {b,c}",
            "injective_ok": "injective",
            "injective_bad": "collision",
            "injective_rule": "no two inputs share one output",
            "surjective_ok": "surjective",
            "surjective_bad": "missing target",
            "surjective_rule": "target coverage: f(X)=Y",
            "composition": "(g o f)(x)=g(f(x))",
            "first_then": "first f, then g",
            "hit": "hit",
            "missed": "missed",
        },
        "states": [
            (
                "Start with two sets",
                "A function from X to Y must give every input exactly one output in the target.",
                "f : X -> Y",
            ),
            (
                "The graph stores the same data",
                "The arrow picture is the ordered-pair subset graph(f) inside X x Y.",
                "one pair for each input",
            ),
            (
                "Read image forward, preimage backward",
                "The image lists outputs reached; a preimage traces an output set back to inputs.",
                "f(X)={1,2}; f^{-1}({2})={b,c}",
            ),
            (
                "Injective means no collision",
                "Two different inputs may not land on the same output.",
                "f(x1)=f(x2) -> x1=x2",
            ),
            (
                "Surjective means full target coverage",
                "Every target element must be hit by at least one input.",
                "f(X)=Y",
            ),
            (
                "Composition follows the arrows",
                "For g o f, apply f first and feed that output into g.",
                "(g o f)(x)=g(f(x))",
            ),
        ],
        "conclusion": "The arrow diagram keeps the definitions separate: functions require one output per input, injective forbids collisions, surjective covers the target, and composition follows outputs into the next map.",
    },
    "zh-hk": {
        "title": "用箭嘴閱讀函數",
        "subtitle": "domain、target、image、preimage 與合成可放在同一張圖。",
        "summary_label": "總結",
        "visual": {
            "domain": "domain X",
            "target": "target Y",
            "function": "函數：每個輸入一個輸出",
            "graph": "graph(f) = {(a,1),(b,2),(c,2)}",
            "graph_subset": "graph(f) 是 X x Y 的子集",
            "image": "image(f) = {1,2}",
            "preimage": "preimage({2}) = {b,c}",
            "injective_ok": "單射",
            "injective_bad": "碰撞",
            "injective_rule": "兩個輸入不可共享同一輸出",
            "surjective_ok": "滿射",
            "surjective_bad": "缺少 target",
            "surjective_rule": "覆蓋 target：f(X)=Y",
            "composition": "(g o f)(x)=g(f(x))",
            "first_then": "先做 f，再做 g",
            "hit": "命中",
            "missed": "未命中",
        },
        "states": [
            (
                "由兩個集合開始",
                "由 X 到 Y 的函數，必須讓每個輸入在 target 中有唯一一個輸出。",
                "f : X -> Y",
            ),
            (
                "graph 儲存同一份資料",
                "箭嘴圖就是 X x Y 內的有序對子集 graph(f)。",
                "每個輸入對應一個有序對",
            ),
            (
                "image 向前讀，preimage 向後讀",
                "image 列出被命中的輸出；preimage 從輸出集合反向追蹤輸入。",
                "f(X)={1,2}; f^{-1}({2})={b,c}",
            ),
            (
                "單射表示沒有碰撞",
                "兩個不同輸入不可落在同一個輸出。",
                "f(x1)=f(x2) -> x1=x2",
            ),
            (
                "滿射表示覆蓋整個 target",
                "每個 target 元素都必須被至少一個輸入命中。",
                "f(X)=Y",
            ),
            (
                "合成沿着箭嘴前進",
                "對 g o f，要先做 f，再把該輸出放入 g。",
                "(g o f)(x)=g(f(x))",
            ),
        ],
        "conclusion": "箭嘴圖把定義分清楚：函數要求每個輸入有一個輸出，單射禁止碰撞，滿射覆蓋 target，而合成把輸出接到下一個映射。",
    },
    "zh-cn": {
        "title": "用箭头读函数",
        "subtitle": "domain、target、image、preimage 和合成可放在同一张图里。",
        "summary_label": "总结",
        "visual": {
            "domain": "domain X",
            "target": "target Y",
            "function": "函数：每个输入一个输出",
            "graph": "graph(f) = {(a,1),(b,2),(c,2)}",
            "graph_subset": "graph(f) 是 X x Y 的子集",
            "image": "image(f) = {1,2}",
            "preimage": "preimage({2}) = {b,c}",
            "injective_ok": "单射",
            "injective_bad": "碰撞",
            "injective_rule": "两个输入不能共享同一输出",
            "surjective_ok": "满射",
            "surjective_bad": "缺少 target",
            "surjective_rule": "覆盖 target：f(X)=Y",
            "composition": "(g o f)(x)=g(f(x))",
            "first_then": "先做 f，再做 g",
            "hit": "取到",
            "missed": "未取到",
        },
        "states": [
            (
                "由两个集合开始",
                "从 X 到 Y 的函数，必须让每个输入在 target 中有唯一一个输出。",
                "f : X -> Y",
            ),
            (
                "graph 储存同一份数据",
                "箭头图就是 X x Y 中的有序对子集 graph(f)。",
                "每个输入对应一个有序对",
            ),
            (
                "image 向前读，preimage 向后读",
                "image 列出被取到的输出；preimage 从输出集合反向追踪输入。",
                "f(X)={1,2}; f^{-1}({2})={b,c}",
            ),
            (
                "单射表示没有碰撞",
                "两个不同输入不能落在同一个输出。",
                "f(x1)=f(x2) -> x1=x2",
            ),
            (
                "满射表示覆盖整个 target",
                "每个 target 元素都必须被至少一个输入取到。",
                "f(X)=Y",
            ),
            (
                "合成沿着箭头前进",
                "对 g o f，要先做 f，再把该输出放入 g。",
                "(g o f)(x)=g(f(x))",
            ),
        ],
        "conclusion": "箭头图把定义分清楚：函数要求每个输入有一个输出，单射禁止碰撞，满射覆盖 target，而合成把输出接到下一个映射。",
    },
}


class FunctionMapPropertiesStoryBase(Scene):
    """MATH1090 2.2: function arrows, image/preimage, and map properties."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def point(self, x, y):
        return RIGHT * x + UP * y

    def set_panel(
        self,
        title,
        items,
        center,
        color=BLUE_B,
        width=1.7,
        height=2.2,
        highlight=None,
        muted=None,
    ):
        highlight = set(highlight or [])
        muted = set(muted or [])
        box = RoundedRectangle(
            corner_radius=0.12,
            width=width,
            height=height,
            stroke_color=color,
            stroke_width=2.0,
            fill_color=BLACK,
            fill_opacity=0.12,
        ).move_to(center)
        title_mob = self.label(title, font_size=20, color=color, weight=MEDIUM, max_width=width * 0.92)
        title_mob.next_to(box, UP, buff=0.08)
        positions = {}
        dots = VGroup()
        if len(items) == 1:
            offsets = [0]
        else:
            step = min(0.56, (height - 0.75) / max(1, len(items) - 1))
            start = step * (len(items) - 1) / 2
            offsets = [start - i * step for i in range(len(items))]
        for item, y_offset in zip(items, offsets):
            pos = center + UP * y_offset
            positions[item] = pos
            dot_color = YELLOW_B if item in highlight else color
            opacity = 0.35 if item in muted else 1
            dot = Dot(pos, radius=0.075, color=dot_color).set_opacity(opacity)
            tag = self.label(str(item), font_size=22, color=dot_color, weight=MEDIUM, max_width=0.5)
            tag.next_to(dot, LEFT if center[0] < 0 else RIGHT, buff=0.08).set_opacity(opacity)
            dots.add(dot, tag)
        return VGroup(box, title_mob, dots), positions

    def arrow(self, start, end, color=WHITE, dashed=False, curve=0):
        if dashed:
            line = DashedLine(start, end, color=color, stroke_width=3, dash_length=0.12)
            tip = Triangle(color=color, fill_color=color, fill_opacity=1).scale(0.08)
            tip.rotate(line.get_angle() - PI / 2).move_to(end)
            return VGroup(line, tip)
        if curve:
            return CurvedArrow(start, end, angle=curve, color=color, stroke_width=3, tip_length=0.18)
        return Arrow(start, end, buff=0.1, color=color, stroke_width=3, max_tip_length_to_length_ratio=0.18)

    def set_map(
        self,
        x=0,
        title=None,
        mapping=None,
        y_items=None,
        highlights_x=None,
        highlights_y=None,
        muted_y=None,
        width=1.45,
        height=1.75,
    ):
        labels = TEXT[self.locale]["visual"]
        mapping = mapping or {"a": "1", "b": "2", "c": "2"}
        y_items = y_items or ["1", "2", "3"]
        left, x_pos = self.set_panel(
            "X",
            ["a", "b", "c"],
            self.point(x - 1.28, 0),
            color=BLUE_B,
            width=width,
            height=height,
            highlight=highlights_x,
        )
        right, y_pos = self.set_panel(
            "Y",
            y_items,
            self.point(x + 1.28, 0),
            color=GREEN_B,
            width=width,
            height=height,
            highlight=highlights_y,
            muted=muted_y,
        )
        arrows = VGroup()
        for source, target in mapping.items():
            start = x_pos[source] + RIGHT * 0.16
            end = y_pos[target] + LEFT * 0.16
            color = YELLOW_B if source in set(highlights_x or []) or target in set(highlights_y or []) else WHITE
            arrows.add(self.arrow(start, end, color=color))
        group = VGroup(left, right, arrows)
        if title:
            tag = self.label(title, font_size=19, color=WHITE, weight=MEDIUM, max_width=2.6)
            tag.next_to(group, DOWN, buff=0.12)
            group.add(tag)
        return group

    def explain_card(self, state):
        title, body, key = state
        box = RoundedRectangle(
            corner_radius=0.1,
            width=11.8,
            height=1.05,
            stroke_color=TEAL_B,
            stroke_width=1.5,
            fill_color=BLACK,
            fill_opacity=0.22,
        ).move_to(DOWN * 2.72)
        title_mob = self.label(title, font_size=22, color=TEAL_B, weight=MEDIUM, max_width=11.0)
        body_mob = self.label(body, font_size=19, color=WHITE, max_width=10.9)
        key_mob = self.label(key, font_size=18, color=YELLOW_B, weight=MEDIUM, max_width=10.7)
        content = VGroup(title_mob, body_mob, key_mob).arrange(DOWN, buff=0.045).move_to(box)
        return VGroup(box, content)

    def domain_target_visual(self):
        labels = TEXT[self.locale]["visual"]
        visual = self.set_map(width=1.65, height=2.25)
        tag = self.label(labels["function"], font_size=23, color=YELLOW_B, weight=MEDIUM, max_width=4.8)
        tag.next_to(visual, UP, buff=0.12)
        return VGroup(visual, tag).move_to(UP * 0.08)

    def graph_visual(self):
        labels = TEXT[self.locale]["visual"]
        visual = self.set_map(x=-1.45, width=1.45, height=2.0)
        graph_box = RoundedRectangle(
            corner_radius=0.1,
            width=4.1,
            height=1.25,
            stroke_color=PURPLE_B,
            fill_color=BLACK,
            fill_opacity=0.14,
        ).move_to(self.point(3.05, 0.2))
        graph_title = self.label("graph(f)", font_size=22, color=PURPLE_B, weight=MEDIUM, max_width=3.4)
        graph_body = self.label(labels["graph"], font_size=21, color=WHITE, max_width=3.65)
        graph_content = VGroup(graph_title, graph_body).arrange(DOWN, buff=0.12).move_to(graph_box)
        subset = self.label(labels["graph_subset"], font_size=20, color=YELLOW_B, max_width=4.0)
        subset.next_to(graph_box, DOWN, buff=0.18)
        return VGroup(visual, graph_box, graph_content, subset).move_to(UP * 0.1)

    def image_preimage_visual(self):
        labels = TEXT[self.locale]["visual"]
        visual = self.set_map(
            x=-0.15,
            highlights_x=["b", "c"],
            highlights_y=["2"],
            muted_y=["3"],
            width=1.65,
            height=2.25,
        )
        forward = self.label(labels["image"], font_size=22, color=GREEN_B, weight=MEDIUM, max_width=3.2)
        backward = self.label(labels["preimage"], font_size=22, color=YELLOW_B, weight=MEDIUM, max_width=3.6)
        notes = VGroup(forward, backward).arrange(DOWN, buff=0.18).next_to(visual, RIGHT, buff=0.55)
        return VGroup(visual, notes).move_to(UP * 0.08)

    def injective_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = self.set_map(
            x=-2.25,
            title=labels["injective_ok"],
            mapping={"a": "1", "b": "2", "c": "3"},
            width=1.25,
            height=1.65,
        )
        right = self.set_map(
            x=2.25,
            title=labels["injective_bad"],
            mapping={"a": "1", "b": "2", "c": "2"},
            highlights_y=["2"],
            width=1.25,
            height=1.65,
        )
        badge = Circle(radius=0.17, color=RED_C, fill_color=RED_C, fill_opacity=0.85).move_to(self.point(3.53, -0.03))
        mark = self.label("!", font_size=22, color=WHITE, weight=BOLD, max_width=0.2).move_to(badge)
        rule = self.label(labels["injective_rule"], font_size=21, color=YELLOW_B, max_width=5.8)
        rule.next_to(VGroup(left, right), UP, buff=0.1)
        return VGroup(left, right, badge, mark, rule).move_to(UP * 0.08)

    def surjective_visual(self):
        labels = TEXT[self.locale]["visual"]
        left = self.set_map(
            x=-2.25,
            title=labels["surjective_ok"],
            mapping={"a": "1", "b": "2", "c": "3"},
            highlights_y=["1", "2", "3"],
            width=1.25,
            height=1.65,
        )
        right = self.set_map(
            x=2.25,
            title=labels["surjective_bad"],
            mapping={"a": "1", "b": "2", "c": "2"},
            muted_y=["3"],
            width=1.25,
            height=1.65,
        )
        miss = self.label(labels["missed"], font_size=19, color=RED_C, weight=MEDIUM, max_width=1.4)
        miss.next_to(right, RIGHT, buff=0.12).shift(UP * 0.1)
        rule = self.label(labels["surjective_rule"], font_size=21, color=YELLOW_B, max_width=5.8)
        rule.next_to(VGroup(left, right), UP, buff=0.1)
        return VGroup(left, right, miss, rule).move_to(UP * 0.08)

    def composition_visual(self):
        labels = TEXT[self.locale]["visual"]
        x_panel, x_pos = self.set_panel("X", ["a", "b"], self.point(-4.0, 0), color=BLUE_B, width=1.35, height=1.65)
        y_panel, y_pos = self.set_panel("Y", ["u", "v"], self.point(0.0, 0), color=GREEN_B, width=1.35, height=1.65)
        z_panel, z_pos = self.set_panel("Z", ["p", "q"], self.point(4.0, 0), color=PURPLE_B, width=1.35, height=1.65)
        arrows = VGroup(
            self.arrow(x_pos["a"] + RIGHT * 0.15, y_pos["u"] + LEFT * 0.15, color=BLUE_B),
            self.arrow(x_pos["b"] + RIGHT * 0.15, y_pos["v"] + LEFT * 0.15, color=BLUE_B),
            self.arrow(y_pos["u"] + RIGHT * 0.15, z_pos["q"] + LEFT * 0.15, color=GREEN_B),
            self.arrow(y_pos["v"] + RIGHT * 0.15, z_pos["p"] + LEFT * 0.15, color=GREEN_B),
        )
        f_tag = self.label("f", font_size=24, color=BLUE_B, weight=MEDIUM, max_width=0.4).move_to(self.point(-2.0, 0.85))
        g_tag = self.label("g", font_size=24, color=GREEN_B, weight=MEDIUM, max_width=0.4).move_to(self.point(2.0, 0.85))
        direct = self.arrow(self.point(-4.0, -1.25), self.point(4.0, -1.25), color=YELLOW_B, dashed=True)
        direct_tag = self.label(labels["composition"], font_size=23, color=YELLOW_B, weight=MEDIUM, max_width=4.5)
        direct_tag.next_to(direct, DOWN, buff=0.12)
        order_tag = self.label(labels["first_then"], font_size=22, color=WHITE, max_width=3.2)
        order_tag.next_to(VGroup(x_panel, y_panel, z_panel), UP, buff=0.1)
        return VGroup(x_panel, y_panel, z_panel, arrows, f_tag, g_tag, direct, direct_tag, order_tag).move_to(UP * 0.1)

    def construct(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=WHITE, weight=BOLD, max_width=10.5)
        title.to_edge(UP, buff=0.2)
        subtitle = self.label(data["subtitle"], font_size=19, color=GRAY_B, max_width=10.5)
        subtitle.next_to(title, DOWN, buff=0.08)

        visuals = [
            self.domain_target_visual,
            self.graph_visual,
            self.image_preimage_visual,
            self.injective_visual,
            self.surjective_visual,
            self.composition_visual,
        ]

        current_visual = visuals[0]()
        current_card = self.explain_card(data["states"][0])
        self.play(FadeIn(title), FadeIn(subtitle), FadeIn(current_visual), FadeIn(current_card), run_time=1.0)
        self.wait(1.6)

        for index in range(1, len(visuals)):
            next_visual = visuals[index]()
            next_card = self.explain_card(data["states"][index])
            self.play(
                FadeOut(current_visual, shift=LEFT * 0.25),
                FadeOut(current_card, shift=DOWN * 0.12),
                FadeIn(next_visual, shift=LEFT * 0.25),
                FadeIn(next_card, shift=UP * 0.12),
                run_time=0.8,
            )
            current_visual = next_visual
            current_card = next_card
            self.wait(0.75)

        conclusion = self.explain_card((data["summary_label"], data["conclusion"], data["states"][-1][2]))
        self.play(Transform(current_card, conclusion), run_time=0.7)
        self.wait(1.0)


class FunctionMapPropertiesStoryEn(FunctionMapPropertiesStoryBase):
    locale = "en"
    font = "Avenir Next"


class FunctionMapPropertiesStoryZhHk(FunctionMapPropertiesStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class FunctionMapPropertiesStoryZhCn(FunctionMapPropertiesStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class FunctionMapPropertiesStory(FunctionMapPropertiesStoryEn):
    pass
