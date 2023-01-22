import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import isEmailValid from '../../utils/isEmailValid';
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
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function onNameChange(event) {
    const { target: { value: nameChanged } } = event;
    setName(nameChanged);
    if (!nameChanged) {
      setErrors((prevState) => [...prevState, { field: 'name', message: 'Nome é obrigatório.' }]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'name'));
    }
  }

  function onEmailChange(event) {
    const { target: { value: emailChanged } } = event;
    setEmail(emailChanged);
    if (emailChanged && !isEmailValid(emailChanged)) {
      const errorAlreadyExists = errors.find((error) => error.field === 'email');

      if (errorAlreadyExists) return;

      setErrors((prevState) => [...prevState, { field: 'email', message: 'digite um email válido!' }]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'email'));
    }
  }

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    console.log({
      name, email, phone, category,
    });
  }, [name, email, phone, category]);

  function getErrorMessageByFieldName(fieldName) {
    const errorFound = errors.find((error) => error.field === fieldName);

    return errorFound ? errorFound.message : '';
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome"
          value={name}
          onChange={(event) => onNameChange(event)}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
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
          onChange={(event) => setPhone(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Selecione uma categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="Submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = propTypes;
