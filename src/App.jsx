import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Pages
import Home from "./pages/Home/Home"
import Places from "./pages/Places/Places"
import Place from "./pages/Place/Place"
import BusinessRegister from "./pages/Business/Register/BusinessRegister"
import BusinessLogin from './pages/Business/Login/BusinessLogin'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/place/:id" element={<Place />} />
          <Route path="/business/register" element={<BusinessRegister />} />
          <Route path="/business/login" element={<BusinessLogin />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
