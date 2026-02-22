import "./work.tsp";

namespace Annict.Models;

@doc("エピソード")
model Episode {
  @doc("エピソードのID")
  id: int32;

  @doc("エピソードの話数")
  number: float64 | null;

  @doc("エピソードの話数 (表記用)")
  number_text: string;

  @doc("ソート用の番号")
  sort_number: int32;

  @doc("サブタイトル")
  title: string | null;

  @doc("記録数")
  records_count: int32;

  @doc("感想付きの記録数")
  record_comments_count: int32;
}

@doc("前後エピソード・作品情報付きエピソード")
model EpisodeWithInfo {
  ...Episode;

  @doc("このエピソードが紐づく作品情報")
  work: Work;

  @doc("このエピソードの前のエピソード情報")
  prev_episode: Episode | null;

  @doc("このエピソードの次のエピソード情報")
  next_episode: Episode | null;
}
