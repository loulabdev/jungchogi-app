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

export default function OxPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 0>(0);
  const { hash } = useLocation();

  // 앵커 타깃 과목으로 자동 필터 전환
  useEffect(() => {
    if (!hash) return;
    const targetId = hash.replace('#', '');
    const quiz = QUIZZES.find((q) => q.id === targetId);
    if (quiz) setSelectedSubject(0); // 전체로 펼쳐야 해당 문제 보임
  }, [hash]);

  const items = useMemo(
    () => QUIZZES.filter(
      (quiz) => quiz.type === 'ox' && (selectedSubject === 0 || quiz.subject === selectedSubject)
    ),
    [selectedSubject]
  );

  useScrollToAnchor(items.length > 0);

  return (
    <div className="page">
      <SectionTitle title="OX 문제" subtitle="과목 필터 · 정답 확인 · 해설 토글" />
      <SubjectChips selected={selectedSubject} onSelect={setSelectedSubject} />
      <div className="stack">
        {items.map((quiz) => (
          // 각 카드에 id 부여 → 앵커 이동 가능
          <div id={quiz.id} key={quiz.id} className="anchor-target">
            <QuizCard quiz={quiz} />
          </div>
        ))}
      </div>
    </div>
  );
}
