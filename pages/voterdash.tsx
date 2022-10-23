import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import OmegaVoting from '../components/voter/OmegaVoting';
import Receipt from '../components/voter/Receipt';
import VoterList from '../components/voter/VoterList';
import Voting from '../components/voter/Voting';
import VoterLayout from '../components/VoterLayout';
import Photo from '../public/ucc/logo.png'
import { useUserStore } from '../utils/store';

export default function VoterDash() {
  const user = useUserStore((state) => state.user);
  const [ eid, setEid ] = useState<any>(null);
  const [ page, setPage ] = useState<any>('omega');
  const router = useRouter();
  
  const logOut = () => {
    const ok = window.confirm("Logout session ? ")
    if(ok){
      const access = user.access;
      if(access == 'voter') router.push('/voterlogin');
      useUserStore.setState({ user:null })
    }
  }
  const Switcher = () => {
    switch(page){
      case 'list': return <VoterList page={page} setPage={setPage} setEid={setEid} />; break;
      case 'omega': return <OmegaVoting page={page} setPage={setPage} setEid={setEid} />; break;
      case 'voting': return <Voting setPage={setPage} eid={eid} />; break;
      case 'receipt': return <Receipt setPage={setPage} setEid={setEid} />; break;
      default: return <OmegaVoting setPage={setPage} setEid={setEid} />; break;
    }
  }
  useEffect(()=>{
   
  },[])
  return (
    <VoterLayout>
    <h3></h3>
    <div className="w-full flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:justify-center sm:space-x-6">
        <div className="p-2 w-56 rounded border ">
            <div className="p-1 h-48 rounded bg-slate-100 flex items-center justify-center">
               {user && <img src={`/api/photos/?tag=voter&eid=${user?.tag}` || Photo.src} className="h-44 object-cover rounded-md opacity-60 overflow-hidden"/> }
            </div>
            <div>
               <h2 className="my-2 pt-2 font-medium text-gray-700 text-md uppercase">{user?.name}</h2>
               <p className="text-xs text-gray-600 font-medium">{user?.descriptor}</p>
            </div>
            <button onClick={logOut} className="w-full mt-4 py-1 rounded border-2 border-blue-900 text-sm text-blue-900 font-semibold">LOG OUT</button>
        </div>

        <div className="p-4 flex-1 rounded border">
             <Switcher />
        </div>
    </div>
  </VoterLayout>
  )
}
