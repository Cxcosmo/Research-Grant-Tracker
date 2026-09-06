import { availableGrantPool, grantRequests, projects } from '../data/mockData';
import { delay } from './professor';

export interface DisbursementRecord {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  disbursedDate: string;
}

export async function getBudgetSummary() {
  return delay(
    projects.map((p) => ({
      projectId: p.id,
      projectName: p.name,
      totalBudget: p.totalBudget,
      budgetLeft: p.budgetLeft,
      grantsUsed: p.grantsUsed,
    })),
  );
}

export async function getApprovedPayouts() {
  return delay(
    grantRequests
      .filter((r) => r.status === 'Approved')
      .map((r) => ({
        id: r.id,
        projectId: r.projectId,
        projectName: r.projectName,
        amount: r.requestedGrants,
        approvedDate: r.replyDate,
      })),
  );
}

export async function getGrantPoolBalance(): Promise<number> {
  return delay(availableGrantPool);
}

export interface RecordDisbursementInput {
  projectId: string;
  amount: number;
}

export async function recordDisbursement(
  input: RecordDisbursementInput,
): Promise<DisbursementRecord> {
  const project = projects.find((p) => p.id === input.projectId);
  const record: DisbursementRecord = {
    id: `disb-${Date.now()}`,
    projectId: input.projectId,
    projectName: project?.name ?? 'Unknown project',
    amount: input.amount,
    disbursedDate: new Date().toLocaleDateString('en-GB'),
  };
  if (project) {
    project.budgetLeft -= input.amount;
    project.grantsUsed += input.amount;
  }
  return delay(record);
}
