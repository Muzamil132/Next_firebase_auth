import React,{useState} from 'react'
import {app} from '../firebase'

import {Input,Space,Row,Col,Button ,Layout} from 'antd'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword] =useState("")

  const handleSubmit=(e)=>{

       e.preventDefault()
       console.log(email,password)
       const auth = getAuth();
       createUserWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         console.log(user)
         // ...
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         // ..
       });


  }

    return (
        <div>
      
            <Row style={{marginTop:"40px"}}  justify="center">
                <Col span="12" style={{padding:"40px"}}   >
                  <Space  style={{width:"100%"}} direction="vertical">
                      <form onSubmit={handleSubmit}>
                       <Input   value={email} onChange={e=>setEmail(e.target.value)}  size="large" shape="rounded"  placeholder="email" />
                        
                       <Input   value={password} onChange={e=>setPassword(e.target.value)}  size="large" placeholder="password"   />
                       <Button onClick={handleSubmit}   type="primary" size="large" block  >Login</Button>
                       </form>
                 </Space>
                </Col>

            </Row>
         
        </div>
    )
}

export default Login
