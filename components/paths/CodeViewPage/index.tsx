import React, { Component } from 'react';
import Head from 'next/head';
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
import { IGist } from '../../../model/gist';

interface IProps {
  className?: string;
  gistDetail?: IGist;
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
    const { className, gistDetail } = this.props;
    return typeof gistDetail === 'undefined' || !Object.keys(gistDetail).length ? null : (
      <>
        <Head>
          <title>{gistDetail.description}</title>
          <meta property="og:image" content={`/api/image?source=GIST&state=${gistDetail.id}`} />
          <meta property="og:url" content={`/?${gistDetail.id}`} />
          <meta property="og:description" content={gistDetail.description} />
          <meta property="og:title" content={gistDetail.description} />
        </Head>
        <CodePageContent className={className}>
          <PageSection>
            <CodeContainer>
              <CodeHeader>
                <div>
                  <h3 data-title>{gistDetail.description}</h3>
                  <p>{gistDetail.created_at}</p>
                </div>
                {typeof gistDetail.owner === 'undefined' ? null : (
                  <UserCard>
                    <UserCardMeta
                      avatar={<Avatar src={gistDetail.owner.avatar_url} />}
                      title={gistDetail.owner.login}
                      description="Seoul / South Korea"
                    />
                    <UserGithubButton icon="github">{gistDetail.owner.login}</UserGithubButton>
                  </UserCard>
                )}
              </CodeHeader>
              <CodeEditor />
              <ButtonWrap>
                <LineButton>Copy URL</LineButton>
                <LineButton>Visit git</LineButton>
              </ButtonWrap>
            </CodeContainer>
          </PageSection>
        </CodePageContent>
      </>
    );
  }
}

export default CodeViewPage;
