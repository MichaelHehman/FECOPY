import React, { useState } from 'react';
import styles from './Signup.module.css';
import { Button, Form, Input } from 'antd';
import { signup } from '../../services/authService';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const handleSignup = async () => {
        console.log('Signing up in with:', { email, password });
        await signup({ name, email, password })
            .then((res) => {
                setError(res.status === 400 ? true : false);
            });

        // setIsLoggedIn(false);

        // try {
        //     await signup({ name, email, password });
        // } catch (err) {
        //     if (err.response && err.response.status === 400) {
        //         console.log(err.response.data.message);
        //     }
        // }
    };

    return (
        <div className={styles.signupPage}>
            <Form
                name="login-form"
                layout="vertical"
                onFinish={handleSignup}
                size='large'
                className={styles.signupForm}
            >
                <h2 className={styles.header}>Sign Up</h2>

                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                    label={<span style={{ color: '#A75E2A', fontWeight: 'semibold', fontSize: '16px' }}>Name</span>}
                >
                    <Input
                        className={styles.formItem}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    validateStatus={error ? 'error' : 'success'}
                    help={error ? 'User already exists' : ''}
                    rules={[{ required: true, message: 'Please enter your email!' }]}
                    label={<span style={{ color: '#A75E2A', fontWeight: 'semibold', fontSize: '16px' }}>Email</span>}
                >
                    <Input
                        className={styles.formItem}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                    label={<span style={{ color: '#A75E2A', fontWeight: 'semibold', fontSize: '16px' }}>Password</span>}
                >
                    <Input.Password
                        className={styles.formItem}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item className={styles.formItem}>
                    <Button type="primary" htmlType="submit" block>
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

};

export default Signup;
