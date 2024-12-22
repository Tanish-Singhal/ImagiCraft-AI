import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-8rem)]">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
};

export default Loading;
