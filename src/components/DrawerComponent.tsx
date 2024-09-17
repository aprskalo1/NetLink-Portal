import {Outlet} from "react-router-dom";

const DrawerComponent = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col items-center p-4">
                <Outlet/>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <ul className="menu bg-base-200 rounded-box w-56">
                        <li><a>Item 1</a></li>
                        <li>
                            <details open>
                                <summary>Parent</summary>
                                <ul>
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                    <li>
                                        <details open>
                                            <summary>Parent</summary>
                                            <ul>
                                                <li><a>Submenu 1</a></li>
                                                <li><a>Submenu 2</a></li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </ul>
            </div>
        </div>
    );
}

export default DrawerComponent;