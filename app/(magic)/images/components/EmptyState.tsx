const EmptyState = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-8rem)]">
      <p className="text-muted-foreground font-semibold text-3xl">
        No images generated yet
      </p>
    </div>
  );
};

export default EmptyState;
