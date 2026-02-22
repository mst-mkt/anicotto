import "../models/pagination.tsp";
import "../models/person.tsp";

using TypeSpec.Http;

namespace Annict;

model PeopleResponse {
  @doc("人物一覧")
  people: Models.PersonWithPrefecture[];

  ...Models.Pagination;
}

@route("/people")
interface People {
  @summary("人物一覧の取得")
  @doc("Annictに登録されている人物情報を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("人物をIDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Person.id[],

    @doc("人物を名前で絞り込みます。")
    @query
    filter_name?: string,

    @doc("人物をIDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,
  ): PeopleResponse;
}
