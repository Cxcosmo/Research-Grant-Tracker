import { useEffect, useState } from 'react';
import { getApprovalHistory, getPendingApprovals } from '../api/approver';
import Layout from '../components/Layout';

export default function ApproverPage() {
  const [pendingCount, setPendingCount] = useState<number | null>(null);
  const [historyCount, setHistoryCount] = useState<number | null>(null);

  useEffect(() => {
    getPendingApprovals().then((rows) => setPendingCount(rows.length));
    getApprovalHistory().then((rows) => setHistoryCount(rows.length));
  }, []);

  return (
    <Layout title="Approver">
      <div className="placeholder-card">
              </div>
    </Layout>
  );
}
