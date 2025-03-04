import React, { useState, useCallback } from 'react';  
import { useNavigate } from "react-router-dom";  
import { Button, Form, Input, Alert, Card, Typography, Spin } from 'antd';  
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';  
import { login, googleLogin } from '../../services/authService';  
import styles from './Login.module.css';  
  
const { Title, Text } = Typography;  
  
const Login = ({ setIsLoggedIn }) => {  
    const [form] = Form.useForm();  
    const navigate = useNavigate();  
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState({  
        show: false,  
        message: '',  
        type: 'error'  
    });  
  
    // Rate limiting for login attempts  
    const [loginAttempts, setLoginAttempts] = useState(0);  
    const [lockoutTime, setLockoutTime] = useState(null);  
  
    const checkLockout = useCallback(() => {  
        if (loginAttempts >= 5) {  
            const timeLeft = lockoutTime - Date.now();  
            if (timeLeft > 0) {  
                setError({  
                    show: true,  
                    message: `Too many attempts. Please try again in ${Math.ceil(timeLeft / 1000)} seconds`,  
                    type: 'error'  
                });  
                return true;  
            }  
            setLoginAttempts(0);  
            setLockoutTime(null);  
        }  
        return false;  
    }, [loginAttempts, lockoutTime]);  
  
    const handleLogin = useCallback(async (values) => {  
        if (checkLockout()) return;  
  
        try {  
            setLoading(true);  
            setError({ show: false, message: '', type: 'error' });  
  
            const response = await login(values);  
  
            if (response.success) {  
                // Reset attempts on successful login  
                setLoginAttempts(0);  
                setLockoutTime(null);  
                  
                // Store token securely  
                sessionStorage.setItem('token', response.token);  
                  
                setIsLoggedIn(true);  
                navigate('/dashboard');  
            } else {  
                // Increment attempts on failure  
                const newAttempts = loginAttempts + 1;  
                setLoginAttempts(newAttempts);  
                  
                if (newAttempts >= 5) {  
                    setLockoutTime(Date.now() + 300000); // 5 minutes lockout  
                }  
  
                setError({  
                    show: true,  
                    message: response.message || 'Login failed. Please check your credentials.',  
                    type: 'error'  
                });  
            }  
        } catch (err) {  
            setError({  
                show: true,  
                message: 'An error occurred. Please try again later.',  
                type: 'error'  
            });  
        } finally {  
            setLoading(false);  
        }  
    }, [navigate, setIsLoggedIn, loginAttempts, checkLockout]);  
  
    const handleGoogleLogin = useCallback(async () => {  
        try {  
            setLoading(true);  
            const response = await googleLogin();  
            if (response.success) {  
                setIsLoggedIn(true);  
                navigate('/dashboard');  
            }  
        } catch (err) {  
            setError({  
                show: true,  
                message: 'Google login failed. Please try again.',  
                type: 'error'  
            });  
        } finally {  
            setLoading(false);  
        }  
    }, [navigate, setIsLoggedIn]);  
  
    return (  
        <div className={styles.loginContainer}>  
            <Card className={styles.loginCard}>  
                <Title level={2} className={styles.title}>Welcome Back</Title>  
                <Text className={styles.subtitle}>Please login to continue</Text>  
  
                {error.show && (  
                    <Alert  
                        message={error.message}  
                        type={error.type}  
                        showIcon  
                        className={styles.alert}  
                    />  
                )}  
  
                <Form  
                    form={form}  
                    name="login"  
                    layout="vertical"  
                    onFinish={handleLogin}  
                    className={styles.form}  
                >  
                    <Form.Item  
                        name="email"  
                        rules={[  
                            { required: true, message: 'Please enter your email!' },  
                            { type: 'email', message: 'Please enter a valid email!' }  
                        ]}  
                    >  
                        <Input   
                            prefix={<UserOutlined />}  
                            placeholder="Email"  
                            disabled={loading}  
                        />  
                    </Form.Item>  
  
                    <Form.Item  
                        name="password"  
                        rules={[  
                            { required: true, message: 'Please enter your password!' },  
                            { min: 8, message: 'Password must be at least 8 characters!' }  
                        ]}  
                    >  
                        <Input.Password  
                            prefix={<LockOutlined />}  
                            placeholder="Password"  
                            disabled={loading}  
                        />  
                    </Form.Item>  
  
                    <Form.Item>  
                        <Button  
                            type="primary"  
                            htmlType="submit"  
                            className={styles.loginButton}  
                            loading={loading}  
                            block  
                        >  
                            Log In  
                        </Button>  
                    </Form.Item>  
  
                    <div className={styles.divider}>  
                        <span>Or</span>  
                    </div>  
  
                    <Button  
                        icon={<GoogleOutlined />}  
                        onClick={handleGoogleLogin}  
                        className={styles.googleButton}  
                        disabled={loading}  
                        block  
                    >  
                        Continue with Google  
                    </Button>  
                </Form>  
  
                <div className={styles.footer}>  
                    <Text>Don't have an account?</Text>  
                    <Button   
                        type="link"   
                        onClick={() => navigate('/signup')}  
                        disabled={loading}  
                    >  
                        Sign Up  
                    </Button>  
                </div>  
            </Card>  
        </div>  
    );  
};  
  
export default Login;  