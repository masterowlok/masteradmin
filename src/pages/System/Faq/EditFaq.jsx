import React from 'react'
import DefaultLayout from '../../../layout/DefaultLayout'
import Breadcrumb from '../../../components/Breadcrumb'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../../../components/Loader';
import { REACT_APP_API_PORT } from '../../../Api';
import axios from 'axios';
import { useEffect } from 'react';
import DataLoading from '../../../components/DataLoading';
// import { createLogger } from 'vite';
const EditFaq = (props) => {
    const {id}=useParams()
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({});
    const user = localStorage.getItem("admin");
    const admin = JSON.parse(user);
    const navigate = useNavigate();
    const [apiIsLoading, setapiIsLoading] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [data,setData]=useState({})
  
      const getData = async () => {
          try {
            setisLoading(true)
              const res=await axios.get(`${REACT_APP_API_PORT}api/admin/faq/show/${id}`,
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

        useEffect(()=>{
        getData()
        },[])
    const renderError = (message) => (
        <p className="italic text-[#dd1212]">{message}</p>
      );
    
      const validate = yup.object({

        name: yup.string().min(2).required("required"),
        ans: yup.string().min(2).required("ans required"),
        
      });
    
      
    
      const handleSubmit = async (name,ans) => {
        // console.log(formData.image[0])
        // console.log(formData);
        console.log(name,ans);
        // e.preventDefault();
    
        const formdata = {
            faqId:id,
          question: name,
          answer:ans
        };
    
    
    
        setapiIsLoading(true);
        await axios
          .post(`${REACT_APP_API_PORT}api/admin/faq/update`, formdata, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": admin?.jwtoken,
            },
          })
          .then((res) => {
            setapiIsLoading(false);
            // console.log(res);
            props.setAlertBox(true);
            props.showAlert(res.data.success, "green");
            navigate("/system/faq");
          })
          .catch((error) => {
            setapiIsLoading(false);
            console.log(error);
            console.log(error.response.data.errors.message);
            if(error.response.data.errors[0].msg){
              props.setAlertBox(true);
              props.showAlert(error.response.data.errors[0].msg, "red");
            }
            if(error.response.data.errors){
              props.setAlertBox(true);
              props.showAlert(error.response.data.errors, "red");
            }
            
          });
      };
  return (
    <>
        <DefaultLayout>
        {apiIsLoading ? <Loader /> : ""}
        {isLoading?(<DataLoading/>):(<>
        <div className="mx-auto max-w-270">
          <Breadcrumb pageName="Update Faq" />
          <Formik
            initialValues={{
              name: data?.question,
              ans:data?.answer,
            }}
            validationSchema={validate}
            onSubmit={(values, actions) => {
               
                const{name,ans}=values
                console.log(name,ans)
            //     if(name && ans!==null){
            //   setFormData(values);
            //     }
            // formData.push(values)
              handleSubmit(name,ans);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-1">
                  <div className="col-span-5 xl:col-span-3">
                    <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Update Faqs
                        </h3>
                      </div>
                      <div className="p-7 gri grid-cols- max-w-[600px]">
                        <div className="sm:fle-ro mb-5.5 fle flex-co gap-5.5">
                          <div className="">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Add Question
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <svg
                                  className="fill-current"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g opacity="0.8">
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                      fill=""
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                      fill=""
                                    />
                                  </g>
                                </svg>
                              </span>
                              <Field
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="name"
                                // id='fullName'
                                placeholder="Enter Question"
                                defaultValue="Devid Jhon"
                              />
                            </div>
                            <ErrorMessage name="name" render={renderError} />
                          </div>

                      
                        </div>

                        <div className="sm:fle-ro mb-5.5 fle flex-co gap-5.5">
                          <div className="">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                            Add  Answer
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <svg
                                  className="fill-current"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g opacity="0.8">
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                      fill=""
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                      fill=""
                                    />
                                  </g>
                                </svg>
                              </span>
                              <Field
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="ans"
                                // id='fullName'
                                placeholder="Enter Answer"
                                defaultValue="Devid Jhon"
                              />
                            </div>
                            <ErrorMessage name="ans" render={renderError} />
                          </div>

                      
                        </div>
                        <div className="ga-4.5 flex w-full justify-center">
                          <button
                          
                            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                            type="submit"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </Form>
            )}
          </Formik>
        </div>
        </>)}
        </DefaultLayout>
    </>
  )
}

export default  EditFaq