import "../models/enums.tsp";
import "../models/pagination.tsp";
import "../models/review.tsp";

using TypeSpec.Http;

namespace Annict;

model ReviewsResponse {
  @doc("レビュー一覧")
  reviews: Models.ReviewWithInfo[];

  ...Models.Pagination;
}

@route("/reviews")
interface Reviews {
  @summary("レビュー一覧の取得")
  @doc("作品へのレビューを取得することができます。")
  @get
  list(
    ...Models.PaginationQuery,

    @doc("レビューをレビューIDで絞り込みます。")
    @query(#{ explode: false })
    filter_ids?: Models.Review.id[],

    @doc("レビューを作品IDで絞り込みます。")
    @query
    filter_work_id?: Models.Work.id,

    @doc("レビューを感想のあるなしで絞り込みます。")
    @query
    filter_has_review_body?: boolean,

    @doc("レビューをレビューIDで並び替えます。")
    @query
    sort_id?: Models.SortOrder,

    @doc("レビューをLikeされた数で並び替えます。")
    @query
    sort_likes_count?: Models.SortOrder,
  ): ReviewsResponse;
}

@route("/me/reviews")
interface MyReviews {
  @summary("レビューの作成")
  @doc("作品へのレビューが投稿できます。")
  @post
  create(
    @doc("作品ID")
    @query
    work_id: Models.Work.id,

    @doc("感想")
    @query
    body: string,

    @doc("レーティング (映像)")
    @query
    rating_animation_state?: Models.Rating | null,

    @doc("レーティング (音楽)")
    @query
    rating_music_state?: Models.Rating | null,

    @doc("レーティング (ストーリー)")
    @query
    rating_story_state?: Models.Rating | null,

    @doc("レーティング (キャラクター)")
    @query
    rating_character_state?: Models.Rating | null,

    @doc("レーティング (全体)")
    @query
    rating_overall_state?: Models.Rating | null,

    @doc("レビューをTwitterにシェアするかどうか")
    @query
    share_twitter?: boolean,

    @doc("レビューをFacebookにシェアするかどうか")
    @query
    share_facebook?: boolean,
  ): Models.ReviewWithInfo;
}

@route("/me/reviews/{id}")
interface MyReviewsById {
  @summary("レビューの更新")
  @doc("作成したレビューを編集することができます。")
  @patch
  update(
    @doc("レビューID")
    @path
    id: Models.Review.id,

    @doc("感想")
    @query
    body?: string,

    @doc("レーティング (映像)")
    @query
    rating_animation_state?: Models.Rating | null,

    @doc("レーティング (音楽)")
    @query
    rating_music_state?: Models.Rating | null,

    @doc("レーティング (ストーリー)")
    @query
    rating_story_state?: Models.Rating | null,

    @doc("レーティング (キャラクター)")
    @query
    rating_character_state?: Models.Rating | null,

    @doc("レーティング (全体)")
    @query
    rating_overall_state?: Models.Rating | null,

    @doc("レビューをTwitterにシェアするかどうか")
    @query
    share_twitter?: boolean,

    @doc("レビューをFacebookにシェアするかどうか")
    @query
    share_facebook?: boolean,
  ): Models.ReviewWithInfo;

  @summary("レビューの削除")
  @doc("作成したレビューを削除することができます。")
  @delete
  delete(
    @doc("レビューID")
    @path
    id: Models.Review.id,
  ): void;
}
