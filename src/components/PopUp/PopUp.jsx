import React from 'react';
import { Formik, Form, Field } from 'formik';

const PopUp = ({ closePopup, history }) => {
  const handleSelectChange = event => {
    console.log(event.currentTarget.value);
    const selectedColumn = event.currentTarget.value;
    if (selectedColumn === 'inProgress') {
      history.push('/inProgress');
    } else if (selectedColumn === 'done') {
      history.push('/done');
    }
    closePopup();
  };

  return (
    <div>
      <Formik
        initialValues={{
          column: '',
        }}
      >
        <Form>
          <Field as="select" name="column" onChange={handleSelectChange}>
            <option value="">--Select the column--</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </Field>
        </Form>
      </Formik>
    </div>
  );
};

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
