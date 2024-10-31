import {useEffect, useState} from "react";
import Navbar from "../components/Navbar.tsx";
import EndUserCard from "../components/EndUserCard.tsx";
import {fetchPaginatedEndUsers} from "../services/api.ts";
import {EndUser} from "../types/types.ts";

const DashboardPage = () => {
    const [endUsers, setEndUsers] = useState<EndUser[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 8;

    useEffect(() => {
        const loadEndUsers = async () => {
            try {
                const data = await fetchPaginatedEndUsers(page, pageSize);
                setEndUsers(data.endUsers);  // data.endUsers should match the EndUser[] type
                setTotalCount(data.totalCount);
            } catch (error) {
                console.error("Error loading end users:", error);
            }
        };
        loadEndUsers();
    }, [page]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <>
            <Navbar/>
            <div className="flex flex-wrap gap-4 justify-center">
                {endUsers.map((user) => (
                    <EndUserCard key={user.id} user={user}/>
                ))}
            </div>
            <div className="join mt-4 mb-4 flex justify-center">
                <button className="join-item btn" onClick={handlePrevPage} disabled={page === 1}>«</button>
                <button className="join-item btn">Page {page}</button>
                <button className="join-item btn" onClick={handleNextPage} disabled={page === totalPages}>»</button>
            </div>
        </>
    );
};

export default DashboardPage;