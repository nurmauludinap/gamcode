import { challengeOptions, challenges } from "@/db/schema"
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number | number[]) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number | number[];
  disabled?: boolean;
  type: typeof challenges.$inferSelect["type"];
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type
}: Props) => {
  const hasMultipleCorrectAnswers = options.filter((option) => option.correct).length > 1;

  const handleSelect = (id: number) => {
    if (disabled) return;

    if (hasMultipleCorrectAnswers) {
      const selected = Array.isArray(selectedOption) ? selectedOption : [];
      const isSelected = selected.includes(id);
      if (isSelected) {
        onSelect(selected.filter((optionId) => optionId !== id));
      } else {
        onSelect([...selected, id]);
      }
    } else {
      onSelect(id);
    }
  };

  return (
    <div className={cn(
      "flex flex-wrap justify-between",
      // "grid gap-2",
      type === "ASSIST" && "grid-cols-1",
      type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
    )}>
      {options.map((option, i) => (
        <div 
        key={i}
        className="w-full md:w-[calc(50%-8px)] mb-4"
        >
          <Card
            key={option.id}
            id={option.id}
            text={option.text}
            imageSrc={option.imageSrc}
            shortcut={String.fromCharCode(65 + i)}
            // selected={selectedOption === option.id}
            // onClick={() => onSelect(option.id)}
            selected={
              Array.isArray(selectedOption)
                ? selectedOption.includes(option.id)
                : selectedOption === option.id
            }
            onClick={() => handleSelect(option.id)}
            status={status}
            audioSrc={option.audioSrc}
            disabled={disabled}
            type={type}
          />
        </div>
      ))}
    </div>
  );
};