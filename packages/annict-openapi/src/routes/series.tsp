import "../models/pagination.tsp";
import "../models/series.tsp";

using TypeSpec.Http;

namespace Annict;

model SeriesResponse {
  @doc("シリーズ一覧")
  series: Models.Series[];

  ...Models.Pagination;
}

@route("/series")
interface SeriesList {
  @summary("シリーズ一覧の取得")
  @doc("Annictに登録されているシリーズ情報を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("シリーズをIDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Series.id[],

    @doc("シリーズを名前で絞り込みます。")
    @query
    filter_name?: string,

    @doc("シリーズをIDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,
  ): SeriesResponse;
}
