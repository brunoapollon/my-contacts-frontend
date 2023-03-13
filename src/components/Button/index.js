import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './style';

const propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export default function Button({
  children, isLoading, type, disabled,
}) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading}>
      {!isLoading ? children : <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = {
  isLoading: false,
  type: 'button',
  disabled: false,
};
