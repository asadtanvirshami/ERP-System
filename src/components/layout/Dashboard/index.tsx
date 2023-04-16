import React,{ useEffect, useState } from 'react'
import Router from 'next/router';
import Cookies from "js-cookie";
type Props = {
    sessionData:object
}

const index = (props: Props) => {
const [name, setName] = useState<string | undefined>('')
  useEffect(() => {
   let  val  = Cookies.get('user')
    setName(val)
  }, [])
  

  console.log(props.sessionData)
    return (
    <div>{name}</div>
  )
}

export default index