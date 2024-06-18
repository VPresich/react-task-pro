import css from './NeedHelp.module.css';
import imgPath from '../../../img/png/cactus.png';
import spritePath from '../../../img/sprite.svg';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';
import SupportModal from '../../SupportModal/SupportModal';
import { useState } from 'react';

export default function NeedHelp() {
  const theme = useSelector(selectTheme);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleHelp = () => {
    openModal();
  };
  return (
    <div className={clsx(css.container, css[theme])}>
      <img src={imgPath} alt="cactus" />
      <p className={clsx(css.text, css[theme])}>
        If you need help with <span className={css.accent}>TaskPro</span>, check
        out our support resources or reach out to our customer support team.
      </p>

      <button className={clsx(css.btn, css[theme])} onClick={handleHelp}>
        <span className={css.span}>
          <svg
            className={clsx(css.icon, css[theme])}
            width="20"
            height="20"
            aria-label="question mark"
          >
            <use href={`${spritePath}#icon-help-circle`} />
          </svg>
        </span>
        <span className={css.span}>Need help?</span>
      </button>
      {isModalOpen && <SupportModal onClose={closeModal} />}
    </div>
  );
}
