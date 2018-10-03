import React, { Component } from 'react';
import {
  styled,
  SCard,
  SCardMeta,
  SCardMetaDetail,
  RowFlex,
  SContainer,
  PageContent,
  PageSection,
  TitleSection,
} from '../../styledComponents';
import { IContributor } from '../../model/contributors';

interface IProps {
  className?: string;
  contributors?: IContributor[];
}

const RowFlexBox = styled.div`
  & {
    ${RowFlex};

    [data-col] {
      flex: 0 0 calc(100% / 3);
      position: relative;
    }
  }
`;

const ContributorsWrap = styled(RowFlexBox as any)`
  & {
    .ant-card {
      .ant-card-body {
        text-align: left;
      }
    }
  }
`;

class ContributorsPage extends Component<IProps> {
  render() {
    const { contributors } = this.props;

    return (
      <PageContent>
        <TitleSection>
          <h3 data-title>Contributors</h3>
          <div data-subtitle>
            Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit
            elit,
            <br />
            elementum sed varius at, adipiscing vitae est. Sed nec felis pellentesque, lacinia dui sed, ultricies
            sapien.
          </div>
        </TitleSection>
        <PageSection>
          <SContainer>
            <ContributorsWrap>
              {contributors.map((contributor: IContributor) => (
                <a data-col href={contributor.author.html_url} target="blank">
                  <SCard cover={<img alt="example" src={contributor.author.avatar_url} />}>
                    <SCardMeta title={contributor.author.login} description="Developer" />
                    <SCardMetaDetail description="개발자 설명개발자 설명개발자 설명개발자 설명개발자 설명개발자 설명개발자 설명개발자 설명개발자 설명개발자 설명개발자 설명" />
                  </SCard>
                </a>
              ))}
            </ContributorsWrap>
          </SContainer>
        </PageSection>
      </PageContent>
    );
  }
}

export default ContributorsPage;
