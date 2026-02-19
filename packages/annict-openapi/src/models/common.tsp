namespace Annict.Models;

@doc("ページネーション情報")
model Pagination {
  @doc("取得結果の総数")
  @example(30)
  total_count: int32;

  @doc("次のページ番号。次のページが無い場合は null")
  @example(2)
  next_page: int32 | null;

  @doc("前のページ番号。前のページが無い場合は null")
  @example(null)
  prev_page: int32 | null;
}

alias SortOrder = "asc" | "desc";

@doc("ページネーション用クエリパラメータ")
model PaginationQuery {
  @doc("ページ番号")
  @TypeSpec.Http.query page?: int32;

  @doc("1ページあたりの件数 (デフォルト: 25, 最大: 50)")
  @TypeSpec.Http.query per_page?: int32;

  @doc("レスポンスに含めるフィールドをカンマ区切りで指定")
  @TypeSpec.Http.query fields?: string;
}

@doc("視聴ステータス")
enum StatusKind {
  @doc("未選択") no_select,
  @doc("見たい") wanna_watch,
  @doc("見てる") watching,
  @doc("見た") watched,
  @doc("一時中断") on_hold,
  @doc("視聴中止") stop_watching,
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
  TV,
  OVA,
  映画,
  Web,
  その他,
}
