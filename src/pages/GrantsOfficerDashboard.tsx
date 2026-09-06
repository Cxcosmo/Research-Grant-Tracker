import { useEffect, useState } from 'react';
import {
  getAvailableGrantPool,
  getGrantRequests,
  getProjects,
} from '../api/grants';
import BudgetPanel from '../components/BudgetPanel';
import GrantTrackerPanel from '../components/GrantTrackerPanel';
import Layout from '../components/Layout';
import ProjectsPanel from '../components/ProjectsPanel';
import { GrantRequest, GrantStatus, Project } from '../types';

export default function GrantsOfficerDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [availablePool, setAvailablePool] = useState(0);

  const [requests, setRequests] = useState<GrantRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<GrantStatus | 'All'>('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let active = true;
    setProjectsLoading(true);
    Promise.all([getProjects(), getAvailableGrantPool()]).then(([projectRows, pool]) => {
      if (!active) return;
      setProjects(projectRows);
      setSelectedProjectId((prev) => prev || projectRows[0]?.id || '');
      setAvailablePool(pool);
      setProjectsLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    setRequestsLoading(true);
    getGrantRequests({ status: statusFilter, search }).then((rows) => {
      if (!active) return;
      setRequests(rows);
      setRequestsLoading(false);
    });
    return () => {
      active = false;
    };
  }, [statusFilter, search]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  return (
    <Layout title="Dashboard">
      <div className="dash-grid">
        <ProjectsPanel
          title="Recent Projects"
          projects={projects}
          loading={projectsLoading}
          headerAction={
            <label className="select-pill" style={{ background: 'var(--primary)', color: '#fff', border: 'none' }}>
                <option value="all">All Project</option>
            </label>
          }
          onViewGrants={(project) => setSearch(project.name)}
        />

        <BudgetPanel
          projects={projects}
          selectedId={selectedProjectId}
          onSelect={setSelectedProjectId}
          availableGrantPool={availablePool}
          loading={projectsLoading}
        />
      </div>

      <GrantTrackerPanel
        title="Grant Tracker"
        requests={requests}
        loading={requestsLoading}
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        page={page}
        onPageChange={setPage}
      />
    </Layout>
  );
}
