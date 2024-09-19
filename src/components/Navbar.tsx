import {useEffect, useState} from 'react';
import {PaintBrushIcon, Bars3Icon, UserCircleIcon, ArrowRightEndOnRectangleIcon, ArrowLeftStartOnRectangleIcon} from "@heroicons/react/24/outline";
import {Link, useNavigate} from 'react-router-dom';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import logoDark from '../assets/logo-dark.png';
import logoLight from '../assets/logo-light.png';
import {auth} from "../services/firebase.ts";

const lightThemes = [
    "light", "cupcake", "bumblebee", "emerald", "corporate",
    "valentine", "garden", "lofi", "pastel", "fantasy",
    "cmyk", "autumn", "lemonade", "winter", "nord", "retro", "cyberpunk"
];

const darkThemes = [
    "dark", "synthwave", "halloween",
    "forest", "black", "luxury", "dracula", "night", "coffee",
    "dim", "business", "sunset", "aqua"
];

const Navbar = () => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);


    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleThemeChange = (theme: string) => {
        setCurrentTheme(theme);
        localStorage.setItem('theme', theme);
    };

    const isLightTheme = lightThemes.includes(currentTheme);

    return (
        <div className="navbar bg-base-100">
            <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                    <Bars3Icon className="h-6 w-6"/>
                </label>
            </div>

            <div className="flex-1">
                <Link to={"/"} className="text-lg font-bold ms-6">
                    <img
                        src={isLightTheme ? logoLight : logoDark}
                        alt="NetLink Logo"
                        className="w-40"
                    />
                </Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <button className="btn btn-ghost p-1 md:me-4" onClick={() => {
                        const modal = document.getElementById('choose-theme-modal') as HTMLDialogElement | null;
                        if (modal) {
                            modal.showModal();
                        }
                    }}>
                        <span className="hidden lg:inline">Theme</span>
                        <PaintBrushIcon className="h-6 w-6 lg:hidden"/>
                    </button>

                    <Link to={"/docs/profile"} className="btn btn-ghost p-1 md:me-4">
                        <span className="hidden lg:inline">Profile</span>
                        <UserCircleIcon className="h-6 w-6 lg:hidden"/>
                    </Link>


                    {isLoggedIn ? (
                        <>
                            <button className="btn btn-ghost p-1" onClick={handleLogout}>
                                <ArrowLeftStartOnRectangleIcon className="h-6 w-6"/>
                            </button>
                        </>
                    ) : (
                        <Link to={"/login"} className="btn btn-ghost p-1">
                            <ArrowRightEndOnRectangleIcon className="h-6 w-6"/>
                        </Link>
                    )}

                    <dialog id="choose-theme-modal" className="modal">
                        <div className="modal-box w-96">
                            <h3 className="font-bold text-lg">Select your theme</h3>
                            <p className="py-4">Choose from the available themes below</p>

                            <div className="join join-vertical w-full overflow-y-auto max-h-60">
                                {lightThemes.concat(darkThemes).map((theme) => (
                                    <input
                                        key={theme}
                                        type="radio"
                                        name="theme-buttons"
                                        className="btn theme-controller join-item w-full"
                                        aria-label={theme}
                                        value={theme}
                                        checked={currentTheme === theme}
                                        onChange={() => handleThemeChange(theme)}
                                    />
                                ))}
                            </div>

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
