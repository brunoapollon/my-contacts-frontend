/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './styles';
import emptyBox from '../../../../assets/images/empty-box.svg';

export default function EmptyList() {
  return (
    <Container>
      <img src={emptyBox} alt="empty-box" />
      <p>
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão
        <strong>”Novo contato”</strong>
        à cima para cadastrar o seu primeiro!
      </p>
    </Container>
  );
}
