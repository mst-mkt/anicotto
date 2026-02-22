import "./enums.tsp";
import "./episode.tsp";
import "./user.tsp";
import "./work.tsp";

namespace Annict.Models;

@doc("記録")
model Record {
  @doc("記録ID")
  id: int32;

  @doc("記録したときに書かれた感想")
  comment: string | null;

  #deprecated "rating_state を参照してください"
  @doc("レーティング (0-5)")
  rating: 0 | 1 | 2 | 3 | 4 | 5 | null;

  @doc("記録したときに付けられたレーティング")
  rating_state: Rating | null;

  @doc("この記録が編集されたかどうか")
  is_modified: boolean;

  @doc("Likeされた数")
  likes_count: int32;

  @doc("コメントされた数")
  comments_count: int32;

  @doc("記録された日時")
  created_at: utcDateTime;
}

@doc("ユーザ・作品・エピソード情報付き記録")
model RecordWithInfo {
  ...Record;

  @doc("この記録をした利用者の情報")
  user: User;

  @doc("この記録が紐づく作品情報")
  work: Work;

  @doc("この記録が紐づくエピソード情報")
  episode: Episode;
}
