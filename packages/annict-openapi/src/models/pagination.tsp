using TypeSpec.Http;

namespace Annict.Models;

@doc("ページネーション情報")
model Pagination {
  @doc("取得結果の総数")
  total_count: int32;

  @doc("次のページ番号")
  next_page: int32 | null;

  @doc("前のページ番号")
  prev_page: int32 | null;
}

alias SortOrder = "asc" | "desc";

@doc("ページネーション用クエリパラメータ")
model PaginationQuery {
  @doc("ページ数を指定します。")
  @minValue(1)
  @query
  page?: int32 = 1;

  @doc("1ページに何件取得するかを指定します。")
  @minValue(1)
  @maxValue(50)
  @query
  per_page?: int32 = 25;
}
