import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './components/Error'
import GlobalStyle from './utils/style/GlobalStyle'
import {PlayerProvider, SurveyProvider, ThemeProvider, TimerProvider} from './utils/context'
import Leaderboards from "./pages/Leaderboard";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ThemeProvider>
                <SurveyProvider>
                    <PlayerProvider>
                        <TimerProvider>
                            <GlobalStyle/>
                            <Header/>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/survey/:questionNumber" element={<Survey/>}/>
                                <Route path="/results" element={<Results/>}/>
                                <Route path="/leaderboard" element={<Leaderboards/>}/>
                                <Route path="*" element={<Error/>}/>
                            </Routes>
                        </TimerProvider>
                    </PlayerProvider>
                </SurveyProvider>
                <Footer/>
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)
