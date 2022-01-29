import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes do componente About.js', () => {
  beforeEach(() => renderWithRouter(<About />));

  it('Testa se a página contém as informações sobre a Pokédex', () => {
    const info = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(info).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const header = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(header).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const texts = screen.getAllByText(/pokémons/i);
    expect(texts).toHaveLength(2);
  });

  it('Testa se a página contém uma imagem de uma Pokédex com a URL específica', () => {
    const image = screen.getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
