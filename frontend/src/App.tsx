import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import FeedPage from "./pages/FeedPage"
import UserLayout from "./layouts/UserLayout"
import Login from "./pages/authPages/Login"
import Signup from "./pages/authPages/Signup"
import { Toaster } from 'react-hot-toast';
import ProtectedRoutes from "./middleware/ProtectedRoutes"

function App() {

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/feed" element={<FeedPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
