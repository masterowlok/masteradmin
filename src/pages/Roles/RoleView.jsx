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
import SwitcherThree from '../../components/SwitcherThree'
import Swal from 'sweetalert2'
const RoleView = (props) => {
    const {id}=useParams()
    console.log(id)
    const navigate=useNavigate('')
    const [data, setData] = useState([]);
    const [isLoading,setisLoading]=useState(false)
    const user = localStorage.getItem("admin");
    const admin = JSON.parse(user);

    const getSingleUser=async()=>{
        setisLoading(true)
        await axios.get(`${REACT_APP_API_PORT}api/admin/role/rolelistbyname/${id}`,{
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

      const handleStatusCreate = async (updateid,status) => {
       
           try {
            Swal.fire({
               title: 'Are you sure you want update?',
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#BE93D1',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes'
           })
           .then((result) => {
               if (result.isConfirmed) {
                  return   axios.get(`${REACT_APP_API_PORT}api/admin/role/createstatusUpdate/${updateid}`,
                 {
                   headers: {
                     'Content-Type': 'application/json',
                     'x-access-token': admin.jwtoken
                   }
                 });
               }
             })
             .then(res=>{
              
               if(res?.data?.success){
                getSingleUser();
                 if(status==="Active"){
                   Swal.fire(
                     {
                     title:'Deactive',
                     text:'Deactive Successfully',
                     icon:'success',
                     confirmButtonColor: '#BE93D1'
                   }
                   )
                   
                 }
                 else{
                   
                   Swal.fire(
                     {
                     title:'Active',
                     text:'Active Successfully',
                     icon:'success',
                     confirmButtonColor: '#BE93D1'
                   })
                 
                 }
               }
             })
          
         } catch (error) {
           console.log(error)
           if(error.response.request.status === 500){
             localStorage.clear()
             navigate('/')
           }
         }
         }
         const handleStatusRead = async (updateid,status) => {
           
               try {
                Swal.fire({
                   title: 'Are you sure you want update?',
                   icon: 'warning',
                   showCancelButton: true,
                   confirmButtonColor: '#BE93D1',
                   cancelButtonColor: '#d33',
                   confirmButtonText: 'Yes'
               })
               .then((result) => {
                   if (result.isConfirmed) {
                      return   axios.get(`${REACT_APP_API_PORT}api/admin/role/readstatusUpdate/${updateid}`,
                     {
                       headers: {
                         'Content-Type': 'application/json',
                         'x-access-token': admin.jwtoken
                       }
                     });
                   }
                 })
                 .then(res=>{
                  
                   if(res?.data?.success){
                    getSingleUser();
                     if(status==="Active"){
                       Swal.fire(
                         {
                         title:'Deactive',
                         text:'Deactive Successfully',
                         icon:'success',
                         confirmButtonColor: '#BE93D1'
                       }
                       )
                       
                     }
                     else{
                       
                       Swal.fire(
                         {
                         title:'Active',
                         text:'Active Successfully',
                         icon:'success',
                         confirmButtonColor: '#BE93D1'
                       })
                     
                     }
                   }
                 })
              
             } catch (error) {
               console.log(error)
               if(error.response.request.status === 500){
                 localStorage.clear()
                 navigate('/')
               }
             }
             }
             const handleStatusUpdate = async (updateid,status) => {    
                   try {
                    Swal.fire({
                       title: 'Are you sure you want update?',
                       icon: 'warning',
                       showCancelButton: true,
                       confirmButtonColor: '#BE93D1',
                       cancelButtonColor: '#d33',
                       confirmButtonText: 'Yes'
                   })
                   .then((result) => {
                       if (result.isConfirmed) {
                          return   axios.get(`${REACT_APP_API_PORT}api/admin/role/updatestatusUpdate/${updateid}`,
                         {
                           headers: {
                             'Content-Type': 'application/json',
                             'x-access-token': admin.jwtoken
                           }
                         });
                       }
                     })
                     .then(res=>{
                      
                       if(res?.data?.success){
                        getSingleUser();
                         if(status==="Active"){
                           Swal.fire(
                             {
                             title:'Deactive',
                             text:'Deactive Successfully',
                             icon:'success',
                             confirmButtonColor: '#BE93D1'
                           }
                           )
                           
                         }
                         else{
                           
                           Swal.fire(
                             {
                             title:'Active',
                             text:'Active Successfully',
                             icon:'success',
                             confirmButtonColor: '#BE93D1'
                           })
                         
                         }
                       }
                     })
                  
                 } catch (error) {
                   console.log(error)
                   if(error.response.request.status === 500){
                     localStorage.clear()
                     navigate('/')
                   }
                 }
                 }
                 const handleStatusDelete = async (updateid,status) => {
                       try {
                        Swal.fire({
                           title: 'Are you sure you want update?',
                           icon: 'warning',
                           showCancelButton: true,
                           confirmButtonColor: '#BE93D1',
                           cancelButtonColor: '#d33',
                           confirmButtonText: 'Yes'
                       })
                       .then((result) => {
                           if (result.isConfirmed) {
                              return   axios.get(`${REACT_APP_API_PORT}api/admin/role/deletestatusUpdate/${updateid}`,
                             {
                               headers: {
                                 'Content-Type': 'application/json',
                                 'x-access-token': admin.jwtoken
                               }
                             });
                           }
                         })
                         .then(res=>{
                          
                           if(res?.data?.success){
                            getSingleUser();
                             if(status==="Active"){
                               Swal.fire(
                                 {
                                 title:'Deactive',
                                 text:'Deactive Successfully',
                                 icon:'success',
                                 confirmButtonColor: '#BE93D1'
                               }
                               )
                               
                             }
                             else{
                               
                               Swal.fire(
                                 {
                                 title:'Active',
                                 text:'Active Successfully',
                                 icon:'success',
                                 confirmButtonColor: '#BE93D1'
                               })
                             
                             }
                           }
                         })
                      
                     } catch (error) {
                       console.log(error)
                       if(error.response.request.status === 500){
                         localStorage.clear()
                         navigate('/')
                       }
                     }
                }
                
                const handleStatusStatus = async (updateid,status) => {
                        try {
                         Swal.fire({
                            title: 'Are you sure you want update?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#BE93D1',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                               return   axios.get(`${REACT_APP_API_PORT}api/admin/role/statusUpdate/${updateid}`,
                              {
                                headers: {
                                  'Content-Type': 'application/json',
                                  'x-access-token': admin.jwtoken
                                }
                              });
                            }
                          })
                          .then(res=>{
                           
                            if(res?.data?.success){
                             getSingleUser();
                              if(status==="Active"){
                                Swal.fire(
                                  {
                                  title:'Deactive',
                                  text:'Deactive Successfully',
                                  icon:'success',
                                  confirmButtonColor: '#BE93D1'
                                }
                                )
                                
                              }
                              else{
                                
                                Swal.fire(
                                  {
                                  title:'Active',
                                  text:'Active Successfully',
                                  icon:'success',
                                  confirmButtonColor: '#BE93D1'
                                })
                              
                              }
                            }
                          })
                       
                      } catch (error) {
                        console.log(error)
                        if(error.response.request.status === 500){
                          localStorage.clear()
                          navigate('/')
                        }
                      }
    }
  return (
   <>
<DefaultLayout>
      {(isLoading)?(<DataLoading/>):(<>
      <Breadcrumb pageName={`${id} Role Management`} />

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
<tr className='trthtd '>
                    <th className='tdthtd text-center'>Module Permission</th>
                    <th className='tdthtd text-center'>
                     Create
                    </th>
                    <th className='tdthtd text-center'>
                     Read
                    </th>
                    <th className='tdthtd text-center'>
                     Update
                    </th>
                    <th className='tdthtd text-center'>
                     Delete
                    </th>
                    <th className='tdthtd text-center'>
                     Status
                    </th>
                  </tr>
        {
            data.map((item,index)=>{
                return(
                    <>
                    <tr className='trthtd'>
                    <td className='tdthtd text-center'>
                     {item.module != null && item.module !== "null"
                          ? item.module
                          : "---"}
                    </td>
                    <td className='tdthtd text-center'>
                    <button 
                     onClick={(e) => handleStatusCreate(item._id,item.create)}
                    >
                            <SwitcherThree 
                    status={
                    item.create === "Active"?true:false
                    }
                            />
                    </button>
                    
                    </td>
                    <td className='tdthtd text-center'>
                    <button 
                    onClick={(e) => handleStatusRead(item._id,item.read)}
                    >
                            <SwitcherThree 
                    status={
                    item.read === "Active"?true:false
                    }
                            />
                    </button>
                    </td>
                    <td className='tdthtd text-center'>
                    <button 
                    onClick={(e) => handleStatusUpdate(item._id,item.update)}
                    >
                            <SwitcherThree 
                    status={
                    item.update === "Active"?true:false
                    }
                            />
                    </button>
                    </td>
                    <td className='tdthtd text-center'>
                    <button 
                    onClick={(e) => handleStatusDelete(item._id,item.delete)}
                    >
                            <SwitcherThree 
                    status={
                    item.delete === "Active"?true:false
                    }
                            />
                    </button>
                    </td>
                    <td className='tdthtd text-center'>
                    <button 
                    onClick={(e) => handleStatusStatus(item._id,item.status)}
                    >
                            <SwitcherThree 
                    status={
                    item.status === "Active"?true:false
                    }
                            />
                    </button>
                    </td>
                  </tr>
                    </>
                )
            })
        }
                  {/* <tr className='trthtd'>
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
                  </tr> */}
                  {/* <tr className='trthtd'>
                    <th className='tdthtd'>Date</th>
                    <td className='tdthtd'>{
        moment(data.createdAt).format("MMM Do YY,  h:mm:ss a")
      }</td>
                  </tr> */}
                 
               
                </table>  
</div>






</>)}

  </DefaultLayout>
   </>
  )
}

export default RoleView