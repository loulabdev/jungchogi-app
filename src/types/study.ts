export type SubjectId = 1 | 2 | 3 | 4 | 5;

export type SubjectMeta = {
  id: SubjectId;
  title: string;
  shortTitle: string;
  color: string;
  icon: string;
};

export type ConceptCard = {
  id: string;
  subject: SubjectId;
  title: string;
  summary: string;
  bullets: string[];
};

export type InfographicCardItem = {
  label: string;
  value: string;
};

export type InfographicCardType = {
  id: string;
  subject: SubjectId;
  title: string;
  items: InfographicCardItem[];
};

export type ComparisonRow = Record<string, string>;

export type ComparisonTableType = {
  id: string;
  subject: SubjectId;
  title: string;
  headers: string[];
  rows: ComparisonRow[];
};

export type QuizType = 'ox' | 'frequent';

export type QuizItem = {
  id: string;
  subject: SubjectId;
  type: QuizType;
  question: string;
  answer: 'O' | 'X';
  explanation: string;
  keyword?: string;
};

export type WrongAnswerItem = {
  quizId: string;
  userAnswer: 'O' | 'X';
  savedAt: string;
};

export type BookmarkItem = {
  itemId: string;
  itemType: 'concept' | 'infographic' | 'table' | 'quiz' | 'sql';
  savedAt: string;
};

export type SqlPracticeItem = {
  id: string;
  subject: SubjectId;
  title: string;
  prompt: string;
  hint: string;
  exampleAnswer: string;
  explanation: string;
  keyword: string;
};
