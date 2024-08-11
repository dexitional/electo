import React from 'react'

type Props = {
    title: string;
}

function Badge({ title }: Props) {
  return (
    <span className="px-1.5 py-0.5 text-xs font-medium rounded border border-gray-300/40 bg-gray-300/10 text-gray-400">{title}</span>
  )
}

export default Badge