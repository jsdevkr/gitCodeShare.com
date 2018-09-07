import App, { Container } from 'next/app';
import React from 'react';
import { ThemeProvider, theme } from '../styledComponents';
import { UIWrapper, AlertModal } from '../components';
import StoreProvider from '../stores/StoreProvider';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <UIWrapper>
              <Component {...pageProps} />
              <AlertModal />
            </UIWrapper>
          </ThemeProvider>
        </StoreProvider>
      </Container>
    );
  }
}
