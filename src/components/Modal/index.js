import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Container, Footer, Overlay } from './styles';
import Button from '../Button';
import ReactPortal from '../ReactPortal';

const propTypes = {
  danger: PropTypes.bool,
  isLoading: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default function Modal({
  danger,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  isVisible,
  isLoading,
}) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const overlayRef = useRef(null);

  useEffect(() => {
    function handleAnimationEnd() {
      setShouldRender(false);
    }
    const overlayElement = overlayRef.current;

    if (isVisible) setShouldRender(true);

    if (!isVisible && overlayElement) {
      overlayElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (overlayElement) {
        overlayElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [isVisible]);

  if (!shouldRender) return null;

  let container = document.getElementById('modal-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'modal-root');
    document.body.appendChild(container);
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!isVisible} ref={overlayRef}>
        <Container danger={danger} isLeaving={!isVisible}>
          <h1>{title}</h1>
          <div className="modal-body">
            {children}
          </div>
          <Footer>
            <button className="cancel-button" type="button" onClick={onCancel} disabled={isLoading}>
              {cancelLabel}
            </button>
            <Button type="button" danger={danger} onClick={onConfirm} isLoading={isLoading}>
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = propTypes;
Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
