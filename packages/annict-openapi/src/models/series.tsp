namespace Annict.Models;

@doc("シリーズ")
model Series {
  @doc("ID")
  id: int32;

  @doc("名前")
  name: string;

  @doc("名前 (ローマ字表記)")
  name_ro: string;

  @doc("名前 (英語表記)")
  name_en: string;
}
