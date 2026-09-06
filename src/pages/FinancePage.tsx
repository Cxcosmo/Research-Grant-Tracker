import { useEffect, useState } from 'react';
import { getApprovedPayouts, getGrantPoolBalance } from '../api/finance';
import Layout from '../components/Layout';
import { formatBaht } from '../utils/format';

export default function FinancePage() {
  const [payoutCount, setPayoutCount] = useState<number | null>(null);
  const [poolBalance, setPoolBalance] = useState<number | null>(null);

  useEffect(() => {
    getApprovedPayouts().then((rows) => setPayoutCount(rows.length));
    getGrantPoolBalance().then((balance) => setPoolBalance(balance));
  }, []);

  return (
    <Layout title="Finance staff">
      <div className="placeholder-card">

      </div>
    </Layout>
  );
}
