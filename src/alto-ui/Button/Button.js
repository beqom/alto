import bem from '../helpers/bem';
import './Button.scss';

const modifiers = [
  'outline',
  'flat',
  'error',
  'success',
  'white',
  'large',
  'small',
  'active',
  'block',
];

const Button = bem('button', 'button', modifiers);

Button.displayName = 'Button';

export default Button;
