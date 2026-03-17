import type { ReactNode } from "react";

type DashboardShellProps = {
  header: ReactNode;
  children: ReactNode;
};

export function DashboardShell({ header, children }: DashboardShellProps) {
  return (
    <main className="page-shell grain py-8">
      <div className="container space-y-6">
        {header}
        {children}
      </div>
    </main>
  );
}
