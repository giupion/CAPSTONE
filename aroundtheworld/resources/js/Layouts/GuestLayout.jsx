import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen relative animate-gradient flex flex-col items-center justify-center">
            <div className="absolute top-0 left-0 right-0 mx-auto text-center">
                <Link href="/">
                    <ApplicationLogo src="/images/aroundtheworld.jpg" alt="Logo" className="block h-28 w-auto bg-gray-800 rounded-full mx-auto" />
                </Link>
            </div>
            <h1 className="text-4xl font-bold my-4 relative" style={{ color: '#daa520' }}>
                
                Around The World!
            </h1>
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}

