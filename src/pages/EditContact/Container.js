import {
  useEffect, useRef, useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import Presentation from './Presentation';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactService.getContactById(id);

        safeAsyncAction(() => {
          setContactName(contactData?.name);
          contactFormRef.current?.setFieldsValue(contactData);
          setIsLoading(false);
        });
      } catch {
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

  return (
    <Presentation
      isLoading={isLoading}
      contactName={contactName}
      contactFormRef={contactFormRef}
      onSubmit={handleSubmit}
    />
  );
}
