import React,{ Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
//Components Imports
import Admin from './Admin/index'
import Agent from './Agent/index'
import { useSelector } from 'react-redux';
import { loginSuccess } from "@/src/redux/actions/userActions/userActions";

type Props = {
    sessionData:any
}

const Dashboard = (props: Props) => {
const [type, setType] = useState<string | undefined>('')
const isAuthenticated = useSelector((state:any) => state.user.role);

console.log(isAuthenticated,'auth')
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
    <Fragment>
      {type == 'admin' && <Fragment><Admin/></Fragment>}
      {type == 'agent' && <Fragment><Agent/></Fragment>}
    </Fragment>
  )
}

export default Dashboard