# Bias Photo FE

FS12 중급 프로젝트 - 프론트엔드 최애의 포토

## Tech Stack

- Next.js
- JavaScript
- Tailwind CSS
- React Query

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Branch Strategy

- `main`: production-ready branch
- `dev`: shared development branch
- `feature/*`: feature branches created from `dev`

Create a feature branch from `dev`:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/feature-name
```
