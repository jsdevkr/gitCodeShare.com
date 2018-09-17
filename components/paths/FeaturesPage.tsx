import React, { Component } from 'react';
import { SContainer, PageContent, PageSection } from '../../styledComponents';

interface IProps {
  className?: string;
}

class FeaturesPage extends Component<IProps> {
  render() {
    return (
      <PageContent>
        <PageSection>
          <SContainer>features page</SContainer>
        </PageSection>
      </PageContent>
    );
  }
}

export default FeaturesPage;
