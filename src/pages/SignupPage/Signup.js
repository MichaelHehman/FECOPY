import React, { useState, useCallback } from 'react';  
import { useNavigate } from 'react-router-dom';  
import {   
  Button, Form, Input, Alert, Card, Typography,   
  Progress, Space, Divider, notification   
} from 'antd';  
import {   
  UserOutlined, LockOutlined, MailOutlined,   
  GoogleOutlined, EyeInvisibleOutlined, EyeTwoTone   
} from '@ant-design/icons';  
import { signup, googleSignup } from '../../services/authService';  
import styles from './Signup.module.css';  
  
const { Title, Text } = Typography;  
  
const Signup = () => {  
    const [form] = Form.useForm();  
    const navigate = useNavigate();  
    const [loading, setLoading] = useState(false);  
    const [passwordStrength, setPasswordStrength] = useState(0);  
    const [error, setError] = useState({  
        show: false,  
        message: '',  
        type: 'error'  
    });  
  
    // Password strength checker  
    const checkPasswordStrength = useCallback((password) => {  
        let strength = 0;  
        if (password.length >= 8) strength += 25;  
        if (password.match(/[A-Z]/)) strength += 25;  
        if (password.match(/[0-9]/)) strength += 25;  
        if (password.match(/[^A-Za-z0-9]/)) strength += 25;  
        setPasswordStrength(strength);  
    }, []);  
  
    const validateEmail = useCallback((_, value) => {  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
        if (!value || emailRegex.test(value)) {  
            return Promise.resolve();  
        }  
        return Promise.reject('Please enter a valid email address');  
    }, []);  
  
    const handleSignup = useCallback(async (values) => {  
        try {  
            setLoading(true);  
            setError({ show: false, message: '', type: 'error' });  
  
            const response = await signup(values);  
  
            if (response.success) {  
                notification.success({  
                    message: 'Sign up successful!',  
                    description: 'Please check your email for verification.',  
                });  
                navigate('/login');  
            } else {  
                setError({  
                    show: true,  
                    message: response.message || 'Sign up failed. Please try again.',  
                    type: 'error'  
                });  
            }  
        } catch (err) {  
            setError({  
                show: true,  
                message: err.message || 'An unexpected error occurred',  
                type: 'error'  
            });  
        } finally {  
            setLoading(false);  
        }  
    }, [navigate]);  
  
    const handleGoogleSignup = useCallback(async () => {  
        try {  
            setLoading(true);  
            const response = await googleSignup();  
            if (response.success) {  
                navigate('/dashboard');  
            }  
        } catch (err) {  
            setError({  
                show: true,  
                message: 'Google sign up failed',  
                type: 'error'  
            });  
        } finally {  
            setLoading(false);  
        }  
    }, [navigate]);  
  
    return (  
        <div className={styles.signupContainer}>  
            <Card className={styles.signupCard}>  
                <Title level={2} className={styles.title}>Create Account</Title>  
                  
                {error.show && (  
                    <Alert  
                        message={error.message}  
                        type={error.type}  
                        showIcon  
                        closable  
                        className={styles.alert}  
                    />  
                )}  
  
                <Form  
                    form={form}  
                    name="signup"  
                    layout="vertical"  
                    onFinish={handleSignup}  
                    size="large"  
                    className={styles.form}  
                >  
                    <Form.Item  
                        name="name"  
                        rules={[  
                            { required: true, message: 'Please enter your name' },  
                            { min: 2, message: 'Name must be at least 2 characters' }  
                        ]}  
                    >  
                        <Input  
                            prefix={<UserOutlined />}  
                            placeholder="Full Name"  
                            disabled={loading}  
                        />  
                    </Form.Item>  
  
                    <Form.Item  
                        name="email"  
                        rules={[  
                            { required: true, message: 'Please enter your email' },  
                            { validator: validateEmail }  
                        ]}  
                    >  
                        <Input  
                            prefix={<MailOutlined />}  
                            placeholder="Email"  
                            disabled={loading}  
                        />  
                    </Form.Item>  
  
                    <Form.Item  
                        name="password"  
                        rules={[  
                            { required: true, message: 'Please enter your password' },  
                            { min: 8, message: 'Password must be at least 8 characters' }  
                        ]}  
                    >  
                        <Input.Password  
                            prefix={<LockOutlined />}  
                            placeholder="Password"  
                            onChange={(e) => checkPasswordStrength(e.target.value)}  
                            iconRender={(visible) => (  
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />  
                            )}  
                            disabled={loading}  
                        />  
                    </Form.Item>  
  
                    <Progress  
                        percent={passwordStrength}  
                        status={passwordStrength >= 75 ? 'success' : 'active'}  
                        strokeColor={{  
                            '0%': '#ff4d4f',  
                            '50%': '#faad14',  
                            '100%': '#52c41a',  
                        }}  
                        showInfo={false}  
                        className={styles.passwordStrength}  
                    />  
  
                    <Form.Item  
                        name="confirmPassword"  
                        dependencies={['password']}  
                        rules={[  
                            { required: true, message: 'Please confirm your password' },  
                            ({ getFieldValue }) => ({  
                                validator(_, value) {  
                                    if (!value || getFieldValue('password') === value) {  
                                        return Promise.resolve();  
                                    }  
                                    return Promise.reject('Passwords do not match');  
                                },  
                            }),  
                        ]}  
                    >  
                        <Input.Password  
                            prefix={<LockOutlined />}  
                            placeholder="Confirm Password"  
                            disabled={loading}  
                        />  
                    </Form.Item>  
  
                    <Form.Item>  
                        <Button  
                            type="primary"  
                            htmlType="submit"  
                            className={styles.submitButton}  
                            loading={loading}  
                            block  
                        >  
                            Sign Up  
                        </Button>  
                    </Form.Item>  
                </Form>  
  
                <Divider className={styles.divider}>  
                    <span>Or</span>  
                </Divider>  
  
                <Button  
                    icon={<GoogleOutlined />}  
                    onClick={handleGoogleSignup}  
                    className={styles.googleButton}  
                    disabled={loading}  
                    block  
                >  
                    Sign up with Google  
                </Button>  
  
                <div className={styles.footer}>  
                    <Text>Already have an account? </Text>  
                    <Button   
                        type="link"   
                        onClick={() => navigate('/login')}  
                        disabled={loading}  
                    >  
                        Log in  
                    </Button>  
                </div>  
            </Card>  
        </div>  
    );  
};  
  
export default Signup;  