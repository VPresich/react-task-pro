import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import css from './ModalWindow.module.css';
import clsx from 'clsx';

const ModalWindow = ({ children, visible, setVisible }) => {
  const classStyle = clsx(css.modal, { [css.active]: visible });

  const theme = useSelector(selectTheme);

  return (
    <div className={classStyle} onClick={() => setVisible(false)}>
      <div className={clsx(css.modalContent, css[theme])} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default ModalWindow;
