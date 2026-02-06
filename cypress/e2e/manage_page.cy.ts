describe('Manage page spec', () => {
  // Visits the base url before each test
  beforeEach(() => {
    cy.visit('/');
  });

  // Test which checks that by clicking Review button, the site goes to Review page
  it('should go to Review page when Review is clicked', () => {
    // Finds the element in the page which has the class 'option' and clicks it
    cy.get('.option').contains('Review').click();

    // Checks that the url contains the word 'review'
    cy.url().should('contain', 'review');
  });

  // Similar to above test
  it('should go to Personalize page when Personalize is clicked', () => {
    cy.get('.option').contains('Personalize').click();
    cy.url().should('contain', 'personalize');
  });

  // Test which checks that popup appears when - button is clicked
  it('should show Record Expense popup when - is clicked', () => {
    // Checks that popup should not exist initially
    cy.get('.popup').should('not.exist');

    // Finds the element with id 'minus option' and clicks it
    cy.get('#minus-option').click();

    // Checks that popup should now exist and contain the words 'Record Expense'
    cy.get('.popup').should('exist').should('contain', 'Record Expense');
  });

  // Similar to above test
  it('should show Record Earning popup when + is clicked', () => {
    // Checks that popup should exist initially (this will fail)
    cy.get('.popup').should('exist');

    cy.get('#plus-option').click();
    cy.get('.popup').should('exist').should('contain', 'Record Earning');
  });

  // Test which checks that when the popup form is submitted, the given details show up in the page
  it('should submit expense details and show them', () => {
    cy.get('#minus-option').click();
    cy.get('.popup').should('exist').should('contain', 'Record Expense');

    // Finds the element with data-cy attribute set to 'category-input' and types 'Test Category' into the input field
    cy.get('[data-cy=category-input]').type('Test Category');
    // Finds the element with data-cy attribute set to 'title-input' and types 'Test Title' into the input field
    cy.get('[data-cy=title-input]').type('Test Title');
    // Finds the element with data-cy attribute set to 'amount-input' and types '0' into the input field
    cy.get('[data-cy=amount-input]').type('0');

    // Finds the element with data-cy attribute set to 'confirm-btn' and clicks it
    cy.get('[data-cy=confirm-btn]').click();

    // Checks that popup does not exist after clicking submit
    cy.get('.popup-overlay').should('not.exist');

    // Checks that the page contains these texts
    cy.contains('Test Category');
    cy.contains('Test Title');
    cy.contains('0');
  });

  // Test which checks that popup should go away when Cancel button is clicked
  it('should remove popup when Cancel is clicked', () => {
    cy.get('#minus-option').click();
    cy.get('.popup').should('exist').should('contain', 'Record Expense');

    cy.get('[data-cy=cancel-btn]').click();
    cy.get('.popup').should('not.exist');
  });

  // Test which checks that the month and year in the page match the current ones (this will fail as the month and year in the page are hard coded)
  it('should show current month and year in Review page', () => {
    // Go to baseurl/review => http://localhost:4200/review
    cy.visit('/review');

    // Get current month and year
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const expectedText = `${month} ${year}`;

    // Check that h1 element contains the expected month and year
    cy.get('h1').should('contain', expectedText);
  });
});
