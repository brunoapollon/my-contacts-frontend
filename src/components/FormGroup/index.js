import PropTypes from 'prop-types';
import { Container } from './style';

const propTypes = {
  children: PropTypes.node.isRequired,
};

export default function FormGroup({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

FormGroup.propTypes = propTypes;
