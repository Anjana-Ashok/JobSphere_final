import { useState } from 'react'
import './App.css'
import WelcomePage from './components/WelcomePage'
import { Route, Routes } from 'react-router-dom'
import About from './components/AboutUs'
import Home from './components/Home'
// import RecruiterProfile from './pages/Recruiter/RecruiterProfile'
// import UserProfile from './pages/Job Seeker/UserProfile'
// import Single from './components/Single'
import Signup from './components/CompanyReg'
// import JobPostForm from './pages/Recruiter/JobPostForm'
// import JobApplicationsTable from './pages/Recruiter/Application'
// import Shortlisted from './pages/Recruiter/Shortlisted'
// import JobList from './pages/Recruiter/Joblist'
// import Applied from './pages/Job Seeker/Appliedjob'
// import UserShortlisted from './pages/Job Seeker/UserShortlisted'
// import RProfile from './pages/Recruiter/RProfileSetup'
// import UpdateProfileDialog from './pages/Recruiter/UpdateProfileDialog'
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
// import HelpPage from './components/HelpPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<WelcomePage/>} />
        {/* <Route path="/aboutus" element={<About />} /> */}
        <Route path="/home" element={<Home />} />
        {/* <Route path="/recruiter" element={<RecruiterProfile />} /> */}
        <Route path="/profile" element={<Profile/>} />
        {/* <Route path="/user" element={<UserProfile />} /> */}
        {/* <Route path="/home/single" element={<Single />} /> */}
        {/* <Route path="/recruiter/addJob"  element={<JobPostForm />} /> */}
        {/* <Route path="/recruiter/application" element={<JobApplicationsTable />} /> */}
        {/* <Route path="/recruiter/shortlisted" element={<Shortlisted/>} /> */}
        {/* <Route path="/recruiter/JobList" element={<JobList/>} /> */}
        {/* <Route path="/jobSeeker/applied" element={<Applied/>} /> */}
        {/* <Route path="/jobSeeker/shortlisted" element={<UserShortlisted/>} /> */}
        {/* <Route path="/help" element={<HelpPage/>} /> */}
        {/* <Route path="/recruiter/profile" element={<RProfile/>} /> */}
        {/* <Route path="/recruiter/update" element={<UpdateProfileDialog/>} /> */}
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
      </Routes>
    </>
  )
}

export default App
