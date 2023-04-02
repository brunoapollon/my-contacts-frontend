import { Container } from './styles';

import Loader from '../../components/Loader';
import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

export default function Home() {
  const {
    isLoading,
    contactBeingDeleted,
    isDeleteModalVisible,
    handleCloseDeteModal,
    handleConfirmDeleteContact,
    isLoadingDelete,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isEmpryList = !hasError && (!hasContacts && !isLoading);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {hasContacts && <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />}

      <Header
        hasError={hasError}
        quantityOfContacts={contacts.length}
        quantityOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isEmpryList && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
      <>
        <ContactsList
          filteredContacts={filteredContacts}
          isLoadingDelete={isLoadingDelete}
          onToggleOrderBy={handleToggleOrderBy}
          orderBy={orderBy}
          onDeleteContact={handleDeleteContact}
        />
        <Modal
          danger
          title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
          confirmLabel="Deletar"
          isVisible={isDeleteModalVisible}
          onCancel={handleCloseDeteModal}
          onConfirm={handleConfirmDeleteContact}
          isLoading={isLoadingDelete}
        >
          <p>Está ação não poderá ser desfeita!</p>
        </Modal>
      </>
      )}
    </Container>
  );
}
