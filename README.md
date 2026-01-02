# RoomTuner

An experimental acoustic room analysis tool that helps you optimize your listening space with retro vibes and modern analysis.

## What is RoomTuner?

RoomTuner is a web application designed to analyze and provide recommendations for improving the acoustic properties of your room. Whether you're setting up a music listening space, a practice room for your instrument, or a focused work environment, RoomTuner guides you through a step-by-step analysis of your space and delivers actionable recommendations.

## What It Does

1. **Guided Analysis Flow** - Walks you through collecting key information about your space:
   - Your primary goal (music listening, instrument practice, or focused work)
   - Room type and dimensions
   - Surface materials (floors, walls)
   - Equipment and furniture placement
   - Ambient noise levels

2. **Smart Recommendations** - Provides tiered suggestions based on your specific room:
   - **Free changes** - No-cost adjustments you can make immediately
   - **Low-budget improvements** - Affordable upgrades for better acoustics
   - **Advanced solutions** - Professional-grade enhancements for serious audio enthusiasts

3. **Retro-Inspired Interface** - Features a terminal-style UI with an orange retro aesthetic that makes acoustic analysis fun and engaging.

## Tech Stack

- **Framework:** Next.js 16.0 with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom retro theme
- **State Management:** Zustand
- **UI Components:** Radix UI primitives
- **Deployment:** Vercel

## Project Structure

```
app/
├── page.tsx              # Landing page
├── objetivo/             # Goal selection
├── sala/                 # Room type selection
├── medicion/             # Measurements input
├── disposicion/          # Equipment layout
├── muebles/              # Furniture selection
├── analizando/           # Analysis loading screen
├── resultado/            # Results and recommendations
├── api/
│   └── analyze-room/     # Analysis API endpoint
└── types/
    └── room.ts           # TypeScript definitions

lib/
└── roomStore.ts          # Zustand state management

components/               # Reusable UI components
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- (Optional) N8N webhook URL for external analysis engine

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd v0-room-tuner-mvp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your configuration:
```bash
N8N_ANALYZE_ROOM_WEBHOOK_URL=your_webhook_url_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **User Input Collection** - The app guides users through several screens to collect room data (dimensions, materials, layout, furniture)

2. **Analysis Request** - All collected data is sent to the `/api/analyze-room` endpoint

3. **External Processing** - The API forwards the request to an N8N workflow (or uses fallback logic if not configured)

4. **Results Display** - Recommendations are displayed in an organized, tiered format based on effort/budget

## Configuration

### Environment Variables

- `N8N_ANALYZE_ROOM_WEBHOOK_URL` - URL of your N8N webhook for room analysis (optional - falls back to generic recommendations if not set)

## Current Status

This is a **beta/experimental MVP**. The initial analysis provides approximate recommendations based on basic acoustic principles. The interface and user experience are fully functional, with room for expansion in analysis sophistication.

### Known Limitations

- Room diagram visualization is planned but not yet implemented
- Project save functionality is pending
- Analysis accuracy depends on external N8N workflow configuration

## Roadmap

- [ ] Room diagram/3D visualization
- [ ] User authentication and project saving
- [ ] Export reports to PDF
- [ ] Share projects via link
- [ ] Enhanced acoustic analysis algorithms
- [ ] Integration with acoustic measurement tools
- [ ] Multi-language support

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Contributing

This project is currently in experimental MVP stage. Contributions, issues, and feature requests are welcome!

## Acknowledgments

Built with [v0.app](https://v0.app) and deployed on [Vercel](https://vercel.com).
