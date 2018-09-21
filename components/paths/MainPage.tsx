import React, { Component } from 'react';
import { styled, SContainer, PageContent, PageSection, DownloadButton } from '../../styledComponents';

interface IProps {
  className?: string;
}

const SlideSection = styled(PageSection as any)`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    padding: 0;
    text-align: center;
    height: 600px;
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

    [data-title] {
      margin-bottom: 20px;
      color: ${props => props.theme.primaryTextColor};
    }

    [data-description] {
      margin-bottom: 50px;
      color: ${props => props.theme.primaryTextColor};
      font-size: 12px;
      line-height: 2;
    }
  }
`;

class MainPage extends Component<IProps> {
  render() {
    const { className } = this.props;
    return (
      <PageContent className={className}>
        <SlideSection>
          <img data-bg src="../../static/images/slide_bg.svg?" alt="슬라이드 배경 애니메이션" />
          <div data-layer-1>
            <h3 data-title>Share your code beautifully</h3>
            <p data-description>
              Introducing the best practices, stories, and insights from the world’s top developers.
              <br />
              gitCodeShare is your essential guide to sharing remarkable ideas and talents.
            </p>
            <DownloadButton icon="plus">Add GitCodeShare to Chrome</DownloadButton>
          </div>
        </SlideSection>
        <PageSection>
          <SContainer>
            <h3 data-title>Why GitCodeShare?</h3>
          </SContainer>
        </PageSection>
      </PageContent>
    );
  }
}

export default MainPage;
