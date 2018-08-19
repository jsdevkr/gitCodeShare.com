import styled, { StyledFunction } from 'styled-components';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

const StyledButton: StyledFunction<ButtonProps> = styled(Button as any);

const RoundedButton = StyledButton`
  border-radius: 30px;
`;

export { RoundedButton };
