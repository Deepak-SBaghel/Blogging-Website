// protectoin mechanism
// just a container , which decide what to show
import React,{useEffect,useState} from "react";
import {useSelector} from "react-router-dom"
import { useNavigate } from "react-router-dom";       
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loader,setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(()=>{
    // here teh user might send authentication true bcs , he want to access it,
    // therefore  u have to chech it with authStatus
    if(authentication && authStatus !== authentication){
      //true && false !== true redirect to login
      navigate("/login")
    } else if(!authentication && authStatus !== authentication){
      //false &&  true !== true
       navigate("/")
    }
    setLoader(false)
  },[authStatus,navigate,authentication])
  return loader ? <h1>Loading...</h1>:<>{children}</>;
}
