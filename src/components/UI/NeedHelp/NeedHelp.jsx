import css from './NeedHelp.module.css'
import imgPath from "../../../img/png/cactus.png"
import spritePath from "../../../img/sprite.svg";

export default function NeedHelp() {
  const handleHelp = () => {
    console.log('need help modal');
    //open support modal
  }
  return (
    <div className={css.container}>
      <img src={imgPath} alt="cactus" />
      <p className={css.text}>If you need help with <span className={css.accent}>TaskPro</span>, check out our support resources or reach out to our customer support team.</p>
      
      <button
        className={css.btn}
        onClick={handleHelp}
      >
        <span className={css.span}>
          <svg
                className={css.icon}
                width="20"
                height="20"
                aria-label="question mark"
              >
                <use href={`${spritePath}#icon-help-circle`} />
          </svg>
        </span>
        <span className={css.span}>Need help?</span> 
      </button>
    </div>
  )
}
