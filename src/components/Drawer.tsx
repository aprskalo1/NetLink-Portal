import {Link, Outlet} from "react-router-dom";

const Drawer = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col items-center p-4">
                <Outlet/>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <ul className="menu bg-base-200 rounded-box w-72">
                        <li>
                            <summary>Docs</summary>
                            <ul>
                                <li>
                                    <Link to={"/docs/install"}>Install</Link>
                                </li>
                                <li>
                                    <Link to={"/docs/use"}>Use</Link>
                                </li>
                                <li>
                                    <Link to={"/docs/overview"}>Quick Overview</Link>
                                </li>
                                <li>
                                    <details open>
                                        <summary>Services & Features</summary>
                                        <ul>
                                            <li>
                                                <Link to={"/docs/endusers"}>End Users</Link>
                                            </li>
                                            <li>
                                                <Link to={"/docs/sensors"}>Sensor Management</Link>
                                            </li>
                                            <li>
                                                <Link to={"/docs/groups"}>Grouping</Link>
                                            </li>
                                            <li>
                                                <Link to={"/docs/recordingvalues"}>Recording Values</Link>
                                            </li>
                                            <li>
                                                <Link to={"/docs/realtimedata"}>Real-Time Sensor Data</Link>
                                            </li>
                                            <li>
                                                <Link to={"/docs/statistics"}>Statistics</Link>
                                            </li>
                                        </ul>
                                    </details>
                                    <details open>
                                        <summary>Recording Values Remotely</summary>
                                        <ul>
                                            <li>
                                                <Link to={"/docs/httpvaluerecording"}>HTTP</Link>
                                            </li>
                                            <li>
                                                <Link to={"/docs/mqttvaluerecording"}>MQTT</Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <Link to={"/docs/goodpractices"}>Good Practices</Link>
                                </li>
                            </ul>
                            <summary><Link to={"/docs/wrapup"}>Wrap-Up</Link></summary>
                        </li>
                    </ul>
                </ul>
            </div>
        </div>
    );
}

export default Drawer;