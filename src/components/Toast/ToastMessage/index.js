import PropTypes from 'prop-types';
import { Container } from './styles';

import xCircleItem from '../../../assets/images/icons/x-circle.svg';
import checkCircleItem from '../../../assets/images/icons/check-circle.svg';

const ICONS = {
  success: checkCircleItem,
  danger: xCircleItem,
};

const propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'default',
    'success',
    'danger',
  ]),
};

export default function ToastMessage({ text, type }) {
  return (
    <Container type={type}>
      {(type && type !== 'default') && (
        <img src={ICONS[type]} alt="icon" />
      )}
      <strong>
        {text}
      </strong>
    </Container>
  );
}

ToastMessage.propTypes = propTypes;
ToastMessage.defaultProps = {
  type: 'default',
};
