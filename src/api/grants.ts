import { availableGrantPool, grantRequests, projects } from '../data/mockData';
import { GrantRequest, GrantStatus, Project } from '../types';
import { delay } from './professor';

export async function getProjects(params?: { leader?: string }): Promise<Project[]> {
  const rows = params?.leader
    ? projects.filter((p) => p.leader === params.leader)
    : projects;
  return delay(rows);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return delay(projects.find((p) => p.id === id));
}

export interface CreateProjectInput {
  name: string;
  leader: string;
  totalBudget: number;
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  const newProject: Project = {
    id: `proj-${Date.now()}`,
    name: input.name,
    leader: input.leader,
    totalBudget: input.totalBudget,
    budgetLeft: input.totalBudget,
    grantsUsed: 0,
  };
  projects.push(newProject);
  return delay(newProject);
}

export async function getAvailableGrantPool(): Promise<number> {
  return delay(availableGrantPool);
}

export interface GrantRequestFilters {
  projectId?: string;
  projectIds?: string[];
  status?: GrantStatus | 'All';
  search?: string;
}

export async function getGrantRequests(filters?: GrantRequestFilters): Promise<GrantRequest[]> {
  let rows = grantRequests;

  if (filters?.projectId) {
    rows = rows.filter((r) => r.projectId === filters.projectId);
  }
  if (filters?.projectIds) {
    const ids = new Set(filters.projectIds);
    rows = rows.filter((r) => ids.has(r.projectId));
  }
  if (filters?.status && filters.status !== 'All') {
    rows = rows.filter((r) => r.status === filters.status);
  }
  if (filters?.search) {
    const q = filters.search.trim().toLowerCase();
    rows = rows.filter((r) => r.projectName.toLowerCase().includes(q));
  }

  return delay(rows);
}

export interface CreateGrantRequestInput {
  projectId: string;
  requestedGrants: number;
}

export async function createGrantRequest(
  input: CreateGrantRequestInput,
): Promise<GrantRequest> {
  const project = projects.find((p) => p.id === input.projectId);
  const newRequest: GrantRequest = {
    id: `gr-${grantRequests.length + 1}`,
    projectId: input.projectId,
    projectName: project?.name ?? 'Unknown project',
    requestedGrants: input.requestedGrants,
    requestedDate: new Date().toLocaleDateString('en-GB'),
    replyDate: null,
    status: 'Pending',
  };
  grantRequests.unshift(newRequest);
  return delay(newRequest);
}
