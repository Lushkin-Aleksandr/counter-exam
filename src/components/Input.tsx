import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type InputNumberPropsType = DefaultInputPropsType & {
    onChangeNumber?: (value: number) => void
}


const Input:React.FC<InputNumberPropsType> = (
    {
        onChange,
        onChangeNumber,
        ...restProps
    }
) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeNumber && onChangeNumber(+e.currentTarget.value)
    }

    return (
        <input
            onChange={handleChange}
            {...restProps}/>
    );
};

export default Input;