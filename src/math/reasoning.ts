export type Diagnosis={valid:boolean;kind:string;message:string;prerequisite?:string};
const norm=(s:string)=>s.toLowerCase().replace(/\s/g,'').replace(/−/g,'-').replace(/\*/g,'');
export function diagnose(problemId:string,current:string,next:string):Diagnosis{
 const n=norm(next),c=norm(current);
 if(problemId==='eq-1'){
  if(c==='3x+7=22'&&n==='3x=15')return{valid:true,kind:'equivalent',message:'Equivalent transformation.'};
  if(c==='3x=15'&&n==='x=5')return{valid:true,kind:'solved',message:'Solved.'};
  if(c==='3x+7=22'&&(n==='3x=29'||n==='3x=22+7'))return{valid:false,kind:'inverse-operation',message:'The student may be treating “move it” as a sign-change rule.',prerequisite:'Inverse operations'};
  if(c==='3x+7=22'&&n==='3x=22')return{valid:false,kind:'equality',message:'The student changed only one side of the equation.',prerequisite:'Meaning of equality'};
 }
 if(problemId==='dist-1'){
  if(n==='3x+12')return{valid:true,kind:'solved',message:'Distribution is correct.'};
  if(n==='3x+4')return{valid:false,kind:'partial-distribution',message:'The outside factor was applied to only the first term.',prerequisite:'Multiplication over groups'};
 }
 return{valid:false,kind:'unverified',message:'This step needs explanation before the system can verify it.'};
}
