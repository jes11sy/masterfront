import { Title } from '@mantine/core';
import classes from './AppHeader.module.css';
import logoImg from '../assets/logo.png';

export default function AppHeader() {
  return (
    <header className={classes.header}>
      <img src={logoImg} alt="logo" className={classes.logo} />
      <Title order={3} className={classes.title}>
        Новые Схемы
      </Title>
    </header>
  );
} 