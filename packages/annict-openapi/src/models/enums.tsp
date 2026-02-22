namespace Annict.Models;

@doc("視聴ステータス")
enum StatusKind {
  @doc("未選択") no_select,
  @doc("見たい") wanna_watch,
  @doc("見てる") watching,
  @doc("見た") watched,
  @doc("中断") on_hold,
  @doc("中止") stop_watching,
}

@doc("メディア種別")
enum Media {
  @doc("TV") tv,
  @doc("OVA") ova,
  @doc("映画") movie,
  @doc("Web") web,
  @doc("その他") other,
}

@doc("メディア種別 (表示用)")
enum MediaText {
  TV: "TV",
  OVA: "OVA",
  Movie: "映画",
  Web: "Web",
  Other: "その他",
}

@doc("レーティング")
enum Rating {
  @doc("良くない") bad,
  @doc("普通") average,
  @doc("良い") good,
  @doc("とても良い") great,
}

@doc("アクティビティ種別")
enum Action {
  @doc("記録") create_record,
  @doc("レビュー") create_review,
  @doc("複数の記録") create_multiple_records,
  @doc("ステータス変更") create_status,
}
