// Data Storage using LocalStorage
class StorageManager {
  constructor() {
    this.storageKey = 'auctionApp';
  }

  getData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : { auctions: [] };
  }

  saveData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getAuctions() {
    return this.getData().auctions;
  }

  saveAuctions(auctions) {
    const data = this.getData();
    data.auctions = auctions;
    this.saveData(data);
  }

  addAuction(auction) {
    const auctions = this.getAuctions();
    auctions.push(auction);
    this.saveAuctions(auctions);
  }

  updateAuction(auctionId, updatedAuction) {
    const auctions = this.getAuctions();
    const index = auctions.findIndex((a) => a.id === auctionId);
    if (index !== -1) {
      auctions[index] = { ...auctions[index], ...updatedAuction };
      this.saveAuctions(auctions);
    }
  }

  deleteAuction(auctionId) {
    const auctions = this.getAuctions().filter((a) => a.id !== auctionId);
    this.saveAuctions(auctions);
  }

  getAuction(auctionId) {
    return this.getAuctions().find((a) => a.id === auctionId);
  }
}

// Application State
class AppState {
  constructor() {
    this.currentView = 'home';
    this.currentAuctionId = null;
    this.editingAuctionId = null;
    this.editingTeamId = null;
    this.editingPlayerId = null;
  }
}

// Main Application
class AuctionApp {
  constructor() {
    this.storage = new StorageManager();
    this.state = new AppState();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.showView('home');
    this.renderAuctions();
  }

