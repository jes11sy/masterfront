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
  meeting: string;
  direction: string;
  problem: string;
  status: string;
  master: string;
  result: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapApiToRow = (item: any): RequestRow => ({
  id: item.id,
  rk: item.advertising_campaign?.name || '-',
  city: item.city?.name || '-',
  type: item.request_type?.name || '-',
  phone: item.client_phone || '-',
  name: item.client_name || '-',
  address: item.address || '-',
  meeting: item.meeting_date || '-',
  direction: item.direction?.name || '-',
  master: item.master?.name || 'Не назначен',
  problem: item.problem || '-',
  status: item.status || '-',
  result: item.result || '-',
});

export function useRequests(search: string) {
  return useQuery<RequestRow[]>({
    queryKey: ['requests', search],
    queryFn: async () => {
      const params = search.trim() ? { params: { search } } : {};
      const { data } = await api.get('/api/requests/', params);
      const list = Array.isArray(data) ? data : data?.data || [];
      return list.map(mapApiToRow);
    },
  });
} 