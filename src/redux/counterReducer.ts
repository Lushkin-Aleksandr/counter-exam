

//------------------------------------------------
// Constants
//------------------------------------------------
const SET_SETTINGS = 'SET_SETTINGS'
const INCREASE_OUTPUT_VALUE = 'INCREASE_OUTPUT_VALUE'
const RESET_OUTPUT_VALUE = 'RESET_OUTPUT_VALUE'
const CHANGE_SETTINGS_MODE = 'CHANGE_SETTINGS_MODE'


//------------------------------------------------
// Types
//------------------------------------------------
type SetValuesType = ReturnType<typeof setSettingsAC>
type IncreaseOutputValue = ReturnType<typeof increaseOutputValueAC>
type ResetOutputValue = ReturnType<typeof resetOutputValueAC>
type ChangeSettingsModeType = ReturnType<typeof changeSettingsModeAC>
type ActionType = SetValuesType | ChangeSettingsModeType | IncreaseOutputValue | ResetOutputValue

//------------------------------------------------
// Initial state
//------------------------------------------------

type CounterStateType = {
    minValue: number
    maxValue: number
    outputValue: number
    settingsMode: boolean

}
const initialState: CounterStateType = {
    minValue: 0,
    maxValue: 5,
    outputValue: 0,
    settingsMode: false
}

//------------------------------------------------
// Reducer
//------------------------------------------------

const counterReducer = (state: CounterStateType = initialState, action: ActionType): CounterStateType => {
    switch (action.type) {
        case 'SET_SETTINGS': {
            return {
                ...state,
                minValue: action.payload.minValue,
                maxValue: action.payload.maxValue,
                outputValue: action.payload.minValue,
                settingsMode: false
            }
        }
        case "INCREASE_OUTPUT_VALUE": {
            return {
                ...state,
                outputValue: state.outputValue + 1
            }
        }
        case "RESET_OUTPUT_VALUE": {
            return {
                ...state,
                outputValue: state.minValue
            }
        }
        case "CHANGE_SETTINGS_MODE": {
            return {
                ...state,
                settingsMode: !state.settingsMode
            }
        }
        default:
            return state;
    }
}

//------------------------------------------------
// Action creators
//------------------------------------------------
export const setSettingsAC = (minValue: number, maxValue: number) => {
    return {
        type: SET_SETTINGS,
        payload: {
            minValue,
            maxValue
        }
    } as const
}
export const increaseOutputValueAC = () => {
    return {
        type: INCREASE_OUTPUT_VALUE
    } as const
}
export const resetOutputValueAC = () => {
    return {
        type: RESET_OUTPUT_VALUE
    } as const
}
export const changeSettingsModeAC = () => {
    return {
        type: CHANGE_SETTINGS_MODE
    } as const
}


export default counterReducer

