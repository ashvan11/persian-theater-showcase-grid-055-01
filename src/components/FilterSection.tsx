
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface FilterState {
  where: string;
  when: string;
  how: string;
}

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
}

const FilterSection = ({ onFilterChange }: FilterSectionProps) => {
  const [filters, setFilters] = useState<FilterState>({
    where: "",
    when: "",
    how: ""
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-card border border-border/40 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">فیلتر نمایش‌ها</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Where Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">کجا</label>
          <Select value={filters.where} onValueChange={(value) => handleFilterChange("where", value)}>
            <SelectTrigger className="text-right">
              <SelectValue placeholder="انتخاب شهر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tehran">تهران</SelectItem>
              <SelectItem value="isfahan">اصفهان</SelectItem>
              <SelectItem value="shiraz">شیراز</SelectItem>
              <SelectItem value="mashhad">مشهد</SelectItem>
              <SelectItem value="tabriz">تبریز</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* When Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">کی</label>
          <Select value={filters.when} onValueChange={(value) => handleFilterChange("when", value)}>
            <SelectTrigger className="text-right">
              <SelectValue placeholder="انتخاب زمان" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">امروز</SelectItem>
              <SelectItem value="tomorrow">فردا</SelectItem>
              <SelectItem value="this-week">این هفته</SelectItem>
              <SelectItem value="next-week">هفته آینده</SelectItem>
              <SelectItem value="this-month">این ماه</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* How Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">چطور</label>
          <Select value={filters.how} onValueChange={(value) => handleFilterChange("how", value)}>
            <SelectTrigger className="text-right">
              <SelectValue placeholder="نوع نمایش" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">کلاسیک</SelectItem>
              <SelectItem value="modern">مدرن</SelectItem>
              <SelectItem value="children">کودک</SelectItem>
              <SelectItem value="musical">موزیکال</SelectItem>
              <SelectItem value="solo">تک نفره</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            const resetFilters = { where: "", when: "", how: "" };
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
          className="px-4 py-2 text-sm border border-border/40 rounded-lg hover:bg-accent transition-colors"
        >
          پاک کردن فیلترها
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
