import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('contains the expected footer sections', () => {
    render(<Footer />);
    expect(screen.getByText('About us')).toBeInTheDocument();
    expect(screen.getByText('Contacts')).toBeInTheDocument();
    expect(screen.getByText('Privacy policy')).toBeInTheDocument();
  });

  it('contains the expected social network links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Facebook' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Twitter' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument();
  });

  it('social network links have the correct URLs and aria-labels', () => {
    render(<Footer />);
    const facebookLink = screen.getByRole('link', { name: 'Facebook' });
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
    expect(facebookLink).toHaveAttribute('aria-label', 'Facebook');

    const twitterLink = screen.getByRole('link', { name: 'Twitter' });
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
    expect(twitterLink).toHaveAttribute('aria-label', 'Twitter');

    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
    expect(instagramLink).toHaveAttribute('aria-label', 'Instagram');
  });
});