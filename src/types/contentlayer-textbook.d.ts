declare module "contentlayer/generated" {
  export interface TextbookUnitDocument {
    body: {
      code: string;
      raw: string;
    };
    chapterId: string;
    course: "math1090" | "math1030";
    description: string;
    locale: "en" | "zh-hk" | "zh-cn";
    title: string;
    unitId: string;
    unitSlug: string;
    url: string;
  }

  export const allTextbookUnits: TextbookUnitDocument[];
}
