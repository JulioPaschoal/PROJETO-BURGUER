import { ButtonContainer } from './styles';
import PropTypes from 'prop-types';

export function Button({ children, ...props }) {
  return <ButtonContainer {...props}>{children}</ButtonContainer>;
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};
