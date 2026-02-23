import { SecurityMetricsExplorer } from "@/components/security/security-metrics-explorer";
import { getDashboardData } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const groups = await getDashboardData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-sky-50 p-8 md:p-12">
      <section className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Technical Assessments Data Explorer
          </h1>
          <p className="text-slate-600">
            Choose a group, then inspect all metrics inside it across clients and months.
          </p>
        </header>

        <SecurityMetricsExplorer groups={groups} />
      </section>
    </main>
  );
}
