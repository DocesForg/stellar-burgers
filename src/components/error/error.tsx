import React from 'react';
import styles from './error.module.css';

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <p>{message}</p>
);
