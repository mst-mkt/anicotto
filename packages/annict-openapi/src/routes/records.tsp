import "../models/enums.tsp";
import "../models/pagination.tsp";
import "../models/record.tsp";

using TypeSpec.Http;

namespace Annict;

model RecordsResponse {
  @doc("記録一覧")
  records: Models.RecordWithInfo[];

  ...Models.Pagination;
}

@route("/records")
interface Records {
  @summary("記録一覧の取得")
  @doc("エピソードへの記録を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("記録を記録IDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Record.id[],

    @doc("記録をエピソードIDで絞り込みます。")
    @query
    filter_episode_id?: Models.Episode.id,

    @doc("記録を感想のあるなしで絞り込みます。")
    @query
    filter_has_record_comment?: boolean,

    @doc("記録を記録IDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,

    @doc("記録をLikeされた数で並び替えます。")
    @query
    sort_likes_count?: Models.SortOrder,
  ): RecordsResponse;
}

@route("/me/records")
interface MyRecords {
  @summary("記録の作成")
  @doc("エピソードへの記録が作成できます。")
  @post
  create(
    @doc("エピソードID")
    @query
    episode_id: Models.Episode.id,

    @doc("感想")
    @query
    comment?: string | null,

    @doc("レーティングの種類")
    @query
    rating_state?: Models.Rating | null,

    @doc("記録をTwitterにシェアするかどうか")
    @query
    share_twitter?: boolean,

    @doc("記録をFacebookにシェアするかどうか")
    @query
    share_facebook?: boolean,
  ): Models.RecordWithInfo;
}

@route("/me/records/{id}")
interface MyRecordsById {
  @summary("記録の更新")
  @doc("作成した記録を編集することができます。")
  @patch
  update(
    @doc("記録ID")
    @path
    id: Models.Record.id,

    @doc("感想")
    @query
    comment?: string | null,

    @doc("レーティングの種類")
    @query
    rating_state?: Models.Rating | null,

    @doc("記録をTwitterにシェアするかどうか")
    @query
    share_twitter?: boolean,

    @doc("記録をFacebookにシェアするかどうか")
    @query
    share_facebook?: boolean,
  ): Models.RecordWithInfo;

  @summary("記録の削除")
  @doc("作成した記録を削除することができます。")
  @delete
  delete(
    @doc("記録ID")
    @path
    id: Models.Record.id,
  ): void;
}
