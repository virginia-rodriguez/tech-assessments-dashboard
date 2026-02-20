type SelectOption = {
  label: string;
  value: string;
};

type MetricTrendFiltersProps = {
  clients: SelectOption[];
  selectedClient: string;
  onClientChange: (value: string) => void;
};

export function MetricTrendFilters({
  clients,
  selectedClient,
  onClientChange,
}: MetricTrendFiltersProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700">Client</span>
        <select
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          value={selectedClient}
          onChange={(event) => onClientChange(event.target.value)}
        >
          {clients.map((client) => (
            <option key={client.value} value={client.value}>
              {client.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
