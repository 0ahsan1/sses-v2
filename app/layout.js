import './globals.css';
import Header from '@/components/Header'; import Footer from '@/components/Footer';
export const metadata = { title: { default: 'SSES | Solar Engineering & Installation', template: '%s | SSES' }, description: 'Sustainable Solar Energy Solutions provides solar engineering, design and installation services in Pakistan.' };
export default function RootLayout({ children }) { return <html lang="en"><body className="min-h-screen bg-[#f7f5ec] font-sans text-emerald-950 antialiased"><Header/><main>{children}</main><Footer/></body></html> }
