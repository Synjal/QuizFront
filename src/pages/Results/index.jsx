import {useContext} from 'react'
import {PlayerContext, SurveyContext, TimerContext} from '../../utils/context'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import {useFetch, useTheme} from '../../utils/hooks'
import {Loader, StyledLink} from '../../utils/style/Atoms'

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  background-color: ${({theme}) =>
          theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ResultsTitle = styled.h2`
  color: ${({theme}) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-weight: bold;
  font-size: 28px;
  max-width: 60%;
  text-align: center;

  & > span {
    padding-left: 10px;
  }
`

const DescriptionWrapper = styled.div`
  padding: 60px;
`

const AnswersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 40px;
  padding-bottom: 20px;
  align-items: center;
  border-bottom: 1px solid black;
`

const GoodAnswer = styled.div`
  flex-direction: row;
  border: 2px solid #5dad0d;
  height: 50px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin-top: 10px;
`

const FalseAnswer = styled.div`
  flex-direction: row;
  border: 2px solid red;
  height: 50px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin-top: 10px;
`

const NeutralAnswer = styled.div`
  flex-direction: row;
  height: 50px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin-top: 10px;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Results() {
    const {theme} = useTheme()
    const {answers} = useContext(SurveyContext)
    const {pseudo} = useContext(PlayerContext)
    const {time} = useContext(TimerContext)

    const {data, isLoading, error} = useFetch(`http://localhost:8080/surveys`)

    if (error) {
        return <span>Il y a un problème</span>
    }

    const timeInt = +(time.split(':').reduce((acc, time) => (60 * acc) + +time));
    console.log(timeInt)
    const bonus = timeInt >= 250 ? 5
        : timeInt >= 200 ? 4
            : timeInt >= 150 ? 3
                : timeInt >= 100 ? 2
                    : timeInt >= 50 ? 1
                        : 0

    const maxPoints = Object.keys(answers).length
    const totalPoints = Object.values(answers)
        .map((item, index) => item === data?.[index]?.["correct_answer"] ? 1 : 0)
        .reduce((acc, curr) => acc + curr, 0)
    const score = totalPoints * bonus

    function submitScore() {
        if ({pseudo} === '') {
            alert("Pas de pseudo, pas de place au panthéon !")
            return
        }

        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({pseudo: pseudo, score: score})
        }
        fetch('http://localhost:8080/user', request)
            .then(response => response.json());
    }

    return isLoading ? (
        <LoaderWrapper>
            <Loader/>
        </LoaderWrapper>
    ) : (
        <ResultsContainer theme={theme}>
            <ResultsTitle theme={theme}>
                Résultats :
            </ResultsTitle>
            <DescriptionWrapper>
                <div>{totalPoints}/{maxPoints} réponses correct</div>
                <div>Temps restant : {time}</div>
                <div>Score total : {score}</div>
            </DescriptionWrapper>
            <DescriptionWrapper>
                {data.map((item, indexQ) => (
                    <AnswersWrapper key={indexQ}>
                        {item?.["question"]}
                        {item?.["answers"].map((answer, indexA) =>
                            answer === item?.["correct_answer"] && answer === Object.values(answers)[indexQ]
                                ? <GoodAnswer key={indexA}>{answer}</GoodAnswer>
                                : answer === item?.["correct_answer"]
                                    ? <GoodAnswer key={indexA}>{answer}</GoodAnswer>
                                    : answer === Object.values(answers)[indexQ]
                                        ? <FalseAnswer key={indexA}>{answer}</FalseAnswer>
                                        : <NeutralAnswer key={indexA}>{answer}</NeutralAnswer>
                        )}
                    </AnswersWrapper>
                ))}
            </DescriptionWrapper>
            <StyledLink to="/leaderboard" $isFullLink
                        onClick={submitScore}>
                Grave ton nom au panthéon des guerriers sans plus attendre !
            </StyledLink>
        </ResultsContainer>
    )
}

export default Results
