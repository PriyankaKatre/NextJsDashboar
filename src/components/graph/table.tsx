import React, { useState, useEffect } from "react";
import axios from "axios";

const DynamicTable = () => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

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

  const filteredData = userData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Search"
        className="mb-4 p-2 border rounded w-full"
        value={search}
        onChange={handleSearch}
      />
      {loading ? (
        <div className="flex justify-center items-center p-4">
          <div className="loader">Loading...</div>
        </div>
      ) : (
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
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
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
      )}
    </div>
  );
};

export default DynamicTable;
