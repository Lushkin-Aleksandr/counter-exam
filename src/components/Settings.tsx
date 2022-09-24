import React from 'react';
import Input from "./Input";

type SettingsPropsType = {
    minValue: number
    maxValue: number
    minValueChange: (value: number) => void
    maxValueChange: (value: number) => void
}

const Settings: React.FC<SettingsPropsType> = (props) => {
    return (
        <div className='settings'>
            <div className='settingsInputWrapper'>
                <span className='settingsInputLabel'>Min value:</span>
                <Input
                    type={'number'}
                    value={props.minValue.toString()}
                    onChangeNumber={props.minValueChange}
                    className='settingsInput'/>
            </div>
            <div className='settingsInputWrapper'>
                <span className='settingsInputLabel'>Max value:</span>
                <Input
                    type={"number"}
                    value={props.maxValue.toString()}
                    onChangeNumber={props.maxValueChange}
                    className='settingsInput'/>
            </div>
        </div>
    );
};

export default Settings;