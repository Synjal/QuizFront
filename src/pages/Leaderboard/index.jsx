import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import {Loader} from '../../utils/style/Atoms'
import {useFetch, useTheme} from '../../utils/hooks'

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({theme}) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({theme}) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Leaderboards() {
    const {theme} = useTheme()
    const {data, isLoading, error} = useFetch(`http://localhost:8080/users`)

    if (error) {
        return <span>Il y a un problème</span>
    }

    return (
        <div>
            <PageTitle theme={theme}>Voici nos héros !</PageTitle>
            <PageSubtitle theme={theme}>
                Ils ont tous vaillamment bravé notre quiz
            </PageSubtitle>
            {isLoading ? (
                <LoaderWrapper>
                    <Loader theme={theme} data-testid="loader"/>
                </LoaderWrapper>
            ) : (
                <CardsContainer>
                    {data?.map((profile, index) => (
                        <Card
                            key={`${profile.pseudo}-${index}`}
                            pseudo={profile?.["pseudo"]}
                            score={profile?.["score"]}
                            theme={theme}
                        />
                    ))}
                </CardsContainer>
            )}
        </div>
    )
}

export default Leaderboards
