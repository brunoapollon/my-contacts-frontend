/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';

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

const propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

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
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

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

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    console.log({
      name, email, phone, category: categoryId,
    });
  }, [name, email, phone, categoryId]);

  return (
    <Form onSubmit={onSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={(event) => onNameChange(event)}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={(event) => onEmailChange(event)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={(event) => onPhoneChange(event)}
          maxLength="15"
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories}
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
        <Button type="Submit" disabled={!isValidSubmit}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = propTypes;
