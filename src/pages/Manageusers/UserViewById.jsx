import axios from 'axios'
import React, { useState ,useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { REACT_APP_API_PORT } from '../../Api'
import moment from 'moment'
import DataLoading from '../../components/DataLoading'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import image from '../../images/user/user-01.png'
import './user.css'
import user1 from '../../images/user/user-01.png'
import ModalImage from 'react-modal-image'
const UserViewById = (props) => {
    const {id}=useParams()
    console.log(id)
    const navigate=useNavigate('')
    const [data, setData] = useState({});
    const [isLoading,setisLoading]=useState(false)
    const user = localStorage.getItem("admin");
    const admin = JSON.parse(user);

    const getSingleUser=async()=>{
        setisLoading(true)
        await axios.get(`${REACT_APP_API_PORT}api/admin/employee/show/${id}`,{
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': admin.jwtoken
          }
        })
        .then(res=>{
          console.log(res.data.data)
          setData(res?.data?.data)
          setisLoading(false)
        })
        .catch(error=>{
          console.log(error)
          if(error.response.request.status === 500){
            // localStorage.clear()
            // // toast.error(error.response.data.message)
            // navigate('/')
          }
          setisLoading(false)
        })
      
      
      }
    
      useEffect(() => {
        getSingleUser();
      }, []);
  return (
<>
<DefaultLayout>
      {(isLoading)?(<DataLoading/>):(<>
      <Breadcrumb pageName="User Details" />

      <div className='flex justify-end mb-3 mr-5'>
    
    <Link
                  to={-1}
                  className='inline-flex items-center justify-center rounded-md bg-primary py-1 px-6 text-center font-medium text-white hover:bg-opacity-90 text-[12px]'
                >
                  Back
                </Link>
    </div>
      <div className='bg-white'>
<table className='view-table-wrap mb-10 alldata-table dark:text-[#706f6f]'>
                  <tr className='trthtd'>
                    <th className='tdthtd'>Image</th>

                    <td className='tdthtd'>  
                    <div>
                      {
                        (data.image && data.image !== "")
                        ?
                        <ModalImage 
                        className="w-20 h-20 rounded-full"
                        small={data.image}
                       large={data.image}
                        alt={data.name}
                                />
                              
                        :
                        <ModalImage className="w-20 h-20 rounded-full"
                                small={user1} 
                                 large={user1} 
                                alt="image"
                                />
                      } 
                      </div>
                    </td>
                        
                  </tr>
                  <tr className='trthtd'>
                    <th className='tdthtd'>Name</th>
                    <td className='tdthtd'> {data.name != null && data.name !== "null"
                          ? data.name
                          : "---"}
                          </td>
                  </tr>
                  <tr className='trthtd'>
                    <th className='tdthtd'>Email</th>
                    <td className='tdthtd'> {data.email != null && data.email !== "null"
                          ? data.email
                          : "---"}</td>
                  </tr>
                  <tr className='trthtd'>
                    <th className='tdthtd'>Number</th>
                    <td className='tdthtd'> {data.phone != null && data.phone !== "null"
                          ? data.phone
                          : "---"}</td>
                  </tr>
                  <tr className='trthtd'>
                    <th className='tdthtd'>Status</th>
                    <td className='tdthtd'>
                    {(data.status==='Active')?
      <dd className="text-[#27ee3b] s:col-span-2 font-semibold">
      {data.status != null && data.status !== "null"
                          ? data.status
                          : "---"}
                          </dd>:
      <dd className="text-[#f84935] s:col-span-2 font-semibold">
      {data.status != null && data.status !== "null"
                          ? data.status
                          : "---"}
      </dd>
      }  </td>
                  </tr>
                  <tr className='trthtd'>
                    <th className='tdthtd'>Date</th>
                    <td className='tdthtd'>{
        moment(data.createdAt).format("MMM Do YY,  h:mm:ss a")
      }</td>
                  </tr>
                  <tr className='trthtd'>
                    <th className='tdthtd'>Address</th>
                    <td className='tdthtd'>{data.address != null && data.address !== "null"
                          ? data.address
                          : "---"}</td>
                  </tr>
               
                </table>  
</div>



  {/* <div className="flow-root rounded-lg border border-[#c5bfbf]  py-3 shadow-sm">
  <dl className="-my-3 divide-y divide-[#c5bfbf] text-sm">
  <div
      className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
    >
      <dt className="font-medium text-gray-900">Image</dt>
      <dd className="text-gray-700 sm:col-span-2">   
      <img src={`${REACT_APP_API_PORT}uploads/${data.image}` != undefined 
                          ? `${REACT_APP_API_PORT}uploads/${data.image}`
                          : "---"} alt='iamge' className='w-20 h-20'/>
                          </dd>
    </div>
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
      {data.address != null && data.address !== "null"
                          ? data.address
                          : "---"}
      </dd>
    </div>
  </dl>
</div> */}


</>)}

  </DefaultLayout>
</>
  )
}

export default UserViewById