  setupEventListeners() {
    // Navigation
    document.getElementById('backBtn').addEventListener('click', () => this.handleBack());

    // Auction Events
    document.getElementById('createAuctionBtn').addEventListener('click', () => this.showAuctionForm());
    document.getElementById('auctionForm').addEventListener('submit', (e) => this.handleAuctionSubmit(e));
    document.getElementById('cancelAuctionBtn').addEventListener('click', () => this.showView('home'));
    document.getElementById('addRatingBtn').addEventListener('click', () => this.addRatingConfig());
    document.getElementById('deleteAuctionBtn').addEventListener('click', () => this.deleteCurrentAuction());

    // Team Events
    document.getElementById('createTeamBtn').addEventListener('click', () => this.showTeamForm());
    document.getElementById('teamForm').addEventListener('submit', (e) => this.handleTeamSubmit(e));
    document.getElementById('cancelTeamBtn').addEventListener('click', () => this.showAuctionDetail(this.state.currentAuctionId));

    // Player Events
    document.getElementById('createPlayerBtn').addEventListener('click', () => this.showPlayerForm());
    document.getElementById('playerForm').addEventListener('submit', (e) => this.handlePlayerSubmit(e));
    document.getElementById('cancelPlayerBtn').addEventListener('click', () => this.showAuctionDetail(this.state.currentAuctionId));
    document.getElementById('uploadPhotoBtn').addEventListener('click', () => {
      document.getElementById('playerPhoto').click();
    });
    document.getElementById('playerPhoto').addEventListener('change', (e) => this.handlePhotoUpload(e));
    document.getElementById('playerRating').addEventListener('input', (e) => this.updateBasePriceIndicator(e));

    // Tab Events
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
    });
  }

  showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach((view) => view.classList.remove('active'));

    // Show specific view
    const viewMap = {
      home: 'homeView',
      auctionForm: 'auctionFormView',
      auctionDetail: 'auctionDetailView',
      teamForm: 'teamFormView',
      playerForm: 'playerFormView',
    };

    const viewId = viewMap[viewName];
    if (viewId) {
      document.getElementById(viewId).classList.add('active');
    }

    // Update back button
    const backBtn = document.getElementById('backBtn');
    if (viewName === 'home') {
      backBtn.style.display = 'none';
    } else {
      backBtn.style.display = 'inline-block';
    }

    this.state.currentView = viewName;
  }

  handleBack() {
    if (this.state.currentView === 'auctionForm' || this.state.currentView === 'auctionDetail') {
      this.showView('home');
      this.renderAuctions();
    } else if (this.state.currentView === 'teamForm' || this.state.currentView === 'playerForm') {
      this.showAuctionDetail(this.state.currentAuctionId);
    }
  }

  // Auction Management
  showAuctionForm(auctionId = null) {
    this.state.editingAuctionId = auctionId;
    this.showView('auctionForm');

    const form = document.getElementById('auctionForm');
    form.reset();

    document.getElementById('auctionFormTitle').textContent = auctionId ? 'Edit Auction' : 'Create Auction';

    // Clear rating configs
    document.getElementById('ratingPriceConfig').innerHTML = '';

    if (auctionId) {
      const auction = this.storage.getAuction(auctionId);
      if (auction) {
        document.getElementById('auctionName').value = auction.name;
        auction.ratingConfig.forEach((config) => {
          this.addRatingConfig(config);
        });
      }
    } else {
      // Add default rating configs
      this.addRatingConfig({ minRating: 1, maxRating: 3, basePrice: 5 });
      this.addRatingConfig({ minRating: 3.1, maxRating: 6, basePrice: 20 });
      this.addRatingConfig({ minRating: 6.1, maxRating: 8, basePrice: 50 });
      this.addRatingConfig({ minRating: 8.1, maxRating: 10, basePrice: 100 });
    }
  }

  addRatingConfig(config = null) {
    const container = document.getElementById('ratingPriceConfig');
    const configItem = document.createElement('div');
    configItem.className = 'rating-config-item';

    configItem.innerHTML = `
            <div class="rating-input-group">
                <label>Min Rating</label>
                <input type="number" class="minRating" value="${config ? config.minRating : ''}" 
                       min="1" max="10" step="0.1" required>
            </div>
            <div class="rating-input-group">
                <label>Max Rating</label>
                <input type="number" class="maxRating" value="${config ? config.maxRating : ''}" 
                       min="1" max="10" step="0.1" required>
            </div>
            <div class="rating-input-group">
                <label>Base Price (Lakhs)</label>
                <input type="number" class="basePrice" value="${config ? config.basePrice : ''}" 
                       min="0" step="0.1" required>
            </div>
            <button type="button" class="btn-remove" onclick="this.parentElement.remove()">✕</button>
        `;

    container.appendChild(configItem);
  }

  handleAuctionSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('auctionName').value;
    const ratingConfigs = [];

    document.querySelectorAll('.rating-config-item').forEach((item) => {
      const minRating = parseFloat(item.querySelector('.minRating').value);
      const maxRating = parseFloat(item.querySelector('.maxRating').value);
      const basePrice = parseFloat(item.querySelector('.basePrice').value);

      ratingConfigs.push({ minRating, maxRating, basePrice });
    });

    // Sort by minRating
    ratingConfigs.sort((a, b) => a.minRating - b.minRating);

    const auction = {
      id: this.state.editingAuctionId || Date.now().toString(),
      name,
      ratingConfig: ratingConfigs,
      teams: [],
      players: [],
      createdAt: this.state.editingAuctionId
        ? this.storage.getAuction(this.state.editingAuctionId).createdAt
        : new Date().toISOString(),
    };

    if (this.state.editingAuctionId) {
      this.storage.updateAuction(this.state.editingAuctionId, auction);
    } else {
      this.storage.addAuction(auction);
    }

    this.showView('home');
    this.renderAuctions();
  }

  deleteCurrentAuction() {
    if (confirm('Are you sure you want to delete this auction? This action cannot be undone.')) {
      this.storage.deleteAuction(this.state.currentAuctionId);
      this.showView('home');
      this.renderAuctions();
    }
  }

  renderAuctions() {
    const auctions = this.storage.getAuctions();
    const container = document.getElementById('auctionsList');

    if (auctions.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🏏</div>
                    <div class="empty-state-text">No auctions yet</div>
                    <p>Create your first auction to get started!</p>
                </div>
            `;
      return;
    }

    container.innerHTML = auctions
      .map(
        (auction) => `
            <div class="card auction-card" onclick="window.app.showAuctionDetail('${auction.id}')">
                <div class="card-title">${auction.name}</div>
                <div class="auction-info">
                    <div class="info-item">
                        <span class="info-label">Teams:</span>
                        <span class="info-value">${auction.teams.length}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Players:</span>
                        <span class="info-value">${auction.players.length}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Created:</span>
                        <span class="info-value">${new Date(auction.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        `
      )
      .join('');
  }

  showAuctionDetail(auctionId) {
    this.state.currentAuctionId = auctionId;
    const auction = this.storage.getAuction(auctionId);

    if (!auction) {
      this.showView('home');
      return;
    }

    this.showView('auctionDetail');
    document.getElementById('auctionDetailTitle').textContent = auction.name;

    this.renderTeams();
    this.renderPlayers();
    this.switchTab('teams');
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach((content) => {
      content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
  }

  // Team Management
  showTeamForm(teamId = null) {
    this.state.editingTeamId = teamId;
    this.showView('teamForm');

    const form = document.getElementById('teamForm');
    form.reset();

    document.getElementById('teamFormTitle').textContent = teamId ? 'Edit Team' : 'Add Team';

    if (teamId) {
      const auction = this.storage.getAuction(this.state.currentAuctionId);
      const team = auction.teams.find((t) => t.id === teamId);
      if (team) {
        document.getElementById('teamName').value = team.name;
        document.getElementById('teamBudget').value = team.budget;
      }
    }
  }

  handleTeamSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('teamName').value;
    const budget = parseFloat(document.getElementById('teamBudget').value);

    const team = {
      id: this.state.editingTeamId || Date.now().toString(),
      name,
      budget,
      players: [],
    };

    const auction = this.storage.getAuction(this.state.currentAuctionId);

    if (this.state.editingTeamId) {
      const index = auction.teams.findIndex((t) => t.id === this.state.editingTeamId);
      if (index !== -1) {
        auction.teams[index] = { ...auction.teams[index], ...team };
      }
    } else {
      auction.teams.push(team);
    }

    this.storage.updateAuction(this.state.currentAuctionId, auction);
    this.showAuctionDetail(this.state.currentAuctionId);
  }

  deleteTeam(teamId) {
    if (confirm('Are you sure you want to delete this team?')) {
      const auction = this.storage.getAuction(this.state.currentAuctionId);
      auction.teams = auction.teams.filter((t) => t.id !== teamId);
      this.storage.updateAuction(this.state.currentAuctionId, auction);
      this.renderTeams();
    }
  }

  renderTeams() {
    const auction = this.storage.getAuction(this.state.currentAuctionId);
    const container = document.getElementById('teamsList');

    if (auction.teams.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">👥</div>
                    <div class="empty-state-text">No teams yet</div>
                    <p>Add teams to participate in the auction!</p>
                </div>
            `;
      return;
    }

    container.innerHTML = auction.teams
      .map(
        (team) => `
            <div class="card team-card">
                <div class="card-title">${team.name}</div>
                <div class="card-subtitle">Budget: ₹${team.budget} Lakhs</div>
                <div class="info-item">
                    <span class="info-label">Players:</span>
                    <span class="info-value">${team.players.length}</span>
                </div>
                <div class="card-actions">
                    <button class="btn btn-secondary btn-sm" onclick="window.app.showTeamForm('${team.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="window.app.deleteTeam('${team.id}')">Delete</button>
                </div>
            </div>
        `
      )
      .join('');
  }

  // Player Management
  showPlayerForm(playerId = null) {
    this.state.editingPlayerId = playerId;
    this.showView('playerForm');

    const form = document.getElementById('playerForm');
    form.reset();

    document.getElementById('playerFormTitle').textContent = playerId ? 'Edit Player' : 'Add Player';
    document.getElementById('photoPreviewImg').style.display = 'none';

    if (playerId) {
      const auction = this.storage.getAuction(this.state.currentAuctionId);
      const player = auction.players.find((p) => p.id === playerId);
      if (player) {
        document.getElementById('playerName').value = player.name;
        document.getElementById('playerRating').value = player.rating;
        document.getElementById('playerSpeciality').value = player.speciality;

        if (player.photo) {
          const img = document.getElementById('photoPreviewImg');
          img.src = player.photo;
          img.style.display = 'block';
        }

        this.updateBasePriceIndicator({ target: { value: player.rating } });
      }
    }
  }

  handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.getElementById('photoPreviewImg');
        img.src = event.target.result;
        img.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  }

  updateBasePriceIndicator(e) {
    const rating = parseFloat(e.target.value);
    if (!rating) return;

    const auction = this.storage.getAuction(this.state.currentAuctionId);
    const basePrice = this.calculateBasePrice(rating, auction.ratingConfig);

    const indicator = document.getElementById('basePriceIndicator');
    indicator.textContent = `Base price will be ₹${basePrice} Lakhs`;
    indicator.style.color = 'var(--primary-color)';
  }

  calculateBasePrice(rating, ratingConfig) {
    for (const config of ratingConfig) {
      if (rating >= config.minRating && rating <= config.maxRating) {
        return config.basePrice;
      }
    }
    return ratingConfig[0]?.basePrice || 0;
  }

  handlePlayerSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('playerName').value;
    const rating = parseFloat(document.getElementById('playerRating').value);
    const speciality = document.getElementById('playerSpeciality').value;
    const photoImg = document.getElementById('photoPreviewImg');
    const photo = photoImg.style.display !== 'none' ? photoImg.src : null;

    const auction = this.storage.getAuction(this.state.currentAuctionId);
    const basePrice = this.calculateBasePrice(rating, auction.ratingConfig);

    const player = {
      id: this.state.editingPlayerId || Date.now().toString(),
      name,
      rating,
      speciality,
      photo,
      basePrice,
    };

    if (this.state.editingPlayerId) {
      const index = auction.players.findIndex((p) => p.id === this.state.editingPlayerId);
      if (index !== -1) {
        auction.players[index] = { ...auction.players[index], ...player };
      }
    } else {
      auction.players.push(player);
    }

    this.storage.updateAuction(this.state.currentAuctionId, auction);
    this.showAuctionDetail(this.state.currentAuctionId);
    this.switchTab('players');
  }

  deletePlayer(playerId) {
    if (confirm('Are you sure you want to delete this player?')) {
      const auction = this.storage.getAuction(this.state.currentAuctionId);
      auction.players = auction.players.filter((p) => p.id !== playerId);
      this.storage.updateAuction(this.state.currentAuctionId, auction);
      this.renderPlayers();
    }
  }

  renderPlayers() {
    const auction = this.storage.getAuction(this.state.currentAuctionId);
    const container = document.getElementById('playersList');

    if (auction.players.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🏏</div>
                    <div class="empty-state-text">No players yet</div>
                    <p>Add players to the auction pool!</p>
                </div>
            `;
      return;
    }

    container.innerHTML = auction.players
      .map(
        (player) => `
            <div class="card player-card">
                <div class="player-header">
                    ${player.photo ? `<img src="${player.photo}" alt="${player.name}" class="player-photo">` : `<div class="player-photo placeholder">👤</div>`}
                    <div class="player-info-header">
                        <div class="player-name">${player.name}</div>
                        <div class="player-speciality">${player.speciality}</div>
                    </div>
                </div>
                <div class="player-stats">
                    <div class="stat-item">
                        <span class="stat-label">Rating</span>
                        <span class="stat-value">${player.rating}/10</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Base Price</span>
                        <span class="stat-value">₹${player.basePrice}L</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-secondary btn-sm" onclick="window.app.showPlayerForm('${player.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="window.app.deletePlayer('${player.id}')">Delete</button>
                </div>
            </div>
        `
      )
      .join('');
  }
}

// Initialize the app
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new AuctionApp();
  });
}
