import "../models/organization.tsp";
import "../models/pagination.tsp";

using TypeSpec.Http;

namespace Annict;

model OrganizationsResponse {
  @doc("団体一覧")
  organizations: Models.Organization[];

  ...Models.Pagination;
}

@route("/organizations")
interface Organizations {
  @summary("団体一覧の取得")
  @doc("Annictに登録されている団体情報を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("団体をIDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Organization.id[],

    @doc("団体を名前で絞り込みます。")
    @query
    filter_name?: string,

    @doc("団体をIDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,
  ): OrganizationsResponse;
}
