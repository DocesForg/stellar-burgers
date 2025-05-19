import { FC, useMemo, useState, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { getOrderByNumberApi } from '@api';
import { useParams } from 'react-router-dom';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const [orderData, setOrderData] = useState({
    createdAt: '',
    ingredients: [''],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const ingredients: TIngredient[] = useSelector(ingredientsSelector);

  const { number } = useParams<{ number: string }>();

  useEffect(() => {
    if (!number) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    getOrderByNumberApi(Number(number))
      .then((data) => {
        if (data.orders && data.orders.length > 0) {
          setOrderData(data.orders[0]);
        }
      })
      .catch((err) => {
        console.error('Неудалось получить номер заказа', err);
      })

      .finally(() => {
        setIsLoading(false);
      });
  }, [number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
