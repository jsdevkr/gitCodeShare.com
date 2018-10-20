import { keyframes } from 'styled-components';
import { fadeIn, fadeInLeft, fadeInRight, slideInDown, slideInUp, bounceIn } from 'react-animations';

export default {
  fadeIn: keyframes`${fadeIn}`,
  fadeInLeft: keyframes`${fadeInLeft}`,
  fadeInRight: keyframes`${fadeInRight}`,
  bounceIn: keyframes`${bounceIn}`,
  slideInUp: keyframes`${slideInUp}`,
  slideInDown: keyframes`${slideInDown}`,
};
