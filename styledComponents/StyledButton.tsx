import styled from 'styled-components';
import { Button } from 'antd';

const RoundedButton: typeof Button = styled(Button as any)`
  &.ant-btn {
    border-radius: 30px;
  }
` as any;

export { RoundedButton };
