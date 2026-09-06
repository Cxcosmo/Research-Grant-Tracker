import { grantRequests } from '../data/mockData';
import { GrantRequest } from '../types';
import { delay } from './professor';

export async function getPendingApprovals(): Promise<GrantRequest[]> {
  return delay(grantRequests.filter((r) => r.status === 'Pending'));
}

export interface ApprovalDecisionInput {
  requestId: string;
  decision: 'Approved' | 'Rejected';
  comment?: string;
}

export async function decideGrantRequest(
  input: ApprovalDecisionInput,
): Promise<GrantRequest | undefined> {
  const request = grantRequests.find((r) => r.id === input.requestId);
  if (request) {
    request.status = input.decision;
    request.replyDate = new Date().toLocaleDateString('en-GB');
  }
  return delay(request);
}

export async function getApprovalHistory(): Promise<GrantRequest[]> {
  return delay(grantRequests.filter((r) => r.status !== 'Pending'));
}
