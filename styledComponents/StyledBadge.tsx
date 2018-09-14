import styled from 'styled-components';
import { Badge } from 'antd';

const InlineFlexBadge = styled(Badge as any)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const GithubBadge: typeof InlineFlexBadge = styled(InlineFlexBadge as any)`
  &.ant-badge {
    padding: 3px 10px;
    border: 1px solid rgba(27, 31, 35, 0.2);
    border-left: 0;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;

    .ant-badge-count {
      display: inherit;
      justify-content: inherit;
      align-items: inherit;
      padding: 0;
      height: 18px;
      box-shadow: none;
      background-color: #fff;
      font-size: 12px;
      font-weight: 600;
      color: #24292e;
    }
  }
` as any;

export { GithubBadge };
