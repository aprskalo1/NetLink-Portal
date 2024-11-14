import React, {ChangeEvent, useState, useEffect} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    isLoading: boolean;
    placeholder?: string;
    size?: "small";
}

const SearchBar = ({onSearch, isLoading, placeholder, size}: SearchBarProps) => {
    const [inputValue, setInputValue] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isLoading) {
            timer = setTimeout(() => setShowSpinner(true), 100);
        } else {
            setShowSpinner(false);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isLoading]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(inputValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearchClick();
        }
    };

    const inputClasses = `input input-bordered w-full max-w-sm sm:max-w-lg ${size === "small" ? "input-sm" : ""}`;
    const buttonClasses = `btn btn-outline btn-primary ms-1 min-w-10 ${size === "small" ? "btn-sm" : ""}`;

    return (
        <div className="mb-2 mt-2 flex justify-center ps-3 pe-3">
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={inputClasses}
            />
            <button onClick={handleSearchClick} className={buttonClasses}>
                {showSpinner ? (
                    <span className="loading loading-spinner loading-sm"></span>
                ) : (
                    <MagnifyingGlassIcon className={`w-5 h-5 ${size === "small" ? "w-4 h-4" : ""}`}/>
                )}
            </button>
        </div>
    );
};

export default SearchBar;