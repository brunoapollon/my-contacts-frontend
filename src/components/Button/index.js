import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './style';

const propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default function Button({
  children,
  isLoading = false,
  type = 'button',
  disabled = false,
  danger = false,
  onClick,
}) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading} danger={danger} onClick={onClick}>
      {!isLoading ? children : <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = propTypes;
