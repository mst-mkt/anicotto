import "../models/enums.tsp";

using TypeSpec.Http;

namespace Annict;

@route("/me/statuses")
interface MyStatuses {
  @summary("視聴ステータスの設定")
  @doc("作品のステータスを設定することができます。")
  @post
  create(
    @doc("作品ID")
    @query
    work_id: Models.Work.id,

    @doc("ステータスの種類")
    @query
    kind: Models.StatusKind,
  ): void;
}
