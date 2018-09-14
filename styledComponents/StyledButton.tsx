import styled from 'styled-components';
import { Button } from 'antd';

const InlineFlexButton = styled(Button as any)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
`;

const RoundedButton: typeof InlineFlexButton = styled(InlineFlexButton as any)`
  &.ant-btn {
    border-radius: 30px;
  }
` as any;

const BorderlessButton: typeof InlineFlexButton = styled(InlineFlexButton as any)`
  &.ant-btn {
    border: none;
  }
` as any;

const GithubButton: typeof InlineFlexButton = styled(InlineFlexButton as any)`
  &.ant-btn {
    padding: 3px 10px;
    border: 1px solid rgba(27, 31, 35, 0.2);
    border-top-left-radius: 0.25em;
    border-bottom-left-radius: 0.25em;
    line-height: 1.5;
    height: auto;
    color: #24292e;
    background-color: #eff3f6;
    background-image: linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%);
    background-repeat: repeat-x;
    background-position: -1px -1px;
    background-size: 110% 110%;
    user-select: none;
    font-size: 12px;
  }
` as any;

export { RoundedButton, GithubButton, BorderlessButton };
