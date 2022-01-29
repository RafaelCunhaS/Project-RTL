import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testes do componente PokemonDetails.js', () => {
  const DETAILS = 'More details';

  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);
      const linkBtn = screen.getByRole('link', { name: DETAILS });
      userEvent.click(linkBtn);
      const pokeName = screen.getByText(/pikachu details/i);
      expect(pokeName).toBeInTheDocument();
      expect(linkBtn).not.toBeInTheDocument();
      const header = screen.getByRole('heading', { level: 2, name: 'Summary' });
      expect(header).toBeInTheDocument();
      const text = screen.getByText(pokemons[0].summary);
      expect(text).toBeInTheDocument();
    });

  it(`Testa se existe na página uma seção com os mapas
   contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);
    const linkBtn = screen.getByRole('link', { name: DETAILS });
    userEvent.click(linkBtn);
    const locations = screen.getByRole('heading', { level: 2,
      name: 'Game Locations of Pikachu' });
    expect(locations).toBeInTheDocument();
    pokemons[0].foundAt.forEach(({ location, map }, index) => {
      expect(screen.getByText(location)).toBeInTheDocument();
      expect(screen.getAllByRole('img')[index + 1]).toHaveAttribute('src', map);
      expect(screen.getAllByRole('img')[index + 1]).toHaveAttribute('alt',
        'Pikachu location');
    });
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const linkBtn = screen.getByRole('link', { name: DETAILS });
    userEvent.click(linkBtn);
    const favorite = screen.getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    const icon = screen.getByAltText('Pikachu is marked as favorite');
    expect(icon).toBeInTheDocument();
    userEvent.click(favorite);
    expect(icon).not.toBeInTheDocument();
  });
});
