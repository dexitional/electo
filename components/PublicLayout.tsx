import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUserStore } from '../utils/store'


export default function PublicLayout({ children,title }: any) {
  const router = useRouter()
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    
  },[])
  
  return (
    <div className="w-screen flex flex-col justify-start bg-slate-50/90">
        <div className="flex m-0 p-0">
            <div className="w-full">
               <div className="flex-1 m-2 p-2 sm:m-6 sm:p-6 rounded-md drop-shadow-sm bg-white border-[0.5px] border-gray-200">
                  {children}
               </div>
            </div>
        </div>
       
    </div>
  )
}
