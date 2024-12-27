import { ShineBorder } from "@/components/ui/shine-border";

interface ShineBorderDemoProps {
  className?: string;
  color?: string[];
  children: React.ReactNode;
}

export function ShineBorderDemo({ className, color, children }: ShineBorderDemoProps) {
  return (
    <ShineBorder
      className={className}
      color={color}
      borderWidth={2}
      duration={8}
    >
      {children}
    </ShineBorder>
  );
}
