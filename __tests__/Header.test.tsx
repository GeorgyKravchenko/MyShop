// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Header from '@/components/Header';

// describe('Header component', () => {
//   it('renders without crashing', () => {
//     render(<Header />);
//     expect(screen.getByRole('banner')).toBeInTheDocument();
//   });

//   it('has the correct role attribute', () => {
//     render(<Header />);
//     expect(screen.getByRole('banner')).toHaveAttribute('role', 'banner');
//   });

//   it('contains the expected navigation links', () => {
//     render(<Header />);
//     expect(screen.getByText('Home')).toBeInTheDocument();
//     expect(screen.getByText('Catalog')).toBeInTheDocument();
//   });

//   it('contains a search form with the correct attributes', () => {
//     render(<Header />);
//     const form = screen.getByRole('search');
//     expect(form).toHaveAttribute('role', 'search');
//     expect(form).toHaveAttribute('onSubmit', expect.any(Function));
//   });

//   it('contains a Cart component', () => {
//     render(<Header />);
//     expect(screen.getByText('Cart')).toBeInTheDocument();
//   });
// });