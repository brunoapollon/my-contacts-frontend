import { Link } from "react-router-dom";
import { Container } from "./styles";
import arrow from '../../assets/images/icons/arrow.svg'
import PropTypes from 'prop-types';

export default function PageHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <img src={arrow} alt="back" />
        <span>voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  )
}
PageHeader.propTypes = {
  title: PropTypes.string.isRequired
}