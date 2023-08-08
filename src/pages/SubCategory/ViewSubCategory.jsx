import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb'
import Loader from '../../components/Loader'
import DataLoading from '../../components/DataLoading'
import axios from 'axios'
import { REACT_APP_API_PORT } from '../../Api'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './subcategory.css'
import moment from 'moment'
import user1 from '../../images/user/user-01.png'
import ModalImage from 'react-modal-image'
const ViewSubCategory = (props) => {
    const {id}=useParams()
    console.log(id)
    const navigate=useNavigate('')
    const [data, setData] = useState({});
    const [isLoading,setisLoading]=useState(false)
    const user = localStorage.getItem("admin");
    const admin = JSON.parse(user);

    const getSingleUser=async()=>{
        setisLoading(true)
        await axios.get(`${REACT_APP_API_PORT}api/admin/subcategory/show/${id}`,{
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
      <Breadcrumb pageName="Sub Category Details" />

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
                        alt={data.sub_category_name}
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
                    <td className='tdthtd'> {data.sub_category_name != null && data.sub_category_name !== "null"
                          ? data.sub_category_name
                          : "---"}
                          </td>
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
                 
               
                </table>  
</div>






</>)}

  </DefaultLayout>
   </>
  )
}

export default ViewSubCategory