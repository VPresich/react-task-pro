import css from './BoardNotSelected.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import clsx from 'clsx';
import Filters from '../Filters/Filters';

export default function BoardNotSelected() {
    const theme = useSelector(selectTheme);

    return (
    <div className={clsx(css.container, css[theme])}>
        <div className={css.filters}><Filters/></div>
        <div className={clsx(css.textContainer, css[theme])}>
                <p className={clsx(css.text, css[theme])}>
                Before starting your project, it is essential <span className={css.accent}>to create a
                board</span> to visualize and track all
                the necessary tasks and milestones. This board serves
                as a powerful tool to organize the workflow and ensure effective
                collaboration among team members.
                </p>
        </div>
    </div>
  )
}
