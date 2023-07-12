import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();
    async function loadContact() {
      try {
        const contactData = await ContactService.getContactById(id, controller.signal);

        safeAsyncAction(() => {
          setContactName(contactData?.name);
          contactFormRef.current?.setFieldsValue(contactData);
          setIsLoading(false);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        safeAsyncAction(() => {
          toast({
            type: 'danger',
            text: 'Contato não encontrado.',
          });
          history.push('/');
        });
      }
    }
    loadContact();

    return () => {
      controller.abort();
    };
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const contactEdited = await ContactService.updateContact(id, contact);
      setContactName(contactEdited?.name);
      contactFormRef.current?.setFieldsValue(contactEdited);
      toast({
        type: 'success',
        text: 'Contato atualizado!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao atualizar o contato!',
      });
    }
  }
  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
