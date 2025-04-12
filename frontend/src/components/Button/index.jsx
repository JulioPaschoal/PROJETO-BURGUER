import { ButtonContainer } from './styles';
import PropTypes from 'prop-types';

export function Button({ children }) {
  return <ButtonContainer>{children}</ButtonContainer>;
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};
