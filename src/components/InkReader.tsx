import {useState} from 'react';import type {Analysis} from '../engine/analyzeWork';
export default function InkReader({hasInk,onAnalyze,analysis}:{hasInk:boolean;onAnalyze:(s:string)=>void;analysis:Analysis|null}){
 const [open,setOpen]=useState(false),[line,setLine]=useState('');
 return <section className="inkReader"><div className="readerTop"><div><b>✦ Read my work</b><span className="readerStatus">{hasInk?' Ink detected':' Write on the canvas first'}</span></div><button onClick={()=>setOpen(v=>!v)} disabled={!hasInk}>{open?'Close':'Check my writing'}</button></div>
 {open&&<div className="recognitionBridge"><p><b>Handwriting reader bridge</b></p><p className="muted">The tutoring loop is live. Until a secure handwriting-recognition service is connected, confirm the newest math line you wrote. This box disappears once recognition is connected.</p><div className="confirmLine"><input value={line} onChange={e=>setLine(e.target.value)} placeholder="Example: 3x + 12 = 21" onKeyDown={e=>{if(e.key==='Enter'&&line.trim()){onAnalyze(line);setLine('')}}}/><button onClick={()=>{if(line.trim()){onAnalyze(line);setLine('')}}}>Use this line</button></div></div>}
 {analysis&&<div className={'analysisCard '+analysis.status}><b>{analysis.status==='progress'?'✓ Productive step':analysis.status==='misconception'?'Let’s look at this step':'Tell me more'}</b><p>{analysis.message}</p>{analysis.next&&<p className="socratic">💬 {analysis.next}</p>}</div>}
 </section>
}
