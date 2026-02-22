import "../models/pagination.tsp";
import "../models/program.tsp";

using TypeSpec.Http;

namespace Annict;

model MyProgramsResponse {
  @doc("放送予定一覧")
  programs: Models.Program[];

  ...Models.Pagination;
}

@route("/me/programs")
interface MyPrograms {
  @summary("放送予定一覧の取得")
  @doc("放送予定を取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("放送予定を放送予定IDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Program.id[],

    @doc("放送予定をチャンネルIDで絞り込みます。")
    @query(#{ explode: false })
    filter_channel_ids?: Models.Channel.id[],

    @doc("放送予定を作品IDで絞り込みます。")
    @query(#{ explode: false })
    filter_work_ids?: Models.Work.id[],

    @doc("指定した日時以降の放送予定が取得できます。(例: `2016/05/06 21:10`)")
    @query
    filter_started_at_gt?: string,

    @doc("指定した日時以前の放送予定が取得できます。(例: `2016/05/06 21:10`)")
    @query
    filter_started_at_lt?: string,

    @doc("未視聴の放送予定だけを取得します。")
    @query
    filter_unwatched?: boolean,

    @doc("再放送フラグをもとに絞り込みます。")
    @query
    filter_rebroadcast?: boolean,

    @doc("放送予定を放送予定IDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,

    @doc("放送予定を放送開始日時で並び替えます。")
    @query
    sort_started_at?: Models.SortOrder,
  ): MyProgramsResponse;
}
