import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import DataLoading from '../../components/DataLoading'
import { useState } from 'react'
import { useEffect } from 'react'
import { REACT_APP_API_PORT } from '../../Api'
import axios from 'axios'
import Swal from 'sweetalert2'


const Faq = (props) => {
  const user = localStorage.getItem("admin");
  const admin = JSON.parse(user);
  const navigate = useNavigate();
  const [apiIsLoading, setapiIsLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [data,setData]=useState([])

    const getData = async () => {
        try {
          setisLoading(true)
            const res=await axios.get(`${REACT_APP_API_PORT}api/admin/faq/list`,
            {
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': admin.jwtoken
              }
            });
            console.log('sac')
             console.log(res.data.data)
           
              if(res.data.data !== null){
                setData(res.data.data)
                // setisDataComing(true)
              }
            //  setData(res.data.data)
            setisLoading(false)
        } catch (error) {
          console.log(error)
            console.log(error.response.data.message)
            // if(error.response.request.status === 500){
            //   localStorage.clear()
              props.setAlertBox(true)
              props.showAlert(error?.response?.data?.message,"red")
            //   navigate('/')
            // }
            setisLoading(false)
        }
      };

      const handleFaqDeleteUser = (id) =>{
        // event.preventDefault()
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#BE93D1',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          
        })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              {title:'Deleted!',
              text:'Your data has been deleted.',
              icon:'success',
              confirmButtonColor: '#BE93D1'}
            )
              return axios.get(`${REACT_APP_API_PORT}api/admin/faq/remove/${id}`,{
              headers: {
                      'Content-Type': 'application/json',
                      'x-access-token': admin.jwtoken
                    },
              })
              
          }
        })
        .then(res=>{
                console.warn('delete : '+res)
                getData()
          })
            .catch(error=>{
                console.log(error)
                // if(error.response.request.status === 500){
                // //   localStorage.clear()
                // //   // toast.error(error.response.data.message)
                // //   navigate('/')
                // }
            })
        }
      useEffect(()=>{
        getData()
      },[])
  return (
 <>
    <DefaultLayout>
    {isLoading?(<DataLoading/>):(<>
        <Breadcrumb pageName='Faq'/>
        <div className='flex justify-end mb-3 mx-8'>
        <button>
            <Link
              to='/system/faq/add'
              className='inline-flex items-center justify-center rounded-md bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-6 text-sm'
            >
              Add Faqs
            </Link></button>
        </div>
        <section className="w-full divide-y divide-[#d1cece] rounded border border-[#d1cece] bg-white">
       
        {
          data.map((val)=>{
        return(
          <>
          <details className="group p-4" open>
          <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden text-primary">
          {val.question}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby="title-ac21 desc-ac21"
            >
              <title id="title-ac21">Open icon</title>
              <desc id="desc-ac21">
                icon that represents the state of the summary
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </summary>
          <p className="mt-4 text-slate-5  dark:text-[#696767]">
          {val.answer}
          </p>
          <div className='flex justify-end gap-2.5 mt-2 '>
          <button
              className='inline-flex items-center justify-center rounded-md bg-meta-3 py- px-2 text-center font-medium text-white hover:bg-opacity-90 text-[11px]'
              onClick={()=>navigate(`/system/faq/edit/${val._id}`)} >
              Update
            </button>
            <button
              className='inline-flex items-center justify-center rounded-md bg-meta-7 py- px-2 text-center font-medium text-white hover:bg-opacity-90 text-[11px]'
              onClick={()=>handleFaqDeleteUser(val._id)}   >
            Delete
            </button>
          </div>
          </details>
          </>
        )
          })
        }
         
     
       
      </section>
</>)}
  
    </DefaultLayout>
 </>
  )
}

export default Faq