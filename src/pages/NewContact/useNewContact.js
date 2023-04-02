import { useRef } from 'react';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';

export default function useNewContact() {
  const contactFormRef = useRef(null);
  async function handleSubmit(contact) {
    try {
      await ContactService.createContact(contact);
      contactFormRef.current?.resetFieldsValue();
      toast({
        type: 'success',
        text: 'Contato cadastrado!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
      });
    }
  }
  return {
    contactFormRef,
    handleSubmit,
  };
}
