import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';

type DefaultButtonType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type ButtonPropsType = DefaultButtonType & {
    className?: string
}

const Button: React.FC<ButtonPropsType> = ({className, ...restProps}) => {
    const finalClass = `universal-button ${className ? className : ''}`

    return (
        <button
            className={finalClass} {...restProps}/>
    );
};

export default Button;