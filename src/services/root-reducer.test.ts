import { RootReducer } from "./root-reducer";
import { userSlice } from "./slices/user-slice";
import { constructorSlice } from "./slices/constructor-slice";
import { ingredientsSlice } from "./slices/ingredients-slice";
import { feedSlice } from "./slices/feed-slice";
import { orderSlice } from "./slices/order-slice";
import { createNewOrderSlice} from "./slices/new-order-slice";

describe('Проверка работы корневого редьюсера', () => {
    it('Должен вернуть начальное состояние хранилища', () => {
        const state = RootReducer(undefined, {type: 'UNKNOWN_ACTION'})

        expect(state.user).toEqual(userSlice.getInitialState())
        expect(state.constructorSlice).toEqual(constructorSlice.getInitialState())
        expect(state.ingredients).toEqual(ingredientsSlice.getInitialState())
        expect(state.feed).toEqual(feedSlice.getInitialState())
        expect(state.order).toEqual(orderSlice.getInitialState())
        expect(state.createNewOrder).toEqual(createNewOrderSlice.getInitialState())
    })

    it('Должен вернуть все редьюсеры', () => {
        const state = RootReducer(undefined, {type: ''})
        expect(state).toHaveProperty('user')
        expect(state).toHaveProperty('constructorSlice')
        expect(state).toHaveProperty('ingredients')
        expect(state).toHaveProperty('feed')
        expect(state).toHaveProperty('order')
        expect(state).toHaveProperty('createNewOrder')
        })
    })
