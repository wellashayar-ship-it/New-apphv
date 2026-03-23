export type Mood = 'idle' | 'happy' | 'sad';
export type Status = 'clean' | 'failed' | 'empty';

export interface CalendarEntry {
  date: string;
  status: Status;
  notes: string;
  mood: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
}

export interface UserState {
  userId: string | null;
  isLoggedIn: boolean;
  streakDays: number;
  failureDays: number;
  longestStreak: number;
  todayStatus: Status;
  calendarEntries: CalendarEntry[];
  journalEntries: JournalEntry[];
  characterStage: number;
  characterMood: Mood;
  isPremium: boolean;
  aiUsageCount: number;
  adsConfig: {
    banner: boolean;
    interstitial: boolean;
    rewarded: boolean;
  };
  settings: {
    notifications: boolean;
    notificationTime: string;
    darkMode: boolean;
  };
  appStage: 'splash' | 'onboarding' | 'main';
}

export const INITIAL_STATE: UserState = {
  userId: null,
  isLoggedIn: false,
  streakDays: 0,
  failureDays: 0,
  longestStreak: 0,
  todayStatus: 'empty',
  calendarEntries: [],
  journalEntries: [],
  characterStage: 1,
  characterMood: 'idle',
  isPremium: false,
  aiUsageCount: 0,
  adsConfig: {
    banner: true,
    interstitial: true,
    rewarded: true,
  },
  settings: {
    notifications: true,
    notificationTime: '08:00',
    darkMode: false,
  },
  appStage: 'splash',
};
