/* eslint-disable react/jsx-one-expression-per-line */

import PropTypes from 'prop-types';
import { Container } from './styles';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

const propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="magnifier-question" />
      <span>
        Nenhum resultado foi encontrado para
        {' '}
        <strong>{searchTerm}</strong>
        .
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = propTypes;
