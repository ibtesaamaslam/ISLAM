# 🌙 RECLAIM YOUR HEART

> *"Verily, in the remembrance of Allah do hearts find rest."* (Surah Ar-Ra'd, 13:28)

![Project Banner](https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1200&auto=format&fit=crop)

## 📋 Table of Contents

1.  [Introduction](#-introduction)
2.  [The Motivation: A Ramadan Gift](#-the-motivation-a-ramadan-gift)
3.  [Key Features](#-key-features)
    *   [Smart Quran Reader](#-smart-quran-reader)
    *   [AI Companion & Guide](#-ai-companion--guide)
    *   [Gamification & Progress](#-gamification--progress)
    *   [Discover Islam](#-discover-islam)
4.  [Technical Architecture](#-technical-architecture)
    *   [Tech Stack](#tech-stack)
    *   [Project Structure](#project-structure)
5.  [Installation & Setup](#-installation--setup)
    *   [Prerequisites](#prerequisites)
    *   [Local Development](#local-development)
6.  [Deployment Guide](#-deployment-guide)
    *   [Deploying to Vercel](#deploying-to-vercel)
    *   [Environment Variables](#environment-variables)
7.  [API Documentation](#-api-documentation)
8.  [Contributing](#-contributing)
9.  [License](#-license)
10. [Author](#-author)
11. [Acknowledgments](#-acknowledgments)

---

## 🌟 Introduction

Welcome to **Reclaim Your Heart**, a modern, interactive, and heart-centered application designed to help you connect with the Holy Quran and the beautiful teachings of Islam. Built with love, precision, and the latest technology, this project is a digital companion for your spiritual journey.

In an age of digital noise, finding a quiet space for spiritual reflection can be difficult. **Reclaim Your Heart** aims to provide that sanctuary—a beautifully designed, distraction-free environment where you can read, listen, and understand the Word of Allah.

---

## 🕌 The Motivation: A Ramadan Gift

This project was born from the spiritual energy and reflection of the **Holy Month of Ramazan**.

Ramadan is not just about abstaining from food and drink; it is a time of reconnection, revelation, and renewal. It was in this blessed month that the Quran was first revealed. Inspired by the spirit of giving and seeking knowledge during Ramazan, I set out to build a tool that makes the wisdom of the Quran accessible, engaging, and deeply personal for everyone—whether you are a lifelong Muslim, a new revert, or a curious soul exploring the faith.

The goal was simple: **To build an interface that feels "crafted," not just "coded."** To create a space where technology meets spirituality, allowing users to explore the depths of Islamic knowledge with the help of modern AI, while keeping the experience grounded, respectful, and authentic.

Every line of code was written with the intention of earning *Sadaqah Jariyah* (continuous charity) and helping others draw closer to their Creator.

---

## ✨ Key Features

### 📖 Smart Quran Reader

The core of the application is a robust and beautiful Quran reading experience.

*   **Beautiful Uthmani Script:** We use high-quality, crystal-clear Arabic typography (Indo-Pak/Uthmani scripts) to ensure a seamless and authentic reading experience.
*   **Multi-Language Support:** 
    *   **English:** Sahih International translation.
    *   **Urdu:** Jalandhry translation.
    *   Switch between translations instantly or view them side-by-side.
*   **Audio Recitations:** 
    *   Listen to soul-soothing recitations by world-renowned Qaris (e.g., Mishary Rashid Alafasy).
    *   Verse-by-verse playback for memorization and Tajweed practice.
*   **AI-Powered Tafseer (Explanation):** 
    *   Click on **ANY** Ayah to get an instant, comprehensive explanation.
    *   **Tafseer:** A clear explanation of the verse's meaning.
    *   **Asbab al-Nuzul:** The historical context and reason for revelation.
    *   **Fun Facts:** Interesting tidbits related to the Surah or Ayah.
    *   **Quiz:** A mini-quiz generated dynamically to test your understanding of the Tafseer.
*   **Offline Mode:** 
    *   Download individual Surahs for offline access.
    *   Generated Tafseer is cached locally, so you can revisit it without an internet connection.

### 🤖 AI Companion & Guide

A friendly, safe, and knowledgeable AI assistant powered by Google's Gemini models.

*   **Ask AI:** Have a question about Islam? Ask the AI companion.
    *   "How do I pray?"
    *   "What is the significance of Laylatul Qadr?"
    *   "Explain the concept of Tawheed to a 5-year-old."
*   **Safe & Sourced:** The AI is prompted to act as a wise, gentle Muslim friend, providing answers based on authentic sources while maintaining a respectful tone.
*   **Contextual Awareness:** The AI understands the context of the Surah you are reading.

### 🏆 Gamification & Progress

Spiritual seeking requires consistency. We've added light gamification to keep you motivated.

*   **Hasanat Points:** Earn points for every action—reading an Ayah, completing a Tafseer, or finishing a quiz.
*   **Badges & Achievements:** Unlock badges like:
    *   *Scholar Junior* (for reading Tafseer)
    *   *First Step* (for completing your first Surah)
    *   *Consistent Reader* (for daily streaks)
*   **Progress Tracking:** Visual indicators of your reading progress through the Quran.

### 🌍 Discover Islam

A dedicated section for those new to the faith or wanting to brush up on the basics.

*   **The 5 Pillars:** Interactive guides on Shahada, Salah, Zakat, Sawm, and Hajj.
*   **The 6 Articles of Faith:** Belief in Allah, Angels, Books, Prophets, Day of Judgment, and Destiny.
*   **Science & Islam:** Explore the miraculous scientific facts mentioned in the Quran centuries before modern discovery (Embryology, Astronomy, Geology, etc.).

---

## 🏗️ Technical Architecture

This project is built using a cutting-edge full-stack architecture, optimized for performance, SEO, and developer experience.

### Tech Stack

#### Frontend
*   **Framework:** [React 19](https://react.dev/) - The library for web and native user interfaces.
*   **Build Tool:** [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.
*   **Language:** [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML.
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library for React.
*   **Icons:** [Lucide React](https://lucide.dev/) - Beautiful & consistent icons.
*   **State Management:** React Context API + Local Storage for persistence.
*   **HTTP Client:** [Axios](https://axios-http.com/) - Promise based HTTP client.

#### Backend (Serverless / Proxy)
*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Server Framework:** [Express](https://expressjs.com/) (used as a proxy for local dev and API handler structure).
*   **AI Integration:** [Google Gemini API](https://ai.google.dev/) (@google/genai SDK).
    *   **Models:** `gemini-2.5-flash` for fast responses, `gemini-pro` for complex reasoning.
*   **Deployment:** [Vercel](https://vercel.com/) - Develop. Preview. Ship.

### Project Structure

```
/
├── api/                  # Serverless functions (Vercel / Express)
│   ├── chat.ts           # AI Chat endpoint handler
│   ├── quiz.ts           # Quiz generation endpoint
│   ├── surah-summary.ts  # Surah summary generation endpoint
│   ├── tafseer-batch.ts  # Batch tafseer generation (for offline download)
│   └── tafseer.ts        # Single ayah tafseer generation endpoint
├── frontend/             # Frontend application source
│   ├── public/           # Static assets (images, icons, manifest)
│   └── src/
│       ├── components/   # Reusable UI components (Buttons, Cards, Modals)
│       ├── contexts/     # React Contexts
│       │   ├── GamificationContext.tsx  # Manages points and badges
│       │   └── ...
│       ├── pages/        # Page components
│       │   ├── quran/    # Quran Reader & related components
│       │   │   ├── QuranReader.tsx      # Main reader logic
│       │   │   └── ...
│       │   ├── Home.tsx  # Landing page
│       │   └── ...
│       ├── App.tsx       # Main App component & Routing
│       ├── main.tsx      # Application entry point
│       └── index.css     # Global styles & Tailwind directives
├── scripts/              # Utility scripts for maintenance
├── .env.example          # Example environment variables file
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies and scripts
├── server.ts             # Express server entry point (for local dev)
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel deployment configuration
└── vite.config.ts        # Vite configuration
```

---

## 💻 Installation & Setup

Follow these steps to set up the project locally on your machine.

### Prerequisites

*   **Node.js:** Version 18 or higher.
*   **npm:** Version 9 or higher.
*   **Git:** To clone the repository.
*   **Google Gemini API Key:** You can get a free API key from [Google AI Studio](https://aistudio.google.com/).

### Local Development

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/ibtesaamaslam/ISLAM.git
    cd ISLAM
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory. You can copy the example file:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the Development Server**
    This command starts both the Express backend (for API proxying) and the Vite frontend server.
    ```bash
    npm run dev
    ```

5.  **Access the App**
    Open your browser and navigate to:
    [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment Guide

This project is optimized for deployment on **Vercel**.

### Deploying to Vercel

1.  **Push to GitHub:** Ensure your project is pushed to a GitHub repository.
2.  **Login to Vercel:** Go to [vercel.com](https://vercel.com/) and log in.
3.  **Import Project:** Click "Add New..." -> "Project" and select your GitHub repository (`ISLAM`).
4.  **Configure Project:**
    *   **Framework Preset:** Vercel should automatically detect "Vite".
    *   **Root Directory:** `./` (default)
5.  **Environment Variables:** (CRITICAL STEP)
    *   Expand the "Environment Variables" section.
    *   Add `GEMINI_API_KEY` as the key.
    *   Paste your Google Gemini API key as the value.
6.  **Deploy:** Click "Deploy".

### Environment Variables

| Variable | Description | Required |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Your Google Gemini API key for AI features. | **Yes** |

> **⚠️ IMPORTANT:** Without the `GEMINI_API_KEY`, features like Tafseer generation, AI Chat, and Quizzes will **NOT** work in production.

---

## 📡 API Documentation

The application uses a set of serverless functions (located in `/api`) to handle AI interactions.

### `POST /api/tafseer`
Generates a detailed explanation for a specific Ayah.

*   **Body:**
    ```json
    {
      "surah": "Al-Fatiha",
      "ayah": 1,
      "arabic": "...",
      "urduTranslation": "...",
      "englishTranslation": "..."
    }
    ```
*   **Response:** JSON object containing explanation, history, fun facts, and a quiz.

### `POST /api/chat`
Handles the conversational AI interface.

*   **Body:**
    ```json
    {
      "message": "How do I pray?"
    }
    ```
*   **Response:** JSON object with the AI's markdown-formatted response.

### `POST /api/surah-summary`
Generates a summary of a Surah for offline download.

*   **Body:**
    ```json
    {
      "surahName": "Al-Baqarah",
      "surahNumber": 2
    }
    ```

---

## 🤝 Contributing

Contributions are welcome! Whether you're a developer, a designer, or a scholar, your help is appreciated.

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

Please ensure your code follows the existing style and conventions.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Ibtesaam Aslam**

*   **GitHub:** [@ibtesaamaslam](https://github.com/ibtesaamaslam)
*   **Project Link:** [https://github.com/ibtesaamaslam/ISLAM](https://github.com/ibtesaamaslam/ISLAM)

---

## 🙏 Acknowledgments

*   **Al Quran Cloud API:** For providing the Quran text, translations, and audio metadata.
*   **Islamic Network:** For the audio CDN.
*   **Google Gemini:** For powering the AI intelligence.
*   **Open Source Community:** For the amazing tools and libraries that made this possible.

---

> *"My Lord, increase me in knowledge."* (Quran 20:114)

Made with ❤️ and 🤲 during Ramazan.
