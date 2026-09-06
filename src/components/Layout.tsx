import React from 'react';
import { useRole } from '../context/RoleContext';
import { ChevronRightIcon, FolderIcon, HomeIcon, LogOutIcon, SearchIcon, SlidersIcon } from './Icons';
import ProfileMenu from './ProfileMenu';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const { page, setPage } = useRole();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__logo">Logo</div>
        <nav className="sidebar__nav">
          <button
            type="button"
            className={`sidebar__nav-item${page === 'dashboard' ? ' is-active' : ''}`}
            title="Dashboard"
            onClick={() => setPage('dashboard')}
          >
            <HomeIcon />
          </button>
          <button
            type="button"
            className={`sidebar__nav-item${page === 'projects' ? ' is-active' : ''}`}
            title="Projects"
            onClick={() => setPage('projects')}
          >
            <FolderIcon />
          </button>
        </nav>
        <button type="button" className="sidebar__logout" title="Logout">
          <LogOutIcon />
        </button>
      </aside>

      <main className="main">
        <div className="topbar">
          <h1 className="topbar__title">{title}</h1>
          <div className="topbar__actions">
            <button type="button" className="icon-btn" title="Search">
              <SearchIcon />
            </button>
            <ProfileMenu />
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
