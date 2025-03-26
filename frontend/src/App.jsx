import { Routes, Route } from "react-router-dom"; // ❌ Don't import BrowserRouter here
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SubmitEWaste from "./pages/SubmitEWaste";
import UserDashboard from "./pages/UserDashboard";
import RecyclerDashboard from "./pages/RecyclerDashboard";
import PrivateRoute from "./components/PrivateRoute";
import SelectRecycler from "./pages/SelectRecycler";
import ConfirmRequest from "./pages/ConfirmRequest";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/submit-ewaste" element={<SubmitEWaste />} />
        <Route path="/select-recycler" element={<SelectRecycler />} />
        <Route path="/confirm-request" element={<ConfirmRequest />} />

        <Route path="/dashboard/user" element={<UserDashboard token={token} />} />
        <Route path="/dashboard/recycler" element={<RecyclerDashboard token={token} />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
