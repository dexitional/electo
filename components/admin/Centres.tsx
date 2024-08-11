import { useRouter } from 'next/router'
import Notiflix from 'notiflix'
import React, { useEffect, useState } from 'react'
import { BiPhotoAlbum } from 'react-icons/bi'
import { MdOutlineArticle, MdOutlinePending, MdVerified, MdWarning } from 'react-icons/md'
import { activateCentre, fetchCentres, loadCentre, loadPhoto, resetCentreElections, setupVoters } from '../../utils/apiClient'
import { useUserStore } from '../../utils/store'
import Badge from '../Badge'
import BadgeIcon from '../BadgeIcon'
import PagerNew from '../PagerNew'
//import Logo from '../../public/loader.gif'

const data = [];
export default function Centres({setPage}: any) {
  const [ action, setAction ] = useState<any>(null);
  const [ data,setData ] = useState<any>([]);
  const [ keyword,setKeyword ] = useState<string>("");
  const [ activity,setActivity ] = useState<any>({})
  const { user, eid, ename } = useUserStore((state) => state);
  const router = useRouter()
  
  const loadCentres = async () => {
    const res  = await fetchCentres()
    if(res.success){
      setData(res.data)
    }
  }

  const loadVoters = async (id:string) => {
    setActivity({...activity, [id]:true })
    try{
      const res  = await loadCentre(id)
      console.log(res)
      if(res.success){
        Notiflix.Notify.success('VOTERS DATA STAGED FOR CENTRE!');
        setActivity({...activity, [id]:false })
      }
    } catch(e){
      setActivity({...activity, [id]:false })
    }
  }

  const loadPhotos = async (id:string) => {
    setActivity({...activity, [id]:true })
    try{
      const res  = await loadPhoto(id)
      console.log(res)
      if(res.success){
        Notiflix.Notify.success('PHOTOS STAGED FOR CENTRE!');
        setActivity({...activity, [id]:false })
      }
    } catch(e){
      setActivity({...activity, [id]:false })
    }
  }

  const addElection = async (id:string) => {
    const res  = await setupVoters(id)
    if(res.success){
      loadCentres()
    }
  }

  const setCentre = async (id:string) => {
    const res  = await activateCentre(id)
    if(res.success){
      Notiflix.Notify.success('CENTRE ACTIVATED!');
      loadCentres()
    }
  }

  const resetElections = async (id:string) => {
    const ok = window.confirm("RESET ALL THIS CENTRE ELECTIONS ?")
    if(ok){
      const res  = await resetCentreElections(id)
      if(res.success){
        Notiflix.Notify.success('CENTRE ELECTIONS RESET!');
        loadCentres()
      }
    }
  }

  

  const onChange = (e:any) => {
    e.preventDefault();
    setKeyword(e.target.value)
  }

  const onSubmit = (e:any) => {
    e.preventDefault();
    setKeyword(e.target.value)
  }

  useEffect(() => {
    loadCentres()
  },[])

  return (
    <>
    <PagerNew onChange={onChange} onSubmit={onSubmit} keyword={keyword} count={data.length} onClick={()=> setPage('list')}  />
    {/* <Table
        header={
          <div className="gap-y-1 gap-x-3 grid grid-cols-4 text-center">
              <span className="col-span-2 text-left font-semibold">NAME</span>
              <span className="col-span-1 font-semibold">DEFAULT</span>
              <span className="col-span-1 font-semibold">
                <button onClick={()=> setPage('list')} className="p-1 px-2 w-16 inline-block border border-blue-900 bg-slate-50 text-blue-900 text-xs uppercase font-medium rounded"><b>BACK</b></button> 
              </span>
          </div>
        }>

        <div className="gap-y-4 gap-x-3 grid grid-cols-4 text-center overflow-scroll-y max-h-screen">
            { data?.filter((r:any) => r.name.toLowerCase().includes(keyword.toLowerCase()) || r.tag.toLowerCase().includes(keyword.toLowerCase()))?.map(( row:any, i:React.Key ) => (
            <React.Fragment key={i}>
            <span className="col-span-2 font-bold text-left flex flex-row space-x-4">
              <a href={`/api/photos/?tag=centre&eid=${row.tag}`} target="_blank  ">
                 <img src={`/api/photos/?tag=centre&eid=${row.tag}`} className="h-10 rounded border" />
              </a>
              <span>{row.name} ELECTION CENTRE <em className="block text-blue-900 font-semibold">{row.tag}</em></span>
            </span>
            <span className={`${row.default == 1 && 'text-lg text-green-600 rounded  flex items-center justify-center'} col-span-1 text-center font-bold`}>{ row.default == 1 ? 'YES':'NO' }</span>
           
            <span className="col-span-1 flex items-center justify-center">
               <div className="flex items-center justify-center space-x-1 flex-wrap sm:flex-nowrap">
                   { row.default == 0 && (<button onClick={() => setCentre(row.id)} className='text-[10px] font-semibold flex items-center justify-center px-2 py-0 rounded ring-1 ring-slate-600 bg-slate-600 text-white border border-white'>SET ACTIVE</button>)}
                   { row.default == 1 && (<span className='flex items-center justify-center px-2 p-0.5 rounded border border-green-900 font-bold text-[10px] text-green-900'>ACTIVE</span>) }
                   <button onClick={() => loadVoters(row.id)} className='text-[10px] font-semibold flex items-center justify-center px-2 py-0 rounded-sm ring-1 ring-slate-500 bg-slate-500 text-white border border-white'>{ !activity[row.id] ? 'LOAD':'STAGING...'}</button>
                   <button onClick={() => loadPhotos(row.id)} className='text-[10px] font-semibold flex items-center justify-center px-2 py-0 rounded-sm ring-1 ring-slate-500 bg-slate-500 text-white border border-white'><TbPlus className="font-bold" /><span>PHOTO</span></button>
                   <button onClick={() => resetElections(row.id)} className='text-[10px] font-bold flex items-center justify-center px-2 py-0 rounded-sm ring-1 ring-red-700 bg-red-700 text-white border border-white'><span>RESET</span></button>
                   
               </div>
            </span>
            </React.Fragment>
        ))}
        </div>
    </Table> */}
    <table className="w-full border-separate border-spacing-0 border border-blue-900/30 rounded text-[0.83rem] text-blue-900/80 font-medium">
            <tr className="hidden md:grid md:grid-cols-5 bg-blue-900/5 text-blue-900 text-[0.86rem] font-inter font-bold tracking-wider">
              <td className="px-6 py-3 col-span-2 md:border-b border-blue-900/20">NAME OF CENTRE</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">STATUS</td>
              <td className="px-6 py-3 col-span-2 md:border-b border-blue-900/20">&nbsp;</td>
            </tr>
            { data?.filter((r:any) => r.name.toLowerCase().includes(keyword.toLowerCase()) || r.tag.toLowerCase().includes(keyword.toLowerCase()))?.map(( row:any, i:React.Key ) => (
                 <tr key={row?.serial} className="grid grid-cols-1 md:grid-cols-5 text-left ">
                    <td className={`px-6 py-3 col-span-2 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10`}>
                        <span className="md:hidden py-0.5 px-3 rounded bg-green-900/5 font-bold">SERIAL</span>
                        <span className="ml-3 md:m-0 font-bold text-sm tracking-wide flex items-center space-x-2">
                           <img src={`/api/photos/?tag=centre&eid=${row.tag}`} alt="Candidate Photo" height={100} width={100} className="inline-block my-1 border rounded h-8 w-8 object-contain" />
                           <span className="px-1.5 py-0.5 rounded border border-slate-200">{row?.name} ELECTION CENTRE </span>
                        </span>
                    </td>
                    <td className="px-6 py-3 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10">
                        <span className="md:hidden py-0.5 px-3 rounded bg-green-900/5 font-bold">APPLICANT</span>
                        <div className="ml-3 md:m-0 font-semibold flex items-center space-x-2">
                           <div className="flex items-center space-x-1">
                             { row.default == 1  
                              ? <MdVerified className="h-8 w-8   text-green-500" /> 
                              : <MdOutlinePending className="h-6 w-6 text-slate-300" /> 
                             }
                           </div>
                           <Badge title={row.default == 1 ? `ENABLED`:`DISABLED`} />
                        </div>
                    </td>
                    <td className="px-6 py-3  col-span-2 border-b border-blue-900/10 flex md:justify-end">
                        <div className="md:px-2 w-fit flex flex-wrap items-center justify-center space-x-1">
                          {/* <BadgeIcon title="FORM" Icon={MdOutlineArticle}/> */}
                          { row.default == 1 && (<button><BadgeIcon title="ACTIVE" Icon={MdVerified}/></button>)}
                          { row.default == 0 && (<button onClick={() => setCentre(row.id)}><BadgeIcon title="SET ACTIVE" Icon={MdOutlinePending}/></button>)}
                          { true ? <button onClick={() => loadVoters(row.id)}><BadgeIcon title="STAGE VOTERS" Icon={MdOutlineArticle}/></button> : null }
                          { true ? <button onClick={() => loadPhotos(row.id)} className="block"><BadgeIcon title="STAGE PHOTOS" Icon={BiPhotoAlbum}/></button> : null }
                          { true ? <button onClick={() => resetElections(row.id)} className="block"><BadgeIcon title="RESET ELECTIONS" Icon={MdWarning}/></button> : null }
                        </div>
                    </td>
                </tr>
            ))} 

        </table>
    </>
  )
}
