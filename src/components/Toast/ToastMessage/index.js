import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Container } from './styles';

import xCircleItem from '../../../assets/images/icons/x-circle.svg';
import checkCircleItem from '../../../assets/images/icons/check-circle.svg';

const ICONS = {
  success: checkCircleItem,
  danger: xCircleItem,
};

const propTypes = {
  onRemoveMessage: PropTypes.func.isRequired,
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf([
      'default',
      'success',
      'danger',
    ]),
    duration: PropTypes.number,
  }).isRequired,
};

export default function ToastMessage({
  onRemoveMessage, message: {
    id, type, text, duration,
  },
}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(id);
    }, duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, onRemoveMessage, duration]);

  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  return (
    <Container
      type={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
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
ToastMessage.defaultProps = {};
