

import { GoogleLogin } from 'react-google-login';
import { parseCookies, setCookie, destroyCookie , nookies } from 'nookies'
import { getAuth, createUserWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import {app} from '../firebase'
import { Button } from 'antd';
const GoogleSignIn =()=>{


    console.log(nookies)
  const googleSuccess = async (res) => {

     

    const result = res?.profileObj;
    const token = res?.tokenId;
     console.log(result)

     setCookie(null, 'token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })


  };
 


  const resetPaasword =()=>{
    const auth =getAuth()
   sendPasswordResetEmail(auth, "muzamil073@gmail.com")
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');



    return (
        <div>
           <h1>This is google sign in</h1>


           <GoogleLogin
            clientId="227459679786-kkpis1s21cmd869qusa7bd3q9vifac6u.apps.googleusercontent.com"
            
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />

          <Button onClick={resetPaasword} >Reset</Button>
        </div>
    )
}

export default GoogleSignIn


export const getServerSideProps=async(ctx)=>{

    console.log(nookies)

return {
    props:{

    }
}


}