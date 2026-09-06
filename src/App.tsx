import { RoleProvider, useRole } from './context/RoleContext';
import ApproverPage from './pages/ApproverPage';
import FinancePage from './pages/FinancePage';
import GrantsOfficerDashboard from './pages/GrantsOfficerDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';
import ProjectsListPage from './pages/ProjectsListPage';

function RoleRouter() {
  const { user, page } = useRole();

  switch (user.role) {
    case 'grants_officer':
      return page === 'projects' ? <ProjectsListPage /> : <GrantsOfficerDashboard />;
    case 'professor':
      return page === 'projects' ? (
        <ProjectsListPage scopeToLeader={user.name} />
      ) : (
        <ProfessorDashboard />
      );
    case 'approver':
      return <ApproverPage />;
    case 'finance':
      return <FinancePage />;
    default:
      return null;
  }
}

export default function App() {
  return (
    <RoleProvider>
      <RoleRouter />
    </RoleProvider>
  );
}
