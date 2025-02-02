'use client';

import dynamic from 'next/dynamic';

const AdminApp = dynamic(() => import('@/components/Main'), { ssr: false });

const Main = () => <AdminApp />;

export default Main;
