import "./enums.tsp";

namespace Annict.Models;

@doc("Facebook用画像情報")
model WorkFacebookImages {
  @doc("`official_site_url` のページで取得できる `og:image` のURL")
  og_image_url: string;
}

@doc("Twitter用画像情報")
model WorkTwitterImages {
  @doc("Twitterアカウントのアバター画像 (mini)")
  mini_avatar_url: string;

  @doc("Twitterアカウントのアバター画像 (normal)")
  normal_avatar_url: string;

  @doc("Twitterアカウントのアバター画像 (bigger)")
  bigger_avatar_url: string;

  @doc("Twitterアカウントのアバター画像 (original)")
  original_avatar_url: string;

  @doc("`official_site_url` のページで取得できる `twitter:image` のURL")
  image_url: string;
}

@doc("作品の画像情報")
model WorkImages {
  @doc("最高解像度の画像URL")
  recommended_url: string;

  @doc("Facebook用画像")
  facebook: WorkFacebookImages;

  @doc("Twitter用画像")
  twitter: WorkTwitterImages;
}

@doc("作品")
model Work {
  @doc("作品のID")
  id: int32;

  @doc("作品のタイトル")
  title: string;

  @doc("作品タイトルの読み仮名")
  title_kana: string;

  @doc("作品タイトル (英語)")
  title_en?: string;

  @doc("リリース媒体")
  media: Media;

  @doc("リリース媒体 (表記用)")
  media_text: MediaText;

  @doc("リリース時期")
  season_name?: string;

  @doc("リリース時期 (表記用)")
  season_name_text?: string;

  @doc("リリース日")
  released_on: string;

  @doc("未確定な大体のリリース日")
  released_on_about: string;

  @doc("公式サイトのURL")
  official_site_url: string;

  @doc("WikipediaのURL")
  wikipedia_url: string;

  @doc("公式Twitterアカウントのusername")
  twitter_username: string;

  @doc("Twitterの作品に関するハッシュタグ")
  twitter_hashtag: string;

  @doc("しょぼいカレンダーのタイトルID")
  syobocal_tid: string;

  @doc("MyAnimeListの作品ID")
  mal_anime_id: string;

  @doc("画像情報")
  images: WorkImages;

  @doc("エピソード数")
  episodes_count: int32;

  @doc("見てる / 見たい / 見た人の数")
  watchers_count: int32;

  @doc("レビュー数")
  reviews_count: int32;

  @doc("エピソードが存在しない作品かどうか")
  no_episodes: boolean;
}

@doc("視聴ステータス")
model WorkStatus {
  @doc("ステータスの種類")
  kind: StatusKind;
}

@doc("視聴ステータス付き作品")
model WorkWithStatus {
  ...Work;

  @doc("視聴ステータス")
  status: WorkStatus;
}
