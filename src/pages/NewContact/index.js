import { useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';

export default function NewContact() {
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
  return (
    <>
      <PageHeader
        title="Novo Contato"
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
