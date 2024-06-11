import { useDispatch, useSelector } from 'react-redux';
import { setActiveColumn } from '../../redux/auth/operations';
import { selectActiveColumnId, selectItems } from '../../redux/auth/selectors';
import { Formik, Form } from 'formik';
import css from './PopUpForm.module.css';
import { Link } from 'react-router-dom';

const PopUp = () => {
  const activeColumnState = useSelector(selectActiveColumnId);
  const columns = useSelector(selectItems);

  const dispatch = useDispatch();

  const handleActiveColumn = id => {
    dispatch(setActiveColumn(id));
  };

  return (
    <div className={css.formContent}>
      <Formik>
        <Form className={css.form}>
          <div className={css.buttonWrapper}>
            <Link to="/auth/inprogress" className={css.link}>
              In progress
            </Link>
            <Link to="/auth/done" className={css.link}>
              Done
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export const selectActiveColumnId = state => state.activeColumnId;
export const selectItems = state => state.items;

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
