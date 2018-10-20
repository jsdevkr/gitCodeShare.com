import React, { Component } from 'react';
import {
  styled,
  SContainer,
  RowFlex,
  ColumnFlex,
  PageContent,
  PageSection,
  DownloadButton,
  BorderlessButton,
  SCard,
  SCardMeta,
  StyledAnimation,
} from '../../styledComponents';
import Link from 'next/link';

interface IProps {
  className?: string;
}

const { fadeInLeft, fadeInRight } = StyledAnimation;

const MainContent = styled(PageContent as any)`
  [data-fade] {
    opacity: 0;
  }

  [data-fade-in-left] {
    opacity: 1;
    animation: 1s ${fadeInLeft};
  }

  [data-fade-in-right] {
    opacity: 1;
    animation: 1s ${fadeInRight};
  }
`;

const RowFlexBox = styled.div`
  & {
    ${RowFlex};
    justify-content: space-between;
    margin: 0 -15px;

    [data-col] {
      flex: 0 0 50%;
      position: relative;
      padding: 0 15px;
    }

    [data-grid-1] {
      flex: 0 0 500px;
    }

    [data-grid-2] {
      flex: 0 0 450px;
    }

    [data-textbox-1] {
      max-width: 360px;
    }
  }
`;

const CodeWrap = styled(RowFlexBox as any)`
  & {
    max-width: 770px;
    margin: 0 auto;

    .ant-card {
      max-height: 370px;
      min-height: 0;

      .ant-card-body {
        padding: 18px 15px;
        text-align: left;
      }

      .ant-card-meta-description {
        color: ${props => props.theme.colorPalette.gullGray};
      }
    }
  }
`;

const SlideWrap = styled(PageSection as any)`
  & {
    ${ColumnFlex};
    justify-content: center;
    align-items: center;
    height: 600px;
    padding: 0;
    text-align: center;
    position: relative;

    [data-bg] {
      margin: 0 auto;
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 0;
      width: 100%;
      max-width: 1208px;
      object-fit: cover;
      /* opacity: 0.8; */
      [data-svg] {
        position: absolute;
        object-fit: cover;
        height: 100%;
      }

      [data-svg-1] {
        left: 0;
      }
      [data-svg-2] {
        right: 0;
      }
      [data-svg-3] {
        right: 0;
      }
    }

    [data-layer-1] {
      position: relative;
      z-index: 9;
    }

    [data-bg] {
      background: radial-gradient(#000, transparent, rgba(0, 0, 0, 0.6), #000);
      /* background: radial-gradient(transparent, #000); */
      position: absolute;
      /* left: 0; */
      top: 0;
      width: 100%;
      height: 100%;
    }

    [data-title] {
      margin-bottom: 20px;
    }

    [data-desc] {
      margin-bottom: 50px;
      font-size: 12px;
      color: ${props => props.theme.primaryTextColor};
    }

    [data-scroll-btn] {
      position: absolute;
      bottom: 0;
      z-index: 99;
      transform: rotate(-90deg);

      span {
        display: inherit;
        align-items: center;
        font-size: 12px;

        &::after {
          content: '';
          margin-left: 15px;
          display: inline-block;
          width: 61px;
          height: 1px;
          background-color: ${props => props.theme.primaryTextColor};
        }
      }
    }
  }
`;

class MainPage extends Component<IProps> {
  animatedDOM: HTMLElement[] = [];

