import ToastMessage from '../ToastMessage';
import { Container } from './style';
import useToastContainer from './useToastContainer';

const propTypes = {};

export default function ToastContainer() {
  const { messages, handleRemoveMessage } = useToastContainer();

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}

ToastContainer.propTypes = propTypes;
