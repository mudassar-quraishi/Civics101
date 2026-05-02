# 🗳️ Civics101: India Edition

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deployed on Google Cloud](https://img.shields.io/badge/Deployed%20on-Google%20Cloud-4285F4?logo=google-cloud&logoColor=white)](https://civics101-132834371548.asia-south1.run.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Civics101** is a premium, interactive web application designed to educate first-time voters in India about the democratic process. Built with a focus on neutrality, accessibility, and modern aesthetics, it provides a comprehensive guide to everything from voter registration to government formation.

---

## 🌟 Key Features

- **📚 Structured Learning Modules**: Five deep-dive modules covering Voter Registration, Election Types, Election Day Procedures, Vote Counting, and Government Formation.
- **📅 Interactive Timeline**: A visual journey through key milestones of the Indian electoral cycle.
- **📖 Civic Glossary**: A searchable database of essential political and electoral terms in both English and Hindi.
- **🤖 AI-Powered Q&A**: A secure, neutral AI assistant (Gemini 2.0) that answers civic-related questions in real-time, filtered for political neutrality.
- **🌐 Dual Language Support**: Seamless English and Hindi localization to reach a wider audience across India.
* **✨ Premium UI/UX**: High-fidelity design featuring glassmorphism, smooth Framer Motion animations, and a responsive mobile-first layout.

---

## 🛠️ Tech Stack

### Frontend
- **React 19**: Core UI library.
- **TypeScript**: Type-safe development.
- **Tailwind CSS 4.0**: Utility-first styling with modern glassmorphism effects.
- **Framer Motion**: Advanced micro-animations and transitions.
- **Zustand**: Lightweight global state management for language and UI persistence.

### Backend & API
- **Node.js + Express**: Production-ready server hosting the API and static assets.
- **Google Gemini 2.0 AI**: Powering the intelligent Q&A layer.
- **Express Middleware**: CORS handling, JSON parsing, and production-optimized routing.

### Infrastructure
- **Google Cloud Run**: Scalable, containerized deployment.
- **Docker**: Multi-stage build process for optimal image size and security.
- **GitHub**: Source control and versioning.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- A [Google AI Studio API Key](https://aistudio.google.com/)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mudassar-quraishi/Civics101.git
   cd Civics101
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   GOOGLE_AI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🚢 Deployment (Google Cloud Run)

This project is optimized for deployment on Google Cloud Run using the included `Dockerfile`.

1. **Build and Deploy**:
   ```bash
   gcloud run deploy civics101 --source . --region asia-south1 --allow-unauthenticated --set-env-vars GOOGLE_AI_API_KEY=your_api_key
   ```

The system will automatically handle the multi-stage Docker build, compile the frontend, and launch the Express server.

---

## 🛡️ Security & Neutrality

- **No Data Persistence**: The app requires zero user registration and stores no personal data.
- **Topic Filtering**: The AI assistant is strictly scoped to civic education. Questions about specific political parties, candidates, or biased political stances are automatically redirected to neutral educational content.
- **Environment Safety**: API keys are managed through environment variables and are excluded from version control via `.gitignore`.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
