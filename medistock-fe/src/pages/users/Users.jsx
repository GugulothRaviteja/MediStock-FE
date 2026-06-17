import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";


function Users() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const fetchUsers = async () => {

        const response = await API.get("/users");

        setUsers(response.data);
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const createStaff = async (e) => {

        e.preventDefault();

        await API.post("/users", formData);

        toast.success("Staff Created");

        fetchUsers();

        setFormData({
            username: "",
            email: "",
            password: "",
        });
    };

    const approveUser = async (id) => {

        try {

            await API.put(
                `/admin/approve/${id}`
            );

            alert(
                "Staff Approved Successfully"
            );

            fetchUsers();

        } catch (error) {

            console.log(error);

            alert(
                "Approval Failed"
            );
        }
    };


    const rejectUser = async (id) => {

        try {

            await API.put(
                `/admin/reject/${id}`
            );

            alert(
                "Staff Rejected"
            );

            fetchUsers();

        } catch (error) {

            console.log(error);

            alert(
                "Reject Failed"
            );
        }
    };

    const deleteUser = async (id) => {

        await API.delete(`/users/${id}`);

        toast.success("User Deleted");

        fetchUsers();
    };

    useEffect(() => {

        fetchUsers();

    }, []);

    return (
        <MainLayout>

            <div className="p-6 ">

                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    User Management
                </h1>

                {/* <form
                    onSubmit={createStaff}
                    className="bg-gray-800 p-6 rounded-4xl shadow mb-8"
                >


                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-white rounded-3xl p-3 shadow-sm border m-3"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white rounded-3xl p-3 shadow-sm border m-3"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-white rounded-3xl p-3 shadow-sm border m-3"
                    />

                    <button
                        className="bg-green-600 text-white p-3 rounded-4xl"
                    >
                        Create Staff
                    </button>

                </form> */}

                <table className="w-full bg-gray-200 shadow rounded-xl">

                    <thead>

                        <tr className="bg-gray-600 text-white">

                            <th className="p-3">Username</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user.id}>

                                <td className="p-3">{user.username}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.role}</td>
                                <td>

                                    <span
                                        className={
                                            user.status === "ACTIVE"
                                                ? "text-green-600 font-bold"
                                                : user.status === "PENDING"
                                                    ? "text-yellow-600 font-bold"
                                                    : "text-red-600 font-bold"
                                        }
                                    >

                                        {user.status}

                                    </span>

                                </td>

                                <td className="p-3">

                                    <div className="flex gap-2 justify-center">

                                        {/* DELETE */}

                                        {
                                            user.role === "STAFF" && (
                                                <button
                                                    onClick={() => deleteUser(user.id)}
                                                    className="
                                            bg-red-500
                                            text-white
                                            p-2
                                            rounded
                                            hover:bg-red-600
                                            "
                                                >

                                                    <FaTrash />
                                                </button>
                                            )
                                        }
                                        {/* APPROVE */}

                                        {
                                            user.status === "PENDING" && (

                                                <button
                                                    onClick={() =>
                                                        approveUser(user.id)
                                                    }
                                                    className="
                                                    bg-green-600
                                                    text-white
                                                    px-3
                                                    py-1
                                                    rounded
                                                    hover:bg-green-700
                                                    "
                                                >
                                                    Approve
                                                </button>
                                            )
                                        }

                                        {/* REJECT */}

                                        {
                                            user.status === "PENDING" && (

                                                <button
                                                    onClick={() =>
                                                        rejectUser(user.id)
                                                    }
                                                    className="
                                                    bg-orange-500
                                                    text-white
                                                    px-3
                                                    py-1
                                                    rounded
                                                    hover:bg-orange-600
                                                    "
                                                >
                                                    Reject
                                                </button>
                                            )
                                        }

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <div className="flex justify-lest mt-6">

                    <button
                        onClick={() => navigate(-1)}
                        className="
        bg-gray-600
        hover:bg-gray-700
        text-white
        px-6
        py-3
        rounded-xl
        transition
        "
                    >
                        ← Back
                    </button>

                </div>

            </div>

        </MainLayout>
    );
}

export default Users;