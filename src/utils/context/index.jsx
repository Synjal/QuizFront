import React, {createContext, useState} from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light')
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const SurveyContext = createContext()

export const SurveyProvider = ({children}) => {
    const [answers, setAnswers] = useState({})
    const [time, setTime] = useState({})

    const saveAnswers = (newAnswers) => {
        setAnswers({...answers, ...newAnswers})
    }

    const saveTime = (newTime) => {
        setTime({time, newTime})
    }

    return (
        <SurveyContext.Provider value={{answers, saveAnswers, time, saveTime}}>
            {children}
        </SurveyContext.Provider>
    )
}

export const TimerContext = createContext()

export const TimerProvider = ({children}) => {
    const [time, setTime] = useState('')

    return (
        <TimerContext.Provider value={{time, setTime}}>
            {children}
        </TimerContext.Provider>
    )
}

export const PlayerContext = createContext()

export const PlayerProvider = ({children}) => {
    const [pseudo, setPseudo] = useState('')

    return (
        <PlayerContext.Provider value={{pseudo, setPseudo}}>
            {children}
        </PlayerContext.Provider>
    )
}
