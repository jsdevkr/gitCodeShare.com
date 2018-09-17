import React, { Component } from 'react';
import { styled, SCard, SCardMeta, SContainer, PageContent, PageSection } from '../../styledComponents';

interface IProps {
  className?: string;
}

const TitleSection = styled.h3`
  font-size: 2rem;
  padding: 5rem 0 2rem;
  text-align: center;
`;

class FeaturesPage extends Component<IProps> {
  render() {
    const { className } = this.props;
    return (
      <PageContent className={className}>
        <TitleSection data-title>Preview Features</TitleSection>
        <PageSection>
          <SContainer>
            <SCard cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
              <SCardMeta title="제목" description="설명글" />
            </SCard>
            <SCard cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
              <SCardMeta
                title="Europe Street beatEurope Street beatEurope Street beat"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              />
            </SCard>
            <SCard cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
              <SCardMeta title="Europe Street beat" description="www.instagram.com" />
            </SCard>
          </SContainer>
        </PageSection>
      </PageContent>
    );
  }
}

export default FeaturesPage;
