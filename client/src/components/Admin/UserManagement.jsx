"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../lib/axois";
import { UserCheck, ShieldAlert, Shield, Loader2 } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (filter === "all") setFiltered(users);
    else setFiltered(users.filter((u) => u.role === filter));
  }, [filter, users]);

  const handleRoleChange = async (id, role) => {
    if (!window.confirm(`Change this user’s role to ${role}?`)) return;

    setUpdatingId(id);
    try {
      await axiosInstance.put(`/admin/users/${id}/role`, { role });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
      toast.success("Role updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  return (
    <div className="p-6 bg-base-100 rounded-xl shadow space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <select
          className="select select-bordered select-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="admin">Admins</option>
          <option value="artist">Artists</option>
          <option value="pending_artist">Pending Artists</option>
          <option value="user">Users</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No users found for this filter.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-error"
                          : user.role === "artist"
                          ? "badge-success"
                          : user.role === "pending_artist"
                          ? "badge-warning"
                          : "badge-neutral"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      {user.role === "pending_artist" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "artist")}
                          disabled={updatingId === user._id}
                          className="btn btn-xs btn-success flex items-center gap-1"
                        >
                          {updatingId === user._id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <UserCheck className="w-3 h-3" />
                          )}
                          Verify
                        </button>
                      )}

                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "admin")}
                          disabled={updatingId === user._id}
                          className="btn btn-xs btn-error flex items-center gap-1"
                        >
                          {updatingId === user._id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Shield className="w-3 h-3" />
                          )}
                          Promote
                        </button>
                      )}

                      {user.role === "artist" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "user")}
                          disabled={updatingId === user._id}
                          className="btn btn-xs btn-warning flex items-center gap-1"
                        >
                          {updatingId === user._id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <ShieldAlert className="w-3 h-3" />
                          )}
                          Demote
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
