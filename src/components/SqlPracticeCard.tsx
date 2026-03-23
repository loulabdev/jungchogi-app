import { useState } from 'react';
import Card from './Card';
import { useStudyStore } from '../store/useStudyStore';
import type { SqlPracticeItem } from '../types/study';

type Props = {
  item: SqlPracticeItem;
};

export default function SqlPracticeCard({ item }: Props) {
  const { getSqlDraft, setSqlDraft, toggleBookmark, isBookmarked } = useStudyStore();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const bookmarked = isBookmarked(item.id);
  const value = getSqlDraft(item.id);

  return (
    <Card>
      <div className="card-head">
        <div>
          <span className="keyword-badge">{item.keyword}</span>
          <h3>{item.title}</h3>
        </div>
        <button className="icon-btn" onClick={() => toggleBookmark(item.id, 'sql')}>
          {bookmarked ? '★' : '☆'}
        </button>
      </div>

      <p className="summary">{item.prompt}</p>

      <textarea
        className="sql-textarea"
        placeholder="여기에 SQL을 직접 작성해보세요."
        value={value}
        onChange={(e) => setSqlDraft(item.id, e.target.value)}
      />

      <div className="sql-actions">
        <button className="secondary-btn" onClick={() => setShowHint((prev) => !prev)}>
          {showHint ? '힌트 숨기기' : '힌트 보기'}
        </button>
        <button className="secondary-btn" onClick={() => setShowAnswer((prev) => !prev)}>
          {showAnswer ? '예시답 숨기기' : '예시답 보기'}
        </button>
      </div>

      {showHint ? <div className="explanation-box"><strong>힌트</strong><p>{item.hint}</p></div> : null}
      {showAnswer ? (
        <div className="explanation-box">
          <strong>예시답</strong>
          <pre className="sql-pre">{item.exampleAnswer}</pre>
          <p>{item.explanation}</p>
        </div>
      ) : null}
    </Card>
  );
}
