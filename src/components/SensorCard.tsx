import {ArrowRightIcon} from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";
import {Sensor} from "../types/types.ts";

interface SensorCardProps {
    sensor: Sensor;
}

const SensorCard = ({sensor}: SensorCardProps) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title flex justify-center">Sensor: {sensor.deviceName || "Unnamed"}</h2>
                <hr/>

                <div className="flex justify-between items-center">
                    <label className="input input-bordered input-sm flex items-center gap-2">
                        Id
                        <input type="text" className="grow" placeholder={sensor.id.toString()} readOnly/>
                    </label>
                    <div className="badge badge-info">
                        {sensor.deviceType || "Type not specified"}
                    </div>
                </div>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Measurement Unit
                    <input type="text" className="grow" placeholder={sensor.measurementUnit || "n/a"} readOnly/>
                </label>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Location
                    <input type="text" className="grow" placeholder={sensor.deviceLocation || "n/a"} readOnly/>
                </label>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Description
                    <input type="text" className="grow" placeholder={sensor.deviceDescription || "n/a"} readOnly/>
                </label>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Created At
                    <input
                        type="text"
                        className="grow"
                        placeholder={sensor.createdAt ? new Date(sensor.createdAt).toLocaleString() : "n/a"}
                        readOnly
                    />
                </label>

                <hr/>

                <div className="flex justify-between items-center">
                    <Link
                        to={`/sensor/${sensor.id}/details`}
                        className="btn btn-outline btn-wide btn-primary btn-sm flex items-center gap-2 rounded-xl"
                    >
                        Sensor Details
                        <ArrowRightIcon className="w-5 h-5"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SensorCard;