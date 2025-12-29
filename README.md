# 🌦️ Premium Weather Dashboard

A high-performance, modern **Weather Application** built with **React + Vite**, featuring real-time climate data, dynamic backgrounds, a live global clock, and a sleek **glassmorphism UI**.  
Designed to deliver both **visual elegance** and **accurate weather insights**.

---

## ✨ Features

- 🌍 **Real-Time Weather Data**  
  Get current temperature, humidity, wind speed, pressure, and “feels like” values for any city worldwide.

- 📅 **5-Day Weather Forecast**  
  Displays daily forecasts with weather icons and temperature trends.

- 🎨 **Dynamic Weather Backgrounds**  
  Automatically switches HD backgrounds based on live weather conditions:
  - ☀️ Sunny  
  - ☁️ Cloudy  
  - 🌧️ Rainy  
  - 🌙 Night  

- ⏰ **Live Global Clock**  
  Shows the exact local **time & date** of the searched city using timezone offsets.

- 🔍 **Smart City Search with Suggestions**  
  Intelligent city search dropdown using debouncing for fast and accurate results.

- 📱 **Responsive Professional UI**  
  Fully responsive design with:
  - Glassmorphism cards  
  - Mesh gradients  
  - Smooth animations  
  - Mobile-first layout  

---

## 🚀 Tech Stack

- **Frontend:** React.js (Hooks, Functional Components)
- **Build Tool:** Vite
- **API Integration:** Axios  
  - OpenWeatherMap Weather API  
  - OpenWeatherMap Geocoding API
- **Styling:** CSS3  
  - Glassmorphism  
  - Gradient backgrounds  
  - Animations & transitions
- **Deployment:** Netlify

---

## 🛠️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
2️⃣ Install Dependencies

Bash
npm install
3️⃣ Configure Environment Variables
Create a .env file in the root directory and add:

Env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
🔑 Get your API key from: https://openweathermap.org/api
4️⃣ Start the Development Server

Bash
npm run dev
The app will run on:


http://localhost:5173
🌍 Deployment (Netlify)
Steps to Deploy:
Build the project:
Copy code
Bash
npm run build
Push your project to GitHub.
Connect your GitHub repository to Netlify.
Add Environment Variable in Netlify:
Copy code

VITE_WEATHER_API_KEY = your_openweathermap_api_key
Deploy 🎉
🔗 Live URL:https://my-weather-app510.netlify.app/

https://your-site-name.netlify.app

🧠 Portfolio Highlights (Why This Project Matters)
Implemented real-time API integration with error handling
Designed a dynamic UI system based on live weather conditions
Built a timezone-aware global clock
Optimized search using debouncing
Applied modern UI/UX design principles
Production-ready deployment using Netlify + Vite
This project demonstrates strong skills in React, API integration, UI/UX design, and deployment workflows.
