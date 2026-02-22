namespace Annict.Models;

@doc("団体")
model Organization {
  @doc("ID")
  id: int32;

  @doc("名前")
  name: string;

  @doc("名前 (かな表記)")
  name_kana: string;

  @doc("名前 (英語表記)")
  name_en: string;

  @doc("公式サイト等のURL")
  url: string;

  @doc("公式サイト等のURL (英語圏向け)")
  url_en: string;

  @doc("WikipediaのURL")
  wikipedia_url: string;

  @doc("WikipediaのURL (英語圏向け)")
  wikipedia_url_en: string;

  @doc("Twitterアカウントのusername")
  twitter_username: string;

  @doc("Twitterアカウントのusername (英語圏向け)")
  twitter_username_en: string;

  @doc("お気に入りに入れている人の数")
  favorite_organizations_count: int32;

  @doc("スタッフとして登録されている作品の数")
  staffs_count: int32;
}
