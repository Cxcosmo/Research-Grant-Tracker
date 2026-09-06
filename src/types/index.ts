// Roles

export type Role = 'grants_officer' | 'approver' | 'finance' | 'professor';

export interface RoleInfo {
  id: Role;
  label: string;
  description: string;
}

export const ROLES: RoleInfo[] = [
  {
    id: 'grants_officer',
    label: 'Grants officer',
    description: 'Tracking and monitoring all grant projects',
  },
  {
    id: 'approver',
    label: 'Approver / Manager',
    description: 'Approving grant requests',
  },
  {
    id: 'finance',
    label: 'Finance staff',
    description: 'Managing grant disbursements and budgets',
  },
  {
    id: 'professor',
    label: 'Professor',
    description: 'Project leader / Grant requester',
  },
];

export interface CurrentUser {
  name: string;
  role: Role;
}

// Domain models

export type GrantStatus = 'Approved' | 'Pending' | 'Rejected' | 'Done';

export interface Project {
  id: string;
  name: string;
  leader: string;
  totalBudget: number;
  budgetLeft: number;
  grantsUsed: number;
}

export interface GrantRequest {
  id: string;
  projectId: string;
  projectName: string;
  requestedGrants: number;
  requestedDate: string;
  replyDate: string | null;
  status: GrantStatus;
}

export interface GrantPool {
  availableGrantPool: number;
}
