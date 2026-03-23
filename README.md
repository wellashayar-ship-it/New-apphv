# PMO Fighter - Mobile App Prototype

PMO Fighter is a comprehensive mobile application designed to help users overcome porn/PMO addiction through a supportive companion, gamified recovery, and AI-driven coaching.

## 🚀 Core Features

- **Risk Detection System**: Analyzes user patterns to predict relapse risk (Low/Medium/High).
- **Smart Protection Mode**: Simulated blocking of adult content during high-risk periods.
- **AI Support Coach**: Real-time conversation with a friendly AI (Gemini) to handle urges.
- **3D Companion Character**: An evolving character that grows stronger as your streak increases.
- **Cycle Timer**: Visual rings tracking seconds, minutes, hours, and days of your streak.
- **Gamification**: Daily tasks, achievements, and badges (Bronze, Silver, Gold).
- **Progress Tracking**: Monthly calendar view and success ratio analysis.
- **Monetization**: Simulated AdMob integration and Premium subscription model.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI**: Google Gemini API (@google/genai)
- **Date Handling**: date-fns

## ⚙️ Environment Variables

To run the app with full functionality, set the following environment variables in your AI Studio settings:

```env
AI_API_URL=https://generativelanguage.googleapis.com
AI_API_KEY=your_gemini_api_key
YT_VIDEO_LINK=https://www.youtube.com/watch?v=your_motivation_video
```

## 💰 Monetization Strategy

### 1. AdMob Integration (Free Users)
- **Banner Ads**: Shown at the bottom of Home, Chat, and Progress screens.
- **Interstitial Ads**: Shown when switching to Progress or exiting Settings.
- **Rewarded Ads**: Used to skip daily tasks or unlock special badges.

### 2. Premium Subscription
- **Price**: $9.99/mo or $59.99/yr.
- **Benefits**: 
  - No Ads
  - Unlimited AI Chat
  - Deep Trigger Analysis
  - Custom Hero Character
  - Advanced Content Protection

## 🧪 QA Checklist

- [ ] **Splash & Onboarding**: Verify the app starts with a splash screen and guides the user through onboarding.
- [ ] **Streak Logic**: Ensure the streak resets on relapse and increments on daily task completion.
- [ ] **Character Evolution**: Verify the character changes appearance at 7, 30, and 90 days.
- [ ] **AI Chat**: Test the AI coach's responses to urge-related queries.
- [ ] **Ads**: Check that ads are visible for free users and disappear after upgrading to Premium.
- [ ] **Calendar**: Verify that clean/failed days are correctly marked on the calendar.
- [ ] **Risk Calculator**: Check the risk percentage in Settings based on streak and failure history.

## 🎨 Design Principles

- **Calm & Supportive**: Uses a soothing palette of blues, greens, and purples.
- **Motivational**: Emphasizes progress and growth rather than guilt.
- **Minimalist**: Clean UI with intuitive navigation and large touch targets.

---
Built with ❤️ for recovery and growth.
