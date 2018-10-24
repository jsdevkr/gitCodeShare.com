import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { styled, PageContent, PageSection, SignUpButton } from '../styledComponents';
import { IAppStore } from 'stores/AppStore';

interface IProps {
  className?: string;
  appStore?: IAppStore;
}

const ContentSection = styled(PageSection as any)`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    padding-top: 100px;
    text-align: center;
    height: 100%;
    overflow: hidden;
    position: relative;

    [data-bg] {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 0;
      object-fit: cover;
    }

    [data-layer-1] {
      position: relative;
      z-index: 1;
    }

    [data-header] {
      margin-bottom: 20px;
      font-family: ShareTechMono;
      font-size: 36px;
      letter-spacing: -0.8px;
      color: ${props => props.theme.primaryTextColor};
    }

    [data-title] {
      margin-bottom: 20px;
      font-family: IBMPlexSans;
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      color: ${props => props.theme.primaryTextColor};
    }

    [data-description-1] {
      margin-bottom: 40px;
      color: #dbe3e9;
      font-family: AppleSDGothicNeo;
      font-size: 13px;
      line-height: 1.62;
    }
    [data-description-2] {
      margin-top: 40px;
      margin-bottom: 50px;
      color: #dbe3e9;
      font-weight: normal;
      font-family: IBMPlexSans;
      font-size: 12px;
    }
    [group-11] {
      width: 115px;
      height: 135px;
      object-fit: contain;
    }
  }
`;

@inject('appStore')
class MainPage extends Component<IProps> {
  render() {
    const { className } = this.props;
    const { editor } = this.props.appStore;
    return (
      <PageContent className={className}>
        <ContentSection>
          <div data-layer-1>
            <div data-header>gitCodeShare</div>
            <div data-title>Share your code beautifully</div>
            <div data-description-1>
              GitCodeShare.com은 github 로그인으로 이용하는 서비스 입니다.
              <br />
              코드쉐어를 위해 필요한 github 정보이외에 어떤 정보도 필요 하지 않습니다.
            </div>
            <SignUpButton icon="github" onClick={editor.login}>
              ADD GIT WITH GITHUB
            </SignUpButton>
            <div data-description-2>By joining, you agree to our Terms of Service and Privacy Policy.</div>
            <img group-11 src="../../static/images/group-11.png" />
            <div data-description-2>GitCodeShare.com © 2018</div>
          </div>
        </ContentSection>
      </PageContent>
    );
  }
}

export default MainPage;
