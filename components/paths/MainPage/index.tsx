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
  SSpin,
} from '../../../styledComponents';
import { IGist } from '../../../model/gist';
import Link from 'next/link';

const { fadeIn, fadeInLeft, fadeInRight, bounceIn } = StyledAnimation;

const RowFlexBox: any = styled.div`
  & {
    ${RowFlex};
    justify-content: space-between;
    margin: 0 -15px;
    min-height: ${props => (props as any).minHeight};

    [data-col] {
      flex: 0 0 50%;
      align-self: stretch;
      position: relative;
      padding: 0 15px;
    }

    [data-grid-1] {
      flex: 0 0 500px;
    }

    [data-grid-2] {
      flex: 0 0 calc(100% - 500px);
    }

    [data-textbox-1] {
      max-width: 360px;
    }
  }
` as {
  minHeight?: number;
};

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
        font-size: 14px;
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
        width: 100%;
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

      [data-desc] {
        font-size: 16px;
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
      font-size: 48px;
      text-shadow: 0 2px 5px #000, 0 -2px 5px #000;
    }

    [data-desc] {
      margin-bottom: 50px;
      font-size: 18px;
      color: ${props => props.theme.primaryTextColor};
      text-shadow: 0 2px 5px #000, 0 -2px 5px #000;
    }

    [data-scroll-btn] {
      position: absolute;
      bottom: 10px;
      z-index: 99;
      transform: rotate(-90deg);

      span {
        display: inherit;
        align-items: center;
        font-size: 14px;

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

const AnimationWrap = styled.div`
  position: relative;

  img {
    position: absolute;
  }
`;

const AnimatedImg: any = styled.img`
  top: ${(props: any) => props.top};
  left: ${(props: any) => props.left};
  right: ${(props: any) => props.right};
  bottom: ${(props: any) => props.bottom};
  z-index: ${(props: any) => props.zIndex};

  &[data-fade] {
    opacity: 0;
  }

  &[data-fade-in] {
    animation: 1s ${fadeIn} ${(props: any) => props.delay} forwards;
  }

  &[data-fade-in-left] {
    animation: 1s ${fadeInLeft} ${(props: any) => props.delay} forwards;
  }

  &[data-fade-in-right] {
    animation: 1s ${fadeInRight} ${(props: any) => props.delay} forwards;
  }

  &[data-bounce-in] {
    animation: 1s ${bounceIn} ${(props: any) => props.delay} forwards;
  }
` as {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  zIndex?: number;
  delay?: number;
};

interface IProps {
  className?: string;
  starredList: IGist[];
}

class MainPage extends Component<IProps> {
  animatedDOM: HTMLElement[] = [];

  handleAnimation = () => {
    let offsetTop = window.pageYOffset + 600;

    if (this.animatedDOM[0] && offsetTop > this.animatedDOM[0].offsetTop) {
      const $img = this.animatedDOM[0].querySelectorAll('img');
      $img[0].setAttribute('data-bounce-in', '');
      $img[1].setAttribute('data-fade-in-left', '');
      $img[2].setAttribute('data-bounce-in', '');
      $img[3].setAttribute('data-fade-in', '');
    }

    if (this.animatedDOM[1] && offsetTop > this.animatedDOM[1].offsetTop) {
      const $img = this.animatedDOM[1].querySelectorAll('img');
      $img[0].setAttribute('data-fade-in-left', '');
      $img[1].setAttribute('data-fade-in-right', '');
      $img[2].setAttribute('data-bounce-in', '');
    }
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleAnimation);
      this.handleAnimation();
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleAnimation);
    }
  }

  render() {
    const { className, starredList } = this.props;
    return (
      <PageContent className={className}>
        <SlideWrap>
          <div data-bg>
            <img data-svg data-svg-1 src="/static/images/svg/main-graphic-01.svg" alt="슬라이드 배경 애니메이션" />
            <img data-svg data-svg-2 src="/static/images/svg/main-graphic-03.svg" alt="슬라이드 배경 애니메이션" />
            <img data-svg data-svg-3 src="/static/images/svg/main-graphic-02.svg" alt="슬라이드 배경 애니메이션" />
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
                <DownloadButton icon="chrome">Add GitCodeShare to Chrome</DownloadButton>
              </a>
            </Link>
          </div>
          <BorderlessButton data-scroll-btn>SCROLL</BorderlessButton>
        </SlideWrap>
        <PageSection>
          <SContainer>
            <RowFlexBox ref={el => (this.animatedDOM[0] = el)} minHeight="437px">
              <div data-col>
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
              <AnimationWrap data-col>
                <AnimatedImg
                  top="66px"
                  left="15px"
                  zIndex="2"
                  delay="0.5s"
                  data-fade
                  src="/static/images/main/main_illust_01.png"
                  alt="gitshare 설명 이미지 - 큰물감"
                />
                <AnimatedImg
                  top="149px"
                  left="125px"
                  zIndex="2"
                  data-fade
                  src="/static/images/main/main_illust_02.png"
                  alt="gitshare 설명 이미지 사람"
                />
                <AnimatedImg
                  top="20px"
                  left="120px"
                  zIndex="1"
                  data-fade
                  delay="0.9s"
                  src="/static/images/main/main_illust_03.png"
                  alt="gitshare 설명 이미지 - FB"
                />
                <AnimatedImg
                  top="230px"
                  left="309px"
                  zIndex="2"
                  data-fade
                  delay="0.7s"
                  src="/static/images/main/main_illust_04.png"
                  alt="gitshare 설명 이미지 - 작은물감"
                />
              </AnimationWrap>
            </RowFlexBox>
          </SContainer>
        </PageSection>
        <PageSection>
          <SContainer>
            <RowFlexBox ref={el => (this.animatedDOM[1] = el)} minHeight="725px">
              <AnimationWrap data-col>
                <AnimatedImg
                  top="108px"
                  zIndex="1"
                  data-fade
                  src="/static/images/main/main_illust_05.png"
                  alt="gitshare 설명 이미지"
                />
                <AnimatedImg
                  top="8px"
                  right="63px"
                  zIndex="2"
                  delay="0.3s"
                  data-fade
                  src="/static/images/main/main_illust_06.png"
                  alt="gitshare 설명 이미지"
                />
                <AnimatedImg
                  bottom="16px"
                  right="0px"
                  zIndex="2"
                  delay="0.5s"
                  data-fade
                  src="/static/images/main/main_illust_07.png"
                  alt="gitshare 설명 이미지"
                />
              </AnimationWrap>
              <div data-col>
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
              {starredList.length ? (
                starredList.map((gist: IGist, i: number) => {
                  return (
                    <Link key={i} href={`?${gist.id}`}>
                      <a>
                        <SCard data-col cover={<img alt="example" src={`/api/image?source=GIST&state=${gist.id}`} />}>
                          <SCardMeta title={gist.description} description={gist.created_at} />
                        </SCard>
                      </a>
                    </Link>
                  );
                })
              ) : (
                <SSpin tip="Loading..." />
              )}
            </CodeWrap>
          </SContainer>
        </PageSection>
      </PageContent>
    );
  }
}

export default MainPage;
