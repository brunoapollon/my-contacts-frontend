import PropTypes from 'prop-types';
import { StyledSpinner } from './styles';

const propTypes = {
  size: PropTypes.number,
};

export default function Spinner({ size = 32 }) {
  return <StyledSpinner size={size} />;
}

Spinner.propTypes = propTypes;
