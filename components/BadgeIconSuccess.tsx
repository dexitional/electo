import React from 'react'
import { IconType } from 'react-icons';

type Props = {
    title: string | null;
    Icon: IconType | null;
}

function BadgeIconSuccess({ title,Icon = null }: Props) {
  return (
    <button className="px-1.5 py-0.5 w-fit flex items-center space-x-1 text-xs rounded border border-green-900/60 bg-green-900/10 ">
      { Icon ? <Icon className="h-4 w-4 text-green-900/60" />: null }
      <span className="font-semibold  text-green-900/80">{title}</span>
    </button>
  )
}
// ar/baa/22/0127
export default BadgeIconSuccess