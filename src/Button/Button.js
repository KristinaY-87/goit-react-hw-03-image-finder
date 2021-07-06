import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick, text }) => (
  <button type="button" onClick={onClick} className={styles.Button}>
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;

// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: 'smooth',
// });
