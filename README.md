
# Gender Equity Intelligence Platform (GEIP) - Shield

<div align="center">

![GEIP Logo](https://img.shields.io/badge/Gender%20Equity-Intelligence%20Platform-blue?style=flat-square)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime%20DB-FFCA28?logo=firebase&logoColor=white)](https://firebase.google.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**A data-driven web application designed to identify, analyze, and address gender inequality across Indian regions through interactive dashboards, advanced analytics, and AI-powered insights.**

[Features](#key-features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Project Structure](#project-structure) • [Documentation](#documentation)

</div>

---

## Overview

The **Gender Equity Intelligence Platform (GEIP)** is a comprehensive system that transforms public gender-related data into actionable insights. The platform visualizes gender inequality through interactive risk maps, advanced analytics dashboards, and evidence-based intervention recommendations—empowering policymakers, NGOs, and communities to drive gender equality initiatives.

### Problem Statement

Many Indian regions experience severe gender inequality through:
- **Skewed sex ratios** affecting population demographics
- **Low female literacy rates** limiting educational opportunities
- **High child marriage rates** violating girls' rights
- **Low female workforce participation** excluding women from economic opportunities
- **Limited access to education and resources** perpetuating cycles of disadvantage

These critical issues often remain hidden due to the lack of centralized, data-driven analysis tools. **GEIP** bridges this gap by providing comprehensive gender equity analysis.

### Mission

Build a technology platform that:
- 📊 Detects and visualizes gender imbalance across districts and states
- 📈 Provides data-driven analytics for informed decision-making
- 🎯 Supports NGOs in planning targeted interventions
- 🌍 Raises awareness and empowers communities
- 🤖 Leverages AI for personalized guidance and support

---

## Key Features

### 1. **Interactive Gender Risk Map** 🗺️

Explore an interactive geographic dashboard displaying regions color-coded by gender risk level:
- **Risk Levels**: Low, Moderate, High, Critical
- **District Drill-Down**: Click any district to view detailed indicators
- **Real-Time Filtering**: Filter by state, risk level, and indicator types
- **Visual Indicators**:
  - Gender risk score
  - Sex ratio (per 1000 males)
  - Female literacy rate
  - Child marriage rate
  - Female labor participation

**Technology**: React-Leaflet, Leaflet.js, Firebase Realtime Database

---

### 2. **Comprehensive Region Analysis Dashboard** 📊

Analyze detailed metrics for any district across multiple dimensions:

#### Demographic Indicators
- Total population, male/female births, sex ratio trends

#### Education Indicators
- Female literacy rate
- Male literacy rate
- Girl school dropout rates
- Education accessibility index

#### Social Indicators
- Child marriage rates
- Maternal health index
- Gender-based violence statistics

#### Economic Indicators
- Female labor force participation
- Women-owned businesses
- Average wage gap

#### Safety Indicators
- Crimes against women
- Domestic violence reports
- Women's safety index

---

### 3. **Advanced Data Insights & Analytics** 📈

Visual analytics dashboards providing trend analysis and comparative insights:
- **Sex Ratio Trends**: Historical analysis (2018-2023+)
- **Literacy Gap Analysis**: Male vs. female literacy progression
- **Female Labor Participation**: State-wise and sector-wise breakdowns
- **Child Marriage Statistics**: Prevalence and trend tracking
- **Custom Filtering**: Filter by state to focus on specific regions

**Technology**: Recharts, responsive data visualization, mock trend data

---

### 4. **AI-Powered Sakhi Assistant** 🤖

A warm, empowering AI companion powered by Google Gemini API:
- **Multi-Language Support**: English, Hindi, and Hinglish (Roman-script Hindi)
- **Core Topics**:
  - Sex ratio and demographics
  - Girl child education and scholarships
  - Women's employment and wage gaps
  - Maternal health and nutrition
  - Safety and violence prevention (with helpline numbers)
  - Government welfare schemes
  - Women empowerment initiatives
- **Features**:
  - Voice I/O using Web Speech API (browser-native, no external dependency)
  - Compassionate and solution-oriented tone
  - Real-time responses with accurate Indian context
  - Out-of-scope handling for off-topic queries

**Technology**: Google Gemini API, Web Speech API, Express.js Backend

---

### 5. **Community Awareness Portal** 🌟

Educational resources and articles promoting gender equality:
- **12+ Articles** covering key gender equity topics
- **Category-Based Navigation**: Filter by topic (education, legal rights, health, etc.)
- **Target Audience Segmentation**: Content tailored for parents, citizens, policymakers, NGOs, educators, and health workers
- **Topics Include**:
  - Why girl child education matters
  - Legal framework against child marriage
  - Bridging the employment gap
  - Government welfare schemes
  - Women's self-help groups (SHGs)
  - Digital literacy for girls
  - Maternal health and gender development

---

### 6. **Girl Child Future Planner** 🌸

Interactive lifecycle planner with government scheme recommendations:
- **5 Life Stages**:
  - Birth → Marriage (Age 0–25)
  - Basic Education (Age 5–14)
  - Higher Education (Age 14–25)
  - Career & Growth (Age 18–40)
  - Lifetime Plan (Age 0–60+)
- **Scheme Database**: 40+ central and state government schemes
- **Personalized Recommendations**: Filter by state and life stage
- **Scheme Details**: Names, benefits, eligibility criteria, official links

---

### 7. **NGO Collaboration Platform** 🤝

Specialized interface for NGOs to:
- Identify high-risk districts for intervention
- Track ongoing intervention programs
- Monitor program impact and outcomes
- Collaborate with government initiatives
- Access data for evidence-based planning

---

### 8. **Data Sources & Transparency** 📚

Comprehensive documentation of all data sources:
- Census of India data
- National Family Health Survey (NFHS)
- UDISE+ (Unified District Information System for Education)
- National Crime Records Bureau (NCRB)
- Government social welfare program databases

---

### 9. **Additional Features**

- **Leaderboard Dashboard**: District rankings by equity metrics
- **Help & Support Box**: Contextual assistance throughout the platform
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Role-Based Access Control**: Different views for citizens, government officials, and NGO staff
- **Authentication**: Secure user login with Firebase

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.4 | UI framework |
| **React Router** | 7.13.1 | Client-side routing |
| **React-Leaflet** | 5.0.0 | Interactive mapping |
| **Leaflet** | 1.9.4 | Mapping library |
| **Recharts** | 3.8.0 | Data visualization |
| **Firebase** | ^12.10.0 | Backend & authentication |
| **React-CountUp** | 6.5.3 | Animated counters |
| **React Intersection Observer** | 10.0.3 | Performance optimization |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | - | Runtime environment |
| **Express.js** | 4.18.2 | Web server framework |
| **Google GenAI** | 1.0.0 | Gemini API client |
| **CORS** | 2.8.5 | Cross-origin requests |
| **dotenv** | 16.0.0 | Environment variable management |
| **Nodemon** | 3.1.14 | Development auto-reload |

### Database & Services
| Service | Purpose |
|---------|---------|
| **Firebase Firestore** | Real-time NoSQL database |
| **Firebase Authentication** | User authentication |
| **Firebase Realtime Database** | Live data synchronization |
| **Google Gemini API** | AI-powered chat assistant |

### Development Tools
| Tool | Purpose |
|------|---------|
| **React Scripts** | Build & testing framework |
| **Jest** | Testing framework |
| **React Testing Library** | Component testing |
| **ESLint** | Code quality |

---

## Project Structure

```
shield/
├── frontend/                          # React SPA
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── App.js                    # Main routing component
│   │   ├── App.css                   # Global styles
│   │   ├── firebase.js               # Firebase configuration
│   │   ├── index.js                  # React entry point
│   │   │
│   │   ├── components/               # Reusable UI components
│   │   │   ├── Navbar/               # Navigation header
│   │   │   ├── Footer/               # Footer component
│   │   │   ├── ProtectedRoute.js     # Auth middleware
│   │   │   └── ui/                   # UI component library
│   │   │       ├── Components.js     # Card, Badge, button components
│   │   │       └── ui.css
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js        # Authentication state management
│   │   │
│   │   ├── data/                     # Static data & helpers
│   │   │   ├── articles.js           # Awareness portal articles
│   │   │   ├── datasets.js           # Dataset metadata
│   │   │   ├── interventions.js      # Intervention recommendations
│   │   │   ├── regions.js            # Districts & risk data
│   │   │   └── users.js              # Mock user data
│   │   │
│   │   ├── Firebase/
│   │   │   ├── GetData.js            # Firestore queries
│   │   │   └── key.json              # Firebase config (secure)
│   │   │
│   │   ├── pages/                    # Page components
│   │   │   ├── Home/                 # Hero landing page
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── RiskMap/              # Interactive gender risk map
│   │   │   ├── RegionAnalysis/       # District detail dashboard
│   │   │   ├── DataInsights/         # Analytics & trends
│   │   │   ├── Awareness/            # Community education portal
│   │   │   ├── ChatBot/              # Sakhi AI assistant
│   │   │   ├── DataSources/          # Data source documentation
│   │   │   ├── FuturePlanner.jsx     # Girl child lifecycle planner
│   │   │   ├── leaderboard/          # District rankings
│   │   │   ├── NGO/                  # NGO collaboration platform
│   │   │   └── HelpBox.jsx           # Help & support
│   │   │
│   │   ├── styles/
│   │   │   └── variables.css         # Design tokens (colors, spacing)
│   │   │
│   │   └── assets/                   # Images & media
│   │
│   ├── package.json
│   ├── dnyanesh.jsx                  # Note file
│   └── README.md
│
├── server/                            # Node.js backend
│   ├── server.js                     # Express server entry point
│   │                                  # API endpoints:
│   │                                  # POST /api/chat - Sakhi AI endpoint
│   ├── package.json
│   └── .env                          # Environment variables (GEMINI_API_KEY)
│
├── package.json                      # Monorepo root
└── README.md                         # This file
```

---

## Getting Started

### Prerequisites

- **Node.js** 16+ and npm 8+
- **Git** for version control
- **Firebase Account** (for real-time database and authentication)
- **Google Gemini API Key** (for AI chat feature)

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/1510darshan/SHEILD.git
cd SHEILD

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment Variables

#### Frontend (.env)
Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:3001
```

#### Backend (.env)
Create `server/.env`:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

### 3. Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Copy `frontend/src/firebase.js` and update with your Firebase config
3. Enable Firestore Database and Authentication
4. Populate Firestore with district data (schema in `frontend/src/data/regions.js`)

### 4. Run Development Servers

#### Terminal 1: Frontend
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

#### Terminal 2: Backend
```bash
cd server
npm run dev  # Uses nodemon for auto-reload
# Runs on http://localhost:3001
```

The frontend will automatically proxy API requests to the backend.

### 5. Build for Production

```bash
# Build frontend
cd frontend
npm run build  # Creates `frontend/build` folder

# Production backend
cd server
npm start
```

---

## Usage Guide

### For Citizens & Community Members
1. **Explore Home Page**: Understand the platform's mission and impact
2. **View Risk Map**: Explore your district's gender equity status
3. **Read Awareness Content**: Access educational articles on gender equality
4. **Chat with Sakhi**: Ask questions in English, Hindi, or Hinglish

### For Policymakers & Government Officials
1. **Login** with admin credentials
2. **Access Region Analysis**: Dive deep into district-specific metrics
3. **Review Data Insights**: Analyze trends across states
4. **Monitor Interventions**: Track government programs and outcomes

### For NGO Organizations
1. **Login** with NGO credentials
2. **Use NGO Platform**: Identify high-risk districts for intervention
3. **Review Intervention Recommendations**: Get evidence-based suggestions
4. **Track Program Impact**: Monitor program metrics and effectiveness
5. **Export Data**: Generate reports for stakeholders

### For Researchers & Data Analysts
1. Access **Data Sources** for dataset documentation
2. Export filtered data for analysis
3. Review methodology and data quality indicators

---

## API Documentation

### Backend Endpoints

#### Sakhi AI Chat
```
POST /api/chat
Content-Type: application/json

Request Body:
{
  "message": "Tell me about girl education in India",
  "history": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Previous response" }
  ]
}

Response:
{
  "reply": "Detailed response from Sakhi AI"
}
```

**Features**:
- Multi-language support (English, Hindi, Hinglish)
- Context-aware responses
- Gender equity domain expertise
- Safe, empowering tone

#### Firestore Collections

**districts** (Real-time data)
```javascript
{
  region_id: 1,
  district_name: "Indore",
  state_name: "Madhya Pradesh",
  risk_level: "Low",
  sex_ratio: 955,
  female_literacy: 75.2,
  male_literacy: 88.5,
  child_marriage_rate: 15.3,
  female_labor_participation: 28.4,
  crimes_against_women: 145,
  lat: 22.7196,
  lng: 75.8577
}
```

---

## Data Model

### Risk Level Calculation

Risk levels are determined by a composite score:

```
Risk Score = (sex_ratio_deviation + literacy_gap + child_marriage_rate + 
              labor_gap + crime_index) / 5

Low:       Score < 30
Moderate:  Score 30-50
High:      Score 50-70
Critical:  Score > 70
```

### Gender Indicators

| Indicator | Source | Frequency | Units |
|-----------|--------|-----------|-------|
| Sex Ratio | Census | 5 years | Per 1000 males |
| Female Literacy | Census + UDISE+ | Annual | Percentage |
| Child Marriage Rate | NFHS | 3-5 years | Percentage |
| Female Labor Participation | PLFS | Annual | Percentage |
| Crimes Against Women | NCRB | Annual | Count per 100k |
| Maternal Mortality | RGI | Annual | Per 100k live births |

---

## Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Use **React functional components** with hooks
- Follow **ESLint** configuration
- Write **descriptive commit messages**
- Add **comments** for complex logic
- Test **responsive design** on mobile/tablet/desktop

### Areas for Contribution

- 📊 Data visualization enhancements
- 🌐 Additional language support for Sakhi AI
- 📱 Mobile app development
- 🔧 Backend optimization
- 📝 Article writing for awareness portal
- 🧪 Test coverage improvement
- 🎨 UI/UX improvements

---

## Performance Optimization

### Frontend
- **Code Splitting**: Lazy-loaded pages with React.lazy()
- **Image Optimization**: Compressed assets
- **Memoization**: React.memo for expensive components
- **Intersection Observer**: Lazy load below-the-fold content

### Backend
- **API Caching**: Redis (optional enhancement)
- **Database Indexing**: Firestore composite indexes
- **Rate Limiting**: Prevent abuse on public endpoints
- **Compression**: gzip for API responses

---

## Troubleshooting

### Common Issues

**Port 3000/3001 already in use**
```bash
# Windows: Find process using port and kill it
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux: Kill process on port
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**Firebase connection issues**
- Verify Firebase credentials in `firebase.js`
- Check Firestore rules: Allow read for authenticated users
- Ensure network access to Firebase endpoints

**Sakhi AI not responding**
- Verify `GEMINI_API_KEY` in server `.env`
- Check backend server is running on port 3001
- Review browser console for API errors

**District data not loading**
- Verify Firestore has data in `districts` collection
- Check browser DevTools → Network tab for failed requests
- Ensure user has read permissions in Firestore Rules

---

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy 'build' folder
```

### Backend (Heroku/Railway)
```bash
# Heroku
heroku login
heroku create geip-backend
git push heroku main

# Set environment variables
heroku config:set GEMINI_API_KEY=your_key
```

### Environment Setup
```env
# Production Backend .env
NODE_ENV=production
GEMINI_API_KEY=xxxx
CORS_ORIGIN=https://yourdomain.com
PORT=3001
```

---

## Security Considerations

- 🔐 **Firebase Rules**: Implement strict Firestore authentication rules
- 🔑 **API Keys**: Never commit `.env` files; use `.env.example`
- 🛡️ **CORS**: Configure appropriate CORS origins in backend
- 🔒 **Authentication**: Use Firebase's built-in auth mechanisms
- 📝 **Rate Limiting**: Implement on public endpoints (especially Sakhi API)
- 🚨 **Input Validation**: Sanitize all user inputs

---

## Dataset Credits & Acknowledgments

This platform leverages data from:
- **Census of India** - Population demographics
- **National Family Health Survey (NFHS-5)** - Health and social indicators
- **UDISE+** - Education statistics
- **National Crime Records Bureau** - Crime data
- **Ministry of Women & Child Development** - Welfare schemes

**Special Thanks** to all organizations contributing to gender equity data collection and research.

---

## Roadmap

### Phase 2 Features (Planned)
- [ ] Regional intervention tracking dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support expansion
- [ ] District-level government admin dashboard
- [ ] Integration with government portals (PMJAY, etc.)
- [ ] Offline-first capabilities
- [ ] Advanced ML-based risk prediction
- [ ] Community reporting feature
- [ ] Impact tracking for NGO programs
- [ ] Export to PDF/Excel reports

---

## License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

Contributions and usage for social impact are encouraged!

---

## Contact & Support

### Social Responsibility
This platform is built to support the **United Nations Sustainable Development Goal 5: Gender Equality**.

**Let's build a more equitable world together! 🌍**

---

## Citation

If you use this platform in research or publications, please cite:

```bibtex
@software{GEIP2026,
  title={Gender Equity Intelligence Platform (GEIP) - Shield},
  author={Team 404},
  year={2026},
  url={https://github.com/1510darshan/SHEILD.git}
}
```

---

<div align="center">

**Made with ❤️ for Gender Equity**

⭐ Star us on GitHub if you believe in gender equality!

[Back to Top](https://github.com/1510darshan/SHEILD.git)

</div>
>>>>>>> 837a8ae (Initial commit - SHEILD Project)
