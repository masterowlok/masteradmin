import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb'
import Loader from '../../components/Loader'
import DataLoading from '../../components/DataLoading'
import axios from 'axios'
import { REACT_APP_API_PORT } from '../../Api'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './coupon.css'
import moment from 'moment'
import user1 from '../../images/user/user-01.png'
import ModalImage from 'react-modal-image'
const CouponView = (props) => {
    const {id}=useParams()
    console.log(id)
    const navigate=useNavigate('')
    const [data, setData] = useState({});
    const [isLoading,setisLoading]=useState(false)
    const user = localStorage.getItem("admin");
    const admin = JSON.parse(user);

    const getSingleUser=async()=>{
        setisLoading(true)
        await axios.get(`${REACT_APP_API_PORT}api/admin/coupon/show/${id}`,{
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
      <Breadcrumb pageName=" Coupon Details" />

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
                    <th className='tdthtd'>Coupon Code</th>
                    <td className='tdthtd'> {data.coupon_code != null && data.coupon_code !== "null"
                          ? data.coupon_code
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
                    <th className='tdthtd'>Number of User</th>
                    <td className='tdthtd'> {data.usage_limit != null && data.usage_limit !== "null"
                          ? data.usage_limit
                          : "---"}
                          </td>
                  </tr>
               
                  <tr className='trthtd'>
                    <th className='tdthtd'>Expiry Date</th>
                    <td className='tdthtd'> {data.expiry_date != null && data.expiry_date !== "null"
                          ? data.expiry_date
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
                    <th className='tdthtd'> Date & Time</th>
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

export default CouponView