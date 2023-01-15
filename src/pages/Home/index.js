import { Link } from 'react-router-dom';
import {
  Container, Header, ListContainer, Card, InputSearchContaier,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  return (
    <Container>
      <InputSearchContaier>
        <input type="text" placeholder="Pesquisar nome..." />
      </InputSearchContaier>
      <Header>
        <strong>3 Contatos</strong>
        <Link to="/new">Novo contato</Link>
      </Header>
      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </header>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Bruno Lopes</strong>
              <small>instagram</small>
            </div>
            <span>eusoubruno7@gmail.com</span>
            <span>(41 99999-9999)</span>
          </div>
          <div className="actions">
            <Link to="/edit/1">
              <img src={edit} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="trash" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
