import { styled } from '../styledComponents';
import { Card } from 'antd';

const SCard = styled(Card)`
  .ant-card {
    width: 800px;
    margin: 3rem auto 0;

    &:after {
      display: block;
      clear: both;
      content: '';
    }
  }

  .ant-card-cover {
    width: 360px;
    padding: 20px;
    float: left;
    margin-right: 30px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }
`;

const SCardMeta = styled(Card.Meta)`
  .ant-card-body {
    float: left;

    .ant-card-meta-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ant-card-meta-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export { SCard, SCardMeta };
