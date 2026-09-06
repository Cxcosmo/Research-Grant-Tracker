import { GrantStatus } from '../types';

const LABEL: Record<GrantStatus, string> = {
  Approved: 'Approved',
  Pending: 'Pending',
  Rejected: 'Rejected',
  Done: 'Done',
};

export default function StatusPill({ status }: { status: GrantStatus }) {
  return <span className={`status-pill status-pill--${status}`}>{LABEL[status]}</span>;
}
