import styled from 'styled-components';
import { Card } from 'antd';

const SCard = styled(Card as any)`
  &.ant-card {
    max-width: 370px;
    width: 100%;
    min-height: 430px;
    background-color: transparent;
    margin-top: 20px;
  }

  &.ant-card-bordered {
    border: 0;
  }

  .ant-card-cover {
    width: 100%;
    height: 190px;
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

const SCardMeta = styled(Card.Meta as any)`
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

const SCardMetaDetail = styled(Card.Meta as any)`
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

const UserCard = styled(Card as any)`
  &.ant-card {
    background-color: transparent;
    max-width: 225px;
    width: 100%;
    height: 85px;
    margin: auto 0;
  }

  &.ant-card-bordered {
    border: 0;
  }

  .ant-card-body {
    padding: 0;
    position: relative;
  }
`;

const UserCardMeta = styled(Card.Meta as any)`
  .ant-card-meta-avatar {
    width: 85px;
    height: 85px;
    padding: 0;
    margin-right: 19px;

    .ant-avatar {
      width: 100%;
      height: 100%;

      &:before {
        display: inline-block;
        width: 0;
        height: 100%;
        vertical-align: middle;
        content: '';
      }
    }

    img {
      display: inline-block;
      vertical-align: middle;
      width: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .ant-card-meta-detail {
    padding-top: 5px;

    & > div:not(:last-child) {
      margin-bottom: 2px;
    }
  }

  .ant-card-meta-title {
    color: ${props => props.theme.primaryTextColor};
    font-size: 14px;
    line-height: 21px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ant-card-meta-description {
    color: ${props => props.theme.primaryTextColor};
    font-size: 12px;
    line-height: 21px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export { SCard, SCardMeta, SCardMetaDetail, UserCard, UserCardMeta };
