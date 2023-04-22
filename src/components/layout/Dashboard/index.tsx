import React,{ useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Cookies from "js-cookie";

import Admin from './Admin/index'
import Agent from './Agent/index'
// import Manager from './Manager/index'

type Props = {
    sessionData:any
}

const Dashboard = (props: Props) => {
const [type, setType] = useState<string | undefined>('')
const router = useRouter();
  useEffect(() => {
    if(props.sessionData.isLoggedIn == false){
      router.push('/auth')
    }else{
      let  type  = Cookies.get('type')
      return setType(type)
    }
  }, [])
  

  console.log(props.sessionData)
    return (
    <div className=''>
      {type == 'admin' && <><Admin/></>}
      {type == 'agent' && <><Agent/></>}
      {/* {type == 'manager' && <><Manager/></>} */}
    </div>
  )
}

export default Dashboard