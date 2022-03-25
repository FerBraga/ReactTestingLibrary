import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const details = 'More details';

describe('6 - Teste o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const cardName = screen.getByTestId('pokemon-name', { name: /pikachu/i });
    const cardType = screen.getByTestId('pokemon-type');
    const cardWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const cardeImage = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(cardName).toBeInTheDocument();
    expect(cardType).toHaveTextContent(/electric/i);
    expect(cardWeight).toBeInTheDocument();
    expect(cardeImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link 
  de navegação para exibir detalhes deste Pokémon`, () => {
    renderWithRouter(<App />);
    const link = screen.getByText('More details');
    expect(link.href).toBe('http://localhost/pokemons/25');
  });

  it(`Teste  se ao clicar no link de navegação do Pokémon, é feito o redirecionamento 
  da aplicação para a página de detalhes de Pokémon.`, () => {
    renderWithRouter(<App />);
    const link = screen.getByText(details);
    userEvent.click(link);
    const summary = screen.getByRole('heading', { name: 'Summary' });
    expect(summary).toBeInTheDocument();
  });
  it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é 
  o id do Pokémon cujos detalhes se deseja ver;.`, () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText(details);
    userEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const link = screen.getByText(details);
    userEvent.click(link);
    const fav = screen.getByRole('checkbox');
    userEvent.click(fav);
    expect(fav).toBeChecked();
    const icon = screen.getAllByRole('img');
    expect(icon[1]).toBeInTheDocument();
    expect(icon[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(icon[1]).toHaveAttribute('src', '/star-icon.svg');
  });
});
