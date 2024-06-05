import React from 'react'
import { Login as LoginComponent} from '../components/index'
export default function Login() {
  return (
    <div className='py-8'>
      {console.log("inside login page")}
      <LoginComponent/>
    </div>
  )
}