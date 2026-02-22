import "./enums.tsp";
import "./user.tsp";
import "./work.tsp";

namespace Annict.Models;

@doc("レビュー")
model Review {
  @doc("レビューID")
  id: int32;

  #deprecated "現在は使用されていません"
  @doc("レビュータイトル")
  title: string | null;

  @doc("感想")
  body: string;

  @doc("レビューしたときに付けられたレーティング (作画)")
  rating_animation_state: Rating | null;

  @doc("レビューしたときに付けられたレーティング (音楽)")
  rating_music_state: Rating | null;

  @doc("レビューしたときに付けられたレーティング (ストーリー)")
  rating_story_state: Rating | null;

  @doc("レビューしたときに付けられたレーティング (キャラクター)")
  rating_character_state: Rating | null;

  @doc("レビューしたときに付けられたレーティング (全体)")
  rating_overall_state: Rating | null;

  @doc("Likeされた数")
  likes_count: int32;

  @doc("PV数")
  impressions_count: int32;

  @doc("レビューが投稿された日時")
  created_at: utcDateTime;

  @doc("レビューが編集された日時")
  modified_at: utcDateTime | null;
}

@doc("ユーザ・作品情報付きレビュー")
model ReviewWithInfo {
  ...Review;

  @doc("このレビューを投稿した利用者の情報")
  user: User;

  @doc("このレビューが紐づく作品情報")
  work: Work;
}
