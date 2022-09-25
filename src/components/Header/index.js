import { Container, InputSearchContaier } from './styles';

import logo from '../../assets/images/logo.svg';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="MyContacts" width="201" />
      <InputSearchContaier>
        <input type="text" placeholder="Pesquisar nome..." />
      </InputSearchContaier>
    </Container>
  );
}
