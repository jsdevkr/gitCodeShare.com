import styled from 'styled-components';
import { Button } from 'antd';

const InlineFlexButton = styled(Button as any)`
  &.ant-btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    background-color: transparent;
    color: ${props => props.theme.primaryTextColor};

    &:hover,
    &:focus,
    &:active {
      background-color: transparent;
    }

    i {
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
    }
  }
`;

const RoundedButton: typeof InlineFlexButton = styled(InlineFlexButton as any)`
  &.ant-btn {
    border-radius: 4px;
  }
` as any;

const BorderlessButton: typeof InlineFlexButton = styled(InlineFlexButton as any)`
  &.ant-btn {
    border: none;
  }
` as any;

const GithubButton: typeof RoundedButton = styled(RoundedButton as any)`
  &.ant-btn {
    padding: 0 5px;
    margin-right: 5px;
    border: 1px solid;
    height: 25px;

    i {
      font-size: 17px;
      color: ${props => props.theme.primaryTextColor};
    }

    span {
      font-size: 12px;
      color: ${props => props.theme.colorPalette.patternsBlue};
    }
  }
` as any;

const SmDownloadButton: typeof BorderlessButton = styled(BorderlessButton as any)`
  &.ant-btn {
    i {
      font-size: 17px;
    }

    span {
      font-size: 12px;
    }
  }
`;

const DownloadButton: typeof RoundedButton = styled(RoundedButton as any)`
  &.ant-btn {
    max-width: 340px;
    width: 100%;
    height: 50px;
    background-color: ${props => props.theme.colorPalette.neonBlue};
    border: none;
    box-shadow: 0 2px 4px 0 ${props => props.theme.colorPalette.blueCharcoal};

    &:hover,
    &:focus,
    &:active {
      background-color: ${props => props.theme.colorPalette.neonBlue};
    }

    span {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;
const SignUpButton: typeof RoundedButton = styled(RoundedButton as any)`
  &.ant-btn {
    max-width: 350px;
    width: 100%;
    height: 50px;
    background-color: ${props => props.theme.colorPalette.neonBlue};
    box-shadow: 0 2px 4px 0 #222b33;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background-color: ${props => props.theme.colorPalette.neonBlue};
    }

    i {
      & + span {
        margin-left: 10px;
      }
    }
    span {
      font-family: IBMPlexSans;
      font-size: 16px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
    }
  }
`;
const LineButton: typeof RoundedButton = styled(RoundedButton as any)`
  &.ant-btn {
    max-width: 200px;
    width: fit-content;
    padding: 11px 25px;
    height: 40px;
    background-color: ${props => props.theme.primaryColor};
    border-color: ${props => props.theme.colorPalette.neonBlue};
    margin-left: 15px;

    &:hover {
      background-color: ${props => props.theme.colorPalette.neonBlue};
    }
    &:first-child {
      margin-left: auto;
    }

    span {
      font-size: 14px;
    }
  }
`;

const DropDownButton: typeof RoundedButton = styled(RoundedButton as any)`
  &.ant-btn {
    min-width: 150px;
    height: 30px;
    border: solid 1px #dbe3e9;
    justify-content: space-between;
    padding: 6px 10px;
    transition: none;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export {
  RoundedButton,
  GithubButton,
  BorderlessButton,
  DownloadButton,
  SmDownloadButton,
  LineButton,
  DropDownButton,
  SignUpButton,
};
