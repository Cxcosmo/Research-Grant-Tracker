import { useEffect, useRef, useState } from 'react';
import { useRole } from '../context/RoleContext';
import { Role } from '../types';
import { ChevronRightIcon, UserIcon } from './Icons';

export default function ProfileMenu() {
  const { user, roles, setRole } = useRole();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentRoleInfo = roles.find((r) => r.id === user.role);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleSelect(role: Role) {
    setRole(role);
    setOpen(false);
  }

  return (
    <div className="profile-menu" ref={rootRef}>
      <button
        type="button"
        className={`profile-chip${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="profile-chip__avatar">
          <UserIcon />
        </span>
        <span className="profile-chip__text">
          <span className="profile-chip__name">{user.name}</span>
          <br />
          <span className="profile-chip__role">{currentRoleInfo?.label}</span>
        </span>
        <ChevronRightIcon className="profile-chip__chevron" />
      </button>

      {open && (
        <div className="profile-dropdown" role="menu">
          <div className="profile-dropdown__label">Switch role</div>
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              role="menuitemradio"
              aria-checked={r.id === user.role}
              className={`profile-dropdown__item${r.id === user.role ? ' is-active' : ''}`}
              onClick={() => handleSelect(r.id)}
            >
              <span className="profile-dropdown__item-title">{r.label}</span>
              <span className="profile-dropdown__item-desc">{r.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
