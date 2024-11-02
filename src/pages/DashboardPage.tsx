import React, {ChangeEvent, useEffect, useState} from "react";
import Navbar from "../components/Navbar.tsx";
import EndUserCard from "../components/EndUserCard.tsx";
import {fetchPaginatedEndUsers} from "../services/api.ts";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {EndUser} from "../types/types.ts";

const DashboardPage = () => {
    const [endUsers, setEndUsers] = useState<EndUser[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const pageSize = 8;
    const [isLoading, setIsLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const loadEndUsers = async () => {
            setIsLoading(true);
            setShowSpinner(false);

            const timer = setTimeout(() => {
                setShowSpinner(true);
            }, 500);

            try {
                const data = await fetchPaginatedEndUsers(page, pageSize, searchTerm);
                setEndUsers(data.endUsers);
                setTotalCount(data.totalCount);
            } catch (error) {
                console.error("Error loading end users:", error);
            } finally {
                clearTimeout(timer);
                setIsLoading(false);
                setShowSpinner(false);
            }
        };
        loadEndUsers();
    }, [page, searchTerm]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearchClick = () => {
        setSearchTerm(inputValue);
        setPage(1);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearchClick();
        }
    };

    return (
        <>
            <Navbar/>
            <div className="mb-2 mt-2 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by anything..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="input input-bordered w-full max-w-xs"
                />
                <button onClick={handleSearchClick} className="btn btn-outline btn-primary ms-1 min-w-10">
                    {showSpinner ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <MagnifyingGlassIcon className="w-5 h-5"/>
                    )}
                </button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                {endUsers.length > 0 ? (
                    endUsers.map((user) => (
                        <EndUserCard key={user.id} user={user}/>
                    ))
                ) : (
                    !isLoading && <p className="mt-10">No data available to show.</p>
                )}
            </div>
            {endUsers.length > 0 && (
                <div className="join mt-4 mb-4 flex justify-center">
                    <button className="join-item btn" onClick={handlePrevPage} disabled={page === 1}>«</button>
                    <button className="join-item btn">Page {page}</button>
                    <button className="join-item btn" onClick={handleNextPage} disabled={page === totalPages}>»</button>
                </div>
            )}
        </>
    );
};

export default DashboardPage;