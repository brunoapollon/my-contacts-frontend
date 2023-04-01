/* eslint-disable no-console */
import {
  forwardRef, useCallback, useEffect, useState, useImperativeHandle,
} from 'react';

import PropTypes from 'prop-types';
import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isEmailValid';
import CategoryService from '../../services/CategoryService';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

const propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
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
    async function loadCategories() {
      try {
        const categoriesList = await CategoryService.listCategories();
        setCategories(categoriesList);
      } catch { } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
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

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={(event) => onNameChange(event)}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={(event) => onEmailChange(event)}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={(event) => onPhoneChange(event)}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="Submit" disabled={!isValidSubmit} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = propTypes;

export default ContactForm;
