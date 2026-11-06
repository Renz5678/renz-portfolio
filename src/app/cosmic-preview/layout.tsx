import localFont from 'next/font/local';
import './cosmic.css';

const display = localFont({
  src: '../../components/cosmic/fonts/unbounded-latin-900.woff2',
  weight: '900',
  style: 'normal',
  variable: '--font-cosmic-display',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

export default function CosmicLayout({ children }: { children: React.ReactNode }) {
  return <div className={display.variable}>{children}</div>;
}
