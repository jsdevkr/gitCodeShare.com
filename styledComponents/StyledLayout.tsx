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

export { SLayout, MContainer, SContainer, PageContent, PageSection };
