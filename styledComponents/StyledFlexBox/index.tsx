import styled from 'styled-components';

// flex guide
// https://medium.freecodecamp.org/the-complete-illustrated-flexbox-tutorial-d35c085dbf35
export type FBDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse' | 'inherit';
export type FBJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'stretch'
  | 'space-evenly'
  | 'inherit';
export type FBAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | 'inherit';
export type FBWrap = 'nowrap' | 'wrap' | 'wrap-reverse' | 'inherit';

export interface IFlexBoxProps {
  direction?: FBDirection;
  justify?: FBJustify;
  align?: FBAlign;
  wrap?: FBWrap;
  width?: string;
  height?: string;
  styled?: string;
}

export function StyledFlexBox(props: IFlexBoxProps) {
  const {
    direction = 'column',
    justify = 'flex-start',
    align = 'flex-start',
    wrap = 'nowrap',
    width = 'auto',
    height = 'auto',
    styled: styledString = '',
  } = props;
  return `
    position: relative;
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
    flex-wrap: ${wrap};
    min-width: ${width};
    width: ${width};
    min-height: ${height};
    height: ${height};
    ${styledString};
  `;
}

export const FlexRightBox = styled.div`
  margin-left: auto;
  display: inherit;
  align-items: center;
`;

export default StyledFlexBox;
