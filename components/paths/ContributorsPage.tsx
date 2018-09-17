import React, { Component } from 'react';
import { SContainer, PageContent, PageSection } from '../../styledComponents';

interface IProps {
  className?: string;
}

class ContributorsPage extends Component<IProps> {
  render() {
    return (
      <PageContent>
        <PageSection>
          <SContainer>contributors page</SContainer>
        </PageSection>
      </PageContent>
    );
  }
}

export default ContributorsPage;
