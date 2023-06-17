import { useEffect } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './style';
import { toastEventManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

const propTypes = {};

export default function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem,
    renderList,
  } = useAnimatedList();

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
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}

ToastContainer.propTypes = propTypes;
