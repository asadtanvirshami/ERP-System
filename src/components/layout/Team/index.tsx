import React,{ Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
//Components Imports
import TeamComponent from './Admin/index'

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
    <Fragment>
      {type == 'admin' && <Fragment><TeamComponent/></Fragment>}
    </Fragment>
  )
}

export default index