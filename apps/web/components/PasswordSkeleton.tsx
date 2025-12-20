export function PasswordSkeleton() {
  return (
    <div className="flex justify-between items-center bg-cyan-50 border border-cyan-300 mt-3 px-4 h-16 rounded-xl shadow-sm animate-pulse">
      <div className="h-4 w-40 bg-slate-200 rounded-md" />

      <div className="flex items-center gap-2">
        <div className="h-8 w-16 bg-slate-200 rounded-md" />
        <div className="h-8 w-8 bg-slate-200 rounded-md" />
      </div>
    </div>
  );
}
