import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes do componente NotFound.js', () => {
  beforeEach(() => renderWithRouter(<NotFound />));

  it('Testa se página contém um heading h2 com o texto "Page requested not found 😭"',
    () => {
      const header = screen.getByRole('heading', { level: 2,
        name: 'Page requested not found Crying emoji' });
      expect(header).toBeInTheDocument();
    });

  it('Teste se página mostra a imagem com URL específica', () => {
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
