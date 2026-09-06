import React from 'react';
import { Project } from '../types';
import { formatBaht } from '../utils/format';
import { ArrowUpRightIcon } from './Icons';

interface ProjectsPanelProps {
  title: string;
  projects: Project[];
  loading?: boolean;
  headerAction?: React.ReactNode;
  showLeaderColumn?: boolean;
  onViewGrants?: (project: Project) => void;
}

export default function ProjectsPanel({
  title,
  projects,
  loading,
  headerAction,
  showLeaderColumn = true,
  onViewGrants,
}: ProjectsPanelProps) {
  return (
    <section className="card">
      <div className="card__head">
        <h2 className="card__title">{title}</h2>
        {headerAction}
      </div>

      <table className="proj-table">
        <thead>
          <tr>
            <th>Project Name</th>
            {showLeaderColumn && <th>Leader</th>}
            <th>Budget left</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={4} className="empty-row">
                Loading data...
              </td>
            </tr>
          )}
          {!loading && projects.length === 0 && (
            <tr>
              <td colSpan={4} className="empty-row">
                No projects available
              </td>
            </tr>
          )}
          {!loading &&
            projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <span className="row-name">
                    <span className="row-name__bar" />
                    {project.name}
                  </span>
                </td>
                {showLeaderColumn && <td>{project.leader}</td>}
                <td>{formatBaht(project.budgetLeft)} ฿</td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    className="link-action"
                    onClick={() => onViewGrants?.(project)}
                  >
                    Requested Grants
                    <ArrowUpRightIcon />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
