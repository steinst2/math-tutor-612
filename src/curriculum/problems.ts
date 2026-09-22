export type Problem={id:string;grade:string;skill:string;prompt:string;start:string;solution:string;steps:string[]};
export const problems:Problem[]=[
{id:'eq-1',grade:'7–9',skill:'Two-step equations',prompt:'Solve for x. Show each equivalent step.',start:'3x + 7 = 22',solution:'x = 5',steps:['3x = 15','x = 5']},
{id:'dist-1',grade:'6–9',skill:'Distributive property',prompt:'Expand the expression.',start:'3(x + 4)',solution:'3x + 12',steps:['3x + 12']}
];
