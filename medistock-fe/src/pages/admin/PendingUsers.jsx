import { useEffect, useState } from "react";
import API from "../../api/axios";

function PendingUsers() {

    const [users, setUsers] = useState([]);

    const fetchPendingUsers = async () => {

        try {

            const response =
                await API.get(
                    "/admin/pending-users"
                );

            setUsers(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchPendingUsers();

    }, []);

    const approveUser = async (id) => {

        try {

            await API.put(
                `/admin/approve/${id}`
            );

            alert("User Approved");

            fetchPendingUsers();

        } catch (error) {

            console.log(error);
        }
    };

    const rejectUser = async (id) => {

        try {

            await API.put(
                `/admin/reject/${id}`
            );

            alert("User Rejected");

            fetchPendingUsers();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">

                Pending Staff Requests

            </h1>

            <div className="overflow-x-auto bg-white shadow rounded-xl">

                <table className="w-full">

                    <thead>

                        <tr className="bg-blue-100">

                            <th className="p-3 text-left">
                                Username
                            </th>

                            <th className="p-3 text-left">
                                Email
                            </th>

                            <th className="p-3 text-left">
                                Country
                            </th>

                            <th className="p-3 text-left">
                                Mobile
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>

                            <th className="p-3 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            users.length > 0
                                ? users.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {user.username}
                                        </td>

                                        <td className="p-3">
                                            {user.email}
                                        </td>

                                        <td className="p-3">
                                            {user.country}
                                        </td>

                                        <td className="p-3">
                                            {user.mobileNumber}
                                        </td>

                                        <td className="p-3">

                                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">

                                                {user.status}

                                            </span>

                                        </td>

                                        <td className="p-3 flex gap-2 justify-center">

                                            <button
                                                onClick={() =>
                                                    approveUser(
                                                        user.id
                                                    )
                                                }
                                                className="bg-green-600 text-white px-4 py-2 rounded"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() =>
                                                    rejectUser(
                                                        user.id
                                                    )
                                                }
                                                className="bg-red-600 text-white px-4 py-2 rounded"
                                            >
                                                Reject
                                            </button>

                                        </td>

                                    </tr>

                                ))
                                : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center p-6 text-gray-500"
                                        >

                                            No Pending Requests

                                        </td>

                                    </tr>
                                )
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default PendingUsers;