  handleAnimation = () => {
    let offsetTop = window.pageYOffset + 300;

    if (this.animatedDOM[0] && offsetTop > this.animatedDOM[0].offsetTop) {
      this.animatedDOM[0].querySelector('img').setAttribute('data-fade-in-right', '');
    }

    if (this.animatedDOM[1] && offsetTop > this.animatedDOM[1].offsetTop) {
      this.animatedDOM[1].querySelector('img').setAttribute('data-fade-in-left', '');
    }
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleAnimation);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleAnimation);
    }
  }

  render() {
    const { className } = this.props;
    return (
      <MainContent className={className}>
        <SlideWrap>
          <div data-bg>
            <img data-svg data-svg-1 src="../../static/images/svg/main-graphic-01.svg" alt="슬라이드 배경 애니메이션" />
            <img data-svg data-svg-2 src="../../static/images/svg/main-graphic-02.svg" alt="슬라이드 배경 애니메이션" />
            <img data-svg data-svg-3 src="../../static/images/svg/main-graphic-03.svg" alt="슬라이드 배경 애니메이션" />
          </div>
          <div data-bg />
          {/* <img data-bg src="../../static/images/slide_bg.svg?" alt="슬라이드 배경 애니메이션" /> */}
          <div data-layer-1>
            <h3 data-title>Share your code beautifully</h3>
            <p data-desc>
              Introducing the best practices, stories, and insights from the world’s top developers.
              <br />
              gitCodeShare is your essential guide to sharing remarkable ideas and talents.
            </p>
            <Link href="/extension">
              <a>
                <DownloadButton icon="plus">Add GitCodeShare to Chrome</DownloadButton>
              </a>
            </Link>
          </div>
          <BorderlessButton data-scroll-btn>SCROLL</BorderlessButton>
        </SlideWrap>
        <PageSection>
          <SContainer>
            <RowFlexBox ref={el => (this.animatedDOM[0] = el)}>
              <div data-col data-grid-1>
                <h3 data-title>Why GitCodeShare?</h3>
                <div data-textbox-1>
                  <h4 data-subtitle>I don’t like this style!</h4>
                  <p data-desc>
                    As we develop, we often share our codes on Facebook and other Social Media Networks. In order to
                    share new innovative ideas, ask for help with broken codes or critique other people’s work, code
                    sharing is necessary.
                  </p>
                  <p data-desc>
                    But it’s not easy to share code that comes in blocks of text or compressed into a small image.
                  </p>
                </div>
              </div>
              <div data-col data-grid-2>
                <img data-fade width="543" src="../../static/images/main_1.png" alt="gitshare 설명 이미지" />
              </div>
            </RowFlexBox>
          </SContainer>
        </PageSection>
        <PageSection>
          <SContainer>
            <RowFlexBox ref={el => (this.animatedDOM[1] = el)}>
              <div data-col data-grid-1>
                <img data-fade width="578" src="../../static/images/main_2.png" alt="gitshare 설명 이미지" />
              </div>
              <div data-col data-grid-2>
                <h3 data-title>
                  More Easy,
                  <br />
                  More Beautiful
                </h3>
                <p data-desc>
                  The GitCodeShare Chrome plug-in allows you to easily share your code in a clean, visually enticing
                  manner straight to your Social Media timeline. No hassle. No more blocks of text.
                </p>
                <DownloadButton icon="plus" style={{ marginTop: '35px' }}>
                  Add GitCodeShare to Chrome
                </DownloadButton>
              </div>
            </RowFlexBox>
          </SContainer>
        </PageSection>
        <PageSection data-center>
          <SContainer>
            <h3 data-title>Recently Shared</h3>
            <p data-desc>You can share your remarkable code with everyone.</p>
            <img
              style={{ width: '350px', margin: '54px 0 62px' }}
              src="../../static/images/main_3.png"
              alt="gitshare 설명 이미지"
            />
            <CodeWrap>
              <SCard
                data-col
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <SCardMeta title="1 Title" description="June 18, 2018" />
              </SCard>
              <SCard
                data-col
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <SCardMeta title="1 Title" description="June 18, 2018" />
              </SCard>
              <SCard
                data-col
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <SCardMeta title="1 Title" description="June 18, 2018" />
              </SCard>
            </CodeWrap>
          </SContainer>
        </PageSection>
      </MainContent>
    );
  }
}

export default MainPage;
