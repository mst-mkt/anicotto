import { SettingsIcon } from 'lucide-react'
import { RevalidateButton } from './_components/cache/revalidate-button'
import { DiscordShareConfig } from './_components/share/discord'
import { MisskeyShareConfig } from './_components/share/misskey'

const SettingsPage = () => (
  <div className="flex flex-col gap-y-8">
    <h1 className="flex items-center gap-x-4 font-bold text-lg">
      <SettingsIcon className="text-anicotto-accent" size={24} />
      設定
    </h1>
    <section className="flex flex-col gap-y-8">
      <hgroup>
        <h2 className="font-bold">アクティビティの共有</h2>
        <span className="text-muted-foreground text-sm">
          記録や視聴ステータスの更新を他のサービスに共有します。
        </span>
      </hgroup>
      <MisskeyShareConfig />
      <DiscordShareConfig />
    </section>
    <section className="flex flex-col gap-y-8">
      <hgroup>
        <h2 className="font-bold">キャッシュ</h2>
        <span className="text-muted-foreground text-sm">
          AnnictのAPIから取得したデータがキャッシュされています。
          <br />
          データが古い場合は、こちらからキャッシュを再検証できます。
        </span>
      </hgroup>
      <RevalidateButton />
    </section>
  </div>
)

export default SettingsPage
