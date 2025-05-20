const SkeletonLoader = () => {
  debugger;
  return (
    <div className="flex flex-col items-center justify-center py-20 text-cyan-600 dark:text-cyan-400">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-3xl font-medium">Завантаження...</span>
    </div>
  );
};

export default SkeletonLoader;
