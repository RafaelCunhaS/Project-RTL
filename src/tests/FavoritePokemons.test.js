import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('Testes do componente FavoritePokemons.js', () => {
  it(`Testa se é exibido na tela a mensagem "No favorite pokemon found", 
    se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favorites = document.querySelector('.favorite-pokemons');
    expect(favorites).toBeInTheDocument();
  });
});
