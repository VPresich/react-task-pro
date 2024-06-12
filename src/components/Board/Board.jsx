import { useEffect, useState } from 'react';
import css from './Board.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors.js';
import clsx from 'clsx';
import { selectActiveBoard } from '../../redux/boards/selectors';
import Filters from '../Filters/Filters.jsx';
import imgsURL from '../../img/listUrls.js';

function getDeviceType() {
  if (window.innerWidth >= 1024) {
    return 'desktop';
  } else if (window.innerWidth >= 768) {
    return 'tablet';
  } else {
    return 'mobile';
  }
}

function getResolution() {
  return window.devicePixelRatio > 1 ? '2x' : '1x';
}

function getBackgroundImage(theme, imgsURL) {
  const deviceType = getDeviceType();
  const resolution = getResolution();
 
  const themeData = imgsURL.find((img) => img._id === theme);
  
  if (!themeData) return '';

  const key = `imgUrl_${deviceType}_${resolution}`;
  return themeData[key] || '';
}

export default function Board({id}) {
  const theme = useSelector(selectTheme);
  const activeBoard = useSelector(selectActiveBoard);
  const background = activeBoard ? activeBoard.background : '';
  const [backgroundImage, setBackgroundImage] = useState(getBackgroundImage(background, imgsURL));

  useEffect(() => {
    const handleResize = () => {
      setBackgroundImage(getBackgroundImage(background, imgsURL));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [background]); // Include theme in the dependencies

  useEffect(() => {
    setBackgroundImage(getBackgroundImage(background, imgsURL));
  }, [background, activeBoard]); // Include theme and activeBoard in the dependencies

  console.log(id, "in board")
  return (
    <div
      className={css.boardContainer}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={css.top}>
        <p className={clsx(css.title, css[theme])}>Project office</p>
        <Filters />
      </div>
      <div className={css.contents}>
        <p>Board here</p>
      </div>
    </div>
  );
}
