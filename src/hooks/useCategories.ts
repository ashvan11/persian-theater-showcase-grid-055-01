
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Static categories and subcategories for now
// Later we can move these to database tables
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      // For now, return static data
      // Later we can fetch from database
      return {
        showGenres: [
          "کلاسیک",
          "مدرن", 
          "تراژدی",
          "کمدی",
          "درام",
          "موزیکال",
          "تجربی",
          "پست مدرن",
          "طنز",
          "اجتماعی",
          "روانشناختی",
          "کودک",
          "خردسال",
          "نوجوان",
          "خانوادگی",
          "آموزشی",
          "عروسکی"
        ],
        ageRatings: [
          "عمومی",
          "کودک",
          "نوجوان",
          "+12",
          "+15",
          "+18"
        ],
        crewSpecialties: [
          "بازیگری",
          "کارگردانی",
          "نویسندگی",
          "طراحی صحنه",
          "طراحی لباس",
          "طراحی نور",
          "موسیقی",
          "رقص",
          "تئاتر عروسکی",
          "میکس و مونتاژ",
          "مدیریت اجرا"
        ],
        cities: [
          "تهران",
          "اصفهان",
          "شیراز",
          "تبریز",
          "مشهد",
          "کرج",
          "رشت",
          "اهواز",
          "کرمان",
          "یزد"
        ]
      };
    },
  });
};
