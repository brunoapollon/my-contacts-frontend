import {
  useCallback, useEffect, useImperativeHandle, useState,
} from 'react';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import CategoryService from '../../services/CategoryService';
import isEmailValid from '../../utils/isEmailValid';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

export default function useContactForm(ref, onSubmit) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useImperativeHandle(ref, () => ({
    setFieldsValue: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },
    resetFieldsValue: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  const {
    errors,
    getErrorMessageByFieldName,
    removeError,
    setError,
  } = useErrors();

  const isValidSubmit = name && errors.length === 0;

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const categoriesList = await CategoryService.listCategories(controller.signal);
        setCategories(categoriesList);
      } catch { } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();

    return () => {
      controller.abort();
    };
  }, [setCategories, setIsLoadingCategories]);

  function onNameChange(event) {
    const { target: { value: nameChanged } } = event;
    setName(nameChanged);
    if (!nameChanged) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function onEmailChange(event) {
    const { target: { value: emailChanged } } = event;
    setEmail(emailChanged);
    if (emailChanged && !isEmailValid(emailChanged)) {
      setError({ field: 'email', message: 'digite um email válido!' });
    } else {
      removeError('email');
    }
  }

  function onPhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmitting(false);
  }, [name, email, phone, categoryId, onSubmit]);

  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    onNameChange,
    email,
    onEmailChange,
    isSubmitting,
    phone,
    onPhoneChange,
    isLoadingCategories,
    categoryId,
    categories,
    isValidSubmit,
    setCategoryId,
  };
}
