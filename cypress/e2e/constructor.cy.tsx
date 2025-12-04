describe('Burger Constructor', () => {
  const API_URL = 'https://norma.education-services.ru/api';

  beforeEach(() => {
    // Перехватываем запрос на получение ингредиентов
    cy.intercept('GET', `${API_URL}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    // Открываем страницу
    cy.visit('/');

    // Ждём загрузки ингредиентов
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    // Очищаем токены после каждого теста
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.clearCookies();
  });

  it('should add bun to constructor', () => {
    // Находим булку и кликаем на неё, чтобы открыть модальное окно
    cy.contains('Краторная булка N-200i').click();

    // Проверяем, что модальное окно открылось
    cy.contains('Детали ингредиента').should('be.visible');

    // Закрываем модальное окно
    cy.get('[data-cy=modal-close]').click();

    // Проверяем, что модальное окно закрылось
    cy.contains('Детали ингредиента').should('not.exist');

    // Добавляем булку в конструктор через DnD или кнопку "Добавить"
    cy.contains('Краторная булка N-200i')
      .parent()
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    // Проверяем, что булка добавилась в конструктор (верх и низ)
    cy.get('[data-cy=constructor-bun-top]').should(
      'contain',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy=constructor-bun-bottom]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('should add ingredient to constructor', () => {
    // Добавляем начинку
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    // Проверяем, что ингредиент добавился в конструктор
    cy.get('[data-cy=constructor-ingredients]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('should open and close ingredient modal by click on close button', () => {
    // Открываем модальное окно ингредиента
    cy.contains('Филе Люминесцентного тетраодонтимформа').click();

    // Проверяем, что модальное окно открылось
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Филе Люминесцентного тетраодонтимформа').should('be.visible');

    // Закрываем по клику на крестик
    cy.get('[data-cy=modal-close]').click();

    // Проверяем, что модальное окно закрылось
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('should close modal on overlay click', () => {
    // Открываем модальное окно
    cy.contains('Соус Spicy-X').click();

    // Проверяем, что модальное окно открылось
    cy.contains('Детали ингредиента').should('be.visible');

    // Закрываем по клику на оверлей
    cy.get('[data-cy=modal-overlay]').click({ force: true });

    // Проверяем, что модальное окно закрылось
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('should create order', () => {
    // Мокаем запрос на получение данных пользователя
    cy.intercept('GET', `${API_URL}/auth/user`, { fixture: 'user.json' }).as(
      'getUser'
    );

    // Мокаем запрос создания заказа
    cy.intercept('POST', `${API_URL}/orders`, { fixture: 'order.json' }).as(
      'createOrder'
    );

    // Устанавливаем токены ДО посещения страницы
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    cy.setCookie('accessToken', 'test-access-token');

    // Перезагружаем страницу, чтобы приложение проверило авторизацию
    cy.reload();
    cy.wait('@getIngredients');

    // Собираем бургер: добавляем булку
    cy.contains('Краторная булка N-200i')
      .parent()
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    // Добавляем начинку
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    // Добавляем соус
    cy.contains('Соус Spicy-X')
      .parent()
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    // Кликаем на кнопку "Оформить заказ"
    cy.contains('Оформить заказ').click();

    // Ждём ответа от сервера
    cy.wait('@createOrder');

    // Проверяем, что модальное окно с заказом открылось и номер заказа верный
    cy.get('[data-cy=order-number]').should('be.visible');
    cy.get('[data-cy=order-number]').should('contain', '12345');

    // Закрываем модальное окно
    cy.get('[data-cy=modal-close]').click();

    // Проверяем, что модальное окно закрылось
    cy.get('[data-cy=order-number]').should('not.exist');
  });
  it('should display correct ingredient details in modal', () => {
    cy.contains('Филе Люминесцентного тетраодонтимформа').click();

    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Филе Люминесцентного тетраодонтимформа').should('be.visible');

    // Проверяем данные из fixtures/ingredients.json
    cy.contains('643').should('be.visible'); // calories
    cy.contains('44').should('be.visible'); // proteins
    cy.contains('26').should('be.visible'); // fat
    cy.contains('85').should('be.visible'); // carbohydrates

    cy.get('[data-cy=modal-close]').click();
  });
});
