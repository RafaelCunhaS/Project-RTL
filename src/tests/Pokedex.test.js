import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testes do componente Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );
  });
  const NEXT = 'Próximo pokémon';
  const TYPE = 'pokemon-type';

  it('Testa se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    const header = screen.getByRole('heading', { level: 2,
      name: 'Encountered pokémons' });
    expect(header).toBeInTheDocument();
  });

  it(`Testa se é exibido o próximo Pokémon da lista 
    quando o botão "Próximo pokémon" é clicado`, () => {
    pokemons.forEach(({ name }) => {
      const nextBtn = screen.getByRole('button', { name: NEXT });
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(nextBtn);
    });
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    const names = screen.getAllByTestId('pokemon-name');
    expect(names).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const allBtn = screen.getByRole('button', { name: /all/i });
    const allTypes = Array.from(new Set(pokemons.map(({ type }) => type)));
    const types = screen.getAllByTestId('pokemon-type-button');
    expect(types).not.toEqual(expect.arrayContaining(allTypes));
    expect(types).toHaveLength(allTypes.length);
    expect(allBtn).toBeInTheDocument();

    const filterFireBtn = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(filterFireBtn);
    const pokemonType = screen.getByTestId(TYPE);
    expect(pokemonType).toHaveTextContent(/fire/i);
    expect(allBtn).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: NEXT });
    userEvent.click(nextBtn);
    const secondPokemonType = screen.getByTestId('pokemon-type');
    expect(secondPokemonType).toHaveTextContent(/fire/i);
    expect(allBtn).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const resetBtn = screen.getByRole('button', { name: 'All' });
    expect(resetBtn).toBeInTheDocument();
    const filterFireBtn = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(filterFireBtn);
    const firePkmn = screen.getByTestId(TYPE);
    expect(firePkmn).toHaveTextContent(/fire/i);
    userEvent.click(resetBtn);
    const allPkmn = screen.getByTestId(TYPE);
    expect(allPkmn).toHaveTextContent(/electric/i);
  });
});
