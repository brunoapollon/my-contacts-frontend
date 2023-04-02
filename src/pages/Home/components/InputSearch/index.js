import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        value={value}
        type="text"
        placeholder="Pesquisar nome..."
        onChange={(event) => onChange(event.target.value)}
      />
    </Container>
  );
}

InputSearch.propTypes = propTypes;
