import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('5 - Teste o componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const nameHead = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(nameHead).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão', () => {
    renderWithRouter(<App />);

    const btnNxt = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(btnNxt);

    const card = screen.getByRole('link', { name: /more details/i });
    expect(card).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const poke = screen.getByTestId('pokemon-name');
    expect(poke).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const btns = screen.queryAllByTestId('pokemon-type-button');

    expect(btns[0]).toBeInTheDocument();
    expect(btns[1]).toBeInTheDocument();
    expect(btns[2]).toBeInTheDocument();
    expect(btns[3]).toBeInTheDocument();
    expect(btns[4]).toBeInTheDocument();
    expect(btns[5]).toBeInTheDocument();
    expect(btns[6]).toBeInTheDocument();

    const filter = screen.getByRole('button', { name: /electric/i });
    const filterb = screen.getByRole('button', { name: /fire/i });
    const filterc = screen.getByRole('button', { name: /Bug/i });
    const filterd = screen.getByRole('button', { name: /Poison/i });
    const filtere = screen.getByRole('button', { name: /Psychic/i });
    const filterf = screen.getByRole('button', { name: /Normal/i });
    const filterg = screen.getByRole('button', { name: /Dragon/i });

    expect(filter).toBeInTheDocument();
    expect(filterb).toBeInTheDocument();
    expect(filterc).toBeInTheDocument();
    expect(filterd).toBeInTheDocument();
    expect(filtere).toBeInTheDocument();
    expect(filterf).toBeInTheDocument();
    expect(filterg).toBeInTheDocument();

    const botaoAll = screen.getByRole('button', { name: /all/i });
    expect(botaoAll).toBeVisible();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnall = screen.getByRole('button', { name: /all/i });
    expect(btnall).toBeInTheDocument();

    userEvent.click(btnall);

    const pokes = screen.getByTestId('pokemon-name');
    expect(pokes).toBeInTheDocument();

    expect(btnall).toBeVisible();
  });
});
