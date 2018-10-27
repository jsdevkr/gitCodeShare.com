import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider, theme } from '../styledComponents';
import { UIWrapper, AlertModal } from '../components';
import StoreProvider from '../stores/StoreProvider';
import { GlobalStyle } from '../assets/styles/app';
import { getSnapshot } from 'mobx-state-tree';
import { appStoreInstance } from '../stores/create';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, initialState: getSnapshot(appStoreInstance.get()) };
  }

  render() {
    const { Component, pageProps, initialState } = this.props;
    return (
      <Container>
        <StoreProvider initialState={initialState}>
          <ThemeProvider theme={theme}>
            <>
              <UIWrapper>
                <Head>
                  <title>GitCodeShare</title>
                  <meta property="og:image" content="/static/og.png" />
                  <meta property="og:url" content="" />
                  <meta property="og:title" content="GitCodeShare" />
                  <meta property="og:description" content="GitCodeShare" />
                  <link rel="shortcut icon" href="/static/gchFavicon.ico" />
                </Head>
                <Component {...pageProps} />
                <AlertModal />
              </UIWrapper>
              <GlobalStyle />
            </>
          </ThemeProvider>
        </StoreProvider>
      </Container>
    );
  }
}
