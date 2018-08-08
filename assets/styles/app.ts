import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import './app-scss/antd-theme.less';
import './app-scss/app.scss';

injectGlobal`
  ${styledNormalize}

  .clearfix:before, .clearfix:after {
    content: " ";
    display: table;
  }
  .clearfix:after {
    clear: both;
  }
`;
