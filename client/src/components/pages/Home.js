import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://127.0.0.8:8080/users');
        if (response.status === 200) {
            setData(response.data);
        }
    }

    const onDeleteUser = async (_id) => {
        if (window.confirm('Are you sure you want to delete that user data')) {
            const response = await axios.delete(`http://127.0.0.8:8080/user/${_id}`);
            if (response.status === 200) {
                toast.success(response.data);
                getUsers();
            }

        }
    }
    console.log("data=>", data)
    return (
        <>
            <div className="container mx-auto">
                <div className='w-12/12 lg:w-12/12 bg-white m-auto shadow-lg rounded-md overflow-hidden flex flex-col lg:flex-row mt-5'>
                    <div className="flex flex-col w-full">
                        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="bg-white border-b">
                                            <tr>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">FirstName</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">ID</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">LastName</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">Email</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">Std</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">Mobile</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">Address1</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">Address2</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">Country</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">State</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">City</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">zipcode</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">Update</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">Delete</th>
                                                <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data && data.map((item, index) => {
                                                    return (
                                                        <tr key={index} className="bg-white border-b">
                                                            <td className="px-6 py-4 whitespace-nowrap  text-center text-sm font-bold text-gray-900">{index + 1}</td>
                                                            <td className="text-sm text-gray-700 font-medium px-6 py-4 whitespace-nowrap">{item.firstName}</td>
                                                            <td className="text-sm text-gray-700 font-medium px-6 py-4 whitespace-nowrap">{item.lastName}</td>
                                                            <td className="text-sm text-gray-700 font-medium px-6 py-4 whitespace-nowrap">{item.email}</td>
                                                            <td className="text-sm text-gray-700 font-medium px-6 py-4 whitespace-nowrap">{item.std}</td>
                                                            <td className="text-sm text-gray-700 font-medium px-6 py-4 whitespace-nowrap">{item.phone}</td>
                                                            <td className="text-sm text-gray-700 font-medium px-6 py-4 whitespace-nowrap">{item.address1}</td>
                                                            <td className="text-sm text-gray-700 font-medium px-6 py-4 whitespace-nowrap">{item.address2}</td>
                                                            <td className="text-sm text-gray-700 font-medium px-6 py-4 whitespace-nowrap">{item.country}</td>
                                                            <td className="text-sm text-gray-700 font-medium px-6 py-4 whitespace-nowrap">{item.state}</td>
                                                            <td className="text-sm text-gray-700 font-medium px-6 py-4 whitespace-nowrap">{item.city}</td>
                                                            <td className="text-sm text-gray-700 font-medium px-6 py-4 whitespace-nowrap">{item.zipcode}</td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                                <Link to={`/update/${item._id}`}>
                                                                    <button type="button" className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-3 py-1 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Update</button>
                                                                </Link>
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                                <button type="button" onClick={() => onDeleteUser(item._id)} className="border border-red-500 bg-red-500 text-white rounded-md px-3 py-1 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">Delete</button>
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                                <Link to={`/view/${item._id}`}><button type="button" className="border border-green-500 bg-green-500 text-white rounded-md px-3 py-1 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">View</button></Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
