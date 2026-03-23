import { Link } from 'react-router-dom';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import {
  COMPARISON_TABLES,
  CONCEPTS,
  INFOGRAPHICS,
  QUIZZES,
  SQL_PRACTICE,
  SUBJECTS,
} from '../data/studyData';
import { useStudyStore } from '../store/useStudyStore';

function getSubjectStats(subjectId: number) {
  return {
    concepts:    CONCEPTS.filter((c) => c.subject === subjectId).length,
    tables:      COMPARISON_TABLES.filter((t) => t.subject === subjectId).length,
    infographics:INFOGRAPHICS.filter((i) => i.subject === subjectId).length,
    ox:          QUIZZES.filter((q) => q.subject === subjectId && q.type === 'ox').length,
    frequent:    QUIZZES.filter((q) => q.subject === subjectId && q.type === 'frequent').length,
  };
}

export default function HomePage() {
  const { wrongAnswers, bookmarks } = useStudyStore();
  const todayIndex = Math.floor(Date.now() / 86_400_000) % QUIZZES.length;
  const todayQuiz = QUIZZES[todayIndex];

  return (
    <div className="page">
      <SectionTitle
        title="정처기 필기 학습앱"
        subtitle="핵심정리 · 비교표 · OX · 자주기출 · 오답노트 · 북마크 · SQL"
      />

      <Card className="hero-card">
        <h3>📅 오늘의 문제</h3>
        <p style={{ marginBottom: '14px' }}>{todayQuiz.question}</p>
        <div className="button-row">
          <Link className="primary-btn" to="/ox">OX 풀기</Link>
          <Link className="secondary-btn" to="/sql">SQL 연습</Link>
        </div>
      </Card>

      <div className="stats-grid three">
        <Card><h4>오답노트</h4><strong>{wrongAnswers.length}개</strong></Card>
        <Card><h4>북마크</h4><strong>{bookmarks.length}개</strong></Card>
        <Card><h4>SQL 문제</h4><strong>{SQL_PRACTICE.length}개</strong></Card>
      </div>

      <SectionTitle
        title="과목별 학습"
        subtitle={`핵심정리 ${CONCEPTS.length}개 · 문제 ${QUIZZES.length}개`}
      />

      <div className="subject-grid-full">
        {SUBJECTS.map((subject) => {
          const st = getSubjectStats(subject.id);
          return (
            <Link
              key={subject.id}
              to={`/subject/${subject.id}`}
              className="subject-card-full"
              style={{ borderColor: subject.color }}
            >
              <div className="scf-head">
                <span className="subject-icon">{subject.icon}</span>
                <div style={{ flex: 1 }}>
                  <p className="subject-short">{subject.shortTitle}</p>
                  <strong className="scf-title">{subject.title}</strong>
                </div>
                <span className="scf-arrow" style={{ color: subject.color }}>›</span>
              </div>
              <div className="scf-stats">
                {[
                  { icon: '💡', label: '개념', val: st.concepts },
                  { icon: '📊', label: '비교표', val: st.tables },
                  { icon: '🎨', label: '인포', val: st.infographics },
                  { icon: '⭕', label: 'OX', val: st.ox },
                  { icon: '🔥', label: '기출', val: st.frequent },
                ].map(({ icon, label, val }) => (
                  <span
                    key={label}
                    className="scf-badge"
                    style={{ background: subject.color + '18', color: subject.color }}
                  >
                    {icon} {label} {val}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
