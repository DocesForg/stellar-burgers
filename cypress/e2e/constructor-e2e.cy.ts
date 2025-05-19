describe('Тестирование конструктора бургеров', () => {
  const baseUrl = Cypress.config('baseUrl')!;
  const modal = '[data-cy="modal"]';
  const overlay = '[data-cy="modal-overlay"]';
  const bun = '[data-cy="bun"]';
  const ingredients = '[data-cy="ingredients"]';
  const bunConstructor = '[data-cy="bun-constructor"]';
  const itemConstructor = '[data-cy="ingredients-constructor"]';

  beforeEach(() => {
    cy.fixture('ingredients.json').then((data) => {
      cy.intercept('GET', 'api/ingredients', {
        statusCode: 200,
        body: data
      });
    });

    cy.fixture('user.json').then((data) => {
      cy.intercept('GET', 'api/auth/user', {
        statusCode: 200,
        body: data
      }).as('fetchUser');
    });

    cy.fixture('order.json').then((data) => {
      cy.intercept('POST', 'api/orders', {
        statusCode: 200,
        body: data
      }).as('createOrder');
    });

    cy.setCookie('accessToken', 'exampleAccessToken');
    cy.setCookie('refreshToken', 'exampleRefreshToken');

    cy.visit(baseUrl);
  });

  it('открывает и закрывает модальное окно по кнопке и оверлею', () => {
    cy.contains('li', 'Краторная булка N-200i').click();
    cy.get(modal).should('contain', 'Краторная булка N-200i');

    cy.get(modal).find('button').click();
    cy.get(modal).should('not.exist');

    cy.contains('li', 'Филе Люминесцентного тетраодонтимформа').click();
    cy.get(modal).should('contain', 'Филе Люминесцентного тетраодонтимформа');

    cy.get(overlay).click({ force: true });
    cy.get(modal).should('not.exist');
  });

  it('добавляет булку в конструктор', () => {
    cy.get(bunConstructor).should('not.contain', 'Краторная булка N-200i');
    cy.contains('li', 'Краторная булка N-200i').contains('Добавить').click();
    cy.get(bun).should('contain', 'Краторная булка N-200i');
  });

  it('добавляет начинку и соус в конструктор', () => {
    cy.get(bunConstructor).should('not.contain', 'Краторная булка N-200i');
    cy.contains('li', 'Краторная булка N-200i').contains('Добавить').click();
    cy.get(bun).should('contain', 'Краторная булка N-200i');

    cy.get(ingredients).should(
      'not.contain',
      'Филе Люминесцентного тетраодонтимформа'
    );
    cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
      .contains('Добавить')
      .click();
    cy.get(ingredients).should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );

    cy.get(ingredients).should(
      'not.contain',
      'Соус традиционный галактический'
    );
    cy.contains('li', 'Соус традиционный галактический')
      .contains('Добавить')
      .click();
    cy.get(ingredients).should('contain', 'Соус традиционный галактический');
  });

  describe('Оформление заказа', () => {
    it('создает заказ и очищает конструктор', () => {
      cy.get(bunConstructor).should('not.contain', 'Краторная булка N-200i');
      cy.contains('li', 'Краторная булка N-200i').contains('Добавить').click();
      cy.get(bun).should('contain', 'Краторная булка N-200i');

      cy.get(ingredients).should(
        'not.contain',
        'Филе Люминесцентного тетраодонтимформа'
      );
      cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
        .contains('Добавить')
        .click();
      cy.get(ingredients).should(
        'contain',
        'Филе Люминесцентного тетраодонтимформа'
      );

      cy.get(ingredients).should(
        'not.contain',
        'Соус традиционный галактический'
      );
      cy.contains('li', 'Соус традиционный галактический')
        .contains('Добавить')
        .click();
      cy.get(ingredients).should('contain', 'Соус традиционный галактический');

      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@createOrder');

      cy.get(modal).should('contain', '12345');
      cy.get(modal).find('button').click();
      cy.get(modal).should('not.exist');

      cy.get(bunConstructor).should('contain', 'Выберите булки');
      cy.get(itemConstructor).should('contain', 'Выберите начинку');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      cy.clearCookie('refreshToken');
    });
  });
});
