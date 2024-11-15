import React, { useState } from 'react';
import styles from './Login.module.css';
import { Button, Form, Input } from 'antd';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        console.log('Redirecting to Sign-Up');
    };


    const handleLogin = () => {
        // localStorage.setItem("token", "user_token");
        console.log('Logging in with:', { email, password });
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
