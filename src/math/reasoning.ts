export type Diagnosis={valid:boolean;kind:string;message:string;prerequisite?:string;focus?:string};
const norm=(s:string)=>s.toLowerCase().replace(/\s/g,'').replace(/−/g,'-').replace(/\*/g,'');
export function diagnose(problemId:string,current:string,next:string):Diagnosis{
 const n=norm(next),c=norm(current);
 if(problemId==='eq-1'){
  if(c==='3x+7=22'&&['3x=15','3x+7-7=22-7'].includes(n))return{valid:true,kind:'equivalent',message:'Preserved equality.',focus:'inverse operations'};
  if(c==='3x=15'&&['x=5','3x/3=15/3'].includes(n))return{valid:true,kind:'solved',message:'Solved.',focus:'division property of equality'};
  if(c==='3x+7=22'&&(n==='3x=29'||n==='3x=22+7'))return{valid:false,kind:'inverse-operation',message:'Treating “move it” as a sign-change rule.',prerequisite:'Inverse operations & equality',focus:'+7'};
  if(c==='3x+7=22'&&n==='3x=22')return{valid:false,kind:'equality',message:'Changed only one side.',prerequisite:'Meaning of equality',focus:'both sides'};
 }
 if(problemId==='dist-1'){
  if(n==='3x+12')return{valid:true,kind:'solved',message:'Distribution is correct.',focus:'both terms'};
  if(n==='3x+4')return{valid:false,kind:'partial-distribution',message:'Applied the factor to only one term.',prerequisite:'Multiplication over groups',focus:'the entire group'};
  if(n==='3x+7')return{valid:false,kind:'operation-confusion',message:'Added rather than multiplied the outside factor.',prerequisite:'Meaning of multiplication and groups',focus:'3 groups'};
 }
 return{valid:false,kind:'unverified',message:'Needs an explanation before verification.',prerequisite:'Student strategy'};
}
