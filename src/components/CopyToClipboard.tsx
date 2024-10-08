import {useState} from "react";
import {ClipboardIcon} from "@heroicons/react/24/outline";

const CopyToClipboard = ({text}: { text: string }) => {
    const [tooltipText, setTooltipText] = useState("Copy");

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setTooltipText("Copied!");

            setTimeout(() => {
                setTooltipText("Copy");
            }, 2000);
        });
    };

    return (
        <button onClick={handleCopy}>
            <div className="max-h-10 tooltip" data-tip={tooltipText}>
                <ClipboardIcon className="h-6 w-6"/>
            </div>
        </button>
    );
};

export default CopyToClipboard;
