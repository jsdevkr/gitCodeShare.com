import { keyframes } from 'styled-components';
import { fadeIn, fadeInLeft, fadeInRight, slideInDown, slideInUp } from 'react-animations';

export default {
  fadeIn: keyframes`${fadeIn}`,
  fadeInLeft: keyframes`${fadeInLeft}`,
  fadeInRight: keyframes`${fadeInRight}`,
  slideInUp: keyframes`${slideInUp}`,
  slideInDown: keyframes`${slideInDown}`,
};
