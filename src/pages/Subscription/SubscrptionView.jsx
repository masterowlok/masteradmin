import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb'
import Loader from '../../components/Loader'
import DataLoading from '../../components/DataLoading'
import axios from 'axios'
import { REACT_APP_API_PORT } from '../../Api'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './subscription.css'
import moment from 'moment'
import user1 from '../../images/user/user-01.png'
import ModalImage from 'react-modal-image'
const SubscrptionView = (props) => {
    const {id}=useParams()
    console.log(id)
    const navigate=useNavigate('')
    const [data, setData] = useState({});
    const [isLoading,setisLoading]=useState(false)
    const user = localStorage.getItem("admin");
    const admin = JSON.parse(user);

    const getSingleUser=async()=>{
        setisLoading(true)
        await axios.get(`${REACT_APP_API_PORT}api/admin/subscription/show/${id}`,{
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
            localStorage.clear()
            // // toast.error(error.response.data.message)
            navigate('/')
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
      <Breadcrumb pageName=" Subscrption Details" />

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
                    <th className='tdthtd'>Title</th>
                    <td className='tdthtd'> {data.title != null && data.title !== "null"
                          ? data.title
                          : "---"}
                          </td>
                  </tr>
                      
                  <tr className='trthtd'>
                    <th className='tdthtd'>Amount</th>
                    <td className='tdthtd'> {data.amount != null && data.amount !== "null"
                          ? data.amount
                          : "---"}
                          </td>
                  </tr>

                  <tr className='trthtd'>
                    <th className='tdthtd'>Currency</th>
                    <td className='tdthtd'> {data.currency != null && data.currency !== "null"
                          ? data.currency
                          : "---"}
                          </td>
                  </tr>
                  <tr className='trthtd'>
                    <th className='tdthtd'>Popular</th>
                    <td className='tdthtd'> {data.popular_status != null && data.popular_status !== "null"
                          ? data.popular_status
                          : "---"}
                          </td>
                  </tr>
                  <tr className='trthtd'>
                    <th className='tdthtd'>Offer Name</th>
                    <td className='tdthtd'> {data.offer_name != null && data.offer_name !== "null"
                          ? data.offer_name
                          : "---"}
                          </td>
                  </tr>
                  <tr className='trthtd'>
                    <th className='tdthtd'>Description</th>
                    <td className='tdthtd'> {data.description != null && data.description !== "null"
                          ? data.description
                          : "---"}
                          </td>
                  </tr>

                  {/* <tr className='trthtd'>
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
                  </tr> */}
                  <tr className='trthtd'>
                    <th className='tdthtd'>Date</th>
                    <td className='tdthtd'>{
        moment(data.createdAt).format("MMM Do YY,  h:mm:ss a")
      }</td>
                  </tr>
                 
               
                </table>  
</div>






</>)}

{/* <UserSingIn12/> */}

  </DefaultLayout>
   </>
  )
}

export default SubscrptionView


