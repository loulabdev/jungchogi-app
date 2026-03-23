import Card from './Card';
import { useStudyStore } from '../store/useStudyStore';
import type { InfographicCardType } from '../types/study';

type Props = { item: InfographicCardType };

export default function InfographicCard({ item }: Props) {
  const { toggleBookmark, isBookmarked } = useStudyStore();
  const bookmarked = isBookmarked(item.id);

  return (
    <Card>
      <div className="card-head">
        <h3>{item.title}</h3>
        <button className="icon-btn" onClick={() => toggleBookmark(item.id, 'infographic')}>
          {bookmarked ? '★' : '☆'}
        </button>
      </div>
      <div className="info-grid">
        {item.items.map((it) => (
          <div key={it.label} className="info-item">
            <span className="info-label">{it.label}</span>
            <strong className="info-value">{it.value}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
