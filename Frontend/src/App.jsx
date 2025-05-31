import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from '../src/Pages/Home'
import Login from '../src/Pages/Login'
import Signup from '../src/Pages/Signup'
import Navbar from './components/custom/Navbar'
import Job from './Pages/Job'
import Browse from './Pages/Browse'
import Profile from './Pages/Profile'
import Deatils from './components/custom/Deatils'
import DetailsJob from './Pages/DetailsJob'
import Companies from './Pages/Companies'
import Jobsadmin from './components/custom/admin/Jobsadmin'
import CompanyRegister from './Pages/CompanyRegister'
import CompanyEditpage from './Pages/CompanyEditpage'
import AdminJobs from './Pages/AdminJobs'
import CreateJob from './Pages/CreateJob'
import Appliedapplicants from './Pages/Appliedapplicants'

// Example pages (replace with your actual components)


const approuter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/job',
    element: <Job/>
  },
  {
    path: '/browse',
    element: <Browse/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/details/:id',
    element: <DetailsJob/>

  },
  {
    path: '/companies',
    element: <Companies/>

  },
  {
    path: '/admin/jobs',
    element: <Jobsadmin/>

  },
  {
    path: '/company-register',
    element: <CompanyRegister/>

  },
  {
    path: '/company-edit/:id',
    element: <CompanyEditpage/>

  },
  {
    path: '/admin/jobs/:id',
    element: <AdminJobs/>

  },
  {
    path: '/admin/job/register',
    element: <CreateJob/>

  },
  {
    path: '/admin/allapplicants',
    element: <Appliedapplicants/>

  }
])

function App() {
  return (
    <RouterProvider router={approuter} />
  )
}

export default App
