import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  CalendarOutlined,
  ApartmentOutlined,
  CameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import Page1 from './page/Page1';
import Page2 from './page/Page2';
import Page3 from './page/Page3';
import Page4 from './page/Page4';

const { Header, Content, Footer, Sider } = Layout;

const AppContent: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{ width: '300px', padding: '20px' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            style={{ marginTop: '200px', fontSize: '20px' }}
          >
            <Menu.Item
              key="1"
              icon={<CameraOutlined style={{ fontSize: '20px' }} />}
            >
              <Link to="/Page1">카메라</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<ApartmentOutlined style={{ fontSize: '20px' }} />}
            >
              <Link to="/Page2">중앙제어</Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<CalendarOutlined style={{ fontSize: '20px' }} />}
            >
              <Link to="/Page3">캘린더</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<UploadOutlined style={{ fontSize: '20px' }} />}
            >
              <Link to="/Page4">페이지 4</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ color: 'white', padding: '100px', textAlign: 'center' }}
          >
            <h1
              style={{ fontSize: '50px', textAlign: 'center', margin: 'auto' }}
            >
              헤더어어어어어
            </h1>
          </Header>
          <Content style={{ margin: '16px' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Routes>
                <Route path="/Page1" element={<Page1 />} />
                <Route path="/Page2" element={<Page2 />} />
                <Route path="/Page3" element={<Page3 />} />
                <Route path="/Page4" element={<Page4 />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design Example App
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default AppContent;
