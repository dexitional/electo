import React, { useEffect, useState } from 'react'
import Photo from '../../public/ucc/logo.png'
import { fetchElectionByActiveCentre, fetchElectionByVoter } from '../../utils/apiClient';
import { useUserStore } from '../../utils/store';
import AppCard from '../AppCard';
import { MdBallot, MdContactSupport, MdGroup, MdGroups2, MdMeetingRoom, MdOutlineSupportAgent, MdPermIdentity } from 'react-icons/md'
import { GiArtificialIntelligence, GiChart, GiHamburger, GiHamburgerMenu, GiHouseKeys, GiLockSpy, GiLockedDoor, GiRamProfile, GiVote } from 'react-icons/gi'
import { ImProfile } from 'react-icons/im'
import { FcCustomerSupport, FcOnlineSupport } from 'react-icons/fc'
import { FaChartArea, FaFileContract, FaShopify } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'


export default function AdminList({page,setPage,setEid }:any) {
    const { admin } = useUserStore((state) => state);
    const [ elections, setElections ] = useState<any>([]);
    const loadElections = async() => {
      const res = await fetchElectionByActiveCentre();
      if(res.success) setElections([...res.data])
    }

    const gotoCentres = () => {
      setPage('centres');
    }

    const gotoVoters = () => {
      setPage('voters');
    }

    const gotoControl = (id: string, name: string) => {
        useUserStore.setState({ eid: id,ename: name })
        setPage('controls');
    }

    useEffect(()=>{
      loadElections()
    },[])
  return (
    <div>
               <h2 className="px-4 py-2 mb-4 bg-slate-100 rounded shadow-inner shadow-slate-300 text-xl font-bold text-gray-800/40">ELECTORAL ADMIN MENUS</h2>
               
               <div className="p-3 md:p-6 w-full bg-slate-50 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
               
               { ['admin','super'].includes(admin?.role) && (
                <AppCard 
                    title="Controls"
                    desc="Admin Controls & Election Management." 
                    Icon={GiHouseKeys} 
                    links={[...(elections.map((row:any) => ({ title: row.tag?.toUpperCase() , url: () => gotoControl(row.id,row.name)} )))]}
                />
               )}

               
               { ['admin','super'].includes(admin?.role) && (
                <AppCard 
                    title="Centres"
                    desc="Voting Stations or Polling Centres." 
                    Icon={ImProfile} 
                    links={[
                      { title:'Goto Module', url: gotoCentres },
                    ]} 
                />
                )}

                {/* <AppCard 
                    title="Elections"
                    desc="Staged Elections in Polling Centres." 
                    Icon={ImProfile} 
                    links={[
                      { title:'Goto Module', url: gotoVoters },
                    ]} 
                 /> */}

                
                <AppCard 
                    title="Verification"
                    desc="Manage voter eligibilty, verification and access." 
                    Icon={ImProfile} 
                    links={[
                      { title:'Goto Module', url: gotoVoters },
                    ]} 
                 />

                 
                 {/* <AppCard 
                    title="Portfolios"
                    desc="Manage election portfolios for electoral groups." 
                    Icon={ImProfile} 
                    links={[...(elections.map((row:any) => ({ title: row.tag?.toUpperCase() , url: () => gotoControl(row.id,row.name)} )))]}
                 /> */}

                 { ['admin','super'].includes(admin?.role) && (
                 <AppCard 
                    title="Candidates"
                    desc="Manage Candidate records and portfolios." 
                    Icon={ImProfile} 
                    links={[...(elections.map((row:any) => ({ title: row.tag?.toUpperCase() , url: () => gotoControl(row.id,row.name)} )))]}
                 />
                )}

                { ['admin','super'].includes(admin?.role) && (
                 <AppCard 
                    title="Coalition"
                    desc="Manage Final Results of election." 
                    Icon={FaFileContract} 
                    links={[
                      { title:'View', url:'#'},
                      { title:'Import', url:'#'},
                      { title:'Export', url:'#'},
                      { title:'Reset', url:'#'},
                    ]} 
                 />
                 )}
                 
                 { ['admin','super'].includes(admin?.role) && (
                 <AppCard 
                    title="Users & Accounts"
                    desc="Manage user accounts and application access controls." 
                    Icon={GiLockedDoor} 
                    links={[
                      { title:'Goto Module', url:'#'},
                    ]} 
                 />
                 )}

             </div>
               
               {/* <div className="flex flex-col sm:flex-wrap sm:flex-row sm:justify-evenly">
                  
                 { ['admin','super'].includes(admin?.role) && (
                  <div className="my-3 p-4 w-full sm:w-80 rounded border border-blue-900">
                      <div className="my-2 flex space-x-2 flex-wrap  items-center justify-center font-bold text-blue-900 text-[11px]">
                        <span className="px-3 py-0.5 rounded-full border-2 border-blue-900">ALL CENTRE-STAGED</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <button onClick={gotoCentres} className="py-4 rounded-b text-white text-lg font-bold bg-blue-900">ELECTIONS</button>
                      </div>
                  </div>
                  )}

                  { ['admin','super'].includes(admin?.role) && (
                  <div className="my-3 p-4 w-full sm:w-80 rounded border border-blue-900">
                      <div className="my-2 flex space-x-2 flex-wrap  items-center justify-center font-bold text-blue-900 text-[11px]">
                        <span className="px-3 py-0.5 rounded-full border-2 border-blue-900">ALL REGISTERED CENTRES</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <button onClick={gotoCentres} className="py-4 rounded-b text-white text-lg font-bold bg-blue-900">USER ACCOUNTS</button>
                      </div>
                  </div>
                  )}
                 
                 
                  { ['admin','super'].includes(admin?.role) && (
                  <div className="my-3 p-4 w-full sm:w-80 rounded border border-blue-900">
                      <div className="my-2 flex space-x-2 flex-wrap  items-center justify-center font-bold text-blue-900 text-[11px]">
                        <span className="px-3 py-0.5 rounded-full border-2 border-blue-900">ALL REGISTERED ELECTION</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <button onClick={gotoCentres} className="py-4 rounded-b text-white text-lg font-bold bg-blue-900">CENTRES</button>
                      </div>
                  </div>
                  )}
                  
                  <div className="my-3 p-4 w-full sm:w-80 rounded border border-blue-900">
                      <div className="my-2 flex space-x-2 flex-wrap  items-center justify-center font-bold text-blue-900 text-[11px]">
                        <span className="px-3 py-0.5 rounded-full border-2 border-blue-900">ALL REGISTERED STUDENT</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <button onClick={gotoVoters} className="py-4 rounded-b text-white text-lg font-bold bg-blue-900">{ ['admin','super'].includes(admin?.role) ? 'VOTERS':'VERIFICATION'}</button>
                      </div>
                  </div>

                  { ['admin','super'].includes(admin?.role) && (
                  <div className="my-3 p-4 w-full sm:w-80 rounded border border-blue-900">
                     <div className="my-2 flex space-x-2 flex-wrap  items-center justify-center font-bold text-blue-900 text-[10px]">
                        { elections.map((row:any) => (
                          <button onClick={() => gotoControl(row.id,row.name)} key={row.id} className="px-3 py-0.5 rounded-full bg-slate-100 border-2 border-blue-900">{row.tag?.toUpperCase()} ELECTION</button>
                          ))
                        }
                      </div>
                      <span className="flex flex-col justify-center">
                        <span className="py-4 rounded-b text-white text-lg text-center font-bold border bg-blue-900 cursor-default">CONTROLS</span>
                      </span>
                  </div>
                   )}

                  { ['admin','super'].includes(admin?.role) && (
                  <div className="my-3 p-4 w-full sm:w-80 rounded border border-blue-900">
                     <div className="my-2 flex space-x-2 flex-wrap  items-center justify-center font-bold text-blue-900 text-[10px]">
                        { elections.map((row:any) => (
                          <button onClick={() => gotoControl(row.id,row.name)} key={row.id} className="px-3 py-0.5 rounded-full bg-slate-100 border-2 border-blue-900">{row.tag?.toUpperCase()} ELECTION</button>
                          ))
                        }
                      </div>
                      <span className="flex flex-col justify-center">
                        <span className="py-4 rounded-b text-white text-lg text-center font-bold border bg-blue-900 cursor-default">PORTFOLIOS</span>
                      </span>
                  </div>
                   )}


                  { ['admin','super'].includes(admin?.role) && (
                  <div className="my-3 p-4 w-full sm:w-80 rounded border border-blue-900">
                     <div className="my-2 flex space-x-2 flex-wrap  items-center justify-center font-bold text-blue-900 text-[10px]">
                        { elections.map((row:any) => (
                          <button onClick={() => gotoControl(row.id,row.name)} key={row.id} className="px-3 py-0.5 rounded-full bg-slate-100 border-2 border-blue-900">{row.tag?.toUpperCase()} ELECTION</button>
                          ))
                        }
                      </div>
                      <span className="flex flex-col justify-center">
                        <span className="py-4 rounded-b text-white text-lg text-center font-bold border bg-blue-900 cursor-default">CANDIDATES</span>
                      </span>
                  </div>
                   )}

                  { ['admin','super'].includes(admin?.role) && (
                  <div className="my-3 p-4 w-full sm:w-80 rounded border border-blue-900">
                      <div className="my-2 flex space-x-2 flex-wrap  items-center justify-center font-bold text-blue-900 text-[10px]">
                         <button onClick={() => null} className="px-3 py-0.5 rounded-full bg-slate-100 border-2 text-blue-900 border-blue-900">LOAD DATA</button>
                         <button onClick={() => null} className="px-3 py-0.5 rounded-full bg-slate-100 border-2 text-green-900 border-green-900">VIEW RESULTS</button>
                         <button onClick={() => null} className="px-3 py-0.5 rounded-full bg-slate-100 border-2 text-red-900 border-red-900">RESET DATA</button>
                         
                      </div>
                      <span className="flex flex-col justify-center">
                        <span className="py-4 rounded-b text-white text-lg text-center font-bold border bg-blue-900 cursor-default">FINAL COALITION</span>
                      </span>
                  </div>
                   )}

                 
                 
                 
               </div> */}
             </div>
  )
}