import { Toaster } from 'react-hot-toast';
import css from './AppContainer.module.css';

export default function AppContainer({ children }) {
  return (
    <div className={css.container}>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
