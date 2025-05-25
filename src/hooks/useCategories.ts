
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Fetching categories from Supabase...');
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      console.log('Categories data:', data);

      // Group categories by type
      const showGenres = data?.filter(cat => cat.type === 'show_genre').map(cat => cat.name) || [];
      const ageRatings = data?.filter(cat => cat.type === 'age_rating').map(cat => cat.name) || [];
      const crewSpecialties = data?.filter(cat => cat.type === 'crew_specialty').map(cat => cat.name) || [];
      const cities = data?.filter(cat => cat.type === 'city').map(cat => cat.name) || [];

      return {
        showGenres,
        ageRatings,
        crewSpecialties,
        cities
      };
    },
  });
};
