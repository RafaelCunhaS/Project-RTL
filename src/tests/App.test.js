import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes do componente App.js', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página inicial ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /home/i }));
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

  it('Testa se a aplicação é redirecionada para a página About ao clicar no link About',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /about/i }));
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

  it(`Testa se a aplicação é redirecionada para a página de 
    Pokémons Favoritados ao clicar no link Favorite Pokémons`,
  () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Testa se a aplicação é redirecionada para a página Not Found 
    ao entrar em uma URL desconhecida.`,
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('xablau');
    const notFound = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFound).toBeInTheDocument();
  });
});
