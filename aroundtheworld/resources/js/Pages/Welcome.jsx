import { Link, Head } from '@inertiajs/react';
import { version as inertiaVersion } from '@inertiajs/inertia';

export default function Welcome({ auth, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen animate-gradient">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-orange-400 mr-4 hover:no-underline"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gold mr-4 hover:no-underline" // Colore dorato
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="font-semibold text-gold hover:no-underline" // Colore dorato
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-bold text-center text-gold">Around the World!</h1> {/* Colore dorato */}
                    </div>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                           
                        </div>
                    </div>

                    <div className="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
                        <div className="text-center text-sm sm:text-start">&nbsp;</div>

                      
                    </div>
                </div>
            </div>

            <footer className="text-center py-4 bg-gray-200 text-sm">
                &copy; 2024 Giuseppe Sansone. Tutti i diritti riservati. - PHP versione {phpVersion} 
            </footer>

            <style>{`
                .animate-gradient {
                    background: linear-gradient(45deg, #1a237e 0%, #1565c0 33%, #ffffff 67%);
                    background-size: 400% 400%;
                    animation: gradientAnimation 5s ease infinite;
                }

                @keyframes gradientAnimation {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
        </>
    );
}
