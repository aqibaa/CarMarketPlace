import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function CarItemSkeleton() {
  return (
    <div className="rounded-xl border space-y-3 p-3">
      <Skeleton className="h-45 w-full rounded-xl bg-slate-200" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-slate-200" />
        <Skeleton className="h-4 w-[80%] bg-slate-200" />
      </div>
      <div className='flex justify-between items-center mt-4'>
        <Skeleton className="h-8 w-20 bg-slate-200" />
        <Skeleton className="h-4 w-16 bg-slate-200" />
      </div>
    </div>
  )
}

export default CarItemSkeleton