import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import { REACT_APP_API_PORT } from "../../Api";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import axios from "axios";
import Resizer from 'react-image-file-resizer';
import DataLoading from "../../components/DataLoading";

const SubscriptionEdit = (props) => {

  const user = localStorage.getItem("admin");
  const admin = JSON.parse(user);
  const navigate = useNavigate();
  const [apiIsLoading, setapiIsLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);
const {id}=useParams()
const [data,setData]=useState([])
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

  const renderError = (message) => (
    <p className="italic text-[#dd1212]">{message}</p>
  );

  

  const validate = yup.object({

    title: yup.string().min(2).max(50).required("title required"),
    amount: yup
      .string()
      .required("amount required"),
    //   offername:yup.string().min(2).max(50).required("offer required"),
    description: yup
      .string()
      .required()
      // .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Min 5 digits required")
      .max(250, "Maximum  250 digits"),
    popular: yup.string().required("popular status required"),
    currency: yup.string().required("currency required"),
  });

 

  const handleSubmit = async (title,offername,currency,description,popular,amount) => {
    // console.log(formData.image[0])
    // console.log(formData);
    // e.preventDefault();
    console.log(title,offername,currency,description,popular,amount)
  
console.log({
    title: title,
    description: description,
    offer_name: offername,
    popular_status: popular,
    amount: amount,
    currency: currency,
  })
    setapiIsLoading(true);
    await axios
      .post(`${REACT_APP_API_PORT}api/admin/subscription/update`, {
        subscriptionId:id,
        title: title,
        description: description,
        offer_name: offername,
        popular_status: popular,
        amount: amount,
        currency: currency,
      }, {
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
        navigate("/subscription/list");
      })
      .catch((error) => {
        setapiIsLoading(false);
        console.log(error);
        console.log(error.response.data.errors)

     
          if(error?.response?.data?.errors){
            props.setAlertBox(true);
            props.showAlert(error?.response?.data?.errors, "red");
          }
          if(error.response.data.errors[0].msg){
            props.setAlertBox(true);
            props.showAlert(error.response.data.errors[0].msg, "red");
          }
      
        console.log(error.response.data.errors.message);
        props.setAlertBox(true);
        props.showAlert(error.response.data.errors.message, "red");
      });
  };
  return (
    <>
      <DefaultLayout>
        {apiIsLoading ? <Loader /> : ""}
        {isLoading?(<DataLoading/>):(<>
        <div className="mx-auto max-w-270">
          <Breadcrumb pageName="Update Subscription" />
          <Formik
            initialValues={{
              title: data.title,
              offername: data.offer_name,
              amount: data.amount,
              popular: data.popular_status,
              description: data.description,
              currency: data.currency,
           
            }}
            validationSchema={validate}
            onSubmit={(values, actions) => {
            console.log(values)
            const {title,offername,currency,description,popular,amount}=values
            //   setFormData(values);
              handleSubmit(title,offername,currency,description,popular,amount);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-5 gap-8">
                  <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                        Update Subscription
                        </h3>
                      </div>
                      <div className="p-7">
                        <div className="sm:flex-ro mb-5.5 flex flex-col gap-5.5">
                          <div className="s:w-1/2 w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                          Title
                            </label>
                            <div className="relative">
                           
                              <Field
                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="title"
                                // id='fullName'
                                placeholder="Enter Your Title"
                                // defaultValue="Devid Jhon"
                              />
                            </div>
                            <ErrorMessage name="title" render={renderError} />
                          </div>

                          <div className="s:w-1/2 w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                          Offer Name
                            </label>
                            <div className="relative">
                           
                              <Field
                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="offername"
                                // id='fullName'
                                placeholder="Enter Your Title"
                                // defaultValue="Devid Jhon"
                              />
                            </div>
                            <ErrorMessage name="offername" render={renderError} />
                          </div>

                          <div className="sm:w- w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="phoneNumber"
                            >
                              Amount
                            </label>
                            <Field
                              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name="amount"
                              id="number"
                              placeholder="Enter You Amount"
                              // defaultValue=""
                            />
                            <ErrorMessage name="amount" render={renderError} />
                          </div>
                        </div>

       

                        <div className="mb-5.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                         Popular
                          </label>
                          <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <Field
                              as="select"
                              name="popular"
                              className="relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-meta-4 dark:focus:border-primary"
                            >
                            <option value="">Select Popular Status</option>
                            <option value='Yes'>Yes</option>
                            <option value='No'>No</option>
                              
                              {/* <option value="Sub Admin">Sub Admin</option>
                              <option value="Employee">Employee</option> */}
                              {/* <option value="role3">role3</option> */}
                            </Field>
                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                              <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g opacity="0.8">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                    fill=""
                                  ></path>
                                </g>
                              </svg>
                            </span>
                          </div>
                          <ErrorMessage name="popular" render={renderError} />
                        </div>

                        <div className="mb-5.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                         Currency
                          </label>
                          <div className="relative z-20 bg-transparent dark:bg-form-input">
                            {/* <Field as="select" name='role' className='relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-meta-4 dark:focus:border-primary'>
                      <option value=''>Type your Role</option>
                      <option value=''>role1</option>
                      <option value=''>role2</option>
                      <option value=''>role3</option>
                    </Field> */}
                            <Field
                              as="select"
                              name="currency"
                              className="relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-meta-4 dark:focus:border-primary"
                            >
                            <option value="">Select Currency</option>
                            <option value='INR'>INR</option>
                            <option value='USD'>USD</option>
                              
                              {/* <option value="Sub Admin">Sub Admin</option>
                              <option value="Employee">Employee</option> */}
                              {/* <option value="role3">role3</option> */}
                            </Field>
                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                              <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g opacity="0.8">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                    fill=""
                                  ></path>
                                </g>
                              </svg>
                            </span>
                          </div>
                          <ErrorMessage name="currency" render={renderError} />
                        </div>

                   

                        <div className="mb-5.5">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="Username"
                            >
                              Description
                            </label>
                            <div className="relative">
                            

                              <Field as='textarea'
                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name='description'
                                // id='bio'

                                rows="3"
                                placeholder="Write your description"
                                // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
                             />
                            </div>
                            <ErrorMessage name="description" render={renderError} />
                          </div> 

                        <div className='fle justify-en gap-4.5'>
                  
                        <button
                            // className=' w-full flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70'
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
  );
};

export default  SubscriptionEdit