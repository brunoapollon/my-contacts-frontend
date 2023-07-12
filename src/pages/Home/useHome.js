import {
  useCallback, useEffect, useState, useTransition,
} from 'react';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isPending, setTransitions] = useTransition();

  const loadData = useCallback(async (signal) => {
    try {
      const contactsList = await ContactService.listContacts(orderBy, signal);
      setHasError(false);
      setContacts(contactsList);
      setFilteredContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    loadData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadData]);

  const handleToggleOrderBy = useCallback(() => (setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))), []);

  function handleChangeSearchTerm(value) {
    setSearchTerm(value);
    setTransitions(() => {
      setFilteredContacts(contacts.filter((contact) => (
        contact.name.toLowerCase().includes(value.toLowerCase())
      )));
    });
  }

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }, []);

  function handleCloseDeteModal() {
    setIsDeleteModalVisible(false);
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

  return {
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
    isPending,
  };
}
