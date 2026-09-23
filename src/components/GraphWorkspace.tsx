import {useState} from 'react';
export default function GraphWorkspace({domain,onEvidence}:{domain:boolean,onEvidence:(s:string)=>void}){
 const [h,setH]=useState(0); const [endpoint,setEndpoint]=useState(0); const x=(n:number)=>250+n*30,y=(n:number)=>150-n*22;
 const path=Array.from({length:101},(_,i)=>{const xv=-5+i/10;const yv=(xv-h)**2/3;return `${i?'L':'M'} ${x(xv)} ${y(yv)}`}).join(' ');
 return <div className="graphBox"><svg viewBox="0 0 500 300" role="img" aria-label="interactive coordinate graph"><line x1="20" y1="150" x2="480" y2="150"/><line x1="250" y1="20" x2="250" y2="280"/>{domain?<><path d={`M ${x(2)} ${y(1)} Q ${x(4)} ${y(2)} ${x(7)} ${y(4)}`} className="curve"/><circle cx={x(2)} cy={y(1)} r="7" className="point"/><line x1={x(endpoint)} y1="35" x2={x(endpoint)} y2="265" className="marker"/></>:<path d={path} className="curve"/>}</svg>
 {domain?<label>Move your domain marker: <input type="range" min="-3" max="7" step="1" value={endpoint} onChange={e=>{const v=+e.target.value;setEndpoint(v);onEvidence(`Moved domain marker to x = ${v}`)}}/> x = {endpoint}</label>:<label>Move <strong>h</strong>: <input type="range" min="-4" max="4" step="1" value={h} onChange={e=>{const v=+e.target.value;setH(v);onEvidence(`Changed h from ${h} to ${v}`)}}/> h = {h}</label>}
 </div>
}
