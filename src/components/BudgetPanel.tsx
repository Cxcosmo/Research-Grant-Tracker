import { Project } from '../types';
import { formatBaht } from '../utils/format';

interface BudgetPanelProps {
  projects: Project[];
  selectedId: string;
  onSelect: (id: string) => void;
  availableGrantPool: number;
  loading?: boolean;
}

export default function BudgetPanel({
  projects,
  selectedId,
  onSelect,
  availableGrantPool,
  loading,
}: BudgetPanelProps) {
  const selected = projects.find((p) => p.id === selectedId) ?? projects[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="card budget-card">
        <label className="budget-card__select">
          <select value={selected?.id ?? ''} onChange={(e) => onSelect(e.target.value)}>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <div>
          <div className="budget-card__label">Budget left</div>
          <div className="budget-card__amount">
            {loading || !selected ? '—' : `${formatBaht(selected.budgetLeft)}$`}
          </div>
        </div>

        <div className="budget-card__divider" />

        <div className="budget-card__row">
          <span className="budget-card__row-label">Grants Used</span>
          <span>{loading || !selected ? '—' : `${formatBaht(selected.grantsUsed)} $`}</span>
        </div>
      </div>

      <div className="pool-card">
        <span className="budget-card__row-label">Available Grant Pool</span>
        <span>{formatBaht(availableGrantPool)} $</span>
      </div>
    </div>
  );
}
