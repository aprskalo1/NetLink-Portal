import {useEffect, useState} from 'react';
import logoDark from '../assets/logo_dark.png';
import logoLight from '../assets/logo_light.png';
import {Link} from 'react-router-dom';
import {Bars3Icon} from '@heroicons/react/24/solid';

const lightThemes = [
    "light", "cupcake", "bumblebee", "emerald", "corporate",
    "valentine", "garden", "aqua", "lofi", "pastel", "fantasy",
    "cmyk", "autumn", "business", "lemonade", "winter", "sunset"
];

const darkThemes = [
    "dark", "synthwave", "retro", "cyberpunk", "halloween",
    "forest", "black", "luxury", "dracula", "night", "coffee",
    "dim", "nord"
];

const NavbarComponent = () => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

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
                <Link to="/" className="text-lg font-bold ms-6">
                    <img
                        src={isLightTheme ? logoLight : logoDark}
                        alt="NetLink Logo"
                        className="w-40"
                    />
                </Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <button className="btn btn-ghost" onClick={() => {
                        const modal = document.getElementById('choose-theme-modal') as HTMLDialogElement | null;
                        if (modal) {
                            modal.showModal();
                        }
                    }}>
                        Theme
                    </button>

                    <dialog id="choose-theme-modal" className="modal">
                        <div className="modal-box w-96">
                            <h3 className="font-bold text-lg">Select your theme</h3>
                            <p className="py-4">Choose from the available themes below:</p>

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

export default NavbarComponent;
