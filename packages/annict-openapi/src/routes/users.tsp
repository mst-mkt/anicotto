import "../models/pagination.tsp";
import "../models/user.tsp";

using TypeSpec.Http;

namespace Annict;

model UsersResponse {
  @doc("ユーザ一覧")
  users: Models.User[];

  ...Models.Pagination;
}

@route("/users")
interface Users {
  @summary("ユーザ一覧の取得")
  @doc("Annictに登録されているユーザ情報を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("ユーザをIDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.User.id[],

    @doc("ユーザをユーザ名で絞り込みます。")
    @query(#{ explode: false })
    filter_usernames?: string[],

    @doc("ユーザをIDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,
  ): UsersResponse;
}

@route("/me")
interface Me {
  @summary("自分のユーザ情報の取得")
  @doc("自分のプロフィール情報を取得することができます。")
  @get
  get(): Models.Me;
}

@route("/following")
interface Following {
  @summary("フォロー中ユーザ一覧の取得")
  @doc("Annictに登録されているユーザのフォロー情報を取得することができます。")
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
  ): UsersResponse;
}

@route("/followers")
interface Followers {
  @summary("フォロワー一覧の取得")
  @doc("Annictに登録されているユーザのフォロワー情報を取得することができます。")
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
  ): UsersResponse;
}
