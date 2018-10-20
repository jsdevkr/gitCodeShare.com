import styled from 'styled-components';
import { Badge } from 'antd';

const InlineFlexBadge = styled(Badge as any)`
  &.ant-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    .ant-badge-count {
      display: inherit;
      justify-content: inherit;
      align-items: inherit;
      border-radius: inherit;
      border-color: inherit;
      background-color: inherit;
      box-shadow: none;
    }
  }
`;

const RoundedBadge: typeof InlineFlexBadge = styled(InlineFlexBadge as any)`
  &.ant-badge {
    border-radius: 4px;
  }
`;

const GithubBadge: typeof RoundedBadge = styled(RoundedBadge as any)`
  &.ant-badge {
    .ant-badge-count {
      width: 25px;
      height: 25px;
      font-size: 12px;
      color: ${props => props.theme.colorPalette.patternsBlue};
    }
  }
` as any;

export { GithubBadge };
