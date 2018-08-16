import * as React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';

const { Header, Footer, Content } = Layout;

export default () => (
  <Layout style={{ height: '100vh' }}>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
        <Menu.Item key="1">
          <Link href="/contributors">
            <a>contributors</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/features">
            <a>features</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ background: '#fff', height: '100%' }}>Content</Content>
    <Footer style={{ height: '56px' }}>Footer</Footer>
  </Layout>
);
