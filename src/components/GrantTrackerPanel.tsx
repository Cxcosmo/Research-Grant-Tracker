import React from 'react';
import { GrantRequest, GrantStatus } from '../types';
import { formatBaht } from '../utils/format';
import { CalendarIcon, ExternalLinkIcon, SearchIcon } from './Icons';
import Pagination from './Pagination';
import StatusPill from './StatusPill';

const PAGE_SIZE = 5;

interface GrantTrackerPanelProps {
  title: string;
  requests: GrantRequest[];
  loading?: boolean;
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: GrantStatus | 'All';
  onStatusFilterChange: (v: GrantStatus | 'All') => void;
  page: number;
  onPageChange: (page: number) => void;
  headerAction?: React.ReactNode;
}

export default function GrantTrackerPanel({
  title,
  requests,
  loading,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  page,
  onPageChange,
  headerAction,
}: GrantTrackerPanelProps) {
  const pageCount = Math.max(1, Math.ceil(requests.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const rows = requests.slice(start, start + PAGE_SIZE);

  return (
    <section className="card">
      <div className="card__head">
        <h2 className="card__title">{title}</h2>
        <div className="tracker-toolbar">
          <label className="search-input">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </label>
          <button type="button" className="icon-btn" title="Filter by date">
            <CalendarIcon />
          </button>
          <label className="select-pill">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value as GrantStatus | 'All')}
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Done">Done</option>
            </select>
          </label>
          {headerAction}
        </div>
      </div>

      <table className="tracker-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Requested Grants</th>
            <th>Requested Date</th>
            <th>Reply Date</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6} className="empty-row">
                Loading...
              </td>
            </tr>
          )}
          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={6} className="empty-row">
                No items found matching the criteria
              </td>
            </tr>
          )}
          {!loading &&
            rows.map((r) => (
              <tr key={r.id}>
                <td>
                  <span className="row-name">
                    <span
                      className="row-name__bar"
                      style={{
                        background:
                          r.status === 'Approved'
                            ? 'var(--green)'
                            : r.status === 'Rejected'
                            ? 'var(--rose)'
                            : 'var(--amber)',
                      }}
                    />
                    {r.projectName}
                  </span>
                </td>
                <td>{formatBaht(r.requestedGrants)}</td>
                <td>{r.requestedDate}</td>
                <td>{r.replyDate ?? '-'}</td>
                <td>
                  <StatusPill status={r.status} />
                </td>
                <td>
                  <button type="button" className="view-link" title="View details">
                    <ExternalLinkIcon />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination page={page} pageCount={pageCount} onChange={onPageChange} />
    </section>
  );
}
