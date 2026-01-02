import type { MicroCMSQueries } from "microcms-js-sdk";
import { client } from "@/libs/client";
import { notFound } from "next/navigation";
import type { Blog } from "../types";

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Blog>({
      endpoint: "blog",
      queries,
    })
    .catch(notFound);
  return listData;
};

// ブログの詳細を取得
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client
    .getListDetail<Blog>({
      endpoint: "blog",
      contentId,
      queries,
    })
    .catch(notFound);

  return detailData;
};
