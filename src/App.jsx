import './bootstrap.min.css'
import './App.css'
import Footer from './commponents/Footer'
import Header from './commponents/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FeaturesPricing from './commponents/FeaturesPricing'
import Contact from './commponents/Contact'
import Auth from './pages/Auth'
import Campaign from './pages/Campaign'
import Camadd from './commponents/campaign/Camadd'
import Camview from './commponents/campaign/Camview'
import Camedit from './commponents/campaign/Camedit'
import Lead from './pages/Lead'
import Leadadd from './commponents/leads/Leadadd'
import Leadview from './commponents/leads/Leadview'
import Leadedit from './commponents/leads/Leadedit'
import ManegerDashboard from './pages/ManegerDashboard'
import SalespersonDashboard from './pages/SalespresonDashbord'
import Followup from './pages/Followup'
import Addfollowp from './commponents/followup/Addfollowp'
import Viewfollowup from './commponents/followup/Viewfollowup'
import Customer from './pages/Customer'
import Customeradd from './commponents/customer/Customeradd'
import Customerview from './commponents/customer/Customerview'
import Customeredit from './commponents/customer/Customeredit'
import Profiles from './commponents/Profiles'
import Userfollowup from './pages/Userfollowup'

function App() {

  const salespersonName = localStorage.getItem("salespersonName");

  return (<>
    {/* <Header/> */}
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/features-pricing' element={<FeaturesPricing />} />
  <Route path='/contact' element={<Contact/>}/>
  <Route path='/login' element={<Auth/>}/>
  <Route path='/register' element={<Auth insideRegister={true}/>}/>
  <Route path='/profile' element={<Profiles/>}/>

{/* dashbord */}
<Route path='/manager-dashboard' element={<ManegerDashboard insidemanager={true}/>}/>
<Route path='/sale-dashboard' element={<SalespersonDashboard/>}/>


  {/* campiagn  */}
  <Route path='/campaign' element={<Campaign insidemanager={true}/>}/>
  <Route path='/user-campaign' element={<Campaign insidemanager={false}/>}/>

  <Route path='/campaign-add' element={<Camadd/>}/>
  <Route path="/campaign-view/:id" element={<Camview />} />  
  <Route path='/campaign-edit/:id' element={<Camedit/>}/>
{/* leads */}
<Route path='/leads' element={<Lead insidemanager={true}/>}/>
< Route path='/user-leads' element={<Lead insidemanager={false}/>}/>

  <Route path='/lead-add' element={<Leadadd/>}/>
  <Route path='/lead-view/:id' element={<Leadview/>}/>
  <Route path='/lead-edit/:id' element={<Leadedit/>}/>
{/* followup */}
<Route path="/follow-up" element={<Followup insidemanager={true} />} />
<Route path="/user-follow-up" element={<Followup insidemanager={false} salespersonName={salespersonName || 'default-name'}/>} />
<Route path='/follow-user' element={<Userfollowup/>}/>

<Route path='/followup-add' element={<Addfollowp/>}/>
<Route path='/followup-view/:id' element={<Viewfollowup/>}/>
{/* customer */}
<Route path="/customers" element={<Customer role="manager" />} />
<Route path="/user-customers" element={<Customer role="salesperson" />} />

<Route path='/customer-add' element={<Customeradd/>}/>
  <Route path='/customer-view/:id' element={<Customerview/>}/>
  <Route path='/customer-edit/:id' element={<Customeredit/>}/>

</Routes>
    {/* <Footer/> */}
    </>
  )
     
}

export default App
