import { SettingsIcon } from 'lucide-react'
import { MisskeyShareConfig } from './_components/share/misskey'

const SettingsPage = () => (
  <div className="flex flex-col gap-y-8">
    <h1 className="flex items-center gap-x-4 font-bold text-lg">
      <SettingsIcon size={24} className="text-anicotto-accent" />
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
    </section>
  </div>
)

export default SettingsPage
