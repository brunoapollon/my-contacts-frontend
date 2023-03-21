import { useCallback, useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toas';
import ToastMessage from '../ToastMessage';
import { Container } from './style';

const propTypes = {};

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevMessages) => [...prevMessages, {
        id: Math.random(),
        type,
        text,
        duration,
      }]);
    }
    toastEventManager.on('addtoast', handleAddToast);

    return () => toastEventManager.removeListener('addtost', handleAddToast);
  }, []);

  const handleRemoveMessage = useCallback(
    (id) => {
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    },
    [],
  );

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
