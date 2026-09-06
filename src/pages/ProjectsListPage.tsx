import { useEffect, useState } from 'react';
import { createProject, getProjects } from '../api/grants';
import { ExternalLinkIcon, PlusIcon, SearchIcon } from '../components/Icons';
import Layout from '../components/Layout';
import NewProjectModal from '../components/NewProjectModal';
import Pagination from '../components/Pagination';
import { useRole } from '../context/RoleContext';
import { Project } from '../types';
import { formatBaht } from '../utils/format';

const PAGE_SIZE = 8;

interface ProjectsListPageProps {
  scopeToLeader?: string;
}

export default function ProjectsListPage({ scopeToLeader }: ProjectsListPageProps) {
  const { user } = useRole();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showNewProject, setShowNewProject] = useState(false);

  function reload() {
    setLoading(true);
    getProjects(scopeToLeader ? { leader: scopeToLeader } : undefined).then((rows) => {
      setProjects(rows);
      setLoading(false);
    });
  }

  useEffect(() => {
    reload();
  }, [scopeToLeader]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  async function handleCreate(input: { name: string; leader: string; totalBudget: number }) {
    await createProject(input);
    setShowNewProject(false);
    reload();
  }

  return (
    <Layout title="Projects">
      <section className="card">
        <div className="card__head">
          <h2 className="card__title">Project List</h2>
          <div className="tracker-toolbar">
            <label className="search-input">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button type="button" className="pill" onClick={() => setShowNewProject(true)}>
              New Project
              <PlusIcon />
            </button>
          </div>
        </div>

        <table className="tracker-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Leader</th>
              <th>Total Grants</th>
              <th>Grants Used</th>
              <th>Budget left</th>
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
                  No matching projects found
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((p) => (
                <tr key={p.id}>
                  <td>
                    <span className="row-name">
                      <span className="row-name__bar" />
                      {p.name}
                    </span>
                  </td>
                  <td>{p.leader}</td>
                  <td>{formatBaht(p.totalBudget)}</td>
                  <td>{formatBaht(p.grantsUsed)}</td>
                  <td>{formatBaht(p.budgetLeft)}</td>
                  <td>
                    <button type="button" className="view-link" title="View">
                      <ExternalLinkIcon />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination page={page} pageCount={pageCount} onChange={setPage} />
      </section>

      {showNewProject && (
        <NewProjectModal
          defaultLeader={scopeToLeader ?? user.name}
          lockLeader={Boolean(scopeToLeader)}
          onClose={() => setShowNewProject(false)}
          onSubmit={handleCreate}
        />
      )}
    </Layout>
  );
}
