# 🏏 Auction App - IPL Style (Astro)

A modern, mobile-friendly auction application built with Astro. Perfect for organizing IPL-style player auctions with teams, players, and configurable pricing based on ratings.

## ✨ Features

### 🎯 Auction Management
- Create and manage multiple auctions
- Configure rating-to-base-price mappings (e.g., Rating 8.1-10 → ₹100 Lakhs)
- Dynamically add/edit/delete rating ranges
- View auction statistics (teams count, players count)

### 👥 Team Management
- Add teams to auctions with custom names and budgets
- Edit and delete teams
- Track team budgets in Lakhs (Indian currency format)

### 🏏 Player Management
- Create detailed player profiles with photo uploads
- Set player ratings (1-10 scale) that automatically calculate base prices
- Select player specialities:
  - Batsman
  - Bowler
  - All-rounder
  - Wicket-keeper
- View player cards with rating and auto-calculated base price
- Edit and delete players

### 💾 Data Persistence
- All data stored in browser localStorage
- Persists across browser sessions
- No backend or server required - completely local
- Works offline

### 📱 Modern UI/UX
- Built with Astro for optimal performance
- Clean, professional design
- Fully responsive and mobile-friendly
- Tab-based navigation within auctions
- Empty state messages for better user experience
- Smooth transitions and hover effects
- Card-based layouts

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arindam89/auction-app.git
cd auction-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:4321`

### Build for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist/` directory. You can preview the production build with:
```bash
npm run preview
```

## 📖 How to Use

### Creating an Auction

1. Click the **"+ Create Auction"** button on the home page
2. Enter an auction name (e.g., "IPL 2024 Mega Auction")
3. Configure rating-to-price mappings:
   - Default ranges are provided (1-3: ₹5L, 3.1-6: ₹20L, 6.1-8: ₹50L, 8.1-10: ₹100L)
   - Click **"+ Add Rating Range"** to add more ranges
   - Click **✕** to remove a range
4. Click **"Save Auction"**

### Adding Teams

1. Click on an auction to view details
2. Navigate to the **Teams** tab (default)
3. Click **"+ Add Team"**
4. Enter team name and budget (in Lakhs)
5. Click **"Save Team"**

### Adding Players

1. In the auction detail view, switch to the **Players** tab
2. Click **"+ Add Player"**
3. Fill in player details:
   - **Name**: Player's full name
   - **Rating**: 1-10 scale (base price calculates automatically)
   - **Photo**: Click "Choose Photo" to upload an image
   - **Speciality**: Select from dropdown
4. Click **"Save Player"**

### Managing Data

- **Edit**: Click the "Edit" button on any auction, team, or player card
- **Delete**: Click the "Delete" button (with confirmation)
- **Navigate**: Use the "← Back" button to return to previous views

## 🛠️ Technical Details

### Architecture
- **Framework**: Astro 5.x
- **Frontend**: Vanilla JavaScript with Astro components
- **Storage**: Browser localStorage API
- **Build**: Vite (integrated with Astro)
- **Styling**: Scoped CSS with global styles

### File Structure
```
auction-app/
├── src/
│   ├── components/
│   │   └── AuctionApp.js    # Main application logic
│   ├── layouts/
│   │   └── Layout.astro     # Base layout with global styles
│   └── pages/
│       └── index.astro      # Main page
├── public/                  # Static assets
├── astro.config.mjs         # Astro configuration
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Browser Compatibility
- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

### Data Storage
All data is stored in localStorage as JSON:
- Auctions with teams and players
- Player photos encoded as base64 strings
- Rating configurations

## 🔒 Privacy & Security

- All data is stored locally in your browser
- No data is sent to any server
- No analytics or tracking
- Photos are stored as base64 in localStorage

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by IPL (Indian Premier League) auction format
- Built with [Astro](https://astro.build)
- Designed for simplicity and ease of use
