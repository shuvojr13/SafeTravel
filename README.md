# Travel Planner – Destinations & Itinerary

![Travel Planner Banner](https://via.placeholder.com/1200x400?text=Safe+Travel+Planner) <!-- Placeholder for banner image; replace with actual if available -->

A responsive React application that enables users to plan trips by searching destinations, viewing detailed information, checking weather forecasts, and managing personal itineraries. Authentication is required for core features, ensuring a secure and personalized experience. This project is built with modern React practices, focusing on clean code, API integration, and user-friendly design.

## Live Demo
Experience the application live at: [Safe Travel Planner](https://traveltacker.netlify.app/)  
(Deployed on Netlify for seamless performance and scalability, updated as of 04:02 PM +06, Tuesday, August 12, 2025.)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [APIs Used](#apis-used)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Evaluation Criteria](#evaluation-criteria)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Travel Planner app allows users to log in securely, search for cities or countries, view detailed destination info including weather forecasts, and build a personal itinerary with travel dates. It supports dark/light mode toggling for better accessibility and uses protected routes to ensure only authenticated users access planning tools. The app is fully responsive, working seamlessly on desktop and mobile devices.

This project was developed as part of a coding challenge, emphasizing efficient API handling, state management, and modular components. It integrates third-party APIs for authentication, location data, and weather forecasts, with local storage for itinerary persistence. Development began recently and is targeted for completion within 3 days from the start date, with the current version reflecting progress as of 04:02 PM +06, Tuesday, August 12, 2025.

## Features
- **Authentication**: Secure login with username/password validation, token storage, and profile fetching. Logout clears session and redirects to login.
- **Dashboard/Search**: Search input for destinations (cities/countries) with paginated grid results showing name, country, and thumbnail. Clicking navigates to details.
- **Destination Details**: Displays population, timezone, images, and 7-day weather forecast with visual charts. Add to itinerary with date picker.
- **My Itinerary**: List of saved trips sortable by date or name, with weather summaries. Supports adding/removing items with notifications.
- **Profile**: Shows user details (username, email, picture) fetched from API.
- **Dark/Light Mode**: Toggle switch in navigation for theme switching.
- **Responsive Design**: Mobile-friendly layout with hamburger menu for nav on small screens.
- **Additional Enhancements**: Loading states, error handling, notifications (via React Hot Toast), local storage backup for itinerary, and protected routes.
- **Visualizations**: Weather trends chart on details page using Recharts.

Screenshots:  
- Login Page: ![Login Screenshot](https://via.placeholder.com/800x600?text=Login+Page)  
- Dashboard: ![Dashboard Screenshot](https://via.placeholder.com/800x600?text=Dashboard+Search)  
- Destination Details: ![Details Screenshot](https://via.placeholder.com/800x600?text=Destination+Details)  
- Itinerary: ![Itinerary Screenshot](https://via.placeholder.com/800x600?text=My+Itinerary)  

(Replace placeholders with actual screenshots from your repo.)

## Technical Stack
- **Frontend Framework**: React.js (v18+) with functional components and hooks.
- **Routing**: React Router for navigation and protected routes.
- **Data Fetching**: React Query for API calls, caching, and optimistic updates.
- **Styling**: Tailwind CSS for responsive, utility-first design with dark mode support.
- **Form Handling**: React Hook Form with Yup validation.
- **Date Picker**: react-datepicker for selecting travel dates.
- **Charts**: Recharts for weather visualizations.
- **Notifications**: React Hot Toast for success/error messages.
- **Icons**: Lucide React for consistent, customizable icons.
- **State Management**: React Context for authentication and global state.
- **Other**: Axios for HTTP requests, localStorage for persistence.

## APIs Used
1. **Authentication**: DummyJSON API  
   - Login: `POST /auth/login`  
   - Profile: `GET /auth/me` (with Bearer token)  

2. **Places**: REST Countries API (alternative to Teleport for simplicity)  
   - Country Search: `https://restcountries.com/v3.1/name/{name}`  
   - City (Capital) Search: `https://restcountries.com/v3.1/capital/{capital}`  

3. **Weather**: Open-Meteo API  
   - Forecast: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=weathercode,temperature_2m_max,temperature_2m_min`  

API keys are not required, but endpoints are centralized in service files for modularity.

## Project Structure
src/
├── components/         # Reusable UI components 
├── pages/              # Page-level components 
├── Utlis/              # API service files 
├── Authcontext/        # React Contexts 
├── Routes/             # Router Management
├── App.js              # Main app with routing
├── index.js            # Entry point with providers
└── tailwind.config.js  # Tailwind configuration


## Installation and Setup
1. Clone the repository:
`git clone https://github.com/shuvojr13/SafeTravel.git`
`cd SafeTravel` 


2. Install dependencies:
`npm install`

3. Create a `.env` file in the root and add API base URLs (optional, as defaults are hardcoded):
VITE_COUNTRY_API=https://restcountries.com/v3.1/alpha
VITE_WEATHER_API=https://api.open-meteo.com/v1/forecast
VITE_COUNTRY_BY_NAME=https://restcountries.com/v3.1/name
VITE_COUNTRY_BY_CAPITAL=https://restcountries.com/v3.1/capital
VITE_AUTH_ME_API=https://dummyjson.com/auth/me
VITE_AUTH_LOGIN_API=https://dummyjson.com/auth/login



4. Run the development server:
`npm run dev`

Live Link: [https://traveltacker.netlify.app/](https://traveltacker.netlify.app/)

## Evaluation Criteria
The project was designed to meet the following criteria:

| Criteria                  | Description |
|---------------------------|-------------|
| UI Design & Responsiveness | Clean, modern interface with Tailwind CSS; fully responsive across devices. |
| Authentication & Protected Routes | Secure login/logout with token storage; private routes for dashboard/itinerary/profile. |
| API Integration & Data Handling | Centralized services for auth, places, weather; caching with React Query. |
| State Management & Data Persistence | Context for auth; localStorage for itinerary backup. |
| Error Handling & Loading States | Spinners, toasts for errors/success; robust validation. |
| Code Quality & Modularity | Modular components, hooks, and services; clean, readable code. |
| Mandatory Features Completion | All pages/features implemented, including search, details, itinerary, profile, theme toggle, charts, notifications, pagination. |

## Contributing
Contributions are welcome! Fork the repo, create a branch, and submit a PR. Ensure code follows ESLint standards and includes tests if applicable.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

Developed by [Your Name/Username] | Last Updated: 04:02 PM +06, Tuesday, August 12, 2025  
For questions, reach out via GitHub issues.