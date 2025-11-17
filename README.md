# 🏏 Auction App - IPL Style

A modern, mobile-friendly auction application that runs locally in your browser. Perfect for organizing IPL-style player auctions with teams, players, and configurable pricing based on ratings.

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
- Clean, professional design
- Fully responsive and mobile-friendly
- Tab-based navigation within auctions
- Empty state messages for better user experience
- Smooth transitions and hover effects
- Card-based layouts

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or dependencies required!

### Running the App

1. Clone the repository:
```bash
git clone https://github.com/arindam89/auction-app.git
cd auction-app
```

2. Open `index.html` in your web browser:
   - **Option 1**: Double-click the `index.html` file
   - **Option 2**: Use a local web server:
     ```bash
     # Python 3
     python -m http.server 8080
     
     # Python 2
     python -m SimpleHTTPServer 8080
     
     # Node.js
     npx http-server
     ```
   - **Option 3**: Use VS Code Live Server extension

3. Start using the app! 🎉

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
- **Frontend**: Pure vanilla JavaScript (no frameworks)
- **Storage**: Browser localStorage API
- **Design**: Single-page application (SPA) architecture
- **Styling**: Custom CSS with CSS Grid and Flexbox

### File Structure
```
auction-app/
├── index.html      # Main HTML structure
├── styles.css      # Responsive CSS styles
├── app.js          # JavaScript application logic
└── README.md       # Documentation
```

### Browser Compatibility
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### Data Storage
All data is stored in localStorage as JSON:
- Auctions with teams and players
- Player photos encoded as base64 strings
- Rating configurations

## 🎨 Screenshots

### Home View
![Home View](https://github.com/user-attachments/assets/4920d8b3-34bc-45f1-8fb8-700a0180e252)

### Create Auction
![Create Auction](https://github.com/user-attachments/assets/44bbfe75-29f7-4f6c-a03b-704850e3a5af)

### Auction Detail
![Auction Detail](https://github.com/user-attachments/assets/dfcd1d44-209d-443d-af0e-91d944563e9e)

### Add Player
![Add Player](https://github.com/user-attachments/assets/0f56f6a4-81e0-4927-8ed6-c3be340e45e3)

### Player Card
![Player Card](https://github.com/user-attachments/assets/834655d0-699a-4e1b-bb18-df72e1d4bda7)

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
- Built with modern web standards
- Designed for simplicity and ease of use
