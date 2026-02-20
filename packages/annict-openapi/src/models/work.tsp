import "./common.tsp";

namespace Annict.Models;

@doc("Facebook用画像情報")
model WorkFacebookImages {
  @doc("OGP画像URL")
  @example("http://shirobako-anime.com/images/ogp.jpg")
  og_image_url: string;
}

@doc("Twitter用画像情報")
model WorkTwitterImages {
  @doc("ミニアバター画像URL")
  @example("https://twitter.com/shirobako_anime/profile_image?size=mini")
  mini_avatar_url: string;

  @doc("通常アバター画像URL")
  @example("https://twitter.com/shirobako_anime/profile_image?size=normal")
  normal_avatar_url: string;

  @doc("大きいアバター画像URL")
  @example("https://twitter.com/shirobako_anime/profile_image?size=bigger")
  bigger_avatar_url: string;

  @doc("オリジナルアバター画像URL")
  @example("https://twitter.com/shirobako_anime/profile_image?size=original")
  original_avatar_url: string;

  @doc("画像URL")
  @example("")
  image_url: string;
}

@doc("作品の画像情報")
model WorkImages {
  @doc("推奨画像URL")
  @example("http://shirobako-anime.com/images/ogp.jpg")
  recommended_url: string;

  @doc("Facebook用画像")
  facebook: WorkFacebookImages;

  @doc("Twitter用画像")
  twitter: WorkTwitterImages;
}

@doc("作品")
model Work {
  @doc("作品ID")
  @example(4168)
  id: int32;

  @doc("作品タイトル")
  @example("SHIROBAKO")
  title: string;

  @doc("作品タイトル (かな)")
  @example("しろばこ")
  title_kana: string;

  @doc("作品タイトル (英語)")
  @example("SHIROBAKO")
  title_en?: string;

  @doc("メディア種別")
  media: Media;

  @doc("メディア種別 (表示用)")
  media_text: MediaText;

  @doc("リリース時期 (例: 2014-autumn)")
  @example("2014-autumn")
  season_name?: string;

  @doc("リリース時期 (表示用)")
  @example("2014年秋")
  season_name_text?: string;

  @doc("リリース日")
  @example("2014-10-09")
  released_on: string;

  @doc("リリース日 (大まかな日付)")
  @example("")
  released_on_about: string;

  @doc("公式サイトURL")
  @example("http://shirobako-anime.com")
  official_site_url: string;

  @doc("WikipediaのURL")
  @example("http://ja.wikipedia.org/wiki/SHIROBAKO")
  wikipedia_url: string;

  @doc("Twitterユーザー名")
  @example("shirobako_anime")
  twitter_username: string;

  @doc("Twitterハッシュタグ")
  @example("musani")
  twitter_hashtag: string;

  @doc("しょぼいカレンダーのタイトルID")
  @example("3524")
  syobocal_tid: string;

  @doc("MyAnimeListの作品ID")
  @example("25835")
  mal_anime_id: string;

  @doc("画像情報")
  images: WorkImages;

  @doc("エピソード数")
  @example(24)
  episodes_count: int32;

  @doc("視聴者数")
  @example(1254)
  watchers_count: int32;

  @doc("レビュー数")
  @example(10)
  reviews_count: int32;

  @doc("エピソードが存在しないかどうか")
  @example(false)
  no_episodes: boolean;
}

@doc("視聴ステータス")
model WorkStatus {
  @doc("ステータス種別")
  kind: StatusKind;
}

@doc("視聴ステータス付き作品")
model WorkWithStatus {
  ...Work;

  @doc("視聴ステータス")
  status: WorkStatus;
}
