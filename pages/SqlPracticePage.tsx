import { useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import SqlPracticeCard from '../components/SqlPracticeCard';
import SubjectChips from '../components/SubjectChips';
import { SQL_PRACTICE } from '../data/studyData';
import type { SubjectId } from '../types/study';

export default function SqlPracticePage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 0>(3);

  const items = useMemo(
    () => SQL_PRACTICE.filter((item) => selectedSubject === 0 || item.subject === selectedSubject),
    [selectedSubject]
  );

  return (
    <div className="page">
      <SectionTitle title="SQL 연습" subtitle="실기 대비용으로 직접 쿼리를 써보고, 힌트와 예시답으로 점검하세요." />
      <SubjectChips selected={selectedSubject} onSelect={setSelectedSubject} />
      <div className="stack">{items.map((item) => <SqlPracticeCard key={item.id} item={item} />)}</div>
    </div>
  );
}
