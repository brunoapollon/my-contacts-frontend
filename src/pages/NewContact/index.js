import { useCallback } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toas';

export default function NewContact() {
  const handleSubmit = useCallback(async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      await ContactService.createContact(contact);

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
  }, []);

  return (
    <>
      <PageHeader
        title="Novo Contato"
      />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
