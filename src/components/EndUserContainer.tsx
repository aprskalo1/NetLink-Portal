import {useEffect, useState} from "react";
import EndUserCard from "../components/EndUserCard.tsx";
import SearchBar from "../components/SearchBar.tsx";
import Pagination from "../components/Pagination.tsx";
import {fetchPaginatedEndUsers} from "../services/api.ts";
import {EndUser} from "../types/types.ts";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

interface EndUserContainerProps {
    onViewSensors: (endUserId: string) => void;
    onViewGroups: (endUserId: string) => void;
}

const EndUserContainer = ({onViewSensors, onViewGroups}: EndUserContainerProps) => {
    const [endUsers, setEndUsers] = useState<EndUser[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const pageSize = 8;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadEndUsers = async () => {
            setIsLoading(true);

            try {
                const data = await fetchPaginatedEndUsers(page, pageSize, searchTerm);
                setEndUsers(data.endUsers);
                setTotalCount(data.totalCount);
            } catch (error) {
                const errorMessage = error instanceof AxiosError && error.response?.data?.message
                    ? error.response.data.message
                    : "Something went wrong while fetching end users.";
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        loadEndUsers();
    }, [page, pageSize, searchTerm]);
    const totalPages = Math.ceil(totalCount / pageSize);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} placeholder={"Search users by anything..."}/>
            <div className="flex flex-wrap gap-4 justify-center">
                {endUsers.length > 0 ? (
                    endUsers.map((user) => (
                        <EndUserCard key={user.id} user={user} onViewSensors={onViewSensors}
                                     onViewGroups={onViewGroups}/>
                    ))
                ) : (
                    !isLoading && <p className="mt-10">No EndUser data available to show.</p>
                )}
            </div>
            {endUsers.length > 0 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};

export default EndUserContainer;