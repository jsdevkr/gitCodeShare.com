import { styled } from '../styledComponents';
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
`;

const PageSection = styled.section`
  & {
    padding: 2rem 0;
    background-color: ${props => props.theme.primaryColor};
  }

  [data-title] {
    color: ${props => props.theme.primaryTextColor};
    font-size: 46px;
    font-weight: bold;
    text-align: center;
  }
`;

const TitleSection = styled.div`
  padding: 5rem 10rem 8rem;
  text-align: center;
  position: relative;

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
