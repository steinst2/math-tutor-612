import {forwardRef,useEffect,useImperativeHandle,useRef,useState} from 'react';
export type DrawingCanvasHandle={snapshot:()=>string;clear:()=>void;hasInk:()=>boolean};
const DrawingCanvas=forwardRef<DrawingCanvasHandle,{onInk?:()=>void}>(({onInk},apiRef)=>{
 const ref=useRef<HTMLCanvasElement>(null); const [space,setSpace]=useState(false); const drawing=useRef(false); const ink=useRef(false);
 useImperativeHandle(apiRef,()=>({snapshot:()=>ref.current?.toDataURL('image/png')||'',clear,hasInk:()=>ink.current}));
 useEffect(()=>{const d=(e:KeyboardEvent)=>{if(e.code==='Space'&&!(e.target instanceof HTMLInputElement)&&!(e.target instanceof HTMLTextAreaElement)){setSpace(true);e.preventDefault()}};const u=(e:KeyboardEvent)=>{if(e.code==='Space')setSpace(false)};window.addEventListener('keydown',d);window.addEventListener('keyup',u);return()=>{window.removeEventListener('keydown',d);window.removeEventListener('keyup',u)}},[]);
 const point=(e:React.PointerEvent<HTMLCanvasElement>)=>{const c=ref.current!;const r=c.getBoundingClientRect();return{x:(e.clientX-r.left)*c.width/r.width,y:(e.clientY-r.top)*c.height/r.height}};
 const down=(e:React.PointerEvent<HTMLCanvasElement>)=>{if(e.pointerType==='mouse'&&!space)return;drawing.current=true;ink.current=true;e.currentTarget.setPointerCapture(e.pointerId);const p=point(e);const x=ref.current!.getContext('2d')!;x.beginPath();x.moveTo(p.x,p.y)};
 const move=(e:React.PointerEvent<HTMLCanvasElement>)=>{if(!drawing.current)return;const p=point(e);const x=ref.current!.getContext('2d')!;x.lineWidth=4;x.lineCap='round';x.strokeStyle='#172033';x.lineTo(p.x,p.y);x.stroke()};
 const up=()=>{if(drawing.current)onInk?.();drawing.current=false}; function clear(){const c=ref.current;if(c)c.getContext('2d')!.clearRect(0,0,c.width,c.height);ink.current=false}
 return <div><div className="canvasHint">✏️ Touch/stylus: write normally · Chromebook: hold <kbd>Space</kbd> while drawing</div><canvas ref={ref} width={1000} height={430} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}/><button className="quiet" onClick={clear}>Clear drawing</button></div>
});
export default DrawingCanvas;
