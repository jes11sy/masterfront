import { useQuery } from '@tanstack/react-query';
import api from '../http';

export interface RequestRow {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapApiToRow = (item: any): RequestRow => ({
  id: item.id,
  rk: item.rk || `РК-${item.id}`,
  city: item.city?.name || item.city || '-',
  type: item.request_type?.name || item.type || '-',
  phone: item.client_phone || '-',
  name: item.client_name || '-',
  address: item.address || '-',
  date: item.date || '-',
  direction: item.direction || '-',
  problem: item.problem || '-',
  status: item.status || '-',
  result: item.result || '-',
});

export function useRequests() {
  return useQuery<RequestRow[]>({
    queryKey: ['requests'],
    queryFn: async () => {
      const { data } = await api.get('/api/requests');
      // если backend оборачивает в data
      const list = Array.isArray(data) ? data : data?.data || [];
      return list.map(mapApiToRow);
    },
  });
} 