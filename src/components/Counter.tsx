import React, {useState} from 'react';
import Output from "./Output";
import Button from "./Button";


const Counter = () => {
    const maxOutputValue = 5;
    const minOutputValue = 0;
    const [outputValue, setOutputValue] = useState<number>(minOutputValue);

    const incrementOutputValue = () => {
        if (outputValue >= maxOutputValue) return;
        setOutputValue(outputValue + 1);
    }

    const resetOutputValue = () => {
        if (outputValue <= minOutputValue) return;
        setOutputValue(minOutputValue);
    }

    return (
        <div className='counter'>
            <Output value={outputValue} maxValue={maxOutputValue}/>
            <div className='buttons-wrapper'>
                <Button
                    className='counter-btn'
                    disabled={outputValue === maxOutputValue}
                    onClick={incrementOutputValue}>inc</Button>
                <Button
                    className='counter-btn'
                    disabled={outputValue === minOutputValue}
                    onClick={resetOutputValue}>reset</Button>
            </div>
        </div>
    );
};

export default Counter;