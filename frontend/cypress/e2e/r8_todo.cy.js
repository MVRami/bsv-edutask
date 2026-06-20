describe('R8 Todo Tests', () => {

  beforeEach(() => {

    cy.visit('http://localhost:3000')

    // Enter email on login page
    cy.get('input[type=text]')
      .first()
      .type(`test${Date.now()}@example.com`)

    // Go to sign up page
    cy.contains('sign up')
      .click()

    // Enter first name
    cy.contains('First Name')
      .parent()
      .find('input')
      .type('Test')

    // Enter last name
    cy.contains('Last Name')
      .parent()
      .find('input')
      .type('User')

    // Sign up
    cy.contains('Sign Up')
      .click()

    // Verify task page
    cy.get('h1')
      .should('contain.text', 'Your tasks')

    // Create task
    cy.get('input[placeholder*="Title"]')
      .type('Task1')

    cy.get('input[placeholder*="Viewkey"]')
      .type('7vflthZwyrcc')

    cy.contains('Create new Task')
      .click()

    // Open the created task
    cy.get('img')
      .first()
      .click()
  })

  // TC1 - Create Todo with Valid Description
  it('creates a todo', () => {

    cy.get('input[placeholder*="todo"]')
      .type('Testing task')

    cy.contains('Add')
      .click()

    cy.contains('Testing task')
      .should('exist')
  })

  // TC2 - Create Todo with Empty Description
  it('does not create an empty todo', () => {

  cy.get('.todo-item')
    .its('length')
    .then((countBefore) => {

      cy.log('Before: ' + countBefore)

      cy.contains('Add')
        .click()

      cy.wait(1000)

      cy.get('.todo-item')
        .its('length')
        .then((countAfter) => {

          cy.log('After: ' + countAfter)

          expect(countAfter).to.equal(countBefore)
        })
    })
})

  // TC3 - Toggle Active Todo to Completed
  it('toggles a todo', () => {

    cy.get('input[placeholder*="todo"]')
      .type('Testing task')

    cy.contains('Add')
      .click()

    cy.get('[data-testid="toggle-todo"]')
      .first()
      .click()

    cy.get('[data-testid="toggle-todo"]')
      .first()
      .should('have.class', 'checked')
  })

  // TC4 - Toggle Completed Todo Back to Active
  it('toggles completed todo back to active', () => {

  cy.get('input[placeholder*="todo"]')
    .type('Testing task')

  cy.contains('Add')
    .click()

  // Active -> Completed
  cy.get('[data-testid="toggle-todo"]')
    .last()
    .click()

  cy.get('[data-testid="toggle-todo"]')
    .last()
    .should('have.class', 'checked')

  // Completed -> Active (expected behaviour)
  cy.get('[data-testid="toggle-todo"]')
    .last()
    .click()

  cy.get('[data-testid="toggle-todo"]')
    .last()
    .should('have.class', 'unchecked')
})

  // TC5 - Delete Todo Item
  it('deletes a todo', () => {

  cy.get('input[placeholder*="todo"]')
    .type('Testing task')

  cy.contains('Add')
    .click()

  cy.contains('Testing task')
    .should('exist')

  cy.get('[data-testid="delete-todo"]')
    .last()
    .click()

  cy.wait(2000)

  cy.reload()

  cy.contains('Testing task')
    .should('not.exist')
})

})
