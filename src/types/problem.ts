export type WorkspaceMode='handwriting'|'algebra'|'graph'|'number-line'|'table'|'geometry'|'mixed';
export interface Problem { id:string; minGrade:number; maxGrade:number; title:string; skill:string; prompt:string; workspace:WorkspaceMode; source?:'built-in'|'teacher'; }
export interface Evidence { time:string; kind:string; detail:string; }
export interface DraftProblem extends Problem { selected:boolean; prerequisite:string; }
