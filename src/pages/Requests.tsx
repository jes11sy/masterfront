import { Paper, Badge, TextInput, Group, Loader, Center } from '@mantine/core';
import { useState, useMemo } from 'react';
import { DataTable, type DataTableColumn } from 'mantine-datatable';
import { useRequests, type RequestRow } from '../api/hooks/useRequests';

export default function Requests() {

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

  const { data: requests, isLoading, isError } = useRequests();

  const filtered = useMemo(() => {
    if (!requests) return [];
    if (!search.trim()) return requests;
    return requests.filter((row) =>
      Object.values(row).some((value) => value.toString().toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, requests]);

  if (isLoading) return <Center><Loader /></Center>;
  if (isError) return <Center>Ошибка загрузки данных</Center>;

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