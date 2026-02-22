import "../models/enums.tsp";
import "../models/pagination.tsp";
import "../models/work.tsp";

using TypeSpec.Http;

namespace Annict;

model WorksResponse {
  @doc("作品一覧")
  works: Models.Work[];

  ...Models.Pagination;
}

model MyWorksResponse {
  @doc("ステータス付き作品一覧")
  works: Models.WorkWithStatus[];

  ...Models.Pagination;
}

@route("/works")
interface Works {
  @summary("作品一覧の取得")
  @doc("Annictに登録されている作品情報を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("作品を作品IDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Work.id[],

    @doc("作品をリリース時期で絞り込みます。")
    @query
    filter_season?: string,

    @doc("作品をタイトルで絞り込みます。")
    @query
    filter_title?: string,

    @doc("作品を作品IDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,

    @doc("作品をリリース時期で並び替えます。")
    @query
    sort_season?: Models.SortOrder,

    @doc("作品をWatchersの数で並び替えます。")
    @query
    sort_watchers_count?: Models.SortOrder,
  ): WorksResponse;
}

@route("/me/works")
interface MyWorks {
  @summary("ステータス付き作品一覧の取得")
  @doc("自分がステータスを設定している作品の情報を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("作品を作品IDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Work.id[],

    @doc("作品をリリース時期で絞り込みます。")
    @query
    filter_season?: string,

    @doc("作品をタイトルで絞り込みます。")
    @query
    filter_title?: string,

    @doc("作品をステータスで絞り込みます。")
    @query
    filter_status?: Models.StatusKind,

    @doc("作品を作品IDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,

    @doc("作品をリリース時期で並び替えます。")
    @query
    sort_season?: Models.SortOrder,

    @doc("作品をWatchersの数で並び替えます。")
    @query
    sort_watchers_count?: Models.SortOrder,
  ): MyWorksResponse;
}
