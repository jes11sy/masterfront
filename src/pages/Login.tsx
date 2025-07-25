import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Stack,
  Center,
  Text,
  Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
// import logoImg from '../assets/logo.png';
import { IconUser, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';

export default function Login() {
  const form = useForm({
    initialValues: {
      login: '',
      password: '',
    },
    validate: {
      login: (value) => (value.trim().length < 3 ? 'Минимум 3 символа' : null),
      password: (value) => (value.length < 6 ? 'Минимум 6 символов' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Login', values);
    // Здесь будет запрос на API и редирект
  };

  return (
    <Box style={{ background: '#112421', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Center h="100vh" w="100vw">
        <Paper shadow="xl" radius="lg" p="xl" w={{ base: 340, sm: 420 }} style={{ background:'#1e1e1e', border:'1px solid #1f3b34' }}>
          <Stack align="center" mb="md">
            <Title order={3} ta="center" style={{ color:'#2fa37b' }}>
              Вход в систему
            </Title>
            <Text size="sm" style={{ color:'#a9c7bf' }}>
              Введите логин и пароль
            </Text>
          </Stack>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="Логин"
                placeholder="username"
                leftSection={<IconUser size={16} />}
                radius="md"
                {...form.getInputProps('login')}
              />
              <PasswordInput
                label="Пароль"
                placeholder="Ваш пароль"
                radius="md"
                leftSection={<IconLock size={16} />}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <IconEyeOff size={16} /> : <IconEye size={16} />
                }
                {...form.getInputProps('password')}
              />
              <Button type="submit" fullWidth color="green" radius="md">
                Войти
              </Button>
            </Stack>
          </form>
        </Paper>
      </Center>
    </Box>
  );
} 