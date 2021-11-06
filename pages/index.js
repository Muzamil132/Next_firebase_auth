import Head from 'next/head'
import Image from 'next/image'
import { useRef } from 'react'
import styles from '../styles/Home.module.css'

import { signIn, signOut, useSession } from 'next-auth/client';
import { GoogleLogin } from 'react-google-login';
import {useEffect,useState} from 'react'
import {Button, Col, Row,Space,Drawer,Modal,Input} from 'antd'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import {db} from '../firebase'

import 'antd/dist/antd.css';
import {collection,addDoc,setDoc,doc,deleteField,updateDoc,getDocs,query,getDoc,deleteDoc} from 'firebase/firestore'
export default function Home() {

  const [Token,setToken] =useState('')
  useEffect(()=>{
    const cookies = parseCookies()
    if(cookies.token){
      setToken(cookies.token)
    }
 
  
  },[])

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    setCookie(null, 'token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
   setToken(token)
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');


   const Logout =()=>{
    destroyCookie(null, 'token')
    setToken("")
   }


  const [session, loadingSession] = useSession();
    // console.log(session)
  return (
    <div className={styles.container}>
     {!session && (
        <>
          <button className={styles.primaryButton} onClick={() => signIn()}>
            Sign In
          </button>
        </>
      )}

      {session && (
        <>
          <h4>You are logged as: {session.user.name}</h4>
          <div className={styles.boxCenter}>
            <h4>Email: {session.user.email}</h4>
            <br />
            {session.user.image && (
              <span>
                <img src={session.user.image} alt={session.user.name} />
              </span>
            )}
          </div>
          <br />
          <br />
          <button className={styles.primaryButton} onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      )}


      {
        Token? <Button onClick={Logout}  >Log out</Button>:
      
     
     <GoogleLogin
            clientId="227459679786-kkpis1s21cmd869qusa7bd3q9vifac6u.apps.googleusercontent.com"
            
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
      }
    
    </div>
  )
}

