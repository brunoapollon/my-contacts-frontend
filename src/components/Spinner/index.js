import PropTypes from 'prop-types';
import { StyledSpinner } from './styles';

const propTypes = {
  size: PropTypes.number,
};

export default function Spinner({ size }) {
  return <StyledSpinner size={size} />;
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = {
  size: 32,
};
