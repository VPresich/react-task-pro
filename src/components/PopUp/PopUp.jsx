import { useState } from 'react';
import clsx from 'clsx';
import css from './PopUp.module.css';
import spritePath from '../../../img/sprite.svg'; // correct import

function PopUp() {
  const [activeColumn, setActiveColumn] = useState('In progress');
  const theme = ''; // define your theme here

  const handleClick = column => {
    setActiveColumn(column);
  };

  const columns = ['In progress', 'Done', 'To Do']; // your column names

  return (
    <div className={css.popupDiv}>
      <div className={css.columnContent}>
        <ul className={css.columnMenu}>
          {columns.map(column => (
            <li
              key={column}
              className={activeColumn === column ? css.active : ''}
            >
              <button onClick={() => handleClick(column)}>
                <svg
                  className={css.columnName}
                  // className={clsx(css.color, css[theme])}
                  width="16"
                  height="16"
                  aria-label="btn icon"
                >
                  <use href={`${spritePath}#icon-arrow`} />
                </svg>
                <p className={css.titleColumn}>{column}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PopUp;

// import React from 'react';
// import css from './PopUp.module.css';
// import clsx from 'clsx';
// import spritePath from '../../../img/sprite.svg';
// import { PopUpStyles } from './PopUp.styled';
// import { columns } from '../../redux/store';

// const columns = ['column 1', 'column2', 'column 3'];

//  const PopUp = () => {

//   const ButtonList = () => {
//     return (
//       <div>
//         <svg
//           className={clsx(styles.color, styles[theme])}
//           width="16"
//           height="16"
//           aria-label="btn icon"
//           onClick={openModalArrow}
//         >
//           <use href={`${spritePath}#icon-arrow`} />
//         </svg>

//         {columns.map((column, index) => (
//           <button key={index} onClick={() => console.log(`Moving to ${column}`)}>
//             {column}
//           </button>
//         ))}
//       </div>
//     )

// }

// export default ButtonList;

// Для перемещения пользователя автоматически в выбранную колонку после выбора,
//   вам нужно использовать механизм маршрутизации в React.Учитывая,
//   что вы уже используете Link из react - router - dom, предполагается,
//     что у вас уже есть маршрутизация.

// Вы можете использовать history из react - router - dom для программного перехода
// к новому маршруту, когда выбрана колонка.

// Добавьте withRouter в импорт react - router - dom и оберните PopUp перед экспортом:
// import { withRouter } from 'react-router-dom';
// ...
// export default withRouter(PopUp);

// Таким образом, после выбора колонки, пользователь автоматически
// перебрасывается на страницу выбранной колонки.

// Обратите внимание, что / done и / inProgress должны быть допустимыми
// маршрутами в вашем react - router конфигурации.Вы должны заменить их на
//  соответствующие пути вашего приложения.
//==================================================
//  Card.jsx//

// import React, { useState } from 'react';
// import PopUp from './PopUp.jsx';

// const Card = ({ text }) => {
//   const [popUpVisible, setPopUpVisible] = useState(false);

//   const handleButtonClick = () => {
//     setPopUpVisible(true);
//   };

//   return (
//     <div>
//       <h2>{text}</h2>
//       <button onClick={handleButtonClick}>
//         <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
//           {/* Place your svg image here */}
//         </svg>
//       </button>
//       {popUpVisible && <PopUp closePopup={() => setPopUpVisible(false)} />}
//     </div>
//   );
// };

// export default Card;
