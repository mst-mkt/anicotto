import "./series.tsp";

namespace Annict.Models;

@doc("キャラクター")
model Character {
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

  @doc("誕生日")
  birthday: string;

  @doc("誕生日 (英語表記)")
  birthday_en: string;

  @doc("年齢")
  age: string;

  @doc("年齢 (英語表記)")
  age_en: string;

  @doc("血液型")
  blood_type: string;

  @doc("血液型 (英語表記)")
  blood_type_en: string;

  @doc("身長")
  height: string;

  @doc("身長 (英語表記)")
  height_en: string;

  @doc("体重")
  weight: string;

  @doc("体重 (英語表記)")
  weight_en: string;

  @doc("国籍")
  nationality: string;

  @doc("国籍 (英語表記)")
  nationality_en: string;

  @doc("肩書き")
  occupation: string;

  @doc("肩書き (英語表記)")
  occupation_en: string;

  @doc("キャラ紹介")
  description: string;

  @doc("キャラ紹介 (英語表記)")
  description_en: string;

  @doc("キャラ紹介の引用元")
  description_source: string;

  @doc("キャラ紹介の引用元 (英語表記)")
  description_source_en: string;

  @doc("お気に入りに入れている人の数")
  favorite_characters_count: int32;
}

@doc("シリーズ情報付きキャラクター")
model CharacterWithSeries {
  ...Character;

  @doc("紐づくシリーズ情報")
  series: Series | null;
}
