import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { Container } from './style';

const propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default function FormGroup({ children, error, isLoading }) {
  return (
    <Container>
      <div className="form-item">
        {children}
        {isLoading && (
          <div className="loader">
            <Spinner size={16} />
          </div>
        )}
      </div>
      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.propTypes = propTypes;
FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};
