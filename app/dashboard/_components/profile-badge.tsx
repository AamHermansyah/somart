import { CircleUserRound } from 'lucide-react'
import React from 'react'

function ProfileBadge() {
  return (
    <div className="w-full flex justify-end">
      <div className="px-6 py-3 flex items-center gap-2 sm:gap-4 rounded-full bg-background shadow-md">
        <h1 className="text-sm sm:text-lg">
          Hello admin, <span className="text-primary font-semibold">Aam Hermansyah</span>!
        </h1>
        <div className="text-xl sm:text-2xl rounded-full h-auto">
          <CircleUserRound />
        </div>
      </div>
    </div>
  )
}

export default ProfileBadge