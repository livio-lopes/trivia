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

describe('Página de Feedback', () => {

    it('Testa se renderiza corretamente',  () => {
        renderWithRouterAndRedux(<App />, state, '/feedback');
        const img = screen.getByTestId('header-profile-picture')
        expect(img).toBeInTheDocument();

    const msg = screen.getByText(/Could be better.../i);        
        expect(msg).toBeInTheDocument();

        const score = screen.getAllByText(/15/i);
        expect(score).toHaveLength(2);

        const name = screen.getByText(/jogador/i);
        expect(name).toBeInTheDocument();
    });
    it('Testa se renderiza corretamente',  () => {
        renderWithRouterAndRedux(<App />, state, '/feedback');
        const img = screen.getByTestId('header-profile-picture')
        expect(img).toBeInTheDocument();

    const msg = screen.getByText(/Could be better.../i);        
        expect(msg).toBeInTheDocument();

        const score = screen.getAllByText(/15/i);
        expect(score).toHaveLength(2);

        const name = screen.getByText(/jogador/i);
        expect(name).toBeInTheDocument();
    });

    it('Testa se renderiza corretamente',  () => {
        const state = {
            player: {
              name: 'jogador',
              score: 15,
              assertions: 3,
              gravatarEmail: ''
          }
        };

        renderWithRouterAndRedux(<App />, state, '/feedback');
        
        const msg = screen.getByText(/Well/i);        
        expect(msg).toBeInTheDocument();
    });


    it('Testa se redireciona para rota /', () => {
        const { history } = renderWithRouterAndRedux(<App />, state, '/feedback');    
        const btnPlayAgain = screen.getByRole('button', {  name: /play again/i});
        userEvent.click(btnPlayAgain);
        const { location } = history;
        expect(location.pathname).toBe('/');  
    })

    it('Testa se armazena LocalStorage corretamente', async () => {
        const state = {
            player: {
              name: 'jogador',
              score: 15,
              assertions: 3,
              gravatarEmail: ''
          }
        };

        renderWithRouterAndRedux(<App />, state, '/feedback');
        
        const msg = screen.findByText(/Well Done!/i);        
        // expect(msg).toBeInTheDocument();
        await waitFor(() => {
            const ranking = JSON.parse(localStorage.getItem('ranking'));
            expect(ranking).toEqual({});
          }, { timeout: 10 });
    });

    it('Testa se redireciona para rota /ranking', () => {
        const { history } = renderWithRouterAndRedux(<App />, state, '/feedback');    
        const btnPlayAgain = screen.getByRole('button', {  name: /ranking/i});
        userEvent.click(btnPlayAgain);
        const { location } = history;
        expect(location.pathname).toBe('/ranking');  
    })

})
