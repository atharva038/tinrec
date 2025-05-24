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
import RequestHistory from './components/RecyclerDashboard/RequestHistory';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecyclerLayout from './layouts/RecyclerLayout';
import RecyclerRegistration from "./components/RecyclerDashboard/RecyclerRegistration";
import UpdateRecyclerServices from "./components/RecyclerDashboard/UpdateRecyclerServices";
import RecyclerRegistrationGuard from "./guards/RecyclerRegistrationGuard"; // This is a new component we'll create


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
        {/* Recycler routes with layout */}
        <Route path="/dashboard/recycler" element={
          <RecyclerLayout>
            <RecyclerDashboard />
          </RecyclerLayout>
        } />

        <Route path="/request-history" element={
          <RecyclerLayout>
            <RequestHistory />
          </RecyclerLayout>
        } />

        <Route path="/recycler-registration" element={
          <RecyclerLayout>
            <RecyclerRegistrationGuard>
              <RecyclerRegistration />
            </RecyclerRegistrationGuard>
          </RecyclerLayout>
        } />
        <Route
          path="/dashboard/recycler/update-services"
          element={
            <RecyclerLayout>
              <UpdateRecyclerServices />
            </RecyclerLayout>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
