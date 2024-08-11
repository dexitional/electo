import React from 'react'
import { VictoryPie, VictoryTheme } from "victory";
import Electa from '../public/electa_white.png'

type Props = { data?: any }

export default function NivoChart({ data }: Props) {
   return <div className="relative flex flex-col items-center justify-center">
        <svg width={450} height={450} className="z-10">
            <VictoryPie
                // @ts-ignore
                origin={{ x: 225 }}
                data={data}
                animate={true}
                //theme={VictoryTheme.material}
                colorScale={["gold","tomato","navy","orange","cyan", "red", "green","yellow","purple","pink" ]}
                //cornerRadius={({ datum }) => datum.y * 5}
                labelRadius={({ innerRadius }:any) => innerRadius + 78 }
                //radius={({ datum }) => 20 + datum.y * 20}
                //innerRadius={50}
                style={{ labels: { fill: "#1e3a8ae6", fontSize: 13, fontWeight: "bold" } }}
                standalone={false}
                width={400} height={400}
                innerRadius={75}
                // padAngle={({ datum }) => datum.y}
            />
            <circle cx={225} cy={200} r={65} fill="#1e3a8aa1" className="absolute"></circle>
            <image href={Electa.src} x="175" y="145" width="100" height="100" />
        </svg>
        <div className="px-3 py-1 w-fit bg-[#1e3a8ae6]/5 font-semibold text-sm text-[#1e3a8ae6] rounded">This Chart is Ordered By Votes</div>
    </div>
}