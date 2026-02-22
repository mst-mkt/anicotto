import "../models/activity.tsp";
import "../models/enums.tsp";
import "../models/pagination.tsp";

using TypeSpec.Http;

namespace Annict;

model ActivitiesResponse {
  @doc("アクティビティ一覧")
  activities: Models.Activity[];

  ...Models.Pagination;
}

@route("/activities")
interface Activities {
  @summary("アクティビティ一覧の取得")
  @doc("アクティビティを取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("ユーザIDで絞り込みます。")
    @query
    filter_user_id?: Models.User.id,

    @doc("ユーザ名で絞り込みます。")
    @query
    filter_username?: string,

    @doc("IDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,
  ): ActivitiesResponse;
}

@route("/me/following_activities")
interface MyFollowingActivities {
  @summary("フォロー中ユーザのアクティビティ一覧の取得")
  @doc("自分がフォローしているユーザのアクティビティを取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("アクションで絞り込みます。")
    @query(#{ explode: false })
    filter_actions?: Models.Action[],

    @doc("ミュート機能でミュートしているユーザを除外するかどうかを指定します。")
    @query
    filter_muted?: boolean = true,

    @doc("IDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,
  ): ActivitiesResponse;
}
