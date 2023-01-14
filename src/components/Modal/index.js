import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Container, Footer, Overlay } from './styles';
import Button from '../Button';

const propTypes = {
  danger: PropTypes.bool,
};

export default function Modal({ danger }) {
  return ReactDOM.createPortal(
  <Overlay>
    <Container danger={danger}>
      <h1>Titulo do Modal</h1>
      <p>
        Corpo do modal
      </p>
      <Footer>
        <button className="cancel-button" type="button">
          Cancelar
        </button>
        <Button type="button" danger={danger}>
          Deletar
        </Button>
      </Footer>
    </Container>
  </Overlay>,
  document.getElementById('modal-root'),
  );
}

Modal.propTypes = propTypes;
Modal.defaultProps = {
  danger: false,
};
