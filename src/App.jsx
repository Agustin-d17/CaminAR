import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Pages
import Home from "./pages/Home/Home"
import Places from "./pages/Places/Places"
import Place from "./pages/Place/Place"
import BusinessRegister from "./pages/Business/Register/BusinessRegister"
import BusinessLogin from './pages/Business/Login/BusinessLogin'
import DashboardLayout from './pages/Business/Dashboard/DashboardLayout'
import DashboardRedirect from './pages/Business/Dashboard/DashboardRedirect'
import DashboardProfile from './pages/Business/Dashboard/Perfil/DashboardProfile'
import EditProfile from './pages/Business/Dashboard/Perfil/Edit/EditProfile'
import DashboardAnalytics from './pages/Business/Dashboard/Analytics/DashboardAnalytics'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
function App() {

  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/place/:id" element={<Place />} />
          
          {/* Auth */}
          <Route path="/business/register" element={<BusinessRegister />} />
          <Route path="/business/login" element={<BusinessLogin />}/>
          
          {/* Dashboard */}
          <Route path="/business/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<DashboardRedirect />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="analytics" element={<DashboardAnalytics />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
