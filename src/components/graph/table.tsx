"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useFetchData } from "@/hooks/useFetchData";
import { setLoading, setUsers, setError } from "@/redux/userSlice";
import { Loader2 } from "lucide-react";
import { User } from "@/types/user";

const DynamicTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dataUrl = `https://jsonplaceholder.typicode.com/users`;
  const { isLoading, data, error } = useFetchData(dataUrl);
 
  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else if (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    } else if (data) {
      dispatch(setLoading(false));
      dispatch(setUsers(data));
    }
  }, [isLoading, data, error, dispatch]);

  const { users } = useSelector((state: RootState) => state.users);
  const filteredData = users?.filter((user:User) =>
    user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Search"
        className="mb-4 p-2 border rounded w-full"
        value={search}
        onChange={handleSearch}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Username</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Website</th>
              <th className="px-4 py-2 border-b">Company</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user: User) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.username}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.phone}</td>
                <td className="px-4 py-2 border-b">{user.website}</td>
                <td className="px-4 py-2 border-b">{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div>
            Rows per page:
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="ml-2 p-1 border rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          <div>
            {page * rowsPerPage + 1}-
            {Math.min((page + 1) * rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length}
            <button
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
              className="ml-2 p-1 border rounded"
            >
              Previous
            </button>
            <button
              onClick={() => handleChangePage(null, page + 1)}
              disabled={(page + 1) * rowsPerPage >= filteredData.length}
              className="ml-2 p-1 border rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
