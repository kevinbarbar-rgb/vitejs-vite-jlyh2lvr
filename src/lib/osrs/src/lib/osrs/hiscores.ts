import {SKILLS, skillId, type SkillName} from './skills'; import {levelForXp, xpForLevel} from './xp';
export type SkillRow={id:number,name:string,rank:number,level:number,xp:number};
export type Snapshot={username:string,table:string,totalLevel:number,totalXp:number,fetchedAt:string,skills:Record<SkillName,{level:number,xp:number,rank:number}>};
export function normalizeUsername(v:string){return v.trim().replace(/\s+/g,' ')}
export function validUsername(v:string){const s=normalizeUsername(v);return /^[A-Za-z0-9](?:[A-Za-z0-9 _-]{0,10}[A-Za-z0-9])?$/.test(s)}
export function validateHiscores(body:any, table='main'):Snapshot{
 if(!body||!Array.isArray(body.skills)) throw new Error('Malformed hiscores payload');
 const rows:SkillRow[]=body.skills; const overall=rows.find(r=>r.name==='Overall'&&r.id===0); if(!overall)throw new Error('Overall row missing');
 const out={} as Snapshot['skills']; let totalLevel=0,totalXp=0;
 for(const name of SKILLS){const r=rows.find(x=>x.name===name&&x.id===skillId(name)); if(!r)throw new Error(`${name} row missing`); let level=r.level,xp=r.xp;
  if(r.rank===-1){level=name==='Hitpoints'?10:1;xp=name==='Hitpoints'?xpForLevel(10):0}else{if(!Number.isInteger(xp)||xp<0||xp>200000000)throw new Error(`${name} XP invalid`);if(levelForXp(xp)!==Math.min(99,level))throw new Error(`${name} level/XP mismatch`)}
  out[name]={level,xp,rank:r.rank}; totalLevel+=level; totalXp+=xp;
 }
 if(overall.level!==totalLevel)throw new Error(`Total level mismatch: upstream ${overall.level}, skills ${totalLevel}`);
 if(overall.xp!==totalXp)throw new Error(`Total XP mismatch: upstream ${overall.xp}, skills ${totalXp}`);
 return {username:String(body.name||''),table,totalLevel,totalXp,fetchedAt:new Date().toISOString(),skills:out};
}
