import css from './Loader.module.css';
import { Triangle } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className={css.container}>
      <Triangle
        visible={true}
        height="100"
        width="100"
        color="var(--green)"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    </div>
  )
}
