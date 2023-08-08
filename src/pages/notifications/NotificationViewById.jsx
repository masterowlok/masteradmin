import axios from 'axios'
import React, { useState ,useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { REACT_APP_API_PORT } from '../../Api'
import moment from 'moment'
import DataLoading from '../../components/DataLoading'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import image from '../../images/user/user-01.png'
import './notification.css'
import user1 from '../../images/user/user-01.png'
import ModalImage from 'react-modal-image'

const NotificationViewById = (props) => {
    const {id}=useParams()
    console.log(id)
    const navigate=useNavigate('')
    const [data, setData] = useState({});
    const [isLoading,setisLoading]=useState(false)
    const user = localStorage.getItem("admin");
    const admin = JSON.parse(user);

    const getSingleUser=async()=>{
        setisLoading(true)
        await axios.get(`${REACT_APP_API_PORT}api/admin/notification/Admin_Push/show/${id}`,{
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
                    <th className='tdthtd'>Module</th>
                    <td className='tdthtd'> {data.module != null && data.module !== "null"
                          ? data.module
                          : "---"}
                          </td>
                  </tr>
                
                  <tr className='trthtd'>
                    <th className='tdthtd'>Notification Type</th>
                    <td className='tdthtd'> {data.notificationtype != null && data.notificationtype !== "null"
                          ? data.notificationtype
                          : "---"}</td>
                  </tr>
                  <tr className='trthtd'>
                    <th className='tdthtd'>User Type</th>
                    <td className='tdthtd'> {data.user_type != null && data.user_type !== "null"
                          ? data.user_type
                          : "---"}</td>
                  </tr>
                  <tr className='trthtd'>
                    <th className='tdthtd'>Status</th>
                    <td className='tdthtd'>
                    {(data.admin_read_status==='Read')?
      <dd className="text-[#27ee3b] s:col-span-2 font-semibold">
      {data.admin_read_status != null && data.admin_read_status !== "null"
                          ? data.admin_read_status
                          : "---"}
                          </dd>:
      <dd className="text-[#f84935] s:col-span-2 font-semibold">
      {data.admin_read_status != null && data.admin_read_status !== "null"
                          ? data.admin_read_status
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
                    <th className='tdthtd'>Message</th>
                    <td className='tdthtd'>{data.message != null && data.message !== "null"
                          ? data.message
                          : "---"}</td>
                  </tr>
               
                </table>  
</div>



 


</>)}

  </DefaultLayout>
</>
  )
}

export default NotificationViewById