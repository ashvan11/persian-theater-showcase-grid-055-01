
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useSliders = () => {
  return useQuery({
    queryKey: ['sliders'],
    queryFn: async () => {
      console.log('Fetching sliders from Supabase...');
      
      const { data, error } = await supabase
        .from('sliders')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('Error fetching sliders:', error);
        throw error;
      }

      console.log('Sliders data:', data);
      return data || [];
    },
  });
};
