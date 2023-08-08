import React, { useState ,useEffect} from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb'
// import { REACT_APP_API_PORT } from "../../Api";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import axios from "axios";
import Resizer from 'react-image-file-resizer';
import { REACT_APP_API_PORT } from "../../Api";


const AddNotificatons = (props) => {
    const [error, setError] = useState({});
    const [formData, setFormData] = useState(null);
    const user = localStorage.getItem("admin");
    const admin = JSON.parse(user);
    const navigate = useNavigate();
    const [apiIsLoading, setapiIsLoading] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [type ,setTypeSend]=useState('')
    const [data,setData]=useState([])
  
    const renderError = (message) => (
      <p className="italic text-[#dd1212]">{message}</p>
    );
  
    // const validate = yup.object({
    //   image: yup
    //     .array()
    //     .min(0, "select at least 1 file and Maximum Size 1 Mb allowed"),
    //   images: yup
    //     .array()
    //     .min(0, "select at least 1 file and Maximum Size 1 Mb allowed"),
    //   module: yup.string().min(2).max(50).required("Title required"),
    //   email: yup.string().email().required("Email required"),
    //   phone: yup
    //     .string()
    //     .required("Phone required")
    //     .matches(/^[0-9]+$/, "Must be only digits")
    //     .min(10, "Must be exactly 10 digits")
    //     .max(10, "Must be exactly 10 digits"),
    //   password: yup.string().required("Password required"),
    //   message: yup
    //     .string()
    //     .required()
    //     // .matches(/^[0-9]+$/, "Must be only digits")
    //     .min(5, "Min 5 digits required")
    //     .max(250, "Maximum  250 digits"),
    //   sendtype: yup.string().required("send type required"),
    // //   user: yup.string().required("user required"),
    // });
    const validate = yup.object({

        module: yup.string().min(2).max(50).required("Title required"),
        sendtype: yup.string().required("send type required"),
        user: yup.string().required("user required"),
        message: yup
            .string()
            .required()
            // .matches(/^[0-9]+$/, "Must be only digits")
            .min(5, "Min 5 digits required")
            .max(250, "Maximum  250 digits"),

      });
  
    const compressImage = (file) => {
      return new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          1000, // Set the desired width (you can adjust this value)
          800, // Set the desired height (you can adjust this value)
          'JPEG', // Set the output format (JPEG, PNG, or WEBP)
          100, // Set the image quality (0-100)
          0, // Set the rotation (0-360 degrees)
          (uri) => {
            resolve(uri);
          },
          'base64' // Set the output type ('base64', 'blob', or 'file')
        );
      });
    };
    
  const handleSubmit = async (message,image ,module,sendtype,user) => {
    // console.log(formData.image[0])
    console.log(formData);
    // e.preventDefault();
    
    const formdata = {
      type: sendtype,
      id: user,
      module: module,
      message: message,
     
    };
    if (image[0]) {
      const compressedImage = await compressImage(image[0]);
      image = compressedImage;
    }

    setapiIsLoading(true);
    await axios
      .post(`${REACT_APP_API_PORT}api/admin/notification/create`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": admin?.jwtoken,
        },
      })
      .then((res) => {
        setapiIsLoading(false);
        // console.log(res);
        props.setAlertBox(true);
        props.showAlert(res.data.success, "green");
        navigate("/notification/list");
      })
      .catch((error) => {
        setapiIsLoading(false);
        console.log(error);
        console.log(error.response.data.errors.message);
        props.setAlertBox(true);
        props.showAlert(error.response.data.errors.message, "red");
      });
  };

  const getUserList = async () => {
    try {
      setisLoading(true)
        const res=await axios.get(`${REACT_APP_API_PORT}api/admin/employee/list`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': admin.jwtoken
          }
        });
         console.log(res.data.data)
         const validUser = res.data.data.map(item=>{
          return (item?.is_delete !== 1) && item
         })
         setData(validUser)
        setisLoading(false)
    } catch (error) {
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
    getUserList()
  },[])
  return (
 <>
  <DefaultLayout>
        {apiIsLoading ? <Loader /> : ""}
        <div className="mx-auto max-w-270">
          <Breadcrumb pageName="Add Notification" />
          <Formik
            initialValues={{
              module: "",
              sendtype:'',
              user:'',
              message: "",
              image: [],
            }}
            // validationSchema={validate}
            onSubmit={(values, actions) => {
                // alert('jj')
                console.log(values)
                const {message,image ,module,sendtype,user}=values
            //   setFormData(values);
              handleSubmit(message,image ,module,sendtype,user);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-5 gap-8">
                  <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                        Add Notification
                        </h3>
                      </div>
                      <div className="p-7">
                      
                      <div className="mb-5.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Send Type
                          </label>
                          <div className="relative z-20 bg-transparent dark:bg-form-input">
                         
                            <Field
                              as="select"
                              name="sendtype"
                              className="relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-meta-4 dark:focus:border-primary"
                            >
                              <option value="">Select Type</option>
                              <option value="Individual">Individual</option>
                              <option value="All">All</option>
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
                          <ErrorMessage name="sendtype" render={renderError} />
                        </div>

                        {(values.sendtype ==='Individual')&& 
                        <div className="mb-5.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                            User
                          </label>
                          <div className="relative z-20 bg-transparent dark:bg-form-input">
                         
                            <Field
                              as="select"
                              name="user"
                              className="relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-meta-4 dark:focus:border-primary"
                            >
                              <option value="">Select User</option>
                              {data.map((val)=>{
                                return(    
                                    <option value={val._id}>{val.name}</option>
                                    )
                              })}
                          
  
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
                          <ErrorMessage name="user" render={renderError} />
                        </div>
                        }

                        <div className="sm:flex-ro mb-5.5 flex flex-col gap-5.5">
                          <div className="s:w-1/2 w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Title
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
                                name="module"
                                // id='fullName'
                                required
                                placeholder="Enter Title"
                                defaultValue="Devid Jhon"
                              />
                            </div>
                            <ErrorMessage name="module" render={renderError} />
                          </div>

                         
                        </div>

                      

                      


                        <div className="mb-5.5">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="Username"
                          >
                            Message
                          </label>
                          <Field
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="message"
                            required
                            id="Username"
                            placeholder="Enter Message"
                            // defaultValue='devidjhon24'
                          />
                          <ErrorMessage name="message" render={renderError} />
                        </div>

                        {/* <div className="mb-5.5">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="Username"
                            >
                              Addess
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
                                  <g
                                    opacity="0.8"
                                    clipPath="url(#clip0_88_10224)"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                      fill=""
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                      fill=""
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_88_10224">
                                      <rect
                                        width="20"
                                        height="20"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </span>

                              <Field 
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name='address'
                                // id='bio'

                                // rows="6"
                                placeholder="Write your bio here"
                                // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
                             />
                            </div>
                          </div> */}

                        {/* <div className='flex justify-end gap-4.5'>
                    <button
                      className='flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white'
                      type='submit'
                    >
                      Cancel
                    </button>
                    <button
                      className='flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1'
                      type='submit'
                    >
                      Save
                    </button>
                  </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-5 xl:col-span-2">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Your Photo
                        </h3>
                      </div>
                      <div className="p-7">
                        <div className="mb-4 flex items-center gap-3">
                          {/* <div className="h-14 w-14 rounded-full">
                            <img src={preview?preview:userThree} alt="User"  className="h-12 w-12 rounded-full"/>
                          </div> */}
                          <div>
                            <span className="mb-1.5 text-black dark:text-white">
                              Edit your photo
                            </span>
                          </div>
                        </div>

                        <div
                          id="FileUpload"
                          className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            name="image"
                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                            onChange={(event) => {
                              let img = event.target.files[0];
                              let imgSize = img.size;
                              const sizeAllowed = 900 * 1024;
                              if (imgSize > sizeAllowed) {
                                setError({
                                  mass: "Image Maximum  Size 900kb  allowed",
                                });
                              } else {
                                const files = event.target.files;
                                let myFiles = Array.from(files);
                                setFieldValue("image", myFiles);
                                setError({});
                              }
                            }}
                          />
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                  fill="#3C50E0"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                  fill="#3C50E0"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                  fill="#3C50E0"
                                />
                              </svg>
                            </span>
                            <p>
                              <span className="text-primary">
                                Click to upload
                              </span>{" "}
                              {/* or drag and drop */}
                            </p>
                            {/* <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                            <p>(max, 800 X 800px)</p> */}
                            {values.image[0] && (
                              <img
                                src={
                                  values.image[0]
                                    ? URL.createObjectURL(values?.image[0])
                                    : ""
                                }
                                alt="User"
                                className="h-48 w-48 rounded-full"
                              />
                            )}
                            {/* <img src={(preview !=='')?REACT_APP_API_PORT+preview:userThree}  alt="User"  className="w-48 h-48 rounded-full"/> */}
                          </div>
                        </div>
                        <ErrorMessage name="image" render={renderError} />

                        <p className="mt-2 font-semibold text-[#8d0d0d]">
                          {error.mass}
                        </p>

                        <div className="ga-4.5 flex w-full justify-center">
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
      </DefaultLayout>
 </>
  )
}

export default AddNotificatons