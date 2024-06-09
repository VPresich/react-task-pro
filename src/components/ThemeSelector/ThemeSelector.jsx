import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import { setTheme } from '../../redux/auth/slice';
import css from "./ThemeSelector.module.css";

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    dispatch(setTheme(selectedTheme));
    localStorage.setItem('theme', selectedTheme);
  };

  return (
    <header className={css.header}>
      <div>
        <span>Theme</span>
        <button className={css.button} onClick={() => setIsOpen(!isOpen)}>Select Theme</button>
        {isOpen && (
          <div className={css.dropdown}>
            <label className={`${css.label} ${theme === 'Dark' ? css.selected : ''}`}>
              <input
                type="radio"
                value="Dark"
                checked={theme === 'Dark'}
                onChange={handleThemeChange}
              />
              Dark
            </label>
            <label className={`${css.label} ${theme === 'Light' ? css.selected : ''}`}>
              <input
                type="radio"
                value="Light"
                checked={theme === 'Light'}
                onChange={handleThemeChange}
              />
              Light
            </label>
            <label className={`${css.label} ${theme === 'Violet' ? css.selected : ''}`}>
              <input
                type="radio"
                value="Violet"
                checked={theme === 'Violet'}
                onChange={handleThemeChange}
              />
              Violet
            </label>
          </div>
        )}
      </div>
    </header>
  );
};

export default ThemeSelector;
