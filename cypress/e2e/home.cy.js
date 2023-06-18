describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should search and add a book to the reading list', () => {
    cy.intercept('GET', 'https://www.googleapis.com/books/v1/volumes*', {
      fixture: 'searchResults.json', // Mock the API response
    }).as('searchResults');

    cy.get('input[type="text"]').type('Harry Potter');
    cy.get('button[type="submit"]').click();

    cy.wait('@searchResults').then(() => {
      cy.get('.book-item').first().as('firstBook');
      cy.get('@firstBook').should('contain.text', 'Harry Potter');
    cy.get('@firstBook').find('button').should('have.html', `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="blue"><path fill-rule="evenodd" d="M7 2a2 2 0 00-2 2v14l7-3 7 3V4a2 2 0 00-2-2H7zm2 2h6v1H9V4zm0 3h6v1H9V7zm0 3h4v1H9v-1z" clip-rule="evenodd"></path></svg>`);


      cy.get('@firstBook').find('button').click();
 cy.get('@firstBook').find('button').should('have.html', `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7 2a2 2 0 00-2 2v14l7-3 7 3V4a2 2 0 00-2-2H7zm2 2h6v1H9V4zm0 3h6v1H9V7zm0 3h4v1H9v-1z" clip-rule="evenodd"></path></svg>`);
    });

   cy.get('@firstBook').find('button').should('be.disabled');
  });

it('should hide search results when user clicks outside', () => {
  cy.visit('/');

  // Type a search term and wait for the search results
  cy.get('input[type="text"]').type('Harry Potter');
  cy.get('ul').should('exist'); // Verify that search results are visible

  // Get the search container element
  cy.get('#searchResults').then(($searchContainer) => {
    // Calculate the position of the search container
    const { top, left, width, height } = $searchContainer[0].getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Click outside the search container
    cy.document().trigger('click', { clientX: centerX, clientY: centerY });

    // Verify that search results are no longer visible
    cy.get('ul').should('not.exist');
  });
});


});
