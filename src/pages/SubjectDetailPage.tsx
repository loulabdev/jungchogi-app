import { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Card from '../components/Card';
import ComparisonTable from '../components/ComparisonTable';
import InfographicCard from '../components/InfographicCard';
import SectionTitle from '../components/SectionTitle';
import { COMPARISON_TABLES, CONCEPTS, INFOGRAPHICS, SUBJECTS } from '../data/studyData';
import { useStudyStore } from '../store/useStudyStore';

/** 앵커 해시로 해당 요소로 스크롤 */
function useScrollToAnchor() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
      el.classList.add('highlight-anchor');
      setTimeout(() => el.classList.remove('highlight-anchor'), 2000);
    }
  }, [hash]);
}

export default function SubjectDetailPage() {
  useScrollToAnchor();

  const params = useParams();
  const subjectId = Number(params.subjectId);

  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const concepts = useMemo(() => CONCEPTS.filter((c) => c.subject === subjectId), [subjectId]);
  const infographics = useMemo(() => INFOGRAPHICS.filter((i) => i.subject === subjectId), [subjectId]);
  const tables = useMemo(() => COMPARISON_TABLES.filter((t) => t.subject === subjectId), [subjectId]);
  const { toggleBookmark, isBookmarked } = useStudyStore();

  if (!subject) return <div className="page">과목 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="page">
      <SectionTitle title={`${subject.icon} ${subject.title}`} subtitle="핵심정리 · 비교표 · 인포그래픽 카드" />

      <SectionTitle title="핵심정리" />
      <div className="stack">
        {concepts.length === 0 ? (
          <div className="empty-box">아직 준비 중입니다.</div>
        ) : (
          concepts.map((concept) => (
            <div id={concept.id} key={concept.id} className="anchor-target">
              <Card>
                <div className="card-head">
                  <h3>{concept.title}</h3>
                  <button className="icon-btn" onClick={() => toggleBookmark(concept.id, 'concept')}>
                    {isBookmarked(concept.id) ? '★' : '☆'}
                  </button>
                </div>
                <p className="summary">{concept.summary}</p>
                <ul className="bullet-list">
                  {concept.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </Card>
            </div>
          ))
        )}
      </div>

      <SectionTitle title="비교표" />
      <div className="stack">
        {tables.length === 0 ? (
          <div className="empty-box">비교표가 아직 없습니다.</div>
        ) : (
          tables.map((table) => (
            <div id={table.id} key={table.id} className="anchor-target">
              <ComparisonTable table={table} />
            </div>
          ))
        )}
      </div>

      <SectionTitle title="인포그래픽 카드" />
      <div className="stack">
        {infographics.length === 0 ? (
          <div className="empty-box">인포그래픽 카드가 아직 없습니다.</div>
        ) : (
          infographics.map((item) => (
            <div id={item.id} key={item.id} className="anchor-target">
              <InfographicCard item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
