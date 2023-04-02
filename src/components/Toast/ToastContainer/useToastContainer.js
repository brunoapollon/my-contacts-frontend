import { useCallback, useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';

export default function useToastContainer() {
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
  return {
    messages,
    handleRemoveMessage,
  };
}
