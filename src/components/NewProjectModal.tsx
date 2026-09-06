import { FormEvent, useState } from 'react';
import Modal from './Modal';

interface NewProjectModalProps {
  defaultLeader?: string;
  lockLeader?: boolean;
  onClose: () => void;
  onSubmit: (input: { name: string; leader: string; totalBudget: number }) => Promise<void>;
}

export default function NewProjectModal({
  defaultLeader = '',
  lockLeader = false,
  onClose,
  onSubmit,
}: NewProjectModalProps) {
  const [name, setName] = useState('');
  const [leader, setLeader] = useState(defaultLeader);
  const [totalBudget, setTotalBudget] = useState('200000');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !leader.trim()) {
      setError('Please fill in the project name and leader');
      return;
    }
    const budgetNumber = Number(totalBudget);
    if (!Number.isFinite(budgetNumber) || budgetNumber <= 0) {
      setError('Please enter a valid budget amount greater than 0');
      return;
    }

    setSubmitting(true);
    setError('');
    await onSubmit({ name: name.trim(), leader: leader.trim(), totalBudget: budgetNumber });
    setSubmitting(false);
  }

  return (
    <Modal title="New Project" onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label className="modal-form__field">
          <span>Project Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Project 4"
            autoFocus
          />
        </label>

        <label className="modal-form__field">
          <span>Leader</span>
          <input
            type="text"
            value={leader}
            onChange={(e) => setLeader(e.target.value)}
            placeholder="e.g., John Doe"
            disabled={lockLeader}
          />
        </label>

        <label className="modal-form__field">
          <span>Total Grants (฿)</span>
          <input
            type="number"
            min={1}
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
          />
        </label>

        {error && <div className="modal-form__error">{error}</div>}

        <div className="modal-form__actions">
          <button type="button" className="pill pill--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="pill" disabled={submitting}>
            {submitting ? 'Saving...' : 'Create Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
