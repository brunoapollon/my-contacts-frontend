import {
  useEffect, useRef, useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';
import Loader from '../../components/Loader';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

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
  }, [id, history, isMounted]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
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
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
