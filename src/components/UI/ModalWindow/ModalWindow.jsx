import styles from './ModalWindow.module.css';
import clsx from 'clsx';

const ModalWindow = ({ children, visible, setVisible }) => {
  const classStyle = clsx(styles.modal, { [styles.active]: visible });
  return (
    <div className={classStyle} onClick={() => setVisible(false)}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default ModalWindow;
