import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1 - Teste o componente App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);

      const linkOne = screen.getByRole('link', { name: /Home/i });
      const linkTwo = screen.getByRole('link', { name: /About/i });
      const linkThree = screen.getByRole('link', { name: /Favorite/i });

      expect(linkOne).toBeInTheDocument();
      expect(linkTwo).toBeInTheDocument();
      expect(linkThree).toBeInTheDocument();
    });

  it(`Teste se a aplicação é redirecionada para a página inicial, na URL / 
    ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });

    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de About, na URL /about, 
  ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });

    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, 
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkFav = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkFav).toBeInTheDocument();
    userEvent.click(linkFav);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página Not 
  Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    const notFound = screen.getByRole('heading', {
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });
});
