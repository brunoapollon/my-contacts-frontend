import ToastMessage from '../ToastMessage';
import { Container } from './style';

const propTypes = {};

export default function ToastContainer() {
  return (
    <Container>
      <ToastMessage text="Default Toast" />
      <ToastMessage text="Error toast" type="danger" />
      <ToastMessage text="Success toast" type="success" />
    </Container>
  );
}

ToastContainer.propTypes = propTypes;
