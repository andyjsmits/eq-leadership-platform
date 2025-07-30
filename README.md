# EQ Leadership Platform

Emotional Intelligence toolkit for nonprofit and church leaders with Firebase authentication and progress tracking.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- NPM or Yarn
- Firebase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/andyjsmits/eq-leadership-platform.git
cd eq-leadership-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase** (See [Firebase Setup Guide](FIREBASE_SETUP.md))
   - Create Firebase project
   - Enable Authentication (Email/Password and Google)
   - Set up Firestore database
   - Update `src/firebase-config.js` with your config

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
   - Development server will start at `http://localhost:3000`
   - The page will automatically open in your default browser

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build locally

# Firebase
npm run firebase:serve   # Serve using Firebase hosting emulator
npm run firebase:deploy  # Deploy to Firebase hosting
```

## 🏗️ Project Structure

```
eq-leadership-platform/
├── src/
│   ├── firebase-config.js    # Firebase configuration & auth functions
│   └── main.js              # Main application entry point
├── public/                  # Static assets (if any)
├── index.html              # Landing page
├── auth.html               # Authentication page
├── dashboard.html          # User dashboard
├── eq-toolkit.html         # EQ toolkit overview
├── *-exercises.html        # Exercise category pages
├── exercise-*.html         # Individual exercise pages
├── styles.css              # Main stylesheet
├── auth-styles.css         # Authentication page styles
├── dashboard-styles.css    # Dashboard styles
├── toolkit-styles.css      # Toolkit page styles
├── script.js               # Legacy JavaScript (being phased out)
├── vite.config.js          # Vite configuration
├── package.json            # NPM dependencies and scripts
└── FIREBASE_SETUP.md       # Detailed Firebase setup instructions
```

## 🔥 Firebase Features

### Authentication
- ✅ Email/Password sign-up and sign-in
- ✅ Google OAuth authentication
- ✅ User profile management
- ✅ Password reset functionality
- ✅ Authentication state management

### Database (Firestore)
- ✅ User profiles and preferences
- ✅ Exercise progress tracking
- ✅ EQ assessment results storage
- ✅ Learning streak tracking
- ✅ Activity logging

### Security
- ✅ Firestore security rules
- ✅ User data isolation
- ✅ Secure authentication flows

## 🎯 Key Features

### Landing Page
- Professional design for nonprofit/church leaders
- Pricing tiers and testimonials
- Problem-solution framework
- Call-to-action optimization

### Authentication System
- Dual sign-in/sign-up forms
- Google OAuth integration
- Error handling and validation
- Responsive design

### User Dashboard
- Personalized welcome and statistics
- EQ score visualization
- Current exercise progress
- Learning recommendations
- Activity timeline
- Quick actions

### EQ Toolkit
- 4 core EQ components
- 20 progressive exercises
- Difficulty levels (Entry → Advanced)
- Implementation strategies
- Success principles

### Exercise System
- Detailed exercise instructions
- Progress tracking
- Interactive elements
- Mobile-optimized design

## 🛠️ Development

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: Vite
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Hosting**: Firebase Hosting / GitHub Pages
- **Package Manager**: NPM

### Code Organization
- Modular JavaScript with ES6 imports/exports
- Separation of concerns (auth, database, UI)
- Responsive CSS with CSS Grid and Flexbox
- Progressive enhancement approach

### Browser Support
- Modern browsers with ES6+ support
- Mobile-responsive design
- Progressive Web App features

## 🚀 Deployment

### Firebase Hosting
```bash
# Build for production
npm run build

# Deploy to Firebase
npm run firebase:deploy
```

### GitHub Pages
The site is automatically deployed to GitHub Pages when you push to the main branch.

### Custom Domain
Update Firebase Hosting settings or GitHub Pages settings to use your custom domain.

## 📊 Analytics & Monitoring

- Firebase Analytics integration
- User engagement tracking
- Exercise completion rates
- Authentication success rates

## 🔒 Security & Privacy

- GDPR compliant data handling
- Secure user authentication
- Data encryption in transit and at rest
- Privacy-focused design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Check the [Firebase Setup Guide](FIREBASE_SETUP.md) for configuration help
- Review browser console for error messages
- Ensure Firebase project is properly configured
- Verify all dependencies are installed

## 🎉 Acknowledgments

- Firebase team for the excellent backend-as-a-service platform
- Vite team for the fast build tool
- EQ research from Daniel Goleman, Brené Brown, and other experts
- The nonprofit and church leadership community for inspiration