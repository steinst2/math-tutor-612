import type{Diagnosis}from'../math/reasoning';
export type SupportLevel='observe'|'reflect'|'focus'|'scaffold'|'mini-lesson';
export function supportLevel(errors:number):SupportLevel{if(errors<=0)return'observe';if(errors===1)return'reflect';if(errors===2)return'focus';if(errors===3)return'scaffold';return'mini-lesson'}
export function tutorResponse(d:Diagnosis,errors:number){
 if(d.valid)return d.kind==='solved'?'You reached a solution. How could you check it in the original problem?':'That move preserves the mathematics. Keep going.';
 const level=supportLevel(errors);
 if(level==='reflect')return d.kind==='partial-distribution'?'Tell me what you intended the 3 to multiply.':'Tell me what you were trying to accomplish with that move.';
 if(level==='focus'){
  if(d.kind==='inverse-operation')return'You changed the 7 when it crossed the equals sign. What operation actually undoes adding 7?';
  if(d.kind==='equality')return'What must remain true about the left and right sides of an equation?';
  if(d.kind==='partial-distribution')return'Look at the parentheses. Which terms are inside the group multiplied by 3?';
  return'Compare your new line with the original. What changed, and why?';
 }
 if(level==='scaffold')return d.kind==='partial-distribution'?'Try thinking of 3(x + 4) as three identical groups. How many x terms? How many 4s?':'Let’s use a balance idea. If you change one side of an equation, what must happen to the other side?';
 return'Let’s pause this problem for a tiny prerequisite lesson, then come right back.';
}
