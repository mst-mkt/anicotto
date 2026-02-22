namespace Annict.Models;

@doc("都道府県")
model Prefecture {
  @doc("都道府県ID")
  id: int32;

  @doc("都道府県名")
  name: string;
}

@doc("人物")
model Person {
  @doc("ID")
  id: int32;

  @doc("名前")
  name: string;

  @doc("名前 (かな表記)")
  name_kana: string;

  @doc("名前 (英語表記)")
  name_en: string;

  @doc("ニックネーム")
  nickname: string;

  @doc("ニックネーム (英語表記)")
  nickname_en: string;

  @doc("性別")
  gender_text: string;

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

  @doc("誕生日")
  birthday: string;

  @doc("血液型")
  blood_type: string;

  @doc("身長")
  height: float64 | string;

  @doc("お気に入りに入れている人の数")
  favorite_people_count: int32;

  @doc("キャストとして登録されている作品の数")
  casts_count: int32;

  @doc("スタッフとして登録されている作品の数")
  staffs_count: int32;
}

@doc("都道府県情報付き人物")
model PersonWithPrefecture {
  ...Person;

  @doc("出身地")
  prefecture: Prefecture | null;
}
