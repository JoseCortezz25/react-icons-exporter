import type { PropsWithChildren } from 'react';

export function InitialViewTemplate({ children }: PropsWithChildren) {
  return (
    <main className="initial-view-template">
      <div className="initial-view-template__shell">{children}</div>
    </main>
  );
}
