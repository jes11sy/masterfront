import { Paper, Badge, TextInput, Group } from '@mantine/core';
import { useState, useMemo } from 'react';
import { DataTable, type DataTableColumn } from 'mantine-datatable';

interface RequestRow {
  id: number;
  rk: string;
  city: string;
  type: string;
  phone: string;
  name: string;
  address: string;
  date: string;
  direction: string;
  problem: string;
  status: string;
  result: string;
}

const dummyData: RequestRow[] = [
  {
    id: 1,
    rk: 'РК-001',
    city: 'Москва',
    type: 'Установка',
    phone: '+7 (999) 123-45-67',
    name: 'Иван Иванов',
    address: 'ул. Пушкина, д. 10',
    date: '10.05.2025',
    direction: 'Север',
    problem: 'Не работает датчик',
    status: 'Новая',
    result: '-'
  },
  {
    id: 2,
    rk: 'РК-002',
    city: 'Санкт-Петербург',
    type: 'Ремонт',
    phone: '+7 (921) 456-78-90',
    name: 'Пётр Петров',
    address: 'пр. Ленина, д. 5',
    date: '12.05.2025',
    direction: 'Запад',
    problem: 'Сбои ПО',
    status: 'В работе',
    result: '-'
  },
  {
    id: 3,
    rk: 'РК-003',
    city: 'Казань',
    type: 'Консультация',
    phone: '+7 (843) 111-22-33',
    name: 'Анна Смирнова',
    address: 'ул. Баумана, д. 3',
    date: '15.05.2025',
    direction: 'Восток',
    problem: 'Вопрос по тарифу',
    status: 'Закрыта',
    result: 'Успех'
  }
];

export default function Requests() {
  const headerStyle = {
    position: 'sticky' as const,
    top: 0,
    backgroundColor: 'transparent', // Removed theme.colorScheme as per new_code
    zIndex: 1,
  };

  const columns: DataTableColumn<RequestRow>[] = [
    { accessor: 'id', title: 'ID', width: 60 },
    { accessor: 'rk', title: 'РК' },
    { accessor: 'city', title: 'Город' },
    { accessor: 'type', title: 'Тип заявки' },
    { accessor: 'name', title: 'Клиент' },
    { accessor: 'address', title: 'Адрес' },
    { accessor: 'date', title: 'Дата встречи' },
    { accessor: 'direction', title: 'Направление' },
    { accessor: 'problem', title: 'Проблема' },
    {
      accessor: 'status',
      title: 'Статус',
      width: 100,
      render: ({ status }) => (
        <Badge color={status === 'Новая' ? 'blue' : status === 'В работе' ? 'yellow' : 'green'} radius="sm">
          {status}
        </Badge>
      ),
    },
    {
      accessor: 'result',
      title: 'Итог',
      width: 80,
      render: ({ result }) => (result !== '-' ? <Badge color={result === 'Успех' ? 'green' : 'red'}>{result}</Badge> : '—'),
    },
  ];

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const filtered = useMemo(() => {
    if (!search.trim()) return dummyData;
    return dummyData.filter((row) =>
      Object.values(row).some((value) => value.toString().toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  const totalRecords = filtered.length;
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Group mb="sm">
        <TextInput
          placeholder="Поиск..."
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setPage(1);
          }}
          w={250}
        />
      </Group>
      <Paper shadow="sm" radius="md" p="md" withBorder style={{ width: '100%', maxWidth: 'none' }}>
        <DataTable
          withTableBorder
          borderRadius="md"
          shadow="sm"
          striped
          highlightOnHover
          withRowBorders
          horizontalSpacing="sm"
          verticalSpacing="sm"
          styles={{ footer: { display: 'flex', justifyContent: 'flex-end' } }}
          columns={columns}
          records={pageData}
          totalRecords={totalRecords}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={setPage}
          paginationText={() => null}
        />
      </Paper>
    </>
  );
} 