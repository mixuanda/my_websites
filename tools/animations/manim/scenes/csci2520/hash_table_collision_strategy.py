from manim import *


TEXT = {
    "en": {
        "title": "Hash tables: collisions without losing keys",
        "subtitle": "Hashing narrows the search; collision handling preserves dictionary correctness.",
        "summary_label": "Summary",
        "visual": {
            "enter": "Enter(key,value)",
            "lookup": "Lookup(key)",
            "delete": "Delete(key)",
            "contract": "dictionary contract",
            "same_key": "same key -> update value",
            "key_compare": "compare keys after hashing",
            "hash": "h(key) mod m",
            "bucket": "bucket",
            "collision": "collision",
            "not_equal": "same index, different keys",
            "chain": "chaining",
            "scan": "scan this list",
            "probe": "open addressing",
        "home": "home",
        "next": "next slot",
            "invariant": "hash narrows; strategy preserves correctness",
        },
        "states": [
            (
                "The ADT contract comes first",
                "A hash table implements dictionary operations by key; buckets are only an implementation detail.",
                "Enter / Lookup / Delete",
            ),
            (
                "Hashing chooses a bucket",
                "The hash function compresses a key into one bucket index, so lookup starts in a small region.",
                "index = h(key) mod m",
            ),
            (
                "Collision is normal",
                "Two different keys can have the same bucket index, so a collision is not proof that the keys are equal.",
                "key1 != key2, h(key1)=h(key2)",
            ),
            (
                "Chaining keeps a bucket list",
                "Each bucket can point to a linked list; lookup scans that chain and compares the stored keys.",
                "bucket[i] -> key-value nodes",
            ),
            (
                "Probing searches alternate slots",
                "Open addressing stores entries in the table itself and follows a probe sequence after a collision.",
                "h(k), h(k)+1, h(k)+2, ...",
            ),
        ],
        "conclusion": "Hashing is only the first step. Correct lookup and update still depend on the collision strategy checking keys along the chain or probe sequence.",
    },
    "zh-hk": {
        "title": "Hash table: 有 collision 仍不丟 key",
        "subtitle": "Hashing 縮小搜尋；collision handling 保持 dictionary 正確。",
        "summary_label": "總結",
        "visual": {
            "enter": "Enter(key,value)",
            "lookup": "Lookup(key)",
            "delete": "Delete(key)",
            "contract": "dictionary contract",
            "same_key": "同 key -> 更新 value",
            "key_compare": "hash 後仍要比較 key",
            "hash": "h(key) mod m",
            "bucket": "bucket",
            "collision": "collision",
            "not_equal": "同 index，不同 key",
            "chain": "chaining",
            "scan": "只掃描這條鏈",
            "probe": "open addressing",
            "home": "home",
            "next": "下一格",
            "invariant": "hash 縮小搜尋；策略保持正確",
        },
        "states": [
            (
                "先看 ADT contract",
                "Hash table 按 key 實作 dictionary 操作；bucket 只是實作細節。",
                "Enter / Lookup / Delete",
            ),
            (
                "Hashing 選出 bucket",
                "Hash function 把 key 壓成一個 bucket index，lookup 因此由小範圍開始。",
                "index = h(key) mod m",
            ),
            (
                "Collision 是常態",
                "兩個不同 key 可以有同一個 bucket index；collision 不代表兩個 key 相等。",
                "key1 != key2, h(key1)=h(key2)",
            ),
            (
                "Chaining 保留 bucket list",
                "每個 bucket 可指向 linked list；lookup 掃描該 chain 並比較已存 key。",
                "bucket[i] -> key-value nodes",
            ),
            (
                "Probing 尋找替代 slot",
                "Open addressing 把 entry 存在 table 本身，collision 後沿 probe sequence 前進。",
                "h(k), h(k)+1, h(k)+2, ...",
            ),
        ],
        "conclusion": "Hashing 只是第一步。正確 lookup 和 update 仍取決於 collision strategy 是否沿 chain 或 probe sequence 檢查 key。",
    },
    "zh-cn": {
        "title": "Hash table: 有 collision 仍不丢 key",
        "subtitle": "Hashing 缩小搜索；collision handling 保持 dictionary 正确。",
        "summary_label": "总结",
        "visual": {
            "enter": "Enter(key,value)",
            "lookup": "Lookup(key)",
            "delete": "Delete(key)",
            "contract": "dictionary contract",
            "same_key": "同 key -> 更新 value",
            "key_compare": "hash 后仍要比较 key",
            "hash": "h(key) mod m",
            "bucket": "bucket",
            "collision": "collision",
            "not_equal": "同 index，不同 key",
            "chain": "chaining",
            "scan": "只扫描这条链",
            "probe": "open addressing",
            "home": "home",
            "next": "下一格",
            "invariant": "hash 缩小搜索；策略保持正确",
        },
        "states": [
            (
                "先看 ADT contract",
                "Hash table 按 key 实现 dictionary 操作；bucket 只是实现细节。",
                "Enter / Lookup / Delete",
            ),
            (
                "Hashing 选出 bucket",
                "Hash function 把 key 压成一个 bucket index，lookup 因此从小范围开始。",
                "index = h(key) mod m",
            ),
            (
                "Collision 是常态",
                "两个不同 key 可以有同一个 bucket index；collision 不代表两个 key 相等。",
                "key1 != key2, h(key1)=h(key2)",
            ),
            (
                "Chaining 保留 bucket list",
                "每个 bucket 可指向 linked list；lookup 扫描该 chain 并比较已存 key。",
                "bucket[i] -> key-value nodes",
            ),
            (
                "Probing 寻找替代 slot",
                "Open addressing 把 entry 存在 table 本身，collision 后沿 probe sequence 前进。",
                "h(k), h(k)+1, h(k)+2, ...",
            ),
        ],
        "conclusion": "Hashing 只是第一步。正确 lookup 和 update 仍取决于 collision strategy 是否沿 chain 或 probe sequence 检查 key。",
    },
}


