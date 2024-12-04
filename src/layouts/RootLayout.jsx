

import LoginAuth from '@/components/loginAuth/LoginAuth'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
   
    const [starColor, setStarColor] = useState("#98e3ac");

    useEffect(() => {
        setStarColor("#98e3ac");
    }, []);
  return (
    <>
   
 
    <div className=' w-80 '>
      <LoginAuth/>
    </div>
    <div className="relative z-10">
        <Outlet />
    </div>

</>
  )
}

export default RootLayout