
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCrewMembers = () => {
  return useQuery({
    queryKey: ['crew-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crew_members')
        .select(`
          *,
          profiles (
            first_name,
            last_name,
            avatar_url,
            is_verified,
            email
          ),
          show_crew (
            role_in_show,
            shows (
              title,
              poster_url
            )
          )
        `);
      
      if (error) {
        console.error('Error fetching crew members:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useCrewMemberById = (id: string) => {
  return useQuery({
    queryKey: ['crew-member', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crew_members')
        .select(`
          *,
          profiles (
            first_name,
            last_name,
            avatar_url,
            is_verified,
            email,
            phone
          ),
          show_crew (
            role_in_show,
            shows (
              id,
              title,
              poster_url,
              start_date,
              end_date
            )
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching crew member:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!id,
  });
};
