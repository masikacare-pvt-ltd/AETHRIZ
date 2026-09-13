# AETHRIZ

> **Bio-Algorithmic Health Platform** — A cutting-edge React web application showcasing advanced CSS animations, 3D transformations, and interactive UI components.

![Project Status](https://img.shields.io/badge/status-portfolio%20demo-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)

## 🚀 Quick Start

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## 📦 Project Structure

```
AETHRIZ/
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── styles/          # Global CSS
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── index.html           # HTML template
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## ✨ Features

- **3D Interactive Elements** - DNA reactor with mouse-tracking tilt effects
- **Custom Cursor** - Magnetic cursor with trailing animation
- **Scroll Animations** - Cinematic reveal effects using Intersection Observer
- **Live Data Telemetry** - Real-time animated data visualizations
- **Glassmorphism UI** - Modern frosted glass navigation and cards
- **Responsive Design** - Optimized for desktop (mobile optimizations needed)

## 🛠️ Tech Stack

- **React 18.3** - UI library
- **Vite 5.4** - Build tool and dev server
- **Vanilla CSS** - Custom animations and styling
- **FontAwesome 6.4** - Icons
- **Google Fonts** - Inter, Playfair Display, JetBrains Mono

## 🎨 Custom Hooks

- `useReveal` - Intersection Observer for scroll-triggered animations
- `useMagneticHover` - Magnetic displacement effect on hover
- `useTilt3D` - 3D perspective tilt based on mouse position

## ⚠️ Known Issues & Limitations

See [BRUTAL_CODE_REVIEW.md](./BRUTAL_CODE_REVIEW.md) for a comprehensive analysis of code quality, performance, and accessibility issues.

**Critical Issues:**
- Missing error boundaries
- Accessibility needs improvement (keyboard navigation, ARIA labels, focus indicators)
- Hardcoded `/login` route (404 error)
- No TypeScript type safety
- Hooks re-run on every render (performance optimization needed)

## 🔮 Roadmap

- [ ] Add TypeScript
- [ ] Implement error boundaries
- [ ] Fix accessibility issues (WCAG AA compliance)
- [ ] Add React Router for proper navigation
- [ ] Implement backend API integration
- [ ] Add unit and integration tests
- [ ] Mobile responsive improvements
- [ ] Performance optimization (code splitting, lazy loading)

## 📄 License

This is a portfolio/demonstration project.

## 👤 Author

Portfolio demonstration of advanced frontend techniques.

---

**Note:** This is a portfolio demonstration project showcasing frontend development skills. Not production-ready without addressing issues documented in BRUTAL_CODE_REVIEW.md.