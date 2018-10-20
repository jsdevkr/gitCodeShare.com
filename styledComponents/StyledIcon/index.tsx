import styled from 'styled-components';

import { Spin } from 'antd';

const SSpin = styled(Spin as any)`
  &.ant-spin {
    color: #fff;
    width: 100%;

    .ant-spin-dot i {
      background-color: #fff;
    }

    .ant-spin-text {
      padding-top: 5px;
    }
  }
`;
export { SSpin };
