import "../models/common.tsp";
import "../models/work.tsp";

using TypeSpec.Http;

namespace Annict;

model WorksResponse {
  @doc("作品一覧")
  works: Models.Work[];

  ...Models.Pagination;
}

model MeWorksResponse {
  @doc("ステータス付き作品一覧")
  works: Models.WorkWithStatus[];

  ...Models.Pagination;
}

@route("/works")
interface Works {
  @summary("作品一覧の取得")
  @doc("Annict に登録されている作品情報を取得する")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("作品IDをカンマ区切りで指定してフィルタ")
    @query
    filter_ids?: string,

    @doc("リリース時期でフィルタ")
    @query
    filter_season?: string,

    @doc("タイトルでフィルタ")
    @query
    filter_title?: string,

    @doc("作品IDで並び替え")
    @query
    sort_id?: Models.SortOrder,

    @doc("リリース時期で並び替え")
    @query
    sort_season?: Models.SortOrder,

    @doc("視聴者数で並び替え")
    @query
    sort_watchers_count?: Models.SortOrder,
  ): WorksResponse;
}

@route("/me/works")
interface MeWorks {
  @summary("ステータス付き作品一覧の取得")
  @doc("ユーザーが視聴ステータスを設定している作品情報を取得する")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("作品IDをカンマ区切りで指定してフィルタ")
    @query
    filter_ids?: string,

    @doc("リリース時期でフィルタ")
    @query
    filter_season?: string,

    @doc("タイトルでフィルタ")
    @query
    filter_title?: string,

    @doc("視聴ステータスでフィルタ")
    @query
    filter_status?: Models.StatusKind,

    @doc("作品IDで並び替え")
    @query
    sort_id?: Models.SortOrder,

    @doc("リリース時期で並び替え")
    @query
    sort_season?: Models.SortOrder,

    @doc("視聴者数で並び替え")
    @query
    sort_watchers_count?: Models.SortOrder,
  ): MeWorksResponse;
}
