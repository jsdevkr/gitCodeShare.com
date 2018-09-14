import { styled } from '../styledComponents';
import { Layout } from 'antd';

const { Content } = Layout;

const MContainer = styled.div`
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
`;

const SContainer = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
`;

const PageContent = styled(Content as any)`
  min-height: calc(100vh - 128px);
`;

export { MContainer, SContainer, PageContent };
