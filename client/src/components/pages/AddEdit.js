import React, { useState, useEffect } from 'react'
import data from '../../data.json'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, } from 'react-router-dom';

const AddEdit = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        std: '',
        phone: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        zipcode: ''
    });

    const [formerror, setFormerror] = useState({});
    const [isSubmit, setIssubmit] = useState(false)

    // const history = createBrowserHistory();
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

    const addUser = async (data) => {
        console.log(data)
        const response = await axios.post('http://127.0.0.8:8080/user', data);
        if (response.status === 200) {
            toast.success(response.data)
            // setTimeout(() => {
            //     history.push('/')
            // }, 5000)
        }
    }

    const updateUser = async (data, id) => {
        console.log(data)
        const response = await axios.put(`http://127.0.0.8:8080/user/${id}`, data);
        if (response.status === 200) {
            toast.success(response.data)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormerror(Validate(user))
        setIssubmit(true)
        if (Object.keys(formerror).length === 0 && isSubmit) {
            const { firstName, lastName, email, std, phone, address1, address2, country, state, city, zipcode } = user
            if (!firstName || !lastName || !email || !address1 || !zipcode || !std || !phone || !country || !state || !city) {
                toast.error('please provide value for all fileds')
            }
        } else {
            if (!id) {
                addUser(user)
            } else {
                updateUser(user, id)
            }
        }
    };
    //validate form
    useEffect(() => {
        console.log(formerror);
        if (Object.keys(formerror).length === 0 && isSubmit) {
            console.log(user)
        }
    }, [formerror])

    const Validate = (values) => {
        const errors = {}
        const regex = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i);
        if (!values.firstName) {
            errors.firstName = "firstName is Required"
        } else if (values.firstName.length < 5) {
            errors.firstName = "firstName can be more than 5 character"
        } else if (values.firstName.length >= 15) {
            errors.firstName = "firstName cannot be more than 15 character"
        }
        if (!values.lastName) {
            errors.lastName = "lastName is Required"
        } else if (values.lastName.length < 5) {
            errors.firstName = "lasttName can be more than 5 character"
        } else if (values.lastName.length >= 15) {
            errors.lastName = "lastName cannot be more than 15 character"
        }
        if (!values.email) {
            errors.email = "Email is Required"
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format"
        }
        if (!values.std) {
            errors.std = "Std and "
        }
        if (!values.phone) {
            errors.phone = "Mobile no is Required"
        } else if (values.phone.length < 10) {
            errors.phone = "minimum 10 character"
        } else if (values.phone.length > 10) {
            errors.phone = "maximum 10 character"
        }
        if (!values.address1) {
            errors.address1 = "Address1 is Required"
        } else if (values.address1.length < 10) {
            errors.address1 = "minimum 10 character"
        } else if (values.address1.length >= 50) {
            errors.address1 = "maximum 50 character"
        }
        if (!values.zipcode) {
            errors.zipcode = "zipcode is Required"
        } else if (values.zipcode.length <= 4) {
            errors.zipcode = "zipcode must be more than 4 character"
        } else if (values.zipcode.length >= 8) {
            errors.zipcode = "zipcode cannot be more than 8 character"
        }
        return errors;
    }


    const handleChange = (event) => {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }
    console.log(user)

    //state validation
    const [count, setCountry] = useState('Country')
    const [stat, setState] = useState('State')
    const [cities, setCities] = useState('Cities')
    const [states, setStates] = useState([])
    const [cit, setCity] = useState([])
    const changeCountry = (e) => {
        setCountry(e.target.value);
        setStates(data.find(ctr => ctr.name === e.target.value).states)
    }
    const changeState = (e) => {
        setState(e.target.value);
        setCity(states.find(state => state.name === e.target.value).cities)
    }

    const changeCities = (e) => {
        setCities(e.target.value);
    }

    return (
        <>
            <div className="container mx-auto">
                <div className='w-8/12 lg:w-8/12 bg-white m-auto shadow-lg rounded-md overflow-hidden flex flex-col lg:flex-row mt-5'>
                    <div className='w-full lg:w-full py-5 px-7'>
                        <h2 className='text-2xl mb-8 text-center gap-5'>Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='flex w-full gap-5'>
                                <div className='grid grid-cols-1 gap-5 w-full'>
                                    <input type='text' value={user.firstName} onChange={handleChange} placeholder='First Name' name='firstName' className='border border-gray-400 py-1 px-2 outline-none w-full' />
                                    <p className='text-red-500'>{formerror.firstName}</p>
                                </div>
                                <div className='grid grid-cols-1 gap-5 w-full'>
                                    <input type='text' value={user.lastName} onChange={handleChange} placeholder='Last Name' name='lastName' className='border border-gray-400 py-1 px-2 outline-none w-full' />
                                    <p className='text-red-500'>{formerror.lastName}</p>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <input type='email' value={user.email} onChange={handleChange} placeholder='Email' name='email' className='border border-gray-400 py-1 px-2 w-full outline-none' />
                                <p className='text-red-500'>{formerror.email}</p>
                            </div>
                            <div className='mt-5'>
                                <div>
                                    <div className='flex border border-gray-400 py-1 px-2 w-full outline-none'>
                                        <select className='outline-none  text-gray-500' name='std' value={user.std} onChange={handleChange} >
                                            <option>Std</option>
                                            <option>+91</option>
                                            <option>+1</option>
                                            <option>+92</option>
                                            <option>+93</option>
                                            <option>+355</option>
                                            <option>+213</option>
                                            <option>+54</option>
                                            <option>+61</option>
                                            <option>+43</option>
                                        </select>
                                        <input type='text' placeholder='Enter a Mobile Number' value={user.phone} onChange={handleChange} name='phone' className='w-full outline-none px-1' />
                                    </div>
                                    <span className='text-red-500'>{formerror.std}</span><span className='text-red-500'>{formerror.phone}</span>
                                </div>
                            </div>
                            <div className='mt-5 flex gap-5'>
                                <div className='w-full'>
                                    <textarea placeholder='Address 1' name='address1' value={user.address1} onChange={handleChange} className='border border-gray-400 py-1 px-2 w-full outline-none' style={{ maxHeight: '3.5rem' }}></textarea>
                                    <p className='text-red-500'>{formerror.address1}</p>
                                </div>
                                <div className='w-full'>
                                    <textarea placeholder='Address 2' name='address2' value={user.address2} onChange={handleChange} className='border border-gray-400 py-1 px-2 w-full outline-none' style={{ maxHeight: '3.5rem' }}></textarea>
                                </div>
                            </div>
                            {/* States validation */}
                            <div className='mt-1'>
                                <div className='flex gap-5'>
                                    <div className='border border-gray-400 py-1 px-2 w-full outline-none flex gap-5 mt-5'>
                                        <div className='w-full' value={user.country} onChange={handleChange}>
                                            <select name='country' value={count} onChange={changeCountry} className='w-full outline-none text-gray-500'>
                                                <option>Country</option>
                                                {
                                                    data.map((ctr, i) => {
                                                        return (
                                                            <option key={i} value={ctr.name}>{ctr.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='border border-gray-400 py-1 px-2 w-full outline-none flex gap-5 mt-5'>
                                        <div className='w-full' value={user.state} onChange={handleChange}>
                                            <select name='state' value={stat} onChange={changeState} className='w-full outline-none  text-gray-500 '>
                                                <option>State</option>
                                                {
                                                    states.map((state, i) => {
                                                        return (
                                                            <option key={i} value={state.name}>{state.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-5'>
                                    <div className='w-full outline-none gap-5 mt-5 '>
                                        <div className='border border-gray-400 py-1 px-2 w-full outline-none flex gap-5 mt-2'>
                                            <div className='w-full' value={user.city} onChange={handleChange}>
                                                <select name='city' value={cities} onChange={changeCities} className='w-full outline-none text-gray-500'>
                                                    <option>Cities</option>
                                                    {
                                                        cit.map((city, i) => {
                                                            return (
                                                                <option key={i} value={city}>{city}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full outline-none gap-5 mt-5 '>
                                        <div className='border border-gray-400 py-1 px-2 w-full outline-none flex gap-5 mt-2'>
                                            <input type='text' placeholder='Zip-code' value={user.zipcode} onChange={handleChange} name='zipcode' className='w-full outline-none px-1' />
                                        </div>
                                        <p className='text-red-500'>{formerror.zipcode}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <input type='checkbox' className='border border-gray-400' required />
                                <span>
                                    &nbsp; I accept the <a href='/terms' className='text-purple-500 font-semibold'>Terms of Use</a> & <a href='/privacy' className='text-purple-500 font-semibold'>Privacy Policy</a>
                                </span>
                            </div>
                            <div className='mt-5'>
                                <input type='submit' className='w-full bg-purple-500 py-3 text-center text-white' value={id ? "Update" : "Register"} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEdit
