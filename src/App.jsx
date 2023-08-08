import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Analytics from './pages/Dashboard/Analytics'
import Calendar from './pages/Calendar'
import Profile from './pages/Profile'
import FormElements from './pages/Form/FormElements'
import FormLayout from './pages/Form/FormLayout'
// import Tables from './pages/Tables'
import Settings from './pages/Settings'
import Chart from './pages/Chart'
import Alerts from './pages/UiElements/Alerts'
import Buttons from './pages/UiElements/Buttons'
import SignIn from './pages/Authentication/SignIn'
import SignUp from './pages/Authentication/SignUp'
import Invoice from './pages/Form/Invoice'
// import DataTables from './pages/UserList'
import Subscription from './pages/UiElements/Subscription'
import DetailsList from './pages/UiElements/DetailsList'
import Message from './pages/UiElements/Message'
import Inbox from './pages/UiElements/Inbox'
import Cards from './pages/UiElements/Cards'
import Notification from './pages/UiElements/Notification'
import Alert from './components/Alert'
// import UserList from './pages/UserList'
import UserList from './pages/AllUsers/UserList'
import ViewUserById from './pages/AllUsers/ViewUserById'
import UserDashboard from './UserPannalFolder/dashboard/UserDashboard'
import UserSetting from './UserPannalFolder/userprofile/UserSetting'
import UserProfile from './UserPannalFolder/userprofile/UserProfile'
import CategoryList from './pages/Category/CategoryList'
import CategoryView from './pages/Category/CategoryView'
import Adduser from './pages/Manageusers/Adduser'
import AddCategory from './pages/Category/AddCategory'
import ManageUserList from './pages/Manageusers/ManageUserList'
import UserViewById from './pages/Manageusers/UserViewById'
import EditCategory from './pages/Category/EditCategory'
import EditUser from './pages/Manageusers/EditUser'
import AddSubCategory from './pages/SubCategory/AddSubCategory'
import AllSubCategoryList from './pages/SubCategory/AllSubCategoryList'
import EditSubCategory from './pages/SubCategory/EditSubCategory'
import ViewSubCategory from './pages/SubCategory/ViewSubCategory'
import PrivacyPolicy from './pages/System/PrivacyPolicy'
import ContactUs from './pages/System/ContactUs'
import AboutUs from './pages/System/AboutUs'
import Faq from './pages/System/Faq'
import AddFaq from './pages/System/Faq/AddFaq'
import EditFaq from './pages/System/Faq/EditFaq'
import AddNotificatons from './pages/notifications/AddNotificatons'
import NotificationList from './pages/notifications/NotificationList'
import NotificationViewById from './pages/notifications/NotificationViewById'
import RoleList from './pages/Roles/RoleList'
import RoleView from './pages/Roles/RoleView'
import AddRole from './pages/Roles/AddRole'
import PaymentCredential from './pages/Manage Payment/PaymentCredential'

import AddSubscription from './pages/Subscription/AddSubscription'
import SubscriptionList from './pages/Subscription/SubscriptionList'
import SubscrptionView from './pages/Subscription/SubscrptionView'
import SubscriptionEdit from './pages/Subscription/SubscriptionEdit'
import CouponView from './pages/Coupon/CouponView'
import CouponEdit from './pages/Coupon/CouponEdit'
import AddCoupon from './pages/Coupon/AddCoupon'
import CouponList from './pages/Coupon/CouponList'
const App = () => {
  const [loading, setLoading] = useState(true)

  const preloader = document.getElementById('preloader')

  if(preloader) {
    setTimeout(() => {
      preloader.style.display = 'none'
      setLoading(false)
    }, 2000);
  }

  const [alert, setAlert] = useState({
    message:"",
    color:""
  })
  
  const showAlert =(message,color) =>{
    setAlert({message:message,color:color})
  }
   const [alertBox,setAlertBox] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    !loading && (
      <>
      <Alert alert={alert}  alertBox ={alertBox} setAlertBox={setAlertBox}/>
        <Routes>
        <Route path='/' element={<SignIn showAlert={showAlert}  setAlertBox={setAlertBox} />} />
        <Route path='/signup' element={<SignUp showAlert={showAlert}  setAlertBox={setAlertBox} />} />
          <Route exact path='/dashboard' element={<Analytics />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/forms/form-elements' element={<FormElements />} />
          <Route path='/forms/form-layout' element={<FormLayout />} />
          {/* <Route path='/tables' element={<Tables />} /> */}
          <Route path='/settings' element={<Settings  showAlert={showAlert}  setAlertBox={setAlertBox}/>} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/ui/alerts' element={<Alerts />} />
          <Route path='/ui/buttons' element={<Buttons />} />
        
          {/* <Route path='/auth/signup' element={<SignUp />} /> */}
          <Route path='/forms/invoice' element={<Invoice />} />

              {/* Admin manage user */}
              <Route path='/user/add' element={<Adduser showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/user/list' element={<ManageUserList showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/user/view/:id' element={<UserViewById  showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/user/edit/:id' element={<EditUser  showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              {/* admin subcategory  */}
              <Route path='/subcategory/add' element={<AddSubCategory showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/subcategory/list' element={<AllSubCategoryList showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/subcategory/view/:id' element={<ViewSubCategory showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/subcategory/edit/:id' element={<EditSubCategory showAlert={showAlert}  setAlertBox={setAlertBox} />} />

                            {/* admin category  */}
                            <Route path='/category/add' element={<AddCategory showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/category/list' element={<CategoryList showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/category/view/:id' element={<CategoryView showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/category/edit/:id' element={<EditCategory showAlert={showAlert}  setAlertBox={setAlertBox} />} />

              {/* system */}
              <Route path='/system/privacy' element={<PrivacyPolicy showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/system/contactus' element={<ContactUs showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/system/aboutus' element={<AboutUs showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/system/faq' element={<Faq showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/system/faq/add' element={<AddFaq showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/system/faq/edit/:id' element={<EditFaq showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              {/* system */}
              <Route path='/notification/add' element={<AddNotificatons showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/notification/list' element={<NotificationList showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/notification/view/:id' element={<NotificationViewById showAlert={showAlert}  setAlertBox={setAlertBox} />} />

              {/* role */}
              <Route path='/role/list' element={<RoleList showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/role/list/view/:id' element={<RoleView showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/role/add' element={<AddRole showAlert={showAlert}  setAlertBox={setAlertBox} />} />

              {/* subscription */}
              <Route path='/subscription/add' element={<AddSubscription showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/subscription/list' element={<SubscriptionList showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/subscription/view/:id' element={<SubscrptionView showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/subscription/edit/:id' element={<SubscriptionEdit showAlert={showAlert}  setAlertBox={setAlertBox} />} />

              {/* coupon module */}
              <Route path='/coupon/add' element={<AddCoupon showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/coupon/list' element={<CouponList showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/coupon/view/:id' element={<CouponView showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              <Route path='/coupon/edit/:id' element={<CouponEdit showAlert={showAlert}  setAlertBox={setAlertBox} />} />
              {/* manage payment */}
              <Route path='/managepayment/payment-credential' element={<PaymentCredential showAlert={showAlert}  setAlertBox={setAlertBox} />} />


          {/* <Route path='/userlist' element={<UserList  showAlert={showAlert}  setAlertBox={setAlertBox} />} /> */}
          <Route path='/userlist' element={<UserList  showAlert={showAlert}  setAlertBox={setAlertBox} />} />
          <Route path='/userview/:id' element={<ViewUserById  showAlert={showAlert}  setAlertBox={setAlertBox} />} />
          <Route path='/ui/subscription' element={<Subscription />} />
          <Route path='/ui/details' element={<DetailsList />} />
          <Route path='/ui/message' element={<Message />} />
          <Route path='/ui/inbox' element={<Inbox />} />
          <Route path='/ui/cards' element={<Cards />} />
          <Route path='/ui/notification' element={<Notification/>} />

{/* user routes */}
<Route path='/userdashboard' element={<UserDashboard  showAlert={showAlert}  setAlertBox={setAlertBox}/>} />
<Route path='/usersettings' element={<UserSetting  showAlert={showAlert}  setAlertBox={setAlertBox}/>} />
<Route path='/userprofile' element={<UserProfile  showAlert={showAlert}  setAlertBox={setAlertBox}/>} />
        </Routes>
      </>
    )
  )
}

export default App
