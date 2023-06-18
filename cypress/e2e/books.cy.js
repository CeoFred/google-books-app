describe('Books Component', () => {
  beforeEach(() => {
    cy.visit('/books');
  });

  it('displays "My Reading List" heading', () => {
    cy.get('h1').should('have.text', 'My Reading List');
  });

  it('displays "No books added" message when no books are in the reading list', () => {
    cy.get('p').should('have.text', 'No books added to the reading list.');
  });


});
