import PropTypes from 'prop-types'
import {Component} from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const CardPseudo = styled.span`
  color: ${({theme}) => (theme === 'light' ? colors.primary : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
  align-items: center;
`

const CardScore = styled.div`
  color: ${({theme}) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
  height: 25px;
  display: flex;
  align-items: center;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 15px;
  background-color: ${({theme}) =>
          theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  border-radius: 30px;
  width: 300px;
  height: 300px;

  &:hover {
    cursor: pointer;
  }
`

class Card extends Component {

    render() {
        const {theme, pseudo, score} = this.props

        return (
            <CardWrapper theme={theme}>
                <CardPseudo theme={theme}>{pseudo}</CardPseudo>
                <CardScore theme={theme}>Score : {score}</CardScore>
            </CardWrapper>
        )
    }
}

Card.propTypes = {
    pseudo: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
}

Card.defaultProps = {
    pseudo: '',
    score: '',
    theme: 'light',
}

export default Card
