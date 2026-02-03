describe('Manage page spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the page', () => {});

  it('should go to Review page when Review is clicked', () => {
    cy.get('.option').contains('Review').click();
    cy.url().should('contain', 'review');
  });

  it('should go to Personalize page when Personalize is clicked', () => {
    cy.get('.option').contains('Personalize').click();
    cy.url().should('contain', 'personalize');
  });

  it('should show Record Expense popup when - is clicked', () => {
    cy.get('.popup').should('not.exist');

    cy.get('#minus-option').click();
    cy.get('.popup').should('exist').should('contain', 'Record Expense');
  });

  it('should show Record Earning popup when + is clicked', () => {
    cy.get('.popup').should('not.exist');

    cy.get('#plus-option').click();
    cy.get('.popup').should('exist').should('contain', 'Record Earning');
  });

  it('should submit expense details and show them', () => {
    cy.get('#minus-option').click();
    cy.get('.popup').should('exist').should('contain', 'Record Expense');

    cy.get('[data-cy=category-input]').type('Test Category');
    cy.get('[data-cy=title-input]').type('Test Title');
    cy.get('[data-cy=amount-input]').type('0');

    cy.get('[data-cy=confirm-btn]').click();

    cy.document().then((doc) => {
      const overlay = doc.querySelector('.popup-overlay');
      console.log('popup-overlay exists?', !!overlay);
    });

    cy.get('.popup-overlay').should('not.exist');

    cy.contains('Test Category');
    cy.contains('Test Title');
    cy.contains('0');
  });

  it('should remove popup when Cancel is clicked', () => {
    cy.get('#minus-option').click();
    cy.get('.popup').should('exist').should('contain', 'Record Expense');

    cy.get('[data-cy=cancel-btn]').click();
    cy.get('.popup').should('not.exist');
  });

  it('should show current month and year in Review page', () => {
    cy.visit('/review');
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const expectedText = `${month} ${year}`;

    cy.get('h1').should('contain', expectedText);
  });
});
