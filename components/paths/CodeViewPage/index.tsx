import React, { Component } from 'react';
import {
  styled,
  UserCard,
  UserCardMeta,
  SContainer,
  PageContent,
  PageSection,
  GithubButton,
  LineButton,
  RowFlex,
} from '../../../styledComponents';
import { CodeEditor } from '../../';
import { Avatar } from 'antd';

interface IProps {
  className?: string;
}

const CodePageContent = styled(PageContent as any)`
  [data-title] {
    font-size: 40px;
  }

  p {
    font-size: 12px;
  }
`;

const CodeContainer = styled(SContainer as any)`
  max-width: 770px;
`;

const CodeHeader = styled.header`
  ${RowFlex};
  justify-content: space-between;
  padding: 0 0 2rem;
`;

const ButtonWrap = styled.div`
  ${RowFlex};
  padding: 2rem 0 0;
`;

const UserGithubButton = styled(GithubButton as any)`
  &.ant-btn {
    position: absolute;
    left: 100px;
    bottom: 8px;
    border: 0;
  }
`;

class CodeViewPage extends Component<IProps> {
  render() {
    const { className } = this.props;
    return (
      <CodePageContent className={className}>
        <PageSection>
          <CodeContainer>
            <CodeHeader>
              <div>
                <h3 data-title>Input Your Code Title</h3>
                <p>Created at June 18, 2018</p>
              </div>
              <UserCard>
                <UserCardMeta
                  avatar={<Avatar src="http://placehold.it/85x85" />}
                  title="user name"
                  description="Seoul / South Korea"
                />
                <UserGithubButton icon="github">githubID</UserGithubButton>
              </UserCard>
            </CodeHeader>
            <CodeEditor />
            <ButtonWrap>
              <LineButton>Copy URL</LineButton>
              <LineButton>Visit git</LineButton>
            </ButtonWrap>
          </CodeContainer>
        </PageSection>
      </CodePageContent>
    );
  }
}

export default CodeViewPage;
