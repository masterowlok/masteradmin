import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import { REACT_APP_API_PORT } from "../../Api";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import axios from "axios";
import DataLoading from "../../components/DataLoading";
import Resizer from 'react-image-file-resizer';
const EditCategory = (props) => {
  const {id}=useParams()
  const [error, setError] = useState({});
  const [formData, setFormData] = useState(null);
  const user = localStorage.getItem("admin");
  const admin = JSON.parse(user);
  const navigate = useNavigate();
  const [apiIsLoading, setapiIsLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);

  const getCategory=async()=>{
    setisLoading(true)
    await axios.get(`${REACT_APP_API_PORT}api/admin/category/show/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': admin.jwtoken
      }
    })
    .then(res=>{
      console.log(res.data.data)
      setData(res?.data?.data)
      // setData1(res?.data?.data.category_name)
      setisLoading(false)
    })
    .catch(error=>{
      console.log(error)
      if(error.response.request.status === 500){
        localStorage.clear()
        navigate('/')
      }
      setisLoading(false)
    })
  
  
  }

  useEffect(() => {
    getCategory();
  }, []);
  const renderError = (message) => (
    <p className="italic text-[#dd1212]">{message}</p>
  );

  const validate = yup.object({
    image: yup
      .array()
      .min(0, "select at least 1 file and Maximum Size 1 Mb allowed"),

    name: yup.string().min(2).max(25).required("Category name required"),
    
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


  const handleSubmit = async (e) => {
    // console.log(formData.image[0])
    console.log(formData);
    // e.preventDefault();

    const formdata = {
      categoryId:id,
      category_name: formData.name,
    };

    if (formData.image[0]) {
      const compressedImage = await compressImage(formData.image[0]);
      formdata.image = compressedImage;
    }

    setapiIsLoading(true);
    await axios
      .post(`${REACT_APP_API_PORT}api/admin/category/update`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": admin?.jwtoken,
        },
      })
      .then((res) => {
        setapiIsLoading(false);
        props.setAlertBox(true);
        props.showAlert(res.data.success, "green");
        navigate("/category/list");
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
      {apiIsLoading ? <Loader /> : ""}
      <DefaultLayout>
      {isLoading?(<DataLoading />):(<>
        <div className="mx-auto max-w-270">
          <Breadcrumb pageName="Update Category" />
          <Formik
            initialValues={{
              name: data.category_name,
              email: "",
              phone: "",
              password: "",
              address: "",
              role: "",
              image: [],
            }}
            validationSchema={validate}
            onSubmit={(values, actions) => {
              setFormData(values);
              console.log(actions.setValues)
              handleSubmit();
            }}
          >
            {({ values, setFieldValue ,handleChange, handleBlur }) => (
              <Form>
                <div className="grid grid-cols-1">
                  <div className="col-span-5 xl:col-span-3">
                    <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Update Category
                        </h3>
                      </div>
                      <div className="p-7 gri grid-cols- max-w-[600px] ">
                        <div className="sm:flex-ro mb-5.5 flex flex-col gap-5.5">
                          <div className="s:w-1/2 w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Category Name
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
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                 onBlur={handleBlur}
                                  value={values.name}
                               
                                placeholder="Enter Category Name"
                                // defaultValue={data1}
                              />
                            </div>
                            <ErrorMessage name="name" render={renderError} />
                          </div>

                          {/* <div className="sm:w- w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="phoneNumber"
                            >
                              Phone Number
                            </label>
                            <Field
                              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="number"
                              name="phone"
                              id="number"
                              placeholder="Enter You Number"
                              // defaultValue=""
                            />
                            <ErrorMessage name="phone" render={renderError} />
                          </div> */}
                        </div>

                        {/* <div className="mb-5.5">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="emailAddress"
                          >
                            Email Address
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
                                    d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                    fill=""
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                    fill=""
                                  />
                                </g>
                              </svg>
                            </span>
                            <Field
                              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="email"
                              name="email"
                              // id='emailAddress'
                              // readOnly
                              placeholder="Enter Your Email"

                              // defaultValue="devidjond45@gmail.com"
                            />
                          </div>
                          <ErrorMessage name="email" render={renderError} />
                        </div>

                        <div className="mb-6">
                          <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Password
                          </label>
                          <div className="relative">
                            <Field
                              name="password"
                              type="password"
                              required
                              placeholder="Atleast 6 Characters"
                              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            />

                            <span className="absolute right-4 top-4">
                              <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g opacity="0.5">
                                  <path
                                    d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                    fill=""
                                  />
                                  <path
                                    d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                    fill=""
                                  />
                                </g>
                              </svg>
                            </span>
                          </div>
                          <ErrorMessage name="password" render={renderError} />
                        </div> */}

                        {/* <div className="mb-5.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Role
                          </label>
                          <div className="relative z-20 bg-transparent dark:bg-form-input">
                       
                            <Field
                              as="select"
                              name="role"
                              className="relative z-20 w-full appearance-none rounded border border-stroke bg-gray py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-meta-4 dark:focus:border-primary"
                            >
                              <option value="role1">role1</option>
                              <option value="role2">role2</option>
                              <option value="role3">role3</option>
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
                          <ErrorMessage name="role" render={renderError} />
                        </div> */}

                        {/* <div className="mb-5.5">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="Username"
                          >
                            Address
                          </label>
                          <Field
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="address"
                            id="Username"
                            placeholder="address"
                   
                          />
                          <ErrorMessage name="address" render={renderError} />
                        </div> */}

                     
                      </div>
                    </div>
                  </div>
                  <div className="col-span-5 xl:col-span-2">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      {/* <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Your Photo
                        </h3>
                      </div> */}
                      <div className="p-7 md:max-w-[600px]">
                        <div className="mb-4 flex items-center gap-3">
                  
                          <div>
                            <span className="mb-1.5 text-black dark:text-white">
                              Category Image
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
                     
                            </p>
                       
                            {values.image[0] ? (
                              <img
                                src={
                                  values.image[0]
                                    ? URL.createObjectURL(values?.image[0])
                                    : ""
                                }
                                alt="User"
                                className="h-48 w-48 rounded-full"
                              />
                            )
                            :
                            <img src={data?.image} alt='profile' className='rounded-full h-30 w-30 sm:h-44 sm:w-44' />
                            }

                           
                          
                          </div>
                          <ErrorMessage name="image" render={renderError} />
                        </div>
                  

                        <p className="mt-2 font-semibold text-[#8d0d0d]">
                          {error.mass}
                        </p>

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
  );
};

export default EditCategory;