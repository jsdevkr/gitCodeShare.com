import { styled } from '../';
import { Layout } from 'antd';

const { Content } = Layout;

const SLayout = styled(Layout as any)`
  background-color: ${props => props.theme.primaryColor};
`;

const MContainer = styled.div`
  width: 90%;
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

  [data-title] {
    font-size: 46px;
    font-weight: bold;
    color: ${props => props.theme.primaryTextColor};
  }

  [data-subtitle] {
    font-size: 24px;
    font-weight: 500;
    color: ${props => props.theme.primaryTextColor};
  }

  [data-desc] {
    color: ${props => props.theme.colorPalette.patternsBlue};
    font-size: 14px;
    font-weight: 300;
    line-height: 1.79;
  }
`;

const PageSection = styled.section`
  & {
    padding: 5rem 0;
    background-color: ${props => props.theme.primaryColor};
  }

  &[data-center] {
    text-align: center;
  }
`;

const TitleSection = styled.div`
  padding: 5rem 0 8rem;
  text-align: center;
  position: relative;
  max-width: 620px;
  margin: 0 auto;

  &:after {
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    width: 1px;
    height: 61px;
    background-color: ${props => props.theme.colorPalette.patternsBlue};
    content: '';
  }

  [data-title] {
    color: ${props => props.theme.primaryTextColor};
    font-size: 46px;
  }

  [data-subtitle] {
    color: ${props => props.theme.primaryTextColor};
    font-size: 12px;
    line-height: 25px;
  }
`;

export { SLayout, MContainer, SContainer, PageContent, PageSection, TitleSection };
