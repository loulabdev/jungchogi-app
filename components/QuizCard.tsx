import { useMemo, useState } from 'react';
import Card from './Card';
import { useStudyStore } from '../store/useStudyStore';
import type { QuizItem } from '../types/study';

type Props = {
  quiz: QuizItem;
  showWrongActions?: boolean;
};

export default function QuizCard({ quiz, showWrongActions = false }: Props) {
  const [selected, setSelected] = useState<'O' | 'X' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const { toggleBookmark, isBookmarked, saveWrongAnswer, removeWrongAnswer, isWrongSaved } = useStudyStore();

  const bookmarked = isBookmarked(quiz.id);
  const savedWrong = isWrongSaved(quiz.id);

  const result = useMemo(() => {
    if (!selected) return null;
    return selected === quiz.answer ? 'correct' : 'wrong';
  }, [selected, quiz.answer]);

  const handleAnswer = (value: 'O' | 'X') => {
    setSelected(value);
    if (value !== quiz.answer) {
      saveWrongAnswer(quiz.id, value);
    }
  };

  return (
    <Card>
      <div className="card-head">
        <div>
          <span className="keyword-badge">{quiz.keyword ?? '문제'}</span>
          <h3 className="quiz-question">{quiz.question}</h3>
        </div>
        <button className="icon-btn" onClick={() => toggleBookmark(quiz.id, 'quiz')}>
          {bookmarked ? '★' : '☆'}
        </button>
      </div>

      <div className="answer-row">
        <button className={`answer-btn ${selected === 'O' ? 'selected' : ''}`} onClick={() => handleAnswer('O')}>
          O
        </button>
        <button className={`answer-btn ${selected === 'X' ? 'selected' : ''}`} onClick={() => handleAnswer('X')}>
          X
        </button>
      </div>

      {result && (
        <div className={`result-box ${result}`}>
          {result === 'correct' ? '정답입니다.' : `오답입니다. 정답: ${quiz.answer}`}
        </div>
      )}

      <button className="toggle-btn" onClick={() => setShowExplanation((prev) => !prev)}>
        {showExplanation ? '해설 숨기기 ▲' : '해설 보기 ▼'}
      </button>

      {showExplanation && (
        <div className="explanation-box">
          <strong>해설</strong>
          <p>{quiz.explanation}</p>
        </div>
      )}

      {showWrongActions && savedWrong && (
        <div className="inline-actions">
          <button className="secondary-btn" onClick={() => removeWrongAnswer(quiz.id)}>
            오답에서 삭제
          </button>
        </div>
      )}
    </Card>
  );
}
