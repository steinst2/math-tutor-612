import {useRef,useState} from 'react';
import type {DraftProblem,Problem,WorkspaceMode} from '../types/problem';

const classify=(text:string,grade:number,i:number):DraftProblem=>{
  const t=text.trim(); const lower=t.toLowerCase();
  let workspace:WorkspaceMode='algebra',skill='Expressions & equations',pre='Integer operations · inverse operations';
  if(/graph|domain|range|vertex|slope|intercept|function/.test(lower)){workspace='graph';skill=/domain|range/.test(lower)?'Domain & range':'Functions & graphing';pre='Coordinate plane · function notation'}
  else if(/[()]/.test(t)){skill='Distributive property';pre='Multiplication · combining like terms'}
  else if(/[xy].*=|=.*[xy]/i.test(t)){skill='Solving equations';pre='Integer operations · inverse operations'}
  else if(/fraction|ratio|percent|proportion/.test(lower)){skill='Ratios & proportional reasoning';pre='Number sense · fraction operations'}
  return {id:`teacher-${Date.now()}-${i}`,minGrade:grade,maxGrade:grade,title:`Problem ${i+1}`,skill,prompt:t,workspace,source:'teacher',selected:true,prerequisite:pre};
};
const splitProblems=(raw:string)=>raw.split(/\n+/).map(s=>s.replace(/^\s*(?:\d+[.)]|[-•])\s*/,'').trim()).filter(Boolean);
export default function TeacherBuilder({grade,onAssign,onClose}:{grade:number;onAssign:(p:Problem[])=>void;onClose:()=>void}){
 const [text,setText]=useState(''),[drafts,setDrafts]=useState<DraftProblem[]>([]),[note,setNote]=useState(''),file=useRef<HTMLInputElement>(null);
 const analyze=()=>{const rows=splitProblems(text);setDrafts(rows.map((r,i)=>classify(r,grade,i)));setNote(rows.length?`Found ${rows.length} problem${rows.length===1?'':'s'}. Review before assigning.`:'Paste at least one problem first.')};
 const upload=async(f?:File)=>{if(!f)return;if(f.type==='text/plain'||f.name.endsWith('.txt')){const s=await f.text();setText(s);setNote('Text file loaded. Choose Analyze problems.')}else setNote(`${f.name} is selected. PDF/image/Word recognition needs the secure AI backend; for this prototype, paste the problems below.`)};
 const patch=(i:number,p:Partial<DraftProblem>)=>setDrafts(d=>d.map((x,j)=>j===i?{...x,...p}:x));
 return <div className="builderOverlay"><section className="builder"><div className="builderHead"><div><span className="eyebrow">TEACHER MODE</span><h1>Create an assignment</h1><p>Bring what you already teach. The tutor will adapt the workspace around it.</p></div><button className="iconBtn" onClick={onClose}>×</button></div>
 <div className="importGrid"><button className="uploadCard" onClick={()=>file.current?.click()}><b>📄 Upload worksheet</b><span>PDF, image, Word, or text</span></button><input ref={file} hidden type="file" accept=".pdf,.doc,.docx,.txt,image/*" onChange={e=>upload(e.target.files?.[0])}/><div className="pasteCard"><b>✏️ Paste problems</b><span>One problem per line works best.</span></div></div>
 <textarea className="problemPaste" value={text} onChange={e=>setText(e.target.value)} placeholder={'3(x + 4) = 21\n5x + 7 = 3x + 19\nGraph y = -2x + 5\nFind the domain and range of y = √(x - 2) + 1'} />
 <div className="builderActions"><button className="primary" onClick={analyze}>Analyze problems</button><span className="muted">{note}</span></div>
 {drafts.length>0&&<><div className="reviewHead"><div><span className="eyebrow">TEACHER REVIEW</span><h2>Check what the tutor found</h2></div><span>{drafts.filter(d=>d.selected).length} selected</span></div><div className="draftList">{drafts.map((d,i)=><article className="draft" key={d.id}><input type="checkbox" checked={d.selected} onChange={e=>patch(i,{selected:e.target.checked})}/><div className="draftBody"><input className="promptEdit" value={d.prompt} onChange={e=>patch(i,{prompt:e.target.value})}/><div className="draftMeta"><label>Skill<select value={d.skill} onChange={e=>patch(i,{skill:e.target.value})}><option>Expressions & equations</option><option>Distributive property</option><option>Solving equations</option><option>Functions & graphing</option><option>Domain & range</option><option>Ratios & proportional reasoning</option></select></label><label>Workspace<select value={d.workspace} onChange={e=>patch(i,{workspace:e.target.value as WorkspaceMode})}><option value="algebra">Write / algebra</option><option value="graph">Interactive graph</option><option value="number-line">Number line</option><option value="table">Table</option><option value="mixed">Mixed</option></select></label></div><small>Suggested prerequisites: {d.prerequisite}</small></div></article>)}</div><div className="assignBar"><span>Nothing goes to students until you approve it.</span><button className="primary" onClick={()=>onAssign(drafts.filter(d=>d.selected).map(({selected,prerequisite,...p})=>p))}>Create assignment</button></div></>}
 </section></div>
}
