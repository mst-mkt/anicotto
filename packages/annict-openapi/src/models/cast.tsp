import "./character.tsp";
import "./person.tsp";
import "./work.tsp";

namespace Annict.Models;

@doc("キャスト")
model Cast {
  @doc("ID")
  id: int32;

  @doc("名前")
  name: string;

  @doc("名前 (英語表記)")
  name_en: string;

  @doc("ソート番号")
  sort_number: int32;

  @doc("紐づく作品情報")
  work: Work;

  @doc("紐づくキャラクター情報")
  character: Character;

  @doc("紐づく人物情報")
  person: Person;
}
