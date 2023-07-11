import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const View = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getsingleUser(id);
    }
  }, [id])

  const getsingleUser = async (id) => {
    const response = await axios.get(`http://127.0.0.8:8080/user/${id}`);
    if (response.status === 200) {
      setUser({ ...response.data[0] })
    }

  }
  return (
    <div>
      <div className="container mx-auto">
        <div className='w-4/12 lg:w-4/12 mt-20 bg-white m-auto shadow-lg rounded-md overflow-hidden'>
          <h1 className='text-center text-red-600 mb-5 mt-5 font-serif font-bold'>Your Details</h1>
          <div className='border m-5 border-red-500 p-8 text-start rounded-md'>
          <div>
              <strong className='text-blue-500'>User Id :</strong><span className='ml-8 font-medium'>{user && user._id}</span>
            </div>
            <div>
              <strong className='text-blue-500'>Full Name :</strong><span className='ml-3 font-medium'>{user && user.firstName}</span><span className='ml-2 font-medium'>{user && user.lastName}</span>
            </div>
            <div>
              <strong className='text-blue-500'>Email Id :</strong><span className='ml-6 font-medium'>{user && user.email}</span>
            </div>
            <div>
              <strong className='text-blue-500'>Mobile No :</strong><span className='ml-1 font-medium'>{user && user.std}</span><span className='ml-2 font-medium'>{user && user.phone}</span>
            </div>
            <div>
              <strong className='text-blue-500'>Address1 :</strong><span className='ml-3 font-medium'>{user && user.address1}</span>
            </div>
            <div>
              <strong className='text-blue-500'>Address2 :</strong><span className='ml-3 font-medium'>{user && user.address2}</span>
            </div>
            <div>
              <strong className='text-blue-500'>Country :</strong><span className='ml-5 font-medium'>{user && user.country}</span>
            </div>
            <div>
              <strong className='text-blue-500'>State :</strong><span className='ml-10 font-medium'>{user && user.state}</span>
            </div>
            <div>
              <strong className='text-blue-500'>City :</strong><span className='ml-12 font-medium'>{user && user.city}</span>
            </div>
            <div>
              <strong className='text-blue-500'>Zipcode :</strong><span className='ml-4 font-medium'>{user && user.zipcode}</span>
            </div>
            <div className='text-center mt-5'>
              <Link to={'/'} >
                <button type="button" className="border w-full border-yellow-500 bg-yellow-500 text-white rounded-md px-3 py-1 transition duration-500 ease select-none hover:bg-yellow-600 focus:outline-none focus:shadow-outline">Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default View
