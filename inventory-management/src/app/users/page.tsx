"use client";

import { useState } from "react";
import { useGetUsersQuery } from "../state/api";
import Header from "@/app/(components)/Header/page";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers =
    users?.filter(
      (user) =>
        user.userId.toString().includes(searchQuery) || // Search by ID
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by Name
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) // Search by Email
    ) || [];

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />

      {/* Search Bar */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search by ID, Name, or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* DataGrid */}
      <DataGrid
        rows={filteredUsers}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Users;
