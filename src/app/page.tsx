import type { Metadata } from 'next';
import CosmicLayout from './cosmic-preview/layout';
import CosmicPortfolio from '@/components/cosmic/CosmicPortfolio';
export const metadata: Metadata = {alternates:{canonical:'/'}};
export default function Home() {
 return <CosmicLayout><CosmicPortfolio /></CosmicLayout>;
}