class HashTableCollisionStrategyStoryBase(Scene):
    """CSCI2520 1.2: hash-table buckets, collisions, chaining, and probing."""

    locale = "en"
    font = "Avenir Next"

    def label(self, value, font_size=28, color=WHITE, weight=NORMAL, max_width=6.8):
        text = Text(value, font=self.font, font_size=font_size, color=color, weight=weight)
        if text.width > max_width:
            text.scale_to_fit_width(max_width)
        return text

    def key_chip(self, value, color=BLUE_B, width=1.28):
        box = RoundedRectangle(
            corner_radius=0.14,
            width=width,
            height=0.52,
            stroke_color=color,
            stroke_width=2,
            fill_color=color,
            fill_opacity=0.14,
        )
        label = self.label(value, font_size=20, color=color, weight=MEDIUM, max_width=width * 0.82)
        return VGroup(box, label)

    def bucket_row(self, count=6, highlight=None, occupied=None):
        highlight = set(highlight or [])
        occupied = set(occupied or [])
        cells = VGroup()
        for index in range(count):
            color = YELLOW_B if index in highlight else GRAY_B
            fill_color = BLUE_E if index in occupied else BLACK
            fill_opacity = 0.32 if index in occupied else 0.1
            rect = RoundedRectangle(
                corner_radius=0.05,
                width=0.72,
                height=0.66,
                stroke_color=color,
                stroke_width=2.2 if index in highlight else 1.4,
                fill_color=fill_color,
                fill_opacity=fill_opacity,
            )
            number = self.label(str(index), font_size=18, color=GRAY_A, max_width=0.45)
            number.move_to(rect)
            cells.add(VGroup(rect, number))
        cells.arrange(RIGHT, buff=0.06)
        return cells

    def hash_box(self):
        labels = TEXT[self.locale]["visual"]
        box = RoundedRectangle(
            corner_radius=0.12,
            width=2.0,
            height=0.78,
            stroke_color=TEAL_B,
            stroke_width=2,
            fill_color=TEAL_E,
            fill_opacity=0.16,
        )
        label = self.label(labels["hash"], font_size=22, color=TEAL_B, weight=MEDIUM, max_width=1.76)
        return VGroup(box, label)

    def node(self, key, value, color=BLUE_B):
        outer = RoundedRectangle(
            corner_radius=0.08,
            width=1.56,
            height=0.64,
            stroke_color=color,
            stroke_width=2,
            fill_color=color,
            fill_opacity=0.13,
        )
        divider_x = outer.get_left() + RIGHT * 0.88
        divider = Line(divider_x + UP * 0.28, divider_x + DOWN * 0.28, color=color, stroke_width=1.4)
        key_label = self.label(key, font_size=18, color=color, weight=MEDIUM, max_width=0.66)
        val_label = self.label(value, font_size=17, color=WHITE, max_width=0.5)
        key_label.move_to(outer.get_left() + RIGHT * 0.44)
        val_label.move_to(outer.get_right() + LEFT * 0.28)
        return VGroup(outer, divider, key_label, val_label)

    def explain_card(self, state):
        title, body, key = state
        box = RoundedRectangle(
            corner_radius=0.1,
            width=11.8,
            height=1.08,
            stroke_color=TEAL_B,
            stroke_width=1.5,
            fill_color=BLACK,
            fill_opacity=0.22,
        ).move_to(DOWN * 1.95)
        title_mob = self.label(title, font_size=22, color=TEAL_B, weight=MEDIUM, max_width=11.0)
        body_mob = self.label(body, font_size=19, color=WHITE, max_width=10.9)
        key_mob = self.label(key, font_size=18, color=YELLOW_B, weight=MEDIUM, max_width=10.7)
        content = VGroup(title_mob, body_mob, key_mob).arrange(DOWN, buff=0.045).move_to(box)
        return VGroup(box, content)

    def contract_visual(self):
        labels = TEXT[self.locale]["visual"]
        ops = VGroup(
            self.key_chip(labels["enter"], BLUE_B, width=2.2),
            self.key_chip(labels["lookup"], GREEN_B, width=2.0),
            self.key_chip(labels["delete"], PURPLE_B, width=2.0),
        ).arrange(DOWN, buff=0.28).move_to(LEFT * 3.25 + UP * 0.08)

        contract_box = RoundedRectangle(
            corner_radius=0.12,
            width=4.65,
            height=2.12,
            stroke_color=YELLOW_B,
            stroke_width=2,
            fill_color=BLACK,
            fill_opacity=0.16,
        ).move_to(RIGHT * 1.72 + UP * 0.05)
        contract_title = self.label(labels["contract"], font_size=25, color=YELLOW_B, weight=MEDIUM, max_width=4.2)
        same_key = self.label(labels["same_key"], font_size=21, color=WHITE, max_width=4.1)
        compare = self.label(labels["key_compare"], font_size=21, color=WHITE, max_width=4.1)
        VGroup(contract_title, same_key, compare).arrange(DOWN, buff=0.18).move_to(contract_box)

        arrows = VGroup()
        for op in ops:
            arrows.add(Arrow(op.get_right(), contract_box.get_left(), buff=0.12, color=GRAY_B, stroke_width=2.5))
        return VGroup(ops, contract_box, contract_title, same_key, compare, arrows).move_to(UP * 0.12)

    def hash_visual(self):
        labels = TEXT[self.locale]["visual"]
        keys = VGroup(
            self.key_chip("cat", BLUE_B),
            self.key_chip("dog", GREEN_B),
            self.key_chip("elk", PURPLE_B),
        ).arrange(DOWN, buff=0.24).move_to(LEFT * 4.1 + UP * 0.2)
        hbox = self.hash_box().move_to(LEFT * 1.25 + UP * 0.2)
        row = self.bucket_row(highlight={2, 4}).move_to(RIGHT * 2.5 + UP * 0.2)
        bucket_label = self.label(labels["bucket"], font_size=20, color=GRAY_A, max_width=1.2)
        bucket_label.next_to(row, UP, buff=0.15)
        arrows = VGroup()
        for index, bucket in zip([0, 1, 2], [2, 4, 2]):
            arrows.add(Arrow(keys[index].get_right(), hbox.get_left(), buff=0.1, color=GRAY_B, stroke_width=2.2))
            arrows.add(Arrow(hbox.get_right(), row[bucket].get_left(), buff=0.1, color=[BLUE_B, GREEN_B, PURPLE_B][index], stroke_width=2.2))
        return VGroup(keys, hbox, row, bucket_label, arrows).move_to(UP * 0.12)

    def collision_visual(self):
        labels = TEXT[self.locale]["visual"]
        cat = self.key_chip("cat", BLUE_B).move_to(LEFT * 4.0 + UP * 0.75)
        act = self.key_chip("act", GREEN_B).move_to(LEFT * 4.0 + DOWN * 0.35)
        hbox = self.hash_box().move_to(LEFT * 1.35 + UP * 0.18)
        row = self.bucket_row(highlight={2}).move_to(RIGHT * 2.4 + UP * 0.18)
        collision = self.label(labels["collision"], font_size=27, color=RED_B, weight=MEDIUM, max_width=2.0)
        collision.next_to(row[2], UP, buff=0.28)
        note = self.label(labels["not_equal"], font_size=22, color=YELLOW_B, weight=MEDIUM, max_width=4.4)
        note.next_to(row, DOWN, buff=0.24)
        arrows = VGroup(
            Arrow(cat.get_right(), hbox.get_left(), buff=0.1, color=BLUE_B, stroke_width=2.4),
            Arrow(act.get_right(), hbox.get_left(), buff=0.1, color=GREEN_B, stroke_width=2.4),
            Arrow(hbox.get_right(), row[2].get_left(), buff=0.1, color=RED_B, stroke_width=3.0),
            Arrow(hbox.get_right(), row[2].get_left(), buff=0.1, color=RED_B, stroke_width=3.0).shift(DOWN * 0.16),
        )
        return VGroup(cat, act, hbox, row, collision, note, arrows).move_to(UP * 0.12)

    def chaining_visual(self):
        labels = TEXT[self.locale]["visual"]
        row = self.bucket_row(highlight={2}, occupied={2}).move_to(LEFT * 3.0 + UP * 0.22)
        chain_title = self.label(labels["chain"], font_size=25, color=YELLOW_B, weight=MEDIUM, max_width=2.2)
        chain_title.next_to(row, UP, buff=0.18)
        node_a = self.node("cat", "7", BLUE_B).move_to(RIGHT * 0.6 + UP * 0.52)
        node_b = self.node("act", "4", GREEN_B).move_to(RIGHT * 2.55 + UP * 0.52)
        null_box = RoundedRectangle(
            corner_radius=0.05,
            width=0.58,
            height=0.42,
            stroke_color=GRAY_B,
            fill_color=BLACK,
            fill_opacity=0.12,
        ).move_to(RIGHT * 4.0 + UP * 0.52)
        null_label = self.label("null", font_size=15, color=GRAY_A, max_width=0.48).move_to(null_box)
        arrows = VGroup(
            Arrow(row[2].get_right(), node_a.get_left(), buff=0.08, color=YELLOW_B, stroke_width=2.7),
            Arrow(node_a.get_right(), node_b.get_left(), buff=0.08, color=GRAY_B, stroke_width=2.2),
            Arrow(node_b.get_right(), null_box.get_left(), buff=0.08, color=GRAY_B, stroke_width=2.2),
        )
        scan = self.label(labels["scan"], font_size=21, color=TEAL_B, weight=MEDIUM, max_width=3.0)
        scan.next_to(VGroup(node_a, node_b), DOWN, buff=0.3)
        compare = self.label(labels["key_compare"], font_size=18, color=GRAY_A, max_width=4.5)
        compare.next_to(scan, DOWN, buff=0.12)
        return VGroup(row, chain_title, node_a, node_b, null_box, null_label, arrows, scan, compare).move_to(UP * 0.12)

    def probing_visual(self):
        labels = TEXT[self.locale]["visual"]
        row = self.bucket_row(highlight={2, 3, 4}, occupied={2, 3}).move_to(UP * 0.32)
        title = self.label(labels["probe"], font_size=25, color=YELLOW_B, weight=MEDIUM, max_width=3.2)
        title.next_to(row, UP, buff=0.22)
        key = self.key_chip("act", GREEN_B).move_to(LEFT * 4.35 + DOWN * 0.75)
        home = self.label(labels["home"], font_size=18, color=BLUE_B, weight=MEDIUM, max_width=1.8)
        home.next_to(row[2], DOWN, buff=0.18)
        next_slot = self.label(labels["next"], font_size=18, color=GREEN_B, weight=MEDIUM, max_width=2.2)
        next_slot.next_to(row[4], DOWN, buff=0.18)
        arrows = VGroup(
            Arrow(key.get_top(), row[2].get_bottom(), buff=0.12, color=BLUE_B, stroke_width=2.4),
            CurvedArrow(row[2].get_top() + UP * 0.08, row[3].get_top() + UP * 0.08, angle=-TAU / 5, color=RED_B, stroke_width=2.6),
            CurvedArrow(row[3].get_top() + UP * 0.08, row[4].get_top() + UP * 0.08, angle=-TAU / 5, color=GREEN_B, stroke_width=2.6),
        )
        invariant = self.label(labels["invariant"], font_size=22, color=TEAL_B, weight=MEDIUM, max_width=7.2)
        invariant.next_to(VGroup(row, home, next_slot), DOWN, buff=0.58)
        return VGroup(row, title, key, home, next_slot, arrows, invariant).move_to(UP * 0.12)

    def construct(self):
        data = TEXT[self.locale]
        title = self.label(data["title"], font_size=34, color=WHITE, weight=BOLD, max_width=10.5)
        title.to_edge(UP, buff=0.2)
        subtitle = self.label(data["subtitle"], font_size=19, color=GRAY_B, max_width=10.5)
        subtitle.next_to(title, DOWN, buff=0.08)

        visuals = [
            self.contract_visual,
            self.hash_visual,
            self.collision_visual,
            self.chaining_visual,
            self.probing_visual,
        ]

        current_visual = visuals[0]()
        current_card = self.explain_card(data["states"][0])
        self.play(FadeIn(title), FadeIn(subtitle), FadeIn(current_visual), FadeIn(current_card), run_time=1.0)
        self.wait(1.55)

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
            self.wait(1.0)

        conclusion = self.explain_card((data["summary_label"], data["conclusion"], data["states"][-1][2]))
        self.play(Transform(current_card, conclusion), run_time=0.7)
        self.wait(1.0)


class HashTableCollisionStrategyStoryEn(HashTableCollisionStrategyStoryBase):
    locale = "en"
    font = "Avenir Next"


class HashTableCollisionStrategyStoryZhHk(HashTableCollisionStrategyStoryBase):
    locale = "zh-hk"
    font = "PingFang HK"


class HashTableCollisionStrategyStoryZhCn(HashTableCollisionStrategyStoryBase):
    locale = "zh-cn"
    font = "PingFang SC"


class HashTableCollisionStrategyStory(HashTableCollisionStrategyStoryEn):
    pass
