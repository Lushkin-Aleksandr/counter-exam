import React, {useEffect, useState} from 'react';
import Output from "./Output";
import Button from "./Button";
import SettingsSvg from "./SettingsSvg";
import Settings from "./Settings";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/store";
import {
    changeSettingsModeAC,
    increaseOutputValueAC,
    resetOutputValueAC,
    setSettingsAC
} from "../redux/counterReducer";


const Counter = () => {

    // redux hooks ............................................................

    const {minValue, maxValue, outputValue, settingsMode} = useSelector((state: RootStateType) => state.counter)
    const dispatch = useDispatch()


    // useStates ...............................................................

    const [minInputValue, setMinInputValue] = useState(minValue);
    const [maxInputValue, setMaxInputValue] = useState(maxValue);
    const [error, setError] = useState('')


    // useEffects ...............................................................

    // Устанавливает ошибку при недопустимых значениях инпутов
    useEffect(() => {
        checkIsSettingsCorrect() ? setError('') : setError('Incorrect settings')
    }, [maxInputValue, minInputValue])
    // Сбрасывает незасетанные значения инпутов в настройках при отключении сеттингмода
    useEffect(() => {
        if (!settingsMode) {
            setMinInputValue(minValue)
            setMaxInputValue(maxValue)
        }
    }, [settingsMode])


    // Functions .................................................................

    // Хэндлеры на изменение инпутов
    // parseInt(value.toString()) не позволяет вводить дробные значения
    const changeMinInputValue = (value: number) => setMinInputValue(parseInt(value.toString()))
    const changeMaxInputValue = (value: number) => setMaxInputValue(parseInt(value.toString()))

    // Хэндлеры на изменение значения счетчика
    const increaseOutputValue = () => {
        if (outputValue >= maxValue) return
        dispatch(increaseOutputValueAC())
    }
    const resetOutputValue = () => {
        if (outputValue <= minValue) return
        dispatch(resetOutputValueAC())
    }

    // Работа с настройками
    const changeSettingsMode = () => dispatch(changeSettingsModeAC())
    const checkIsSettingsCorrect = () => {
        const minLessThanMax = minInputValue < maxInputValue
        const valuesAreNotNegative = minInputValue >= 0 && maxInputValue >= 0

        return minLessThanMax && valuesAreNotNegative
    }
    const setSettings = () => dispatch(setSettingsAC(minInputValue, maxInputValue))









    return (
        <div className={!error ? 'counter' : 'counter error'}>
            {settingsMode && <div className='title'>
                {!error
                    ? <span>Enter values and press set</span>
                    : <span className='error-value'>{error}</span>}
            </div>}

            <div className='counter-main'>
                {
                    !settingsMode
                        ? <Output value={outputValue} maxValue={maxValue}/>
                        : <Settings
                            minValue={minInputValue}
                            maxValue={maxInputValue}
                            maxValueChange={changeMaxInputValue}
                            minValueChange={changeMinInputValue}/>
                }

            </div>
            <div className='buttons-wrapper'>
                {
                    !settingsMode
                        ? <>
                            <Button
                                className='counter-btn'
                                disabled={outputValue === maxValue}
                                onClick={increaseOutputValue}>inc</Button>
                            <Button
                                className='counter-btn'
                                disabled={outputValue === minValue}
                                onClick={resetOutputValue}>reset</Button>
                        </>
                        : <Button className='counter-btn'
                                  onClick={setSettings}
                                  disabled={!!error}>set</Button>
                }

                <SettingsSvg callback={changeSettingsMode}/>


            </div>
        </div>
    );
};

export default Counter;