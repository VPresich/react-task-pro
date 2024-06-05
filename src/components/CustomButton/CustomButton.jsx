import styles from './CustomButton.module.css';

export default function CustomButton({ children, ...props }) {
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  );
}
