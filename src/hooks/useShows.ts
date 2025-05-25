
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useShows = () => {
  return useQuery({
    queryKey: ['shows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shows')
        .select(`
          *,
          theaters (
            name,
            address,
            city
          ),
          show_crew (
            role_in_show,
            crew_members (
              id,
              stage_name,
              profile_id,
              profiles (
                first_name,
                last_name,
                avatar_url,
                is_verified
              )
            )
          )
        `)
        .eq('status', 'published');
      
      if (error) {
        console.error('Error fetching shows:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useShowById = (id: string) => {
  return useQuery({
    queryKey: ['show', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shows')
        .select(`
          *,
          theaters (
            name,
            address,
            city,
            capacity
          ),
          show_crew (
            role_in_show,
            crew_members (
              id,
              stage_name,
              bio,
              profile_id,
              profiles (
                first_name,
                last_name,
                avatar_url,
                is_verified
              )
            )
          ),
          reviews (
            id,
            rating,
            comment,
            created_at,
            profiles (
              first_name,
              last_name,
              avatar_url
            )
          ),
          showtimes (
            id,
            date_time,
            available_seats
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching show:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!id,
  });
};
