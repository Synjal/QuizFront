import {useContext, useEffect, useRef, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import styled, {keyframes} from 'styled-components'
import colors from '../../utils/style/colors'
import {Loader} from '../../utils/style/Atoms'
import {SurveyContext, TimerContext} from '../../utils/context'
import {useFetch, useTheme} from '../../utils/hooks'
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {pulse, rubberBand} from "react-animations";

const Bounce = styled.div`
  animation: 3s ${keyframes`${rubberBand}`}
`

const Pulse = styled.div`
  animation: 2s ${keyframes`${pulse}`} infinite
`

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({theme}) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({theme}) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LinkWrapper = styled.div`
  padding-top: 30px;

  & a {
    color: ${({theme}) => (theme === 'light' ? '#000000' : '#ffffff')};
  }

  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) =>
          theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  color: ${({theme}) => (theme === 'light' ? '#000000' : '#ffffff')};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
          props.$isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};

  & {
    margin-right: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

function Survey() {
    const {questionNumber} = useParams()
    const questionNumberInt = parseInt(questionNumber)
    const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
    const nextQuestionNumber = questionNumberInt + 1
    const {theme} = useTheme()

    const {saveAnswers, answers} = useContext(SurveyContext)
    const {setTime} = useContext(TimerContext)

    const [timer, setTimer] = useState("00:00")

    const Ref = useRef(null);

    const getTimeRemaining = (e) => {
        const total =
            Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        return {
            total,
            minutes,
            seconds,
        };
    };

    const startTimer = (e) => {
        let {total, minutes, seconds} =
            getTimeRemaining(e);
        if (total >= 0) {
            setTimer((minutes > 9
                    ? minutes
                    : "0" + minutes)
                + ":" + (seconds > 9
                    ? seconds
                    : "0" + seconds)
            );
        }
    };

    const getDeadTime = () => {
        let deadline = new Date();

        deadline.setSeconds(deadline.getSeconds() + 300);
        return deadline;
    };

    const clearTimer = (e) => {
        setTimer("05:00");

        if (Ref.current) clearInterval(Ref.current);
        Ref.current = setInterval(() => {
            startTimer(e);
        }, 1000);
    };

    useEffect(() => {
        clearTimer(getDeadTime());
        return () => {
            setTimer('')
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function saveReply(answer) {
        saveAnswers({[questionNumber]: answer})
    }

    function saveTimer() {
        setTime(timer)
        console.log(timer)
    }

    const {data, isLoading, error} = useFetch(`http://localhost:8080/surveys`)

    if (error) {
        return <span>Oups il y a eu un problème</span>
    }

    startTimer(600)

    return (
        <Bounce>
            <SurveyContainer>
                <Pulse>
                    <CountdownCircleTimer
                        isPlaying
                        duration={300}
                        colors={['#5dad0d', '#1e44b2', '#F7B801', '#A30000', '#B7661E', '#A30000']}
                        colorsTime={[300, 250, 200, 150, 100, 50]}
                    >
                        {({remainingTime}) => {
                            const minutes = Math.floor(remainingTime / 60)
                            const seconds = remainingTime % 60

                            return `${minutes}:${seconds}`
                        }}
                    </CountdownCircleTimer>
                </Pulse>
                <QuestionTitle theme={theme}>
                    Question {questionNumber}
                </QuestionTitle>
                {isLoading ? (
                    <Loader/>
                ) : (
                    <QuestionContent theme={theme}>
                        {data?.[questionNumber - 1]?.["question"]}
                    </QuestionContent>
                )}
                <ReplyWrapper>
                    <ReplyBox
                        onClick={() => saveReply(data?.[questionNumberInt - 1]?.["answers"]?.[0])}
                        $isSelected={answers[questionNumberInt] === data?.[questionNumberInt - 1]?.["answers"]?.[0]}
                        theme={theme}
                    >
                        {data?.[questionNumberInt - 1]?.["answers"]?.[0]}
                    </ReplyBox>
                    <ReplyBox
                        onClick={() => saveReply(data?.[questionNumberInt - 1]?.["answers"]?.[1])}
                        $isSelected={answers[questionNumberInt] === data?.[questionNumberInt - 1]?.["answers"]?.[1]}
                        theme={theme}
                    >
                        {data?.[questionNumberInt - 1]?.["answers"]?.[1]}
                    </ReplyBox>
                    <ReplyBox
                        onClick={() => saveReply(data?.[questionNumberInt - 1]?.["answers"]?.[2])}
                        $isSelected={answers[questionNumberInt] === data?.[questionNumberInt - 1]?.["answers"]?.[2]}
                        theme={theme}
                    >
                        {data?.[questionNumberInt - 1]?.["answers"]?.[2]}
                    </ReplyBox>
                    <ReplyBox
                        onClick={() => saveReply(data?.[questionNumberInt - 1]?.["answers"]?.[3])}
                        $isSelected={answers[questionNumberInt] === data?.[questionNumberInt - 1]?.["answers"]?.[3]}
                        theme={theme}
                    >
                        {data?.[questionNumberInt - 1]?.["answers"]?.[3]}
                    </ReplyBox>
                </ReplyWrapper>

                <LinkWrapper theme={theme}>
                    <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
                    {data && data[questionNumberInt] ? (
                        <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
                    ) : (
                        <Link to="/results"
                              onClick={() => saveTimer()}>Résultats</Link>
                    )}
                </LinkWrapper>
            </SurveyContainer>
        </Bounce>
    )
}

export default Survey
