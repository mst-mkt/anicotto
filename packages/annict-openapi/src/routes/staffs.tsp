import "../models/pagination.tsp";
import "../models/staff.tsp";

using TypeSpec.Http;

namespace Annict;

model StaffsResponse {
  @doc("スタッフ一覧")
  staffs: Models.StaffWithInfo[];

  ...Models.Pagination;
}

@route("/staffs")
interface Staffs {
  @summary("スタッフ一覧の取得")
  @doc("Annictに登録されているスタッフ情報を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("IDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Staff.id[],

    @doc("作品IDで絞り込みます。")
    @query
    filter_work_id?: Models.Work.id,

    @doc("IDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,

    @doc("ソート用の番号で並び替えます。")
    @query
    sort_sort_number?: Models.SortOrder,
  ): StaffsResponse;
}
