import "../models/episode.tsp";
import "../models/pagination.tsp";

using TypeSpec.Http;

namespace Annict;

model EpisodesResponse {
  @doc("エピソード一覧")
  episodes: Models.EpisodeWithInfo[];

  ...Models.Pagination;
}

@route("/episodes")
interface Episodes {
  @summary("エピソード一覧の取得")
  @doc("Annictに登録されているエピソード情報を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("エピソードをエピソードIDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Episode.id[],

    @doc("エピソードを作品IDで絞り込みます。")
    @query
    filter_work_id?: Models.Work.id,

    @doc("エピソードをエピソードIDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,

    @doc("エピソードをソート用の番号で並び替えます。")
    @query
    sort_sort_number?: Models.SortOrder,
  ): EpisodesResponse;
}
