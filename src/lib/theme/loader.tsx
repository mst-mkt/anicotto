export const ThemeLoader = () => (
  <script
    // biome-ignore lint/security/noDangerouslySetInnerHtml: only used to set initial theme
    dangerouslySetInnerHTML={{
      __html: `
            const theme = localStorage.getItem('anicotto:theme')
            document.documentElement.classList.add(theme ?? 'light')
        `,
    }}
  />
)
