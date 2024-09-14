import logoDark from '../assets/logo_dark.png';
import {Link} from 'react-router-dom';
import {Bars3Icon} from '@heroicons/react/24/solid';

const NavbarComponent = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                    <Bars3Icon className="h-6 w-6"/>
                </label>
            </div>

            <div className="flex-1">
                <Link to="/" className="text-lg font-bold ms-6">
                    <img src={logoDark} alt="NetLink Logo" className="w-40"/>
                </Link>
            </div>

            <div className="flex-none hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Link</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavbarComponent;