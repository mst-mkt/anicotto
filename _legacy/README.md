# 🧣 Anicotto

Third-party Annict web client with Next.js.

Available at [anicotto.vercel.app](https://anicotto.vercel.app).

## Development

### Requirements

- Node.js
- pnpm

### Setup

1. Clone this repository
2. Install dependencies: `pnpm install`
3. Set [environment variables](#environment-variables): `cp .env.local.example .env.local` and edit `.env.local`

### Development

Start development server

```bash
pnpm dev
```

with https

```bash
pnpm dev:https
```

### Commands

- `pnpm dev`: Start development server
- `pnpm dev:https`: Start development server with https
- `pnpm build`: Build
- `pnpm check`: Check Lint and Format
- `pnpm fix`: Fix Lint and Format
- `pnpm typecheck`: Type check

### Environment Variables

- `BASE_URL`: Next.js base URL (default: `http://localhost:3000`)
- `ANNICT_CLIENT_ID`: [Annict OAuth](https://annict.com/oauth/applications) client ID
- `ANNICT_CLIENT_SECRET`: [Annict OAuth](https://annict.com/oauth/applications) client secret
- `SPOTIFY_CLIENT_ID`: [Spotify OAuth](https://developer.spotify.com/dashboard/applications) client ID
- `SPOTIFY_CLIENT_SECRET`: [Spotify OAuth](https://developer.spotify.com/dashboard/applications) client secret
- `AUTH_SECRET`: Secret for Auth.js (generate with `pnpx auth secret --raw`)
