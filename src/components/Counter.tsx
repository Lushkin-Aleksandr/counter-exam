import React, {useEffect, useState} from 'react';
import Output from "./Output";
import Button from "./Button";
import SettingsSvg from "./SettingsSvg";
import Settings from "./Settings";


const Counter = () => {

    // useStates ...............................................................

    const [config, setConfig] = useState({
        minValue: 0,
        maxValue: 5
    })
    const [minInputValue, setMinInputValue] = useState(config.minValue);
    const [maxInputValue, setMaxInputValue] = useState(config.maxValue);
    const [outputValue, setOutputValue] = useState(config.minValue);
    const [settingsMode, setSettingsMode] = useState(false);
    const [isSettingsChanged, setIsSettingsChanged] = useState(false);
    const [error, setError] = useState('')
    console.log(config)

    // useEffects ...............................................................


    // Проверяет изменение настроек, а также устанавливает ошибку при недопустимых значениях инпутов
    useEffect(() => {
        setIsSettingsChanged(checkSettingsChanging())
        checkIsSettingsCorrect() ? setError('') : setError('Incorrect settings')
    }, [maxInputValue, minInputValue])

    // Устанавливает текущее значение счетчика при изменении config
    useEffect(() => {
        setOutputValue(config.minValue)
    }, [config])

    // Сбрасывает незасетанные изменения в настройках
    useEffect(() => {
        setMaxInputValue(config.maxValue)
        setMinInputValue(config.minValue)
    }, [settingsMode])

    // Устанавливает настройки из Local storage при первом рендере
    useEffect(() => {
        setConfig(getConfigFromLocalStorage())
    }, [])


    // functions ...............................................................

    // Работа с local storage
    const setConfigToLocalStorage = () => {
        const newConfig = {
            maxValue: maxInputValue,
            minValue: minInputValue
        }
        const newConfigAsString = JSON.stringify(newConfig);
        localStorage.setItem('counterConfig', newConfigAsString)
    }
    const getConfigFromLocalStorage = () => {
        const newConfig = localStorage.getItem('counterConfig')
        return newConfig ? JSON.parse(newConfig) : config;
    }

    // Хэндлеры на изменение инпутов
    const changeMinInputValue = (value: number) => {
        setMinInputValue(parseInt(value.toString()))
    }
    const changeMaxInputValue = (value: number) => {
        setMaxInputValue(parseInt(value.toString()))

    }

    // Хэндлеры на изменение значения счетчика
    const incrementOutputValue = () => {
        if (outputValue >= config.maxValue) return;
        setOutputValue(outputValue + 1);
    }
    const resetOutputValue = () => {
        if (outputValue <= config.minValue) return;
        setOutputValue(config.minValue);
    }

    // Работа с настройками
    const changeSettingsMode = () => {
        setSettingsMode(!settingsMode)
    }
    const checkSettingsChanging = () => {
        const configValueSameAsInputValue = (config.maxValue === maxInputValue) && (config.minValue === minInputValue);
        return configValueSameAsInputValue;
    }
    const checkIsSettingsCorrect = () => {
        const minLessThanMax = minInputValue < maxInputValue;

        return minLessThanMax
    }
    const updateConfig = () => {
        setConfig({
            minValue: minInputValue,
            maxValue: maxInputValue
        })
        setConfigToLocalStorage()
    }



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
                        ? <Output value={outputValue} maxValue={config.maxValue}/>
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
                                disabled={outputValue === config.maxValue}
                                onClick={incrementOutputValue}>inc</Button>
                            <Button
                                className='counter-btn'
                                disabled={outputValue === config.minValue}
                                onClick={resetOutputValue}>reset</Button>
                        </>
                        : <Button className='counter-btn'
                                  onClick={updateConfig}
                                  disabled={isSettingsChanged || !!error}>set</Button>
                }

                <SettingsSvg callback={changeSettingsMode}/>


            </div>
        </div>
    );
};

export default Counter;