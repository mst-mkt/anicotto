import { SettingsIcon } from 'lucide-react'
import { MisskeyShareConfig } from './_components/share/misskey'

const SettingsPage = () => (
  <div className="flex flex-col gap-y-8">
    <h1 className="flex items-center gap-x-4 font-bold text-lg">
      <SettingsIcon size={24} className="text-anicotto-accent" />
      設定
    </h1>
    <section className="flex flex-col gap-y-4">
      <h2 className="font-bold">記録の共有</h2>
      <MisskeyShareConfig />
    </section>
  </div>
)

export default SettingsPage
