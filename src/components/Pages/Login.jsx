import React from 'react'
import { Login as LoginComponent} from '../index'
export default function Login() {
  return (
    <div className='py-8'>
      {console.log("inside login page")}
      <LoginComponent/>
    </div>
  )
}