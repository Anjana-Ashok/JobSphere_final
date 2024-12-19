import { useState } from 'react'
import './App.css'
import WelcomePage from './components/WelcomePage'
import { Route, Routes } from 'react-router-dom'
import About from './components/AboutUs'
import Home from './components/Home'
import Signup from './components/CompanyReg'
import Login from './components/Login'
import Profile from './pages/Job Seeker/Profile'
import Companies from './pages/Recruiter/Companies'
import CompanyCreate from './pages/Recruiter/CompanyCreate'
import CompanySetup from './pages/Recruiter/CompanySetup'
import AdminJobs from './pages/Recruiter/RecruiterJobs'
import PostJob from './pages/Recruiter/PostJob'
import Applicants from './pages/Recruiter/Applicants'
import Jobs from './components/Jobs'
import JobDescription from './components/JobDescription'
import Browse from './components/Browse'
import JobSetup from './pages/Recruiter/JobSetup'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/admin/companies" element={<Companies/>} />
        <Route path="/admin/companies/create" element={<CompanyCreate/>} />
        <Route path="/admin/companies/:id" element={<CompanySetup/>} />
        <Route path="/admin/jobs" element={<AdminJobs/>} />
        <Route path="/admin/jobs/create" element={<PostJob/>} />
        <Route path="/admin/jobs/:id/applicants" element={<Applicants/>} />
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/description/:id" element={<JobDescription/>} />
        <Route path="/browse" element={<Browse/>} />
        <Route path="/aboutUs" element={<About/>} />
        <Route path="/admin/jobs/:id" element={<JobSetup/>} />
      </Routes>
    </>
  )
}

export default App
