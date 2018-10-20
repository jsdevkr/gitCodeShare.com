import * as React from 'react';
import styled from 'styled-components';

// const Logo: React.SFC<any> = () => <span className="icon-logo-full" style={{ fontSize: '50px' }} />;

const SLogoImage: React.SFC<any> = () => {
  const IconSpan = styled.span`
    font-size: 50px;
  `;

  return <IconSpan className="icon-logo-full" />;
};

export { SLogoImage };
