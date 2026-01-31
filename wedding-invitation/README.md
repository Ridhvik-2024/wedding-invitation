# Privacy-First AI Hindu Wedding Invitation

A serverless web app that generates one-time, AI-personalized Hindu wedding invitation cards.

## Features

- AI-generated invitation cards (no templates)
- Privacy-first: no long-term storage of personal data
- Shareable via unique web links
- No authentication required for viewers
- Fully procedural React rendering (no image generation)

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Vercel-ready serverless deployment

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Environment Variables

Create a `.env.local` file:
```
ANTHROPIC_API_KEY=your_api_key_here
```

### Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build
```bash
npm run build
```

### Deploy

Deploy to Vercel:
```bash
vercel
```

## Project Structure

- `/src/app` - Next.js pages and API routes
- `/src/components` - React components
- `/src/lib` - Business logic, AI, storage, validation
- `/src/styles` - Global styles

## Privacy Model

- User inputs are deleted after card generation
- Only card ID and rendered scene JSON are stored
- No user profiles or tracking cookies
- Cards are immutable after creation

## License

MIT