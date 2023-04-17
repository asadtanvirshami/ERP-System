import React,{ useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Cookies from "js-cookie";

import Admin from '../Dashboard/Admin/index'
import Agents from '../Dashboard/Agents/index'
import Manager from '../Dashboard/Manager/index'

type Props = {
    sessionData:any
}

const index = (props: Props) => {
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
    <div>
      {type == 'admin' && <><Admin/></>}
      {type == 'agent' && <><Agents/></>}
      {type == 'manager' && <><Manager/></>}
    </div>
  )
}

export default index