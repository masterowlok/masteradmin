import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb'
import { useNavigate, useParams } from 'react-router-dom'
import { REACT_APP_API_PORT } from '../../Api'
import axios from 'axios'
import moment from 'moment'
import DataLoading from '../../components/DataLoading'

const ViewUserById = () => {
    const {id}=useParams()
    console.log(id)
    const navigate=useNavigate('')
    const [data, setData] = useState({});
    const [isLoading,setisLoading]=useState(false)
    const user = localStorage.getItem("admin");
    const admin = JSON.parse(user);
     
const getSingleUser=async()=>{
    setisLoading(true)
    await axios.get(`${REACT_APP_API_PORT}api/admin/user/view/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': admin.jwtoken
      }
    })
    .then(res=>{
    //   console.log(res.data.data)
      setData(res?.data?.data)
      setisLoading(false)
    })
    .catch(error=>{
      console.log(error)
      if(error.response.request.status === 500){
        localStorage.clear()
        // toast.error(error.response.data.message)
        navigate('/')
      }
      setisLoading(false)
    })
  
  
  }

  useEffect(() => {
    getSingleUser();
  }, []);
//   console.log(data);
  return (
 <>
      <DefaultLayout>
      {(isLoading)?(<DataLoading/>):(<>
      <Breadcrumb pageName="User Details" />
  <div className="flow-root rounded-lg border border-[#c5bfbf]  py-3 shadow-sm">
  <dl className="-my-3 divide-y divide-[#c5bfbf] text-sm">
    <div
      className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
    >
      <dt className="font-medium text-blac">Name</dt>
      <dd className="text-gray-700 sm:col-span-2">  
      {data.name != null && data.name !== "null"
                          ? data.name
                          : "---"}
                          </dd>
    </div>

    <div
      className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
    >
      <dt className="font-medium text-gray-900">Email</dt>
      <dd className="text-gray-700 sm:col-span-2">      {data.email != null && data.email !== "null"
                          ? data.email
                          : "---"}</dd>
    </div>

    <div
      className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
    >
      <dt className="font-medium text-gray-900">Number</dt>
      <dd className="text-gray-700 sm:col-span-2">      
      {data.phone != null && data.phone !== "null"
                          ? data.phone
                          : "---"}</dd>
    </div>

    <div
      className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
    >
      <dt className="font-medium text-gray-900">Status</dt>
      {(data.status==='Active')?
      <dd className="text-[#27ee3b] sm:col-span-2">
      {data.status != null && data.status !== "null"
                          ? data.status
                          : "---"}
      </dd>:
      <dd className="text-[#f84935] sm:col-span-2">
      {data.status != null && data.status !== "null"
                          ? data.status
                          : "---"}
      </dd>
      }
    </div>
    <div
      className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
    >
      <dt className="font-medium text-gray-900">Date & Time</dt>
      <dd className="text-gray-700 sm:col-span-2">{
        moment(data.createdAt).format("MMM Do YY,  h:mm:ss a")
      }</dd>
    </div>

    <div
      className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
    >
      <dt className="font-medium text-gray-900">Address</dt>
      <dd className="text-gray-700 sm:col-span-2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facilis
        debitis explicabo doloremque impedit nesciunt dolorem facere, dolor
        quasi veritatis quia fugit aperiam aspernatur neque molestiae labore
        aliquam soluta architecto?
      </dd>
    </div>
  </dl>
</div>
</>)}

  </DefaultLayout>
 </>
  )
}

export default ViewUserById