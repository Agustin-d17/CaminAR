import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Pages
import Home from "./pages/Home/Home"
import Places from "./pages/Places/Places"
import Place from "./pages/Place/Place"
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
// Bussiness Auth
import BusinessRegister from "./pages/Business/Register/BusinessRegister"
import BusinessLogin from './pages/Business/Login/BusinessLogin'
// Bussiness Dashboard
import DashboardLayout from './pages/Business/Dashboard/DashboardLayout'
import DashboardRedirect from './pages/Business/Dashboard/DashboardRedirect'
import DashboardProfile from './pages/Business/Dashboard/Perfil/DashboardProfile'
import EditProfile from './pages/Business/Dashboard/Perfil/Edit/EditProfile'
import DashboardAnalytics from './pages/Business/Dashboard/Analytics/DashboardAnalytics'
import DashboardSettings from './pages/Business/Dashboard/Settings/DashboardSettings'
// Admin Auth
import AdminLogin from './pages/Admin/Login/AdminLogin'
// Admin Panel
import PanelLayout from './pages/Admin/Panel/PanelLayout'
import AdminPanelRedirect from './pages/Admin/Panel/AdminPanelRedirect'
import AdminDashboard from './pages/Admin/Panel/Dashboard/AdminDashboard'
import AdminPlaces from './pages/Admin/Panel/Places/AdminPlaces'
import CreatePlace from './pages/Admin/Panel/Places/Create/CreatePlace'
// import AdminBusiness from './pages/Admin/Panel/Business/AdminBusiness'
// import AdminSettings from './pages/Admin/Panel/Settings/AdminSettings'
function App() {

  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/place/:id" element={<Place />} />
          
          {/*Business Auth */}
          <Route path="/business/register" element={<BusinessRegister />} />
   <       Route path="/business/login" element={<BusinessLogin />}/>
          
          {/* Dashboard Business*/}
          <Route path="/business/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<DashboardRedirect />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="analytics" element={<DashboardAnalytics />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>

          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLogin />}/>

          {/* Admin Panel*/}
          <Route path="/admin/panel/*" element={<PanelLayout />}>
            <Route index element={<AdminPanelRedirect />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="places" element={<AdminPlaces />} />
            <Route path="places/create" element={<CreatePlace />} />
            {/* <Route path="business" element={<AdminBusiness />} /> */}
            {/* <Route path="settings" element={<AdminSettings />} /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
