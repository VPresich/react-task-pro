import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTheme } from '../../redux/auth/operations';
import { selectTheme } from '../../redux/auth/selectors';
import { setTheme } from '../../redux/auth/slice';
import spritePath from '../../img/sprite.svg';
import clsx from 'clsx';
import css from './ThemeSelector.module.css';

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = event => {
    const selectedTheme = event.target.value.toLowerCase();
    dispatch(setTheme(selectedTheme));
    dispatch(updateTheme({ theme: selectedTheme }));
    setIsOpen(false);
  };

  return (
    <div className={css.header}>
      <button
        className={clsx(css.button, { [css.open]: isOpen })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={clsx(css.text, css[theme])}>Theme</span>
        <div className={clsx(css.iconContainer, css[theme])}>
          <svg className={clsx(css.icon, css[theme])} aria-label="arrow icon">
            <use href={`${spritePath}#icon-theme-arrow`} />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className={clsx(css.dropdown, css[theme])}>
          {['Dark', 'Light', 'Violet'].map(themeOption => (
            <label
              key={themeOption}
              className={clsx(css.label, {
                [css.selected]: theme === themeOption.toLowerCase(),
                [css[theme.toLowerCase()]]: true,
                [css.inactive]:
                  theme !== themeOption.toLowerCase() && theme === 'dark',
              })}
            >
              <input
                type="radio"
                value={themeOption.toLowerCase()}
                checked={theme === themeOption.toLowerCase()}
                onChange={handleThemeChange}
              />
              {themeOption}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
