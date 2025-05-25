
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useReviewsByShow = (showId: string) => {
  return useQuery({
    queryKey: ['reviews', showId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (
            first_name,
            last_name,
            avatar_url,
            is_verified
          )
        `)
        .eq('show_id', showId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching reviews:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!showId,
  });
};
