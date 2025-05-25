
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useShowtimesByShow = (showId: string) => {
  return useQuery({
    queryKey: ['showtimes', showId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('showtimes')
        .select('*')
        .eq('show_id', showId)
        .gte('date_time', new Date().toISOString())
        .order('date_time', { ascending: true });
      
      if (error) {
        console.error('Error fetching showtimes:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!showId,
  });
};
