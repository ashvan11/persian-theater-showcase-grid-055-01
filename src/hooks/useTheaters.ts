
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useTheaters = () => {
  return useQuery({
    queryKey: ['theaters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('theaters')
        .select(`
          *,
          shows (
            id,
            title,
            poster_url,
            price,
            status
          )
        `);
      
      if (error) {
        console.error('Error fetching theaters:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useTheaterById = (id: string) => {
  return useQuery({
    queryKey: ['theater', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('theaters')
        .select(`
          *,
          shows (
            id,
            title,
            poster_url,
            price,
            status,
            start_date,
            end_date
          ),
          seats (
            id,
            row_number,
            seat_number,
            section
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching theater:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!id,
  });
};
