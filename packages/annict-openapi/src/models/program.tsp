import "./episode.tsp";
import "./work.tsp";

namespace Annict.Models;

@doc("チャンネル")
model Channel {
  @doc("チャンネルID")
  id: int32;

  @doc("チャンネル名")
  name: string;
}

@doc("放送予定")
model Program {
  @doc("放送予定ID")
  id: int32;

  @doc("放送開始日時")
  started_at: utcDateTime;

  @doc("この放送予定が再放送かどうか")
  is_rebroadcast: boolean;

  @doc("チャンネル情報")
  channel: Channel;

  @doc("この放送予定が紐づく作品情報")
  work: Work;

  @doc("この放送予定が紐づくエピソード情報")
  episode: Episode;
}
