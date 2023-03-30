import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toas';
import Loader from '../../components/Loader';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactService.getContactById(id);
        contactFormRef.current?.setFieldsValue(contactData);
        setIsLoading(false);
      } catch {
        toast({
          type: 'danger',
          text: 'Contato não encontrado.',
        });
        history.push('/');
      }
    }
    loadContact();
  }, [id, history]);

  const handleSubmit = useCallback(
    async () => {

    },
    [],
  );

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title="Editar Bruno Lopes"
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
