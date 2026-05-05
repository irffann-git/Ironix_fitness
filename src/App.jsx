
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/404/NotFount";
import About from "./pages/About";
import Trainers from "./pages/Trainers";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermAndConditions from "./pages/TermAndCondition";
import AuthCallback from "./pages/AuthCallback";
import Profile from "./components/Profile/profilePage";
import Classes from "./pages/Classes";  
import ClassDetailsPage from "./components/ClassDetails/ClassDetailsPage";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import TrainersProfile from "./pages/TrainersProfile";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";










function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div>
      {!isAdminRoute && <Navbar/>}
      <ScrollToTop/>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="About" element={<About/>}/>
        <Route path="/Trainers" element={<Trainers/>}/>
        <Route path="/blog" element={<Blog/>}/>
        
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Signin" element={<SignIn/>}/>
        <Route path="/Signup" element={<SignUp/>}/>
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
        <Route path="/TermAndConditions" element={<TermAndConditions/>}/>
        <Route path="/auth/callback" element={<AuthCallback/>} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/Classes" element={<Classes/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />


        <Route path="/blog/:id" element={<Article/>}/>
        <Route path="/class-details/:id" element={<ClassDetailsPage/>}/>
        <Route path="/trainer/:id" element={<TrainersProfile/>}/>


        
        <Route path="*" element={<NotFound/>}/>




      </Routes>
       {!isAdminRoute && <Footer/>}
      
      
    </div>
  );
}

export default App;