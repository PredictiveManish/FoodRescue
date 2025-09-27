# 🍽️ Food Rescue - Surplus Food Management System

A web platform connecting restaurants with NGOs to reduce food waste and help communities in need.

## 🌟 Features

### For Restaurants
- 📤 Post surplus food with details and expiry time
- 🗺️ Location-based NGO matching
- 📊 Track food donation impact
- 🔔 Real-time notifications

### For NGOs
- 📱 View available food donations nearby
- ⚡ Quick claim system
- 🗺️ Interactive food map
- 🤝 Direct restaurant connections

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **REST API** - Communication

### Features
- 🔐 Mock authentication system
- 📍 Location-based services
- 🔔 Real-time notifications
- ⏰ Automatic food expiry tracking

## 🏗️ Project Structure
```
src/
├── components/ # Reusable components
│ ├── Header.jsx
│ ├── Footer.jsx
│ └── MapPicker.jsx
├── pages/ # Main pages
│ ├── Home.jsx
│ ├── Dashboard.jsx
│ ├── GetStarted.jsx
│ └── ForUsers.jsx
├── styles/ # CSS files
│ └── App.css
└── services/ # API services
└── api.js
```


## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd food-rescue

2. **Install Dependencies**
```npm install```

3. ```npm run dev```

Install dependencies

bash
```npm install```
Start the development servers

Backend (Terminal 1):

bash
```npm run dev:server```
Server runs on: http://localhost:5000

Frontend (Terminal 2):

bash
```npm run dev```
Frontend runs on: http://localhost:5173

Access the application
Open your browser and go to: http://localhost:5173



```
### 🔄 How the Application Works
User Journey Flow
1. Homepage & Introduction
```
Visitor -> Home Page -> Learn about food waste problem -> Click "Join Now"
```
2. Authentication Process
```
Join Now → Registration/Login Page → Choose user type (Restaurant/NGO) → Dashboard
```
3. Restaurant User Flow
```
Dashboard → Post Food → Fill form → Submit → Food posted successfully
```

### Features:
- 📝 Post surplus food with details

- 🗺️ Select location via interactive map

- ⏰ Set expiry time based on food type

- 👀 Track posted food status

4. NGO User Flow
```
Dashboard → View available food → Claim food → Receive notifications
```
### Features
- 📱 Browse nearby food donations

- ⚡ Quick claim system

- 📍 Interactive map view

- 🔔 Real-time updates

## 🍕 Food Categories & Expiry System

| Category | Examples | Auto-Expiry |
|----------|----------|-------------|
| 🔴 High Perishable | milk, salads, seafood, cut fruits, dairy desserts | 2 hours |
| 🟡 Medium Perishable | Ccurries, rice, bread, cooked veg, pulses | 6 hours |
| 🟢 Low Perishable | dry snacks, biscuits, packaged food, pickles | 24 hours |

## 🎯 Step-by-Step Usage Guide

### For Restaurants:
1. **Register/Login** as Restaurant
2. **Navigate to Dashboard** → "Post Food" tab
3. **Fill the form:**
   - Food item name and quantity
   - Description and special instructions
   - Pickup location (map selection available)
   - Available until time
   - Food type category
4. **Submit** → Food is instantly available to NGOs

### For NGOs:
1. **Register/Login** as NGO
2. **View Dashboard** with available food listings
3. **Browse food** with details and locations
4. **Claim food** with one click
5. **Contact restaurant** for pickup coordination

## 🔧 API Endpoints Overview

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/health` | Server status check |
| `POST` | `/api/auth/login` | User authentication |
| `POST` | `/api/auth/register` | User registration |
| `GET` | `/api/food-posts` | Get available food |
| `POST` | `/api/food-posts` | Create food post |
| `PATCH` | `/api/food-posts/:id/claim` | Claim food item |
| `GET` | `/api/nearby/ngos` | Find nearby NGOs |
| `GET` | `/api/nearby/restaurants` | Find nearby restaurants |

## 🗺️ Location Services

The platform uses **Jalandhar, Punjab** as the demo location with:

- **🏪 Restaurants:** Pizza Hut, McDonald's, Domino's, KFC
- **🤝 NGOs:** Robin Hood Army, Feeding India, No Food Waste, Roti Bank

## 🔔 Notification System

Real-time alerts for:
- ✅ New food availability notifications
- 📦 Food claim confirmations
- ⏰ Expiry reminders
- 🔄 System updates

## 👥 Demo Accounts

**Quick testing:**
- **Restaurant Demo:** `restaurant@demo.com` / any password
- **NGO Demo:** `ngo@demo.com` / any password

**Or use direct dashboard access** from the login page.