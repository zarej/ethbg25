import { PropsWithChildren } from 'react';
import Header from './components/Header';

type LayoutProps = PropsWithChildren<{}>;

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  );
}
