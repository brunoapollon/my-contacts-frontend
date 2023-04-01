import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const propTypes = {
  containerId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function ReactPortal({ containerId, children }) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}

ReactPortal.propTypes = propTypes;
