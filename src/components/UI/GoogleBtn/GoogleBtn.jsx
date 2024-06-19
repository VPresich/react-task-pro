import css from './GoogleBtn.module.css';
import googleIcon from '../../../img/google/google-icon.svg'
import { BaseURL } from '../../../api/axiosInst';

export default function GoogleBtn() {
  return (
   <a
        href={`${BaseURL}/users/google`}
        className={css.btn}
        >
        <span>
              <img src={googleIcon} alt="google icon" className={css.icon} />
        </span>
        <span className={css.text}>Log In with google</span>
          
    </a>
  )
}