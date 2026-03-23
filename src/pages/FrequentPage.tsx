import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import SectionTitle from '../components/SectionTitle';
import SubjectChips from '../components/SubjectChips';
import { QUIZZES } from '../data/studyData';
import type { SubjectId } from '../types/study';

function useScrollToAnchor(ready: boolean) {
  const { hash } = useLocation();
  useEffect(() => {
    if (!ready || !hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
      el.classList.add('highlight-anchor');
      setTimeout(() => el.classList.remove('highlight-anchor'), 2000);
    }
  }, [hash, ready]);
}

export default function FrequentPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 0>(0);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const targetId = hash.replace('#', '');
    const quiz = QUIZZES.find((q) => q.id === targetId);
    if (quiz) setSelectedSubject(0);
  }, [hash]);

  const items = useMemo(
    () => QUIZZES.filter(
      (quiz) => quiz.type === 'frequent' && (selectedSubject === 0 || quiz.subject === selectedSubject)
    ),
    [selectedSubject]
  );

  useScrollToAnchor(items.length > 0);

  return (
    <div className="page">
      <SectionTitle title="자주 기출문제" subtitle="시험 직전 회독용 대표 문제" />
      <SubjectChips selected={selectedSubject} onSelect={setSelectedSubject} />
      <div className="stack">
        {items.map((quiz) => (
          <div id={quiz.id} key={quiz.id} className="anchor-target">
            <QuizCard quiz={quiz} />
          </div>
        ))}
      </div>
    </div>
  );
}
