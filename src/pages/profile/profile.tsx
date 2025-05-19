import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { userDataSelector } from '../../services/slices/user-slice';
import { updateUserProfile } from '../../services/thunk/user-thunk';

export const Profile: FC = () => {
  const user = useSelector(userDataSelector);
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [updateUserError, setUpdateUserError] = useState('');

  useEffect(() => {
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setShowPasswordField(false);
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    (showPasswordField && !!formValue.password);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateUserError('');
    try {
      await dispatch(
        updateUserProfile({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password
        })
      ).unwrap();
      setShowPasswordField(false);
      setFormValue((prev) => ({ ...prev, password: '' }));
    } catch (error) {
      setUpdateUserError('Ошибка при обновлении профиля');
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
      setShowPasswordField(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));

    if (name === 'password' && !showPasswordField) {
      setShowPasswordField(true);
    }
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
