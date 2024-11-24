import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import { Button, Form, Input } from 'antd';
import { login } from '../../services/authService';

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorUser, setErrorUser] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = () => {
        console.log('Redirecting to Sign-Up');
        navigate("/signup");
    };

    const handleLogin = async () => {
        await login({ email, password })
            .then((res) => {
                if (res.status === 404) {
                    setErrorUser(true);
                    setErrorPassword(false);
                }
                else if (res.status === 401) {
                    setErrorUser(false);
                    setErrorPassword(true);
                }
                setErrorMessage(res.message);
            });
        setIsLoggedIn(false);
    };

    return (
        <div className={styles.loginPage}>
            <Form
                name="login-form"
                layout="vertical"
                onFinish={handleLogin}
                size='large'
                className={styles.loginForm}
            >
                <Form.Item
                    className={styles.formItem}
                    name="email"
                    validateStatus={errorUser ? 'error' : 'success'}
                    help={errorUser ? errorMessage : ''}
                    rules={[{ required: true, message: 'Please enter your email!' }]}
                >
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item
                    className={styles.formItem}
                    name="password"
                    validateStatus={errorPassword ? 'error' : 'success'}
                    help={errorPassword ? errorMessage : ''}
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item className={styles.formItem}>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button onClick={handleSignup} className={styles.signupBtn} block>
                        <img
                            src="assets/images/signupLogo.png"
                            alt="logo"
                        />{' '}
                        Sign up New Account
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button onClick={handleSignup} className={styles.signupBtn} block>
                        <img
                            src="assets/images/googleLogo.png"
                            alt="logo"
                        />{' '}
                        Continue with Google
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button onClick={handleSignup} className={styles.signupBtn} block>
                        <img
                            src="assets/images/microsoftLogo.png"
                            alt="logo"
                        />{' '}
                        Continue with Microsoft
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

};

export default Login;
