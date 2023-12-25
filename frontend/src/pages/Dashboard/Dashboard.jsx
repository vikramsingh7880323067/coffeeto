import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../components/Context/auth'
const Dashboard = () => {
  const[auth]=useAuth();
  return (
    <Layout>
    <div className='container-fluid m-5 p-5' >
       <div className='row'style={{position:"relative",top:"20rem",right:"2rem"}}>
           <div className='col-md-3'>
               <UserMenu/>
           </div>
           <div className='col-md-9' >
               <div className='card p-3'style={{position:"relative",top:"2rem"}} >
                   <h3>User Name: {auth?.user?.name}</h3>
                   <h3>User Email: {auth?.user?.email}</h3>
                   <h3>User phone: {auth?.user?.phone}</h3>
               </div>
           </div>
       </div>
    </div>
   </Layout>
  )
}

export default Dashboard
