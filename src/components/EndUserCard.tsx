import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";
import {EndUser} from "../types/types.ts";

interface EndUserCardProps {
    user: EndUser;
}

const EndUserCard = ({user}: EndUserCardProps) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title flex justify-center">End User: {user.firstName}</h2>
                <hr/>
                <div className="flex justify-between items-center">
                    <label className="input input-bordered input-sm flex items-center gap-2">
                        Id
                        <input type="text" className="grow" placeholder={user.id || "n/a"} readOnly/>
                    </label>
                    <div className={`badge ${user.active ? 'badge-success' : 'badge-error'}`}>
                        {user.active ? "Active" : "Inactive"}
                    </div>
                </div>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Username
                    <input type="text" className="grow" placeholder={user.username || "n/a"} readOnly/>
                </label>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Email
                    <input type="text" className="grow" placeholder={user.email || "n/a"} readOnly/>
                </label>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    First Name
                    <input type="text" className="grow" placeholder={user.firstName || "n/a"} readOnly/>
                </label>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Last Name
                    <input type="text" className="grow" placeholder={user.lastName || "n/a"} readOnly/>
                </label>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Created At
                    <input type="text" className="grow" placeholder={new Date(user.createdAt).toLocaleString() || "n/a"} readOnly/>
                </label>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Deleted At
                    <input type="text" className="grow" placeholder={user.deletedAt ? new Date(user.deletedAt).toLocaleString() : "n/a"} readOnly/>
                </label>
                <hr/>
                <div className="flex justify-between items-center">
                    <Link
                        to={`/user/${user.id}/sensors`}
                        className="btn btn-outline btn-wide btn-primary btn-sm flex items-center gap-2 rounded-xl"
                    >
                        End Users Sensors
                        <ArrowRightIcon className="w-5 h-5"/>
                    </Link>
                    <div className="dropdown dropdown-left dropdown-end flex justify-end">
                        <PencilSquareIcon tabIndex={0} role="button" className="btn btn-sm p-0.5"/>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {user.deletedAt ? (
                                <li>
                                    <button className="btn btn-outline btn-info btn-sm m-1">Restore</button>
                                </li>
                            ) : (
                                <>
                                    {user.active && (
                                        <li>
                                            <button className="btn btn-outline btn-warning btn-sm m-1">Deactivate</button>
                                        </li>
                                    )}

                                    {!user.active && (
                                        <li>
                                            <button className="btn btn-outline btn-success btn-sm m-1">Reactivate</button>
                                        </li>
                                    )}

                                    <li>
                                        <button className="btn btn-outline btn-error btn-sm m-1">Delete</button>
                                    </li>
                                </>
                            )}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EndUserCard;