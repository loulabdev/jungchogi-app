import { Link } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import SectionTitle from '../components/SectionTitle';
import { QUIZZES, SUBJECTS } from '../data/studyData';
import { useStudyStore } from '../store/useStudyStore';

export default function WrongAnswersPage() {
  const { wrongAnswers, clearWrongAnswers } = useStudyStore();

  const items = QUIZZES.filter((quiz) =>
    wrongAnswers.some((w) => w.quizId === quiz.id)
  );

  return (
    <div className="page">
      <SectionTitle
        title="오답노트"
        subtitle={`저장된 오답 ${items.length}개 · 과목 탭 누르면 해당 문제 탭으로 이동`}
      />

      {items.length > 0 && (
        <div className="top-actions">
          <button className="secondary-btn" onClick={clearWrongAnswers}>
            전체 삭제
          </button>
        </div>
      )}

      <div className="stack">
        {items.length === 0 ? (
          <div className="empty-box">
            저장된 오답이 없습니다.<br />
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              OX나 기출 문제를 풀면 틀린 문제가 자동으로 저장됩니다.
            </span>
          </div>
        ) : (
          items.map((quiz) => {
            const subject = SUBJECTS.find((s) => s.id === quiz.subject);
            const destPath = quiz.type === 'frequent' ? `/frequent#${quiz.id}` : `/ox#${quiz.id}`;
            const tabLabel = quiz.type === 'frequent' ? '자주기출 탭' : 'OX 탭';

            return (
              <div key={quiz.id} className="wrong-item-wrap">
                {/* 과목+이동 배지 */}
                <div className="wrong-nav-row">
                  <span
                    className="wrong-subject-chip"
                    style={{
                      background: (subject?.color ?? '#6b7280') + '18',
                      color: subject?.color ?? '#6b7280',
                    }}
                  >
                    {subject?.icon} {subject?.shortTitle}
                  </span>
                  <Link to={destPath} className="goto-btn">
                    {tabLabel}에서 다시 풀기 →
                  </Link>
                </div>
                <QuizCard quiz={quiz} showWrongActions />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
