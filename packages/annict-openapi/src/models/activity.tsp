import "./enums.tsp";
import "./episode.tsp";
import "./record.tsp";
import "./review.tsp";
import "./user.tsp";
import "./work.tsp";

using TypeSpec.OpenAPI;

namespace Annict.Models;

@doc("アクティビティ共通")
model BaseActivity {
  @doc("アクティビティID")
  id: int32;

  @doc("ユーザ情報")
  user: User;

  @doc("作品情報")
  work: Work;

  @doc("アクティビティの種類")
  action: Action;

  @doc("アクティビティ作成日時")
  created_at: utcDateTime;
}

@doc("記録アクティビティ")
model CreateRecordActivity extends BaseActivity {
  action: Action.create_record;

  @doc("記録されたエピソード情報")
  episode: Episode;

  @doc("記録情報")
  record: Record;
}

@doc("レビューアクティビティ")
model CreateReviewActivity extends BaseActivity {
  action: Action.create_review;

  @doc("レビュー情報")
  review: Review;
}

@doc("複数の記録アクティビティ")
model CreateMultipleRecordsActivity extends BaseActivity {
  action: Action.create_multiple_records;

  @doc("複数の記録")
  multiple_record: {
    @doc("記録されたエピソード情報")
    episode: Episode;

    @doc("記録情報")
    record: Record;
  }[];
}

@doc("ステータスアクティビティ")
model CreateStatusActivity extends BaseActivity {
  action: Action.create_status;

  @doc("ステータス")
  status: WorkStatus;
}

@doc("アクティビティ")
@oneOf
union Activity {
  @doc("記録アクティビティ")
  createRecord: CreateRecordActivity,

  @doc("レビューアクティビティ")
  createReview: CreateReviewActivity,

  @doc("複数の記録アクティビティ")
  createMultipleRecords: CreateMultipleRecordsActivity,

  @doc("ステータスアクティビティ")
  createStatus: CreateStatusActivity,
}
