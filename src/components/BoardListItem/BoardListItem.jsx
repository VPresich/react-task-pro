import css from './BoardListItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import spritePath from '../../img/sprite.svg';
import clsx from 'clsx';
import { deleteBoard } from '../../redux/boards/operations';
import { errNotify, successNotify } from '../../notification/notification';
import { ERR_BOARD_DELETE, SUCCESS_BOARD_DELETE } from '../../notification/constants';
import { useState } from 'react';
import EditBoardModal from '../EditBoardModal/EditBoardModal';


const BoardListItem = ({ board, isActive, setActiveBoard }) => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    // const theme = 'violet'
    const { _id, title, icon } = board;
    
     const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const handleDelete = (id) => {
        dispatch(deleteBoard(id))
            .unwrap()
            .then(() => {
                successNotify(SUCCESS_BOARD_DELETE);
            })
            .catch(err => {
                errNotify(ERR_BOARD_DELETE + err.message);
            });
    }

    const handleEdit = (id) => {
        console.log('edit board', id)
        openModal();
    }
    return (
        <div className={isActive ? clsx(css.container, css[theme], css.active) : clsx(css.container, css[theme])} onClick={() => setActiveBoard(_id)}>
        <div className={css.titleContainer}>
            <svg
                className={isActive ? clsx(css.icon, css[theme], css.active) : clsx(css.icon, css[theme])}
                width="18"
                height="18"
                aria-label="btn icon"
            >
            <use href={`${spritePath}#${icon}`} />
            </svg>
            <p className={isActive ? clsx(css.title, css[theme], css.active) : clsx(css.title, css[theme])}>{title}</p>
        </div>
        
        <div className={isActive ? clsx(css.controls, css[theme], css.active) : clsx(css.controls, css[theme])}>
                <button
                    className={css.btn}
                    onClick={() => handleEdit(_id)}
                >
            <svg
                className={clsx(css.icon, css[theme])}
                width="16"
                height="16"
                aria-label="btn icon"
            >
                <use href={`${spritePath}#icon-pencil`} />
            </svg>
            </button>
                <button
                    className={css.btn}
                    onClick={() => handleDelete(_id)}
                >
            <svg
                className={clsx(css.icon, css[theme])}
                width="16"
                height="16"
                aria-label="btn icon"
            >
                <use href={`${spritePath}#icon-trash`} />
            </svg>
            </button>
        </div>
        <div className={isActive ? clsx(css.border, css[theme], css.active) : clsx(css.border, css[theme])}></div>
        {isModalOpen && (
            <EditBoardModal board={board} onClose={ closeModal } />
        )}
        </div>
    );
};

export default BoardListItem;