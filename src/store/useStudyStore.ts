import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookmarkItem, WrongAnswerItem } from '../types/study';

type SqlDraft = Record<string, string>;

type StudyState = {
  bookmarks: BookmarkItem[];
  wrongAnswers: WrongAnswerItem[];
  sqlDrafts: SqlDraft;
  toggleBookmark: (itemId: string, itemType: BookmarkItem['itemType']) => void;
  isBookmarked: (itemId: string) => boolean;
  saveWrongAnswer: (quizId: string, userAnswer: 'O' | 'X') => void;
  removeWrongAnswer: (quizId: string) => void;
  clearWrongAnswers: () => void;
  isWrongSaved: (quizId: string) => boolean;
  setSqlDraft: (id: string, value: string) => void;
  getSqlDraft: (id: string) => string;
};

export const useStudyStore = create<StudyState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      wrongAnswers: [],
      sqlDrafts: {},
      toggleBookmark: (itemId, itemType) =>
        set((state) => {
          const exists = state.bookmarks.some((b) => b.itemId === itemId);
          if (exists) {
            return { bookmarks: state.bookmarks.filter((b) => b.itemId !== itemId) };
          }
          return {
            bookmarks: [...state.bookmarks, { itemId, itemType, savedAt: new Date().toISOString() }],
          };
        }),
      isBookmarked: (itemId) => get().bookmarks.some((b) => b.itemId === itemId),
      saveWrongAnswer: (quizId, userAnswer) =>
        set((state) => {
          const exists = state.wrongAnswers.some((w) => w.quizId === quizId);
          if (exists) return state;
          return {
            wrongAnswers: [...state.wrongAnswers, { quizId, userAnswer, savedAt: new Date().toISOString() }],
          };
        }),
      removeWrongAnswer: (quizId) =>
        set((state) => ({ wrongAnswers: state.wrongAnswers.filter((w) => w.quizId !== quizId) })),
      clearWrongAnswers: () => set({ wrongAnswers: [] }),
      isWrongSaved: (quizId) => get().wrongAnswers.some((w) => w.quizId === quizId),
      setSqlDraft: (id, value) => set((state) => ({ sqlDrafts: { ...state.sqlDrafts, [id]: value } })),
      getSqlDraft: (id) => get().sqlDrafts[id] ?? '',
    }),
    { name: 'cert-study-storage' }
  )
);

