
import Jobsadmin from '@/components/custom/admin/Jobsadmin'
import Navbar from '@/components/custom/Navbar'
import React from 'react'

const AdminJobs = () => {
  return (
   <>
   <Navbar/>
   <div className='mt-15'>
    <Jobsadmin/>
   </div>
   
   </>
  )
}

export default AdminJobs