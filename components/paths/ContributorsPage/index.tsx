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
  SSpin,
} from '../../../styledComponents';
import { IContributor } from '../../../model/contributors';

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
      max-width: calc(100% / 3);
    }
  }
`;

const ContributorsWrap = styled(RowFlexBox as any)`
  & {
    .ant-card {
      .ant-card-cover {
        height: auto;
        text-align: center;

        img {
          max-width: 320px;
          display: inline-block;
          vertical-align: top;
        }
      }
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
          <p>
            Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit
            elit,
            <br />
            elementum sed varius at, adipiscing vitae est. Sed nec felis pellentesque, lacinia dui sed, ultricies
            sapien.
          </p>
        </TitleSection>
        <PageSection>
          <SContainer>
            <ContributorsWrap>
              {contributors.length ? (
                contributors.map((contributor: IContributor, i: number) => (
                  <a key={i} data-col href={contributor.html_url} target="blank">
                    <SCard cover={<img alt="example" src={contributor.avatar_url} />}>
                      <SCardMeta
                        title={contributor.login}
                        description={contributor.login === 'Jisookhyeon' ? 'Designer' : 'Developer'}
                      />
                      <SCardMetaDetail description={contributor.bio.replace(/\s+/g, ' ')} />
                    </SCard>
                  </a>
                ))
              ) : (
                <SSpin tip="Loading..." />
              )}
            </ContributorsWrap>
          </SContainer>
        </PageSection>
      </PageContent>
    );
  }
}

export default ContributorsPage;
