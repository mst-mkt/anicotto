import "./organization.tsp";
import "./person.tsp";
import "./work.tsp";

using TypeSpec.OpenAPI;

namespace Annict.Models;

@doc("スタッフ")
model Staff {
  @doc("ID")
  id: int32;

  @doc("名前")
  name: string;

  @doc("名前 (英語表記)")
  name_en: string;

  @doc("担当")
  role_text: string;

  @doc("その他の担当")
  role_other: string;

  @doc("その他の担当 (英語表記)")
  role_other_en: string;

  @doc("ソート番号")
  sort_number: int32;
}

@doc("作品・人物情報付きスタッフ")
model StaffWithPerson {
  ...Staff;

  @doc("紐づく作品情報")
  work: Work;

  @doc("紐づく人物情報")
  person: Person;
}

@doc("作品・団体情報付きスタッフ")
model StaffWithOrganization {
  ...Staff;

  @doc("紐づく作品情報")
  work: Work;

  @doc("紐づく団体情報")
  organization: Organization;
}

@doc("作品・人物または団体情報付きスタッフ")
@oneOf
union StaffWithInfo {
  @doc("人物に紐づくスタッフ")
  withPerson: StaffWithPerson,

  @doc("団体に紐づくスタッフ")
  withOrganization: StaffWithOrganization,
}
