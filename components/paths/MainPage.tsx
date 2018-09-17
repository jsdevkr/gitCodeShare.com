import React, { Component } from 'react';
import { styled, SContainer, PageContent, PageSection, RoundedButton } from '../../styledComponents';
import { Carousel } from 'antd';

interface IProps {
  className?: string;
}

const CarouselSection = styled(PageSection as any)`
  & {
    padding: 0;
  }

  .ant-carousel {
    .slick-slide {
      text-align: center;
      height: 400px;
      line-height: 160px;
      background: #364d79;
      overflow: hidden;
      background: url('https://images.unsplash.com/photo-1516101922849-2bf0be616449?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f2845bb75e81dbda93a0d20726bd7759&auto=format&fit=crop&w=2200&q=80')
        no-repeat center / cover;

      [data-title] {
        color: #fff;
      }
    }
  }
`;

class MainPage extends Component<IProps> {
  render() {
    const { className } = this.props;
    return (
      <PageContent className={className}>
        <CarouselSection>
          <Carousel>
            <div>
              <h3 data-title>Share your code beautifully. Anywhere.</h3>
              <RoundedButton icon="plus">Add GitCodeShare to Chrome</RoundedButton>
            </div>
            <div>
              <h3 data-title>Share your code beautifully. Anywhere.</h3>
              <RoundedButton icon="plus">Add GitCodeShare to Chrome</RoundedButton>
            </div>
          </Carousel>
        </CarouselSection>
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
