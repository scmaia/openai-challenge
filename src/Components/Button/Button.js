/**
 * Component: CTA button
 * @props text to display on button, icon to display on button, (optional) click event,
 * type (optional) for additional class options
 */

import './Button.scss';

function Button ({ text, icon, type, extraClass, onClick }) {
    return (
        <button className={extraClass ? `CTA CTA--${extraClass}` : 'CTA'} type={type ? type : 'button'} onClick={onClick}>
            {icon && 
                <img className={text ? 'CTA__icon' : 'CTA__single-icon'} src={icon} alt="" aria-hidden="true"/>
            }
            <p className='CTA__text'>{text}</p>
        </button>
    );
};

export default Button;