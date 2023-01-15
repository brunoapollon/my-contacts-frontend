import PropTypes from 'prop-types';
import { Container } from './style';

const propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};

export default function FormGroup({ children, error }) {
  return (
    <Container>
      {children}
      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.propTypes = propTypes;
FormGroup.defaultProps = {
  error: null,
};
