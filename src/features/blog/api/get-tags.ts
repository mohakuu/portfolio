import type { MicroCMSQueries } from "microcms-js-sdk";
import { notFound } from "next/navigation";
import { client } from "@/libs/client";
import type { Tag } from "../types";

// タグの一覧を取得
export const getTagList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Tag>({
      endpoint: "tags",
      queries,
    })
    .catch(notFound);

  return listData;
};

// タグの詳細を取得
export const getTag = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client
    .getListDetail<Tag>({
      endpoint: "tags",
      contentId,
      queries,
    })
    .catch(notFound);

  return detailData;
};
