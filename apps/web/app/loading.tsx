export default function Loading() {
  return (
    <div className="w-full flex justify-center px-4 
                    mt-52 sm:mt-44 md:mt-40 lg:mt-32">
      <div className="text-center max-w-2xl animate-pulse">

        {/* Main heading */}
        <div className="mx-auto h-8 sm:h-10 md:h-12 
                        w-64 sm:w-80 md:w-[420px] 
                        bg-slate-200 rounded-md" />

        {/* Second heading line */}
        <div className="mx-auto mt-3 h-8 sm:h-10 md:h-12 
                        w-72 sm:w-96 md:w-[460px] 
                        bg-slate-200 rounded-md" />

        {/* Description lines */}
        <div className="mt-6 space-y-2 px-2">
          <div className="mx-auto h-3 sm:h-4 w-72 sm:w-96 bg-slate-200 rounded" />
          <div className="mx-auto h-3 sm:h-4 w-64 sm:w-80 bg-slate-200 rounded" />
          <div className="mx-auto h-3 sm:h-4 w-80 sm:w-[420px] bg-slate-200 rounded" />
        </div>

        {/* Button skeleton */}
        <div className="mt-8 flex justify-center">
          <div className="h-10 w-36 sm:w-44 
                          bg-slate-200 rounded-3xl" />
        </div>

      </div>
    </div>
  );
}
