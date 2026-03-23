import { Link } from 'react-router-dom';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import {
  COMPARISON_TABLES,
  CONCEPTS,
  INFOGRAPHICS,
  QUIZZES,
  SQL_PRACTICE,
} from '../data/studyData';
import { useStudyStore } from '../store/useStudyStore';

// 북마크 타입별 표시 정보
const TYPE_META: Record<
  string,
  { label: string; icon: string; color: string; bg: string }
> = {
  concept:     { label: '핵심정리',    icon: '💡', color: '#1d4ed8', bg: '#dbeafe' },
  infographic: { label: '인포그래픽',  icon: '🎨', color: '#0f766e', bg: '#ccfbf1' },
  table:       { label: '비교표',      icon: '📊', color: '#6d28d9', bg: '#ede9fe' },
  quiz:        { label: '퀴즈',        icon: '⭕', color: '#b45309', bg: '#fef3c7' },
  sql:         { label: 'SQL 연습',    icon: '🗒️', color: '#0369a1', bg: '#e0f2fe' },
};

/** 아이템 ID로 원문 링크를 계산 */
function resolveLink(id: string, type: string): string {
  // 개념·비교표·인포 → 과목 페이지 (앵커 포함)
  const conceptItem = CONCEPTS.find((c) => c.id === id);
  if (conceptItem) return `/subject/${conceptItem.subject}#${id}`;

  const tableItem = COMPARISON_TABLES.find((t) => t.id === id);
  if (tableItem) return `/subject/${tableItem.subject}#${id}`;

  const infoItem = INFOGRAPHICS.find((i) => i.id === id);
  if (infoItem) return `/subject/${infoItem.subject}#${id}`;

  // 퀴즈 → 과목 OX탭 또는 기출탭
  const quizItem = QUIZZES.find((q) => q.id === id);
  if (quizItem) {
    return quizItem.type === 'frequent'
      ? `/frequent#${id}`
      : `/ox#${id}`;
  }

  // SQL
  const sqlItem = SQL_PRACTICE.find((s) => s.id === id);
  if (sqlItem) return `/sql#${id}`;

  return '/';
}

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useStudyStore();

  const allItems = [
    ...CONCEPTS.map((item) => ({ id: item.id, title: item.title, type: 'concept' as const })),
    ...INFOGRAPHICS.map((item) => ({ id: item.id, title: item.title, type: 'infographic' as const })),
    ...COMPARISON_TABLES.map((item) => ({ id: item.id, title: item.title, type: 'table' as const })),
    ...QUIZZES.map((item) => ({ id: item.id, title: item.question, type: 'quiz' as const })),
    ...SQL_PRACTICE.map((item) => ({ id: item.id, title: item.title, type: 'sql' as const })),
  ];

  const saved = allItems.filter((item) =>
    bookmarks.some((b) => b.itemId === item.id)
  );

  return (
    <div className="page">
      <SectionTitle title="북마크" subtitle={`저장된 항목 ${saved.length}개 · 탭 누르면 원문으로 이동`} />

      <div className="stack">
        {saved.length === 0 ? (
          <div className="empty-box">
            북마크한 항목이 없습니다.<br />
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              개념·비교표·퀴즈에서 ★를 눌러 저장하세요.
            </span>
          </div>
        ) : (
          saved.map((item) => {
            const meta = TYPE_META[item.type] ?? TYPE_META.quiz;
            const dest = resolveLink(item.id, item.type);
            return (
              <Card key={item.id}>
                <div className="card-head">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* 타입 배지 */}
                    <span
                      className="keyword-badge"
                      style={{ background: meta.bg, color: meta.color, marginBottom: '6px' }}
                    >
                      {meta.icon} {meta.label}
                    </span>
                    {/* 제목 — 클릭 시 원문 이동 */}
                    <Link
                      to={dest}
                      className="bm-title-link"
                      title="원문으로 이동"
                    >
                      <h3 style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.45 }}>
                        {item.title}
                      </h3>
                    </Link>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', flexShrink: 0 }}>
                    {/* 원문 바로가기 버튼 */}
                    <Link to={dest} className="goto-btn" title="원문으로 이동">
                      원문 보기 →
                    </Link>
                    {/* 북마크 해제 버튼 */}
                    <button
                      className="icon-btn"
                      style={{ height: '32px', minWidth: '32px', fontSize: '1rem' }}
                      onClick={() => toggleBookmark(item.id, item.type)}
                      title="북마크 해제"
                    >
                      ★
                    </button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
