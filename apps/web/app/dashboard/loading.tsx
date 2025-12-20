import { PasswordSkeleton } from "@/components/PasswordSkeleton";

export default function LoadingDashboard() {
  return (
    <div className="pb-2 px-4 mx-auto max-w-3xl">
      {Array.from({ length: 10 }).map((_, i) => (
        <PasswordSkeleton key={i} />
      ))}
    </div>
  );
}