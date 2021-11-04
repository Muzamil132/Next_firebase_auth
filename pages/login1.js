import React,{useState} from 'react'
import {app} from '../firebase'
import { signIn,getSession,signOut } from 'next-auth/client'
import {Input,Space,Row,Col,Button ,Layout} from 'antd'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const Login1 = () => {
  const [image,setImage]=useState('')

  const [loading,setLoading]=useState(false)
  const handleSubmit=async(e)=>{

       e.preventDefault()
       console.log(email,password)
       const result = await signIn('credentials', {
        redirect: false,
        email,
        password
    })



  }

  const uploadImage=async(e)=>{
    var file = e.target.files[0];
    var formdata = new FormData();

    formdata.append("file", file);
    formdata.append("cloud_name", "studentmath");
    formdata.append("upload_preset", "my_images");
       setLoading(true)
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/studentmath/image/upload",
      {
        method: "post",
        mode: "cors",
        body: formdata
      }
    );

    let json = await res.json();
    console.log(json)
     if(json){
         setLoading(false)
         setImage(json.secure_url)
     }
  };
  



    return (
        <div style={{display:"grid", placeItems:"center"  ,marginTop:"100px"}}   >
      
         <form>
             <Space>

             <Input onChange={uploadImage}  type="file"  name="file"  />
             <Button>Upload</Button>
             {
               loading? <h3>Loading </h3>:  <img  width="200px" src={image}   />
             }
             </Space>
         </form>
        </div>
    )
}

export default Login1



