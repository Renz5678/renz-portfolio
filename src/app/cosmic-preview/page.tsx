import type { Metadata } from 'next';
import CosmicPortfolio from '@/components/cosmic/CosmicPortfolio';
export const metadata: Metadata = {
 title: 'Design preview',
 robots: {index:false,follow:false,googleBot:{index:false,follow:false}},
 alternates: {canonical:'/'},
};
export default CosmicPortfolio;
