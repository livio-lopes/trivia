import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

const state = {
    player: {
      name: 'jogador',
      score: 15,
      assertions: 2,
      gravatarEmail: ''
  }
};

describe('Testa se o botão do ranking vai para a home', () => {
  const initialState = {
    player: {
      gravatarEmail: '',
      name: '',
      score: 40,
      assertions: 1
    }
  }
const LocalStorage = [
  {
      "imgUrl": "https://www.gravatar.com/avatar/434a9c2c07210ce4d1176457876f37b2",
      "name": "ruan",
      "score": 5,
  },
]
  it('Testa se o botão redireciona para a pagina home', () => {
    localStorage.setItem('ranking', JSON.stringify(LocalStorage))
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/ranking')
    const rankingBtn = screen.getByTestId('btn-go-home');
    userEvent.click(rankingBtn)
    expect(history.location.pathname).toBe('/')
  })
});