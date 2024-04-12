import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
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
                                className="font-semibold text-orange-400 mr-4 hover:no-underline"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="font-semibold text-orange-400 hover:no-underline"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-bold text-center text-orange-400">Around the world!</h1>
                    </div>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {/* Rimuovi i blocchi di contenuto relativi a Laravel */}
                        </div>
                    </div>

                    <div className="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
                        <div className="text-center text-sm sm:text-start">&nbsp;</div>

                        {/* Mantieni solo la versione di Laravel e PHP */}
                    </div>
                </div>
            </div>

            <footer class="text-center py-4 bg-gray-200 text-sm">
    &copy; 2024 Giuseppe Sansone. Tutti i diritti riservati.
</footer>


            <style>{`
                .animate-gradient {
                    background: linear-gradient(45deg, #1a237e 0%, #1565c0 33%, #ffffff 67%);
                    background-size: 400% 400%;
                    animation: gradientAnimation 10s ease infinite;
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
