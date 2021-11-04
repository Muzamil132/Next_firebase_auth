import Head from 'next/head'
import Image from 'next/image'
import { useRef } from 'react'
import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession } from 'next-auth/client';
import {useEffect,useState} from 'react'
import {Button, Col, Row,Space,Drawer,Modal,Input} from 'antd'

import {db} from '../firebase'
import 'antd/dist/antd.css';
import {collection,addDoc,setDoc,doc,deleteField,updateDoc,getDocs,query,getDoc,deleteDoc} from 'firebase/firestore'
export default function Home() {

  const [session, loadingSession] = useSession();
    console.log(session)
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
     
     
    
    </div>
  )
}


