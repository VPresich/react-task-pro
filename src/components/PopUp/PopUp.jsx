import { useState } from 'react';
import clsx from 'clsx'; // uncomment this line
import css from './PopUp.module.css';
import spritePath from '../../img/sprite.svg';
import { useSelector } from 'react-redux'; // uncomment this line
import { selectTheme } from '../../redux/auth/selectors'; // uncomment this line

function PopUp() {
  const [activeColumn, setActiveColumn] = useState('In progress');
  const theme = useSelector(selectTheme); // add this line

  const handleClick = column => {
    setActiveColumn(column);
  };

  const columns = ['In progress', 'Done']; // your column names

  return (
    <div className={clsx(css.popupDiv, css[theme])}>
      {' '}
      {/* add `css[theme]` here */}
      <div className={css.columnContent}>
        <ul className={css.columnMenu}>
          {columns.map(column => (
            <li
              key={column}
              className={activeColumn === column ? css.active : ''}
            >
              <button
                className={css.columnBtn}
                onClick={() => handleClick(column)}
              >
                <p className={css.titleColumn}>{column}</p>
                <svg
                  className={clsx(css.arrow, css[theme])} // add `css[theme]` here
                  width="16"
                  height="16"
                  aria-label="btn icon"
                >
                  <use href={`${spritePath}#icon-arrow`} />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PopUp;

// import { useState } from 'react';
// // import clsx from 'clsx';
// import css from './PopUp.module.css';
// import spritePath from '../../img/sprite.svg';
// // import { useHistory } from 'react-router-dom';

// function PopUp() {
//   const [activeColumn, setActiveColumn] = useState('In progress');
//   // const history = useHistory(); // add this line

//   const handleClick = column => {
//     setActiveColumn(column);
//     // history.push(`/column/${column}`); // and use it here
//   };

//   const columns = ['In progress', 'Done']; // your column names

//   return (
//     <div className={css.popupDiv}>
//       <div className={css.columnContent}>
//         <ul className={css.columnMenu}>
//           {columns.map(column => (
//             <li
//               key={column}
//               className={activeColumn === column ? css.active : ''}
//             >
//               <button
//                 className={css.columnBtn}
//                 onClick={() => handleClick(column)}
//               >
//                 <p className={css.titleColumn}>{column}</p>
//                 <svg
//                   className={css.arrow}
//                   // className={clsx(css.color, css[theme])}
//                   width="16"
//                   height="16"
//                   aria-label="btn icon"
//                 >
//                   <use href={`${spritePath}#icon-arrow`} />
//                 </svg>
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default PopUp;
