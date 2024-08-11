import Link from 'next/link'
import React from 'react'
import { MdApps, MdDataset } from 'react-icons/md'

function AppCard({ title, desc, Icon, links }:any) {
  return (
    <div className="p-3 md:px-6 md:py-4 md:h-44 bg-white rounded border flex group">
        {/* <img src={Logo} alt="" className="w-40 h-20 object-contain" /> */}
        <div className="w-20 md:w-28 flex justify-center">
            { Icon 
                ? (<Icon className="w-16 h-16 md:w-20 md:h-20 text-blue-900/50" />)
                : (<MdDataset className="w-16 h-16 md:w-20 md:h-20 text-zinc-500/80" />)
            }
            {/* <MdApps className="w-16 h-16 md:w-20 md:h-20 text-zinc-500/80" /> */}
            {/* <img src={Logo} alt="" className="w-20 h-20 object-contain" /> */}
        </div>
        <div className=" flex-1 space-y-3">
            <h1 className="text-lg md:text-2xl text-blue-950/70 font-medium font-sans">{title}</h1>
            <p>{desc}</p>
            <div className="flex w-fit md:w-full flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                { links.map( (l:any,i: React.Key) => (
                     <button onClick={l.url} key={i} className="py-2 px-3 rounded bg-zinc-100 group-hover:cursor-pointer group-hover:bg-red-100 text-xs md:text-sm text-zinc-500 font-medium">{l.title}</button>
                )) }
            </div>
        </div>
    </div>
  )
}

export default AppCard