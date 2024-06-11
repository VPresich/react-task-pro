import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import spritePath from '../../img/sprite.svg';
import { selectTheme } from '../../redux/auth/selectors';
import Button from '../UI/Button/Button';
import css from './ColumnItem.module.css';
import { deleteColumnById } from '../../redux/columns/operations';
import { errNotify, successNotify } from '../../notification/notification';
import { ERR_DELETE, SUCCESS_DELETE } from '../../notification/constants';
import Card from '../UI/Card/Card';
import { useState } from 'react';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import ColumnModal from '../ColumnModal/ColumnModal';

const ColumnItem = ({ column, isActive, setActiveColumn }) => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const { _id, title } = column;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = id => {
    dispatch(deleteColumnById(id))
      .unwrap()
      .then(() => {
        successNotify(SUCCESS_DELETE);
      })
      .catch(err => {
        errNotify(ERR_DELETE + err.message);
      });
  };

  const handleUpdate = () => {
    openModal();
  };

  return (
    <div className={css.container}>
      <div
        className={clsx(css.colTitle, css[theme])}
        onClick={() => setActiveColumn(_id)}
      >
        <p>{title}</p>
        <div className={css.iconsWrap}>
          <button className={css.btn} onClick={() => handleUpdate()}>
            <svg
              className={
                isActive
                  ? clsx(css.icon, css[theme], css.active)
                  : clsx(css.icon, css[theme])
              }
              width="16"
              height="16"
              aria-label="btn icon"
            >
              <use href={`${spritePath}#icon-pencil`} />
            </svg>
          </button>
          <button className={css.btn} onClick={() => handleDelete(_id)}>
            <svg
              className={
                isActive
                  ? clsx(css.icon, css[theme], css.active)
                  : clsx(css.icon, css[theme])
              }
              width="16"
              height="16"
              aria-label="btn icon"
            >
              <use href={`${spritePath}#icon-trash`} />
            </svg>
          </button>
        </div>
      </div>
      <div className={clsx(css.listContainer, css[theme])}>
        {/* <ul className={css.list}>
          {tasks.map(task => (
            <li className={css.item} key={task.id}>
              <Card key={task.id} item={task} />
            </li>
          ))}
        </ul> */}

        <ul className={css.list}>
          <li className={css.item}>
            <Card
              title="test 1"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime optio, 
explicabo maiores enim odio ab cupiditate sit consequuntur, dolore quas voluptatibus sed iusto necessitatibus 
at reprehenderit veniam magni aliquam cumque"
              priority="low"
              deadline="08.06.2024"
            />
          </li>
          <li className={css.item}>
            <Card
              title="test 1"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime optio, 
explicabo maiores enim odio ab cupiditate sit consequuntur, dolore quas voluptatibus sed iusto necessitatibus 
at reprehenderit veniam magni aliquam cumque"
              priority="low"
              deadline="08.06.2024"
            />
          </li>
          <li className={css.item}>
            <Card
              title="test 1"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime optio, 
explicabo maiores enim odio ab cupiditate sit consequuntur, dolore quas voluptatibus sed iusto necessitatibus 
at reprehenderit veniam magni aliquam cumque"
              priority="low"
              deadline="08.06.2024"
            />
          </li>
          <li className={css.item}>
            <Card
              title="test 1"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime optio, 
explicabo maiores enim odio ab cupiditate sit consequuntur, dolore quas voluptatibus sed iusto necessitatibus 
at reprehenderit veniam magni aliquam cumque"
              priority="low"
              deadline="08.06.2024"
            />
          </li>
        </ul>
      </div>
      <div className={css.btnWrap}>
        <Button
          icon="icon-plus"
          text="Add another card"
          type="submit"
          big={true}
          // onClick={openModal}
        />
      </div>
      {isModalOpen && (
        <ModalWrapper onClose={closeModal}>
          <ColumnModal modalType={'edit'} onClose={closeModal} />
        </ModalWrapper>
      )}
    </div>
  );
};
export default ColumnItem;
