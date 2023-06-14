import PropTypes from 'prop-types';

import { Overlay } from './styles';
import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default function Loader({ isLoading }) {
  const { shouldRender, animetedElementRef } = useAnimatedUnmount(isLoading);

  if (!shouldRender) return null;

  let container = document.getElementById('loader-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loader-root');
    document.body.appendChild(container);
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay isLeaving={!isLoading} ref={animetedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = propTypes;
