import React from 'react';  
import { Layout as AntLayout } from 'antd';  
import styles from './layout.module.css';  

const { Header, Content } = AntLayout;  

const Layout = ({ children }) => {  
  return (  
    <AntLayout className={styles.container}>  
      <Header className={styles.header}>  
        <div className={styles.brandContainer}>  
          <span   
            className={styles.brandText}  
            style={{  
              fontFamily: '"Lucida Console", Monaco, monospace',  
              fontSize: '16px',  
              color: '#fff'  
            }}  
          >  
            ChoreMate  
          </span>  
        </div>  
      </Header>  
      <Content className={styles.content}>  
        {children}  
      </Content>  
    </AntLayout>  
  );  
};  

export default Layout;  