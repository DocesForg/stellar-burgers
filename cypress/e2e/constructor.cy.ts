const bunList = '[data-cy="bun-list"]'; //src/components/ui/burger-ingredients
const dataToppings = '[data-cy="toppings-list"]'; //src/components/ui/burger-ingredients
const dataSauces = '[data-cy="sauces-list"]'; //src/components/ui/burger-ingredients
const dataModal = '[data-cy="modal"]'; //src/components/ui/modal
const dataModalOverlay = '[data-cy="modal-overlay"]'; //src/components/ui/modal-overlay
const closeButton = '[data-cy="modal-close-button"]'; //src/components/ui/modal
const dataBunTop = '[data-cy="bun-top"]'; //src/components/ui/burger-constructor
const dataBunBot = '[data-cy="bun-bot"]'; //src/components/ui/burger-constructor
const dataListToppings = '[data-cy="toppings"]'; //src/components/ui/burger-constructor

describe('интерграционное тестирование', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });

    cy.fixture('order.json').then((order) => {
      cy.intercept('POST', '/api/orders', order);
    });

    cy.fixture('user.json').then((user) => {
      cy.intercept('GET', '/api/auth/user', user);
    });

    cy.viewport(1920, 1080);

    window.localStorage.setItem('accessToken', 'test-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
  });
  describe('Тестирование бургера конструктора', () => {
    it('Должен добавлять булки в конструктор', () => {
      // 1. Ждём загрузки ингредиентов
      cy.get(bunList).should('be.visible');
      cy.get(bunList)
        .contains('li', 'Краторная булка N-200i')
        .find('button')
        .contains('Добавить')
        .click();
      // Проверяем, что булка добавилась в конструктор
      cy.get(dataBunTop).should('contain', 'Краторная булка N-200i');
      cy.get(dataBunBot).should('contain', 'Краторная булка N-200i');
    });

    it('Должен добавлять начинку и соус', () => {
      //Добавляем начинку
      cy.get(dataToppings)
        .contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .contains('Добавить')
        .click({ force: true });
      // Добавляем соус
      cy.get(dataSauces)
        .contains('li', 'Соус Spicy-X')
        .find('button')
        .contains('Добавить')
        .click({ force: true });

      cy.get(dataListToppings).children().should('have.length', 2);
    });
  });

  describe('Тестирование модальных окон', () => {
    it('Должен открыть модальное окно', () => {
      cy.get(bunList).contains('li', 'Краторная булка N-200i').click();
      cy.get(dataModal)
        .should('be.visible')
        .within(() => {
          cy.contains('Краторная булка N-200i').should('exist');
          cy.get('img').should('have.attr', 'src');
        });
    });

    it('Должен закрыть модальное окно по крестику', () => {
      cy.get(bunList).contains('li', 'Краторная булка N-200i').click();
      cy.get(closeButton).click();

      cy.get(dataModal).should('not.exist');
    });

    it('Должен закрыть модальное окно по оверлею', () => {
      cy.get(bunList).contains('li', 'Краторная булка N-200i').click();

      cy.get(dataModalOverlay).click({ force: true });

      cy.get(dataModal).should('not.exist');
    });
  });

  describe('Тестирование создания заказа', () => {
    it('Должен создать заказ', () => {
      // Собираем бургер
      cy.get(bunList)
        .contains('li', 'Краторная булка N-200i')
        .find('button')
        .contains('Добавить')
        .click();
      cy.get(dataToppings)
        .contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .contains('Добавить')
        .click({ force: true });
      cy.get(dataSauces)
        .contains('li', 'Соус Spicy-X')
        .find('button')
        .contains('Добавить')
        .click({ force: true });

          cy.contains('button', 'Оформить заказ').click();
          cy.get(dataModal).should('contain', '77376')
          cy.get(dataModal).should('be.visible');
          cy.get(closeButton).click({ force: true });

        cy.get(dataBunTop).should('not.exist');
        cy.get(dataBunBot).should('not.exist');

        cy.get(dataListToppings).children().should('have.length', 0);
    });
  });
});

afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
