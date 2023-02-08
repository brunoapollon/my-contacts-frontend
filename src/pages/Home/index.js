import { Link } from 'react-router-dom';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Container, Header, ListHeader, Card, InputSearchContaier,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

import Loader from '../../components/Loader';
import ContactService from '../../services/ContactService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => (
    contacts.filter((contact) => (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  ), [contacts, searchTerm]);

  useEffect(() => {
    setIsLoading(true);
    async function loadData() {
      try {
        const contactsList = await ContactService.listContacts(orderBy);
        setContacts(contactsList);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [orderBy]);

  const handleToggleOrderBy = useCallback(() => (setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))), []);

  const handleChangeSearchTerm = useCallback((value) => (setSearchTerm(value)), []);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContaier>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquisar nome..."
          onChange={(event) => handleChangeSearchTerm(event.target.value)}
        />
      </InputSearchContaier>
      <Header>
        <strong>
          {filteredContacts.length}
          {' '}
          {filteredContacts.length === 1 ? 'Contato' : 'Contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>
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
            <button type="button">
              <img src={trash} alt="trash" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
