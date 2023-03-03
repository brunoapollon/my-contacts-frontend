import { useCallback } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactService from '../../services/ContactService';

export default function NewContact() {
  const handleSubmit = useCallback(async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      const response = await ContactService.createContact(contact);
      console.log(response);
    } catch {
      alert('ocorreu um erro!');
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
