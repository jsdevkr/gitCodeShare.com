import 'isomorphic-unfetch';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { THEMES } from '../common/constants';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans:500,700|Share+Tech+Mono"
            rel="stylesheet"
          />
          {THEMES.map(theme => (
            <link
              key={theme.id}
              rel="stylesheet"
              href={`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.40.0/theme/${theme.id}.min.css`}
            />
          ))}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
