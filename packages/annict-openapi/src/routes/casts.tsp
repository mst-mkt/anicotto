import "../models/cast.tsp";
import "../models/pagination.tsp";

using TypeSpec.Http;

namespace Annict;

model CastsResponse {
  @doc("キャスト一覧")
  casts: Models.Cast[];

  ...Models.Pagination;
}

@route("/casts")
interface Casts {
  @summary("キャスト一覧の取得")
  @doc("Annictに登録されているキャスト情報を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("IDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Cast.id[],

    @doc("作品IDで絞り込みます。")
    @query
    filter_work_id?: Models.Work.id,

    @doc("IDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,

    @doc("ソート用の番号で並び替えます。")
    @query
    sort_sort_number?: Models.SortOrder,
  ): CastsResponse;
}
