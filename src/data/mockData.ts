import { GrantRequest, Project } from '../types';

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Project 1',
    leader: 'Somchai',
    totalBudget: 200000,
    budgetLeft: 196600,
    grantsUsed: 3400,
  },
  {
    id: 'proj-2',
    name: 'Project 2',
    leader: 'Somchai',
    totalBudget: 200000,
    budgetLeft: 196600,
    grantsUsed: 3400,
  },
  {
    id: 'proj-3',
    name: 'Project 3',
    leader: 'Piyada',
    totalBudget: 150000,
    budgetLeft: 138000,
    grantsUsed: 12000,
  },
  {
    id: 'proj-5',
    name: 'Project 5',
    leader: 'Somchai',
    totalBudget: 180000,
    budgetLeft: 168000,
    grantsUsed: 12000,
  },
];

export const grantRequests: GrantRequest[] = [
  {
    id: 'gr-1',
    projectId: 'proj-1',
    projectName: 'Project 1',
    requestedGrants: 12000,
    requestedDate: '1/8/2026',
    replyDate: '6/9/2026',
    status: 'Approved',
  },
  {
    id: 'gr-2',
    projectId: 'proj-2',
    projectName: 'Project 2',
    requestedGrants: 12000,
    requestedDate: '1/8/2026',
    replyDate: null,
    status: 'Pending',
  },
  {
    id: 'gr-3',
    projectId: 'proj-3',
    projectName: 'Project 3',
    requestedGrants: 12000,
    requestedDate: '1/8/2026',
    replyDate: null,
    status: 'Pending',
  },
  {
    id: 'gr-4',
    projectId: 'proj-4',
    projectName: 'Project 4',
    requestedGrants: 12000,
    requestedDate: '1/8/2026',
    replyDate: null,
    status: 'Done',
  },
  {
    id: 'gr-5',
    projectId: 'proj-5',
    projectName: 'Project 5',
    requestedGrants: 12000,
    requestedDate: '1/8/2026',
    replyDate: '6/9/2026',
    status: 'Rejected',
  },
];

export const availableGrantPool = 1000000;
