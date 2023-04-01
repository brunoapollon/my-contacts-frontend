import PropTypes from 'prop-types';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

import Loader from '../../components/Loader';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  contactName: PropTypes.string.isRequired,
  contactFormRef: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function Presentation({
  isLoading,
  contactName,
  contactFormRef,
  onSubmit,
}) {
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={onSubmit}
      />
    </>
  );
}

Presentation.propTypes = propTypes;
