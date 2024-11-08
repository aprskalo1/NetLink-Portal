import {useEffect, useState} from "react";
import EndUserCard from "../components/EndUserCard.tsx";
import SearchBar from "../components/SearchBar.tsx";
import Pagination from "../components/Pagination.tsx";
import {fetchPaginatedEndUsers} from "../services/api.ts";
import {EndUser} from "../types/types.ts";

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
                console.error("Error loading end users:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadEndUsers();
    }, [page, searchTerm]);

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