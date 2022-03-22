import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('2. Teste o componente About.', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const head = screen.getByRole('heading', { name: 'About Pokédex',
      level: 2 });
    expect(head).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const paragraph = screen.getByText(
      'This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons',
    );
    const secondParagraph = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(paragraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imagem = screen.getByRole('img');
    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
