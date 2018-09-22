import { styled } from '../styledComponents';
import { Card } from 'antd';

const SCard = styled(Card)`
  &.ant-card {
    width: 370px;
    height: 430px;
    background-color: transparent;
    margin-top: 20px;
  }

  &.ant-card-bordered {
    border: 0;
  }

  .ant-card-cover {
    width: 370px;
    height: 250px;
    padding: 15px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  .ant-card-body {
    padding: 5px 15px;
  }
`;

const SCardMeta = styled(Card.Meta)`
  .ant-card-meta-title {
    color: ${props => props.theme.primaryTextColor};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ant-card-meta-description {
    color: ${props => props.theme.colorPalette.neonBlue};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }
`;

const SCardMetaDetail = styled(Card.Meta)`
  &.ant-card-meta {
    padding-top: 15px;
  }

  .ant-card-meta-description {
    color: ${props => props.theme.colorPalette.patternsBlue};
    font-size: 12px;
    line-height: 20px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    white-space: normal;
    -webkit-box-orient: vertical;
  }
`;

export { SCard, SCardMeta, SCardMetaDetail };
