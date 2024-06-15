import css from './AppContainer.module.css';

export default function AppContainer({ children }) {
  return <div className={css.container}>{children}</div>;
}
