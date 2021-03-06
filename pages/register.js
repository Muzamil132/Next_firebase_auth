import React, { useState } from 'react'
import { app } from '../firebase'
import axios from 'axios'
import cookie from 'cookie'
import { useRouter } from 'next/router'
import { Input, Space, Row, Col, Button, Layout, Modal } from 'antd'
// import { redirect } from 'next/dist/server/api-utils'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log(email, password)

        try {
            setLoading(true)
            const URL = "https://next-firebase-auth2-39pof628g-muzamil132.vercel.app"
            const LOCAL_URL = "http://localhost:3000"

            const data = await axios.post(`${URL}/api/auth/login`, { email, password })
            if (data) {
                router.push('/')
                setLoading(false)

            }



        }

        catch (error) {
            console.log(error.response)
            setLoading(false)

            Modal.error({
                title: "Error",
                content: error.response.data.error.code
            })
        }



    }

    return (
        <div>

            <Row style={{ marginTop: "40px" }} justify="center">
                <Col span="12" style={{ padding: "40px" }}   >
                    <Space style={{ width: "100%" }} direction="vertical">
                        <form onSubmit={handleSubmit}>
                            <Input value={email} onChange={e => setEmail(e.target.value)} size="large" shape="rounded" placeholder="email" />

                            <Input value={password} onChange={e => setPassword(e.target.value)} size="large" placeholder="password" />
                            <Button loading={loading} onClick={handleSubmit} type="primary" size="large" block  >Login</Button>
                        </form>
                    </Space>
                </Col>

            </Row>

        </div>
    )
}

export default Login


export const getServerSideProps = async ({ req }) => {


    const token = cookie.parse(req ? req.headers.cookie || '' : '')



    if (token.token) {
        return {

            redirect: {
                destination: "/"
                , permanent: false
            }
        }
    }





    return {
        props: {

        }
    }



}