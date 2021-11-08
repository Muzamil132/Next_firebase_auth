import nc from 'next-connect'
import {app} from '../../../../firebase'
import {getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import cookie from 'cookie'
const handler =nc()


handler.post(async(req,res)=>{

   const {email,password} =req.body
     
   const auth =getAuth()
     try{
      
    const ress = await  createUserWithEmailAndPassword(auth,email,password)
    console.log(ress)
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', ress.user.stsTokenManager.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        })
      )


    res.status(200).json({user:ress.user})

     }
     catch(error){
          res.status(400).json( {error})
     }



})

export default handler












