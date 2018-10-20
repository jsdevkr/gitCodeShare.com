import { styled } from '../';
import { Layout } from 'antd';

const { Content } = Layout;

const SLayout = styled(Layout as any)`
  background-color: ${props => props.theme.primaryColor};
  width: 90%;
  margin: 0 auto;
`;

const MContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

const SContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageContent = styled(Content as any)`
  min-height: calc(100vh - 270px);
  position: relative;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  li,
  p,
  div,
  section,
  article {
    color: ${props => props.theme.primaryTextColor};
  }

  [data-title] {
    font-size: 46px;
    font-weight: bold;
  }

  [data-subtitle] {
    font-size: 24px;
    font-weight: 500;
  }

  p {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.79;
  }
`;

const PageSection = styled.section`
  & {
    padding: 5rem 0;
    background-color: ${props => props.theme.primaryColor};

    [data-center] {
      text-align: center;
    }
  }

  &[data-center] {
    text-align: center;
  }

  [data-subtitle] {
    font-size: 25px;
  }

  [data-desc] {
    font-size: 16px;
  }
`;

const TitleSection = styled.header`
  position: relative;
  padding: 5rem 0 8rem;
  text-align: center;
  font-size: 48px;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    width: 1px;
    height: 61px;
    background-color: ${props => props.theme.colorPalette.patternsBlue};
  }

  p {
    font-size: 18px;
    line-height: 2.08;
  }
`;

export { SLayout, MContainer, SContainer, PageContent, PageSection, TitleSection };
