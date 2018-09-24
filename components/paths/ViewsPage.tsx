import React, { Component } from 'react';
import {
  styled,
  UserCard,
  UserCardMeta,
  SContainer,
  PageContent,
  PageSection,
  GithubButton,
  LineButton,
} from '../../styledComponents';

import { Avatar } from 'antd';

interface IProps {
  className?: string;
}

const ViewsHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 2rem;
  max-width: 770px;
`;

const ViewsTitle = styled.div`
  margin: auto 0;

  h2 {
    color: ${props => props.theme.primaryTextColor};
    font-size: 40px;
  }

  p {
    color: ${props => props.theme.colorPalette.gullGray};
    font-size: 12px;
  }
`;

const ViewsContent = styled.div`
  div {
    width: 770px;
    height: 485px;
    border: 1px solid ${props => props.theme.colorPalette.patternsBlue};
  }
`;

const ViewsBottom = styled.div`
  padding: 2rem 0 0;
  display: flex;
`;

const UserGithub = styled(GithubButton as any)`
  &.ant-btn {
    position: absolute;
    left: 100px;
    bottom: 8px;
    border: 0;

    .ant-badge-count {
      height: 21px;
      font-size: 11px;
      color: ${props => props.theme.colorPalette.gullGray};
    }

    span {
      height: 21px;
      line-height: 21px;
      max-width: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const ViewsContainter = styled(SContainer as any)`
  width: 770px;
  margin: 0 auto;
`;

class FeaturesPage extends Component<IProps> {
  render() {
    const { className } = this.props;
    return (
      <PageContent className={className}>
        <PageSection>
          <ViewsContainter>
            <ViewsHead>
              <ViewsTitle>
                <h2>Input Your Code Title</h2>
                <p>Created at June 18, 2018</p>
              </ViewsTitle>
              <UserCard>
                <UserCardMeta
                  avatar={<Avatar src="http://placehold.it/85x85" />}
                  title="user name"
                  description="Seoul / South Korea"
                />
                <UserGithub icon="github">githubID</UserGithub>
              </UserCard>
            </ViewsHead>
            <ViewsContent>
              <div>editor</div>
            </ViewsContent>
            <ViewsBottom>
              <LineButton>Copy URL</LineButton>
              <LineButton>Visit git</LineButton>
            </ViewsBottom>
          </ViewsContainter>
        </PageSection>
      </PageContent>
    );
  }
}

export default FeaturesPage;
