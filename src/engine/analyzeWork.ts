export type Analysis={status:'progress'|'misconception'|'unclear';message:string;diagnosis?:string;next?:string};
const compact=(s:string)=>s.toLowerCase().replace(/\s+/g,'').replace(/[−–]/g,'-').replace(/²/g,'^2');
export function analyzeWork(problemId:string,raw:string):Analysis{
 const s=compact(raw);
 if(problemId==='dist'){
  if(/3x\+12=21/.test(s)||/3x\+12/.test(s)) return {status:'progress',message:'Your distribution is equivalent to the original expression. Keep going.',next:'What could you do to isolate the term with x?'};
  if(/3x\+4=21/.test(s)||/3x\+4/.test(s)) return {status:'misconception',diagnosis:'partial distribution',message:'I can see that the 3 was multiplied by x, but one part of the group may have been missed.',next:'What else is inside the parentheses that is also being multiplied by 3?'};
  if(/x\+12=21/.test(s)) return {status:'misconception',diagnosis:'distribution coefficient dropped',message:'The 4 was multiplied by 3, but check what happened to 3 × x.',next:'What is 3 times x?'};
  if(/3x=9/.test(s)) return {status:'progress',message:'That keeps the equation balanced.',next:'What operation would undo multiplying x by 3?'};
  if(/x=3/.test(s)) return {status:'progress',message:'That solution works.',next:'How could you check x = 3 in the original equation?'};
  return {status:'unclear',message:'I can use this as evidence, but I am not confident enough to judge the transformation.',next:'What were you trying to change in this step?'};
 }
 return {status:'unclear',message:'I captured your mathematical line.',next:'What changed from the previous line, and why?'};
}
