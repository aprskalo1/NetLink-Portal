import React, {ChangeEvent, useState, useEffect} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    isLoading: boolean;
    placeholder?: string;
}

const SearchBar = ({onSearch, isLoading, placeholder}: SearchBarProps) => {
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

    return (
        <div className="mb-2 mt-2 flex justify-center">
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="input input-bordered w-full max-w-sm sm:max-w-lg"
            />
            <button onClick={handleSearchClick} className="btn btn-outline btn-primary ms-1 min-w-10">
                {showSpinner ? (
                    <span className="loading loading-spinner loading-sm"></span>
                ) : (
                    <MagnifyingGlassIcon className="w-5 h-5"/>
                )}
            </button>
        </div>
    );
};

export default SearchBar;
