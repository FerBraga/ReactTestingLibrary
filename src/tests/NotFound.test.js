import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('4. Teste o componente NotFound', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found ', () => {
    renderWithRouter(<NotFound />);

    const erro = screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i });
    expect(erro).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);

    const imgs = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i });
    expect(imgs.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
