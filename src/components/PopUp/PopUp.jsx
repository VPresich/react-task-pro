import css from './PopUp.module.css';
import { Link } from 'react-router-dom';

const PopUp = () => {
  return (
    <div className={css.popupDiv}>
      <div className={css.popup.Content}>
        <button className={css.link}>
          <Link
            to="/auth/inprogress"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            In progress
          </Link>
        </button>
        <button className={css.link}>
          <Link
            to="/auth/done"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Done
          </Link>
        </button>
      </div>
    </div>
  );
};

export default PopUp;

// return (
//   <div className={css.formContent}>
//     <Formik>
//       <Form className={css.form}>
//         <div className={css.buttonWrapper}>
//           <Link to="/auth/inprogress" className={css.link}>
//             In progress
//           </Link>
//           <Link to="/auth/done" className={css.link}>
//             Done
//           </Link>
//         </div>
//       </Form>
//     </Formik>
//   </div>
// );
