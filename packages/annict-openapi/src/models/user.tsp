namespace Annict.Models;

@doc("ユーザ")
model User {
  @doc("ユーザID")
  id: int32;

  @doc("URLなどで使用されているユーザ名")
  username: string;

  @doc("ユーザの名前")
  name: string;

  @doc("プロフィール")
  description: string;

  @doc("ユーザのURL")
  url: string | null;

  @doc("アバター画像")
  avatar_url: string;

  @doc("背景画像")
  background_image_url: string;

  @doc("記録数")
  records_count: int32;

  @doc("ユーザがフォローしている人の数")
  followings_count: int32;

  @doc("ユーザをフォローしている人の数")
  followers_count: int32;

  @doc("ステータスを「見たい」にしている作品の数")
  wanna_watch_count: int32;

  @doc("ステータスを「見てる」にしている作品の数")
  watching_count: int32;

  @doc("ステータスを「見た」にしている作品の数")
  watched_count: int32;

  @doc("ステータスを「中断」にしている作品の数")
  on_hold_count: int32;

  @doc("ステータスを「中止」にしている作品の数")
  stop_watching_count: int32;

  @doc("ユーザ登録した日時")
  created_at: utcDateTime;
}

@doc("自分のユーザ情報")
model Me {
  ...User;

  @doc("ユーザのメールアドレス")
  email: string;

  @doc("通知数")
  notifications_count: int32;
}
