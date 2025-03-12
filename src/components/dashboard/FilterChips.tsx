
import { cn } from "@/lib/utils";
import { FilterOption } from "@/types/dashboard";

interface FilterChipsProps {
  options: FilterOption[];
  selectedOption: string;
  onSelect: (id: string) => void;
}

export const FilterChips = ({
  options,
  selectedOption,
  onSelect
}: FilterChipsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {options.map(option => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={cn(
            "inline-flex items-center px-3 py-1 text-sm rounded-md transition-colors",
            selectedOption === option.id
              ? "bg-primary text-primary-foreground font-medium"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
