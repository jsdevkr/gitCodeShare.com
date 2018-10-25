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
import appStore from '../../../stores/AppStore';
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

  .react-codemirror2 {
    margin: 0 !important;
  }

  .CodeMirror-sizer {
    min-height: 250px !important;
  }
`;

const CodeHeader = styled.header`
  ${RowFlex};
  justify-content: space-between;
  padding: 0 0 2rem;
`;

const ButtonWrap = styled.div`
  ${RowFlex};
  align-items: center;
  justify-content: flex-end;
  padding: 2rem 0 0;

  & > button {
    margin-right: 15px;
  }
`;

const LinkButton = styled(LineButton as any)`
  &.ant-btn {
    height: auto;
    right: 0;
    padding: 12px 25px;
  }
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
  copyUrl() {
    const { alert } = appStore;
    let textArea = document.createElement('textarea');
    textArea.value = !(typeof window === 'undefined') && window.location.href;
    textArea.style.position = 'fixed';
    textArea.style.bottom = '0px';
    textArea.style.left = '0px';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('URL is copied to clipboard!');
  }

  render() {
    const { className, gistDetail } = this.props;

    return typeof gistDetail === 'undefined' || !Object.keys(gistDetail).length ? null : (
      <>
        <Head>
          <title>{gistDetail.description}</title>
          <meta
            property="og:image"
            content={`${process.env.BACKEND_URL}/api/image?source=GIST&state=${gistDetail.id}`}
          />
          <meta property="og:url" content={`${process.env.BACKEND_URL}/?${gistDetail.id}`} />
          <meta property="og:title" content={gistDetail.description} />
          <meta property="og:description" content={gistDetail.description} />
        </Head>
        <CodePageContent className={className}>
          <PageSection>
            <CodeContainer>
              <CodeHeader>
                <div>
                  <h3 data-title>
                    {Object.keys(gistDetail.files).length ? Object.keys(gistDetail.files)[0] : 'Code Title'}
                  </h3>
                  <p>{gistDetail.created_at}</p>
                </div>
                {typeof gistDetail.owner === 'undefined' ? null : (
                  <UserCard>
                    <UserCardMeta
                      avatar={<Avatar src={gistDetail.owner.avatar_url} />}
                      title={gistDetail.owner.login}
                      description="Seoul / South Korea"
                    />
                    <a href={gistDetail.owner.html_url} target="blank">
                      <UserGithubButton icon="github">{gistDetail.owner.login}</UserGithubButton>
                    </a>
                  </UserCard>
                )}
              </CodeHeader>
              <CodeEditor />
              <ButtonWrap>
                <LinkButton onClick={this.copyUrl}>Copy URL</LinkButton>
                <a href={gistDetail.html_url} target="blank">
                  <LinkButton>Visit git</LinkButton>
                </a>
              </ButtonWrap>
            </CodeContainer>
          </PageSection>
        </CodePageContent>
      </>
    );
  }
}

export default CodeViewPage;
