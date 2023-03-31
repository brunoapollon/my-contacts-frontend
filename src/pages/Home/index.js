/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContaier,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => (
    contacts.filter((contact) => (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  ), [contacts, searchTerm]);

  const loadData = useCallback(async () => {
    try {
      const contactsList = await ContactService.listContacts(orderBy);
      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    setIsLoading(true);
    loadData();
  }, [loadData]);

  const handleToggleOrderBy = useCallback(() => (setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))), []);

  const handleChangeSearchTerm = useCallback((value) => (setSearchTerm(value)), []);

  function handleDeleteContact(contact) {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }

  function handleCloseDeteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactService.deleteContact(contactBeingDeleted?.id);
      toast({
        type: 'success',
        text: 'Contato deletado com sucesso.',
      });
      setContacts((preContacts) => preContacts.filter(
        (contact) => contact.id !== contactBeingDeleted?.id,
      ));
      handleCloseDeteModal();
    } catch {
      toast({
        type: 'error',
        text: 'Erro ao deletar o contato.',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  const handleTryAgain = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return (
    <Container>
      <Loader isLoading={isLoading} />
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
      {contacts.length > 0 && (
        <InputSearchContaier>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar nome..."
            onChange={(event) => handleChangeSearchTerm(event.target.value)}
          />
        </InputSearchContaier>
      )}
      <Header
        justifyContent={(hasError ? 'flex-end' : (contacts.length > 0 ? 'space-between' : 'center'))}
      >
        {(!hasError && contacts.length > 0) && (
        <strong>
          {filteredContacts.length}
          {' '}
          {filteredContacts.length === 1 ? 'Contato' : 'Contatos'}
        </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>
      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novament
            </Button>
          </div>
        </ErrorContainer>
      )}
      {!hasError && (
      <>
        {(filteredContacts.length < 1 && !isLoading) && (
          <EmptyListContainer>
            <img src={emptyBox} alt="empty-box" />
            <p>Você ainda não tem nenhum contato cadastrado!
              Clique no botão <strong>”Novo contato”</strong> à cima para cadastrar o seu primeiro!
            </p>
          </EmptyListContainer>
        )}

        {(contacts.length > 0 && filteredContacts.length < 1) && (
          <SearchNotFoundContainer>
            <img src={magnifierQuestion} alt="magnifier-question" />
            <span>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.</span>
          </SearchNotFoundContainer>
        )}

        {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </ListHeader>
        )}
        {filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && (
                <small>{contact.category_name}</small>
                )}
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>
            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="edit" />
              </Link>
              <button
                type="button"
                onClick={() => handleDeleteContact(contact)}
              >
                <img src={trash} alt="trash" />
              </button>
            </div>
          </Card>
        ))}

      </>
      )}
    </Container>
  );
}
