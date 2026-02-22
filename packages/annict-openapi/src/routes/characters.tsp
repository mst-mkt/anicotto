import "../models/character.tsp";
import "../models/pagination.tsp";

using TypeSpec.Http;

namespace Annict;

model CharactersResponse {
  @doc("キャラクター一覧")
  characters: Models.CharacterWithSeries[];

  ...Models.Pagination;
}

@route("/characters")
interface Characters {
  @summary("キャラクター一覧の取得")
  @doc("Annictに登録されているキャラクター情報を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("キャラクターをIDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Character.id[],

    @doc("キャラクターを名前で絞り込みます。")
    @query
    filter_name?: string,

    @doc("キャラクターをIDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,
  ): CharactersResponse;
}
