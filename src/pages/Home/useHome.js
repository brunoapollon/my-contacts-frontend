import {
  useCallback, useEffect, useMemo, useState,
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
      setContacts([]);
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
  };
}
