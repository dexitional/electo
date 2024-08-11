import React from 'react'
import { IconType } from 'react-icons';

type Props = {
    title: string | null;
    Icon: IconType | null;
}

function BadgeIcon({ title,Icon = null }: Props) {
  return (
    <button className="px-1.5 py-0.5 w-fit flex items-center space-x-1 text-xs rounded border border-blue-900/60 bg-blue-900/5 ">
      { Icon ? <Icon className="h-4 w-4" />: null }
      <span className="font-semibold  text-blue-900/60">{title}</span>
    </button>
  )
}

export default BadgeIcon