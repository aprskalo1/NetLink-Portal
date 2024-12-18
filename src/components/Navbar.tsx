import {useEffect, useState} from 'react';
import {
    PaintBrushIcon,
    Bars3Icon,
    UserCircleIcon,
    ArrowRightEndOnRectangleIcon,
    ArrowLeftStartOnRectangleIcon,
    ChartBarSquareIcon,
    DocumentChartBarIcon
} from "@heroicons/react/24/outline";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import logoDark from '../assets/logo-dark.png';
import logoLight from '../assets/logo-light.png';
import {RootState} from "../store/store.ts";
import {handleSignOut} from "../services/auth.ts";
import {clearUser} from "../store/userSlice.ts";

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
    const isLoggedIn = useSelector((state: RootState) => state.user.developerId !== "");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isDashboard = location.pathname === "/dashboard";


    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    const handleLogout = async () => {
        await handleSignOut();
        dispatch(clearUser());
        navigate("/login");
    };

    const handleThemeChange = (theme: string) => {
        setCurrentTheme(theme);
        localStorage.setItem('theme', theme);
    };

    const isLightTheme = lightThemes.includes(currentTheme);

    return (
        <div className="navbar bg-base-100">
            {!isDashboard && (
                <div className="flex-none lg:hidden">
                    <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                        <Bars3Icon className="h-6 w-6"/>
                    </label>
                </div>
            )}

            <div className="flex-1">
                <Link to={"/"} className="text-lg font-bold ms-2 md:ms-6">
                    <img
                        src={isLightTheme ? logoLight : logoDark}
                        alt="NetLink Logo"
                        className="w-40"
                    />
                </Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {isLoggedIn && (
                        <Link to={isDashboard ? "/docs/install" : "/dashboard"} className="btn btn-ghost p-1 md:me-4">
                            <span className="hidden lg:inline">{isDashboard ? "Docs" : "Dashboard"}</span>
                            {isDashboard ? (
                                <DocumentChartBarIcon className="h-6 w-6 lg:hidden"/>
                            ) : (
                                <ChartBarSquareIcon className="h-6 w-6 lg:hidden"/>
                            )}
                        </Link>
                    )}

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
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                        </div>
                    </dialog>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
