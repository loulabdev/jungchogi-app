import Card from './Card';
import { useStudyStore } from '../store/useStudyStore';
import type { ComparisonTableType } from '../types/study';

type Props = { table: ComparisonTableType };

export default function ComparisonTable({ table }: Props) {
  const { toggleBookmark, isBookmarked } = useStudyStore();
  const bookmarked = isBookmarked(table.id);

  return (
    <Card>
      <div className="card-head">
        <h3>{table.title}</h3>
        <button className="icon-btn" onClick={() => toggleBookmark(table.id, 'table')}>
          {bookmarked ? '★' : '☆'}
        </button>
      </div>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              {table.headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, idx) => (
              <tr key={`${table.id}-${idx}`}>
                {table.headers.map((header) => (
                  <td key={`${idx}-${header}`}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
