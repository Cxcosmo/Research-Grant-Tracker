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

export default function ProfessorDashboard() {

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
    Promise.all([getProjects(), getAvailableGrantPool()]).then(
      ([projectRows, pool]) => {
        if (!active) return;
        setProjects(projectRows);
        setSelectedProjectId((prev) => prev || projectRows[0]?.id || '');
        setAvailablePool(pool);
        setProjectsLoading(false);
      },
    );
    return () => {
      active = false;
    };
  }, []);

  const ownProjectIds = projects.map((p) => p.id);

  useEffect(() => {
    if (projectsLoading) return;
    let active = true;
    setRequestsLoading(true);
    getGrantRequests({ status: statusFilter, search, projectIds: ownProjectIds }).then((rows) => {
      if (!active) return;
      setRequests(rows);
      setRequestsLoading(false);
    });
    return () => {
      active = false;
    };
  }, [statusFilter, search, projectsLoading, projects.length]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  return (
    <Layout title="My Dashboard">
      <div className="dash-grid">
        <ProjectsPanel
          title="My Projects"
          projects={projects}
          loading={projectsLoading}
          showLeaderColumn={false}
          headerAction={<span className="placeholder-card__badge">{projects.length} Projects</span>}
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
        title="My Grant Requests"
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
