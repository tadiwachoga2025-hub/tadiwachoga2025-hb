interface DashboardCardProps {
  title: string;
  action?: string;
  onAction?: () => void;
  children: React.ReactNode;
}

export function DashboardCard({ title, action, onAction, children }: DashboardCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center justify-between border-b border-slate-border px-6 py-4">
        <h3 className="font-semibold text-dark">{title}</h3>
        {action && (
          <button onClick={onAction} className="text-sm font-medium text-teal hover:underline">{action}</button>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
