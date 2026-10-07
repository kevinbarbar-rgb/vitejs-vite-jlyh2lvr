export function xpForLevel(level:number){ if(level<=1)return 0; let points=0; for(let n=1;n<level;n++) points+=Math.floor(n+300*Math.pow(2,n/7)); return Math.floor(points/4); }
export const XP_99=xpForLevel(99);
export function levelForXp(xp:number){ for(let l=99;l>=2;l--) if(xp>=xpForLevel(l)) return l; return 1; }
