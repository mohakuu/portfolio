import { load } from "cheerio";
import { formatInTimeZone } from "date-fns-tz";
import hljs from "highlight.js";

export const formatDate = (date: string) => {
  return formatInTimeZone(new Date(date), "Asia/Tokyo", "d MMMM, yyyy");
};

export const formatRichText = (richText: string) => {
  const $ = load(richText);
  const highlight = (text: string, lang?: string) => {
    if (!lang) return hljs.highlightAuto(text);
    try {
      return hljs.highlight(text, {
        language: lang?.replace(/^language-/, "") || "",
      });

      // TODO
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      return hljs.highlightAuto(text);
    }
  };
  $("pre code").each((_, elm) => {
    const lang = $(elm).attr("class");
    const res = highlight($(elm).text(), lang);
    $(elm).html(res.value);
  });
  return $.html();
};
