import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Testes do componente Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
      const name = screen.getByTestId('pokemon-name');
      expect(name).toHaveTextContent(/pikachu/i);
      const type = screen.getByTestId('pokemon-type');
      expect(type).toHaveTextContent(/electric/i);
      const weight = screen.getByTestId('pokemon-weight');
      expect(weight).toHaveTextContent(/average weight: 6.0 kg/i);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(image).toHaveAttribute('alt', 'Pikachu sprite');
    });

  it(`Testa se o card do Pokémon indicado na Pokédex
    contém um link de navegação para exibir detalhes deste Pokémon`, () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });

  it(`Testa se ao clicar no link de navegação do Pokémon, é feito
  o redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    const linkBtn = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkBtn);
    const details = screen.getByRole('heading', { level: 2, name: /pikachu details/i });
    expect(details).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', async () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const icon = screen.getByAltText('Pikachu is marked as favorite');
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
