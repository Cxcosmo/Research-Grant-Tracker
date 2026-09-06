import React, { createContext, useContext, useMemo, useState } from 'react';
import { CurrentUser, Role, ROLES } from '../types';

const NAME_BY_ROLE: Record<Role, string> = {
  grants_officer: 'Firstname Surname',
  approver: 'Wichai Assadangkul',
  finance: 'Naruemon Chaiyasit',
  professor: 'Somchai',
};

export type AppPage = 'dashboard' | 'projects';

interface RoleContextValue {
  user: CurrentUser;
  setRole: (role: Role) => void;
  roles: typeof ROLES;
  page: AppPage;
  setPage: (page: AppPage) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>('grants_officer');
  const [page, setPage] = useState<AppPage>('dashboard');

  function setRole(nextRole: Role) {
    setRoleState(nextRole);
    setPage('dashboard');
  }

  const value = useMemo<RoleContextValue>(
    () => ({
      user: { name: NAME_BY_ROLE[role], role },
      setRole,
      roles: ROLES,
      page,
      setPage,
    }),
    [role, page],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return ctx;
}
