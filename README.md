# 🌍 Safe Travel Planner – Destinations & Itinerary

![Safe Travel Planner Banner](https://via.placeholder.com/1200x400?text=Safe+Travel+Planner)

A modern, responsive React app for planning your next adventure! Search destinations, view rich details, check live weather, and manage your personal itinerary—all behind secure authentication. Built with best practices, clean code, and a focus on seamless user experience.

---

## 🚀 Live Demo

Try it now: [Safe Travel Planner](https://traveltacker.netlify.app/)  
<sub>Deployed on Netlify | Updated: 04:02 PM +06, Tuesday, August 12, 2025</sub>

---

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [APIs Used](#apis-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Deployment](#deployment)
- [Evaluation Criteria](#evaluation-criteria)
- [Contributing](#contributing)
- [License](#license)

---

## 📝 Overview

Safe Travel Planner lets you:

- **Log in securely** to access all features.
- **Search cities/countries** and view detailed info (population, timezone, images, weather).
- **Build your itinerary** with travel dates and weather forecasts.
- **Switch between dark/light mode** for accessibility.
- **Enjoy a fully responsive UI**—works great on any device.

Developed as a coding challenge, this project demonstrates efficient API integration, robust state management, and modular React components. Progress reflects the latest updates as of 04:02 PM +06, Tuesday, August 12, 2025.

---

## ✨ Features

- **🔐 Authentication:** Secure login/logout, token storage, and profile fetching.
- **🔎 Destination Search:** Find cities/countries with paginated results and quick navigation to details.
- **📊 Destination Details:** See population, timezone, images, and a 7-day weather forecast (with charts). Add to itinerary with a date picker.
- **🗂️ My Itinerary:** Manage saved trips, sort by date/name, view weather summaries, and get notifications for changes.
- **👤 Profile:** View user info (username, email, avatar).
- **🌗 Dark/Light Mode:** Toggle theme from the navigation bar.
- **📱 Responsive Design:** Mobile-friendly with a hamburger menu.
- **⚡ Extras:** Loading states, error handling, toast notifications, local storage backup, and protected routes.
- **📈 Visualizations:** Weather trends charted with Recharts.

**Screenshots:**  
_Login Page_  
![Login Screenshot](https://via.placeholder.com/800x600?text=Login+Page)  
_Dashboard_  
![Dashboard Screenshot](https://via.placeholder.com/800x600?text=Dashboard+Search)  
_Destination Details_  
![Details Screenshot](https://via.placeholder.com/800x600?text=Destination+Details)  
_My Itinerary_  
![Itinerary Screenshot](https://via.placeholder.com/800x600?text=My+Itinerary)  
<sub>(Replace placeholders with actual screenshots from your repo.)</sub>

---

## 🛠️ Tech Stack

- **Frontend:** React.js (v18+), functional components & hooks
- **Routing:** React Router (protected routes)
- **Data Fetching:** React Query (API calls, caching)
- **Styling:** Tailwind CSS (utility-first, dark mode)
- **Forms:** React Hook Form + Yup (validation)
- **Date Picker:** react-datepicker
- **Charts:** Recharts
- **Notifications:** React Hot Toast
- **Icons:** Lucide React
- **State Management:** React Context
- **HTTP:** Axios
- **Persistence:** localStorage

---

## 🌐 APIs Used

- **Authentication:** DummyJSON API  
    - `POST /auth/login`  
    - `GET /auth/me` (Bearer token)

- **Places:** REST Countries API  
    - `https://restcountries.com/v3.1/name/{name}`  
    - `https://restcountries.com/v3.1/capital/{capital}`

- **Weather:** Open-Meteo API  
    - `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=weathercode,temperature_2m_max,temperature_2m_min`

<sub>No API keys required. Endpoints are centralized in service files.</sub>

---

## 🗂️ Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/              # Page-level components
├── utils/              # API service files
├── authcontext/        # React Contexts
├── routes/             # Router management
├── App.js              # Main app with routing
├── index.js            # Entry point with providers
└── tailwind.config.js  # Tailwind configuration
```

---

## ⚙️ Getting Started

1. **Clone the repository:**
     ```bash
     git clone https://github.com/shuvojr13/SafeTravel.git
     cd SafeTravel
     ```

2. **Install dependencies:**
     ```bash
     npm install
     ```

3. **(Optional) Create a `.env` file:**
     ```env
     VITE_COUNTRY_API=https://restcountries.com/v3.1/alpha
     VITE_WEATHER_API=https://api.open-meteo.com/v1/forecast
     VITE_COUNTRY_BY_NAME=https://restcountries.com/v3.1/name
     VITE_COUNTRY_BY_CAPITAL=https://restcountries.com/v3.1/capital
     VITE_AUTH_ME_API=https://dummyjson.com/auth/me
     VITE_AUTH_LOGIN_API=https://dummyjson.com/auth/login
     ```

4. **Run the development server:**
     ```bash
     npm run dev
     ```

**Live Link:** [https://travelstatus.netlify.app/](https://travelstatus.netlify.app/)

---

## 📝 Evaluation Criteria

| Criteria                        | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| UI Design & Responsiveness       | Clean, modern, fully responsive interface with Tailwind CSS                 |
| Authentication & Protected Routes| Secure login/logout, token storage, private routes                          |
| API Integration & Data Handling  | Centralized services, React Query caching                                   |
| State Management & Persistence   | Context for auth, localStorage for itinerary                                |
| Error Handling & Loading States  | Spinners, toast notifications, robust validation                            |
| Code Quality & Modularity        | Modular components, hooks, clean code                                       |
| Mandatory Features Completion    | All features/pages implemented: search, details, itinerary, profile, etc.   |

---

## 🤝 Contributing

Contributions are welcome!  
- Fork the repo  
- Create a branch  
- Submit a PR  
- Follow ESLint standards and add tests if possible

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

Developed by Ahad Hossain  
_Last Updated: 04:02 PM +06, Tuesday, August 12, 2025_  
Questions? Open an issue on GitHub.