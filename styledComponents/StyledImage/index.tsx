import * as React from 'react';
import styled from 'styled-components';

const SLogoImage: React.SFC<any> = () => {
  const IconSpan = styled.span`
    font-size: 50px;
    padding-bottom: 4px;
  `;

  return <IconSpan className="icon-logo-full" />;
};

export { SLogoImage };
