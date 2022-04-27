import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

// describe('', () => {
//   it('', () => {});
//   it('', () => {});
// });

describe('01- Testa se todos os elementos estão na tela de login.', () => {
  it('Testa se existe um campo de email', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
  });
  it('Testa se existe um campo de password.', () => {
    renderWithRouter(<App />);

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });
  it('Testa se existe um button "enter".', () => {
    renderWithRouter(<App />);

    const BTN_ENTER = screen.getByTestId('login-submit-btn');
    expect(BTN_ENTER).toBeInTheDocument();
  });
});

describe('', () => {
  it('', () => {});
  it('', () => {});
});
