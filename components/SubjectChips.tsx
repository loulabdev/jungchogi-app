import { SUBJECTS } from '../data/studyData';
import type { SubjectId } from '../types/study';

type Props = {
  selected: SubjectId | 0;
  onSelect: (value: SubjectId | 0) => void;
};

export default function SubjectChips({ selected, onSelect }: Props) {
  return (
    <div className="chips-wrap">
      <button className={`chip ${selected === 0 ? 'chip-active' : ''}`} onClick={() => onSelect(0)}>
        전체
      </button>
      {SUBJECTS.map((subject) => (
        <button
          key={subject.id}
          className={`chip ${selected === subject.id ? 'chip-active' : ''}`}
          onClick={() => onSelect(subject.id)}
        >
          {subject.icon} {subject.shortTitle}
        </button>
      ))}
    </div>
  );
}
