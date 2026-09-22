import type{Diagnosis}from'../math/reasoning';
export function tutorResponse(d:Diagnosis,attempt:number){
 if(d.valid)return d.kind==='solved'?'You reached a solution. How could you verify it using the original problem?':'That step preserves the mathematics. Keep going.';
 if(d.kind==='inverse-operation')return attempt<2?'What were you trying to make happen to the +7?':'What operation actually undoes adding 7?';
 if(d.kind==='equality')return'When the 7 disappeared from the left, what needed to happen on the right to preserve equality?';
 if(d.kind==='partial-distribution')return'What does the 3 multiply in the entire group—not just the first term?';
 return'Walk me through what you changed from the previous line. What operation did you apply?';
}
