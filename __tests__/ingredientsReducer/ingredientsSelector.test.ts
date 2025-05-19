describe('ingredients selectors', () => {
  const mockIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0
  };

  const state = {
    ingredients: {
      ingredients: [mockIngredient],
      isLoading: true,
      error: 'Ошибка загрузки'
    }
  };

  it('возвращает ingredients из state.ingredients', () => {
    expect(state.ingredients.ingredients).toEqual([mockIngredient]);
  });

  it('возвращает error из state.ingredients', () => {
    expect(state.ingredients.error).toBe('Ошибка загрузки');
  });

  it('возвращает isLoading из state.ingredients', () => {
    expect(state.ingredients.isLoading).toBe(true);
  });

  it('возвращает все значения через деструктуризацию', () => {
    const { ingredients, error, isLoading } = state.ingredients;
    expect(ingredients).toEqual([mockIngredient]);
    expect(error).toBe('Ошибка загрузки');
    expect(isLoading).toBe(true);
  });
});
