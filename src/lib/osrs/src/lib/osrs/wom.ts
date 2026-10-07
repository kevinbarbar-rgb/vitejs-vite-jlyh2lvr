import {SKILLS,type SkillName} from './skills';
import type {Snapshot} from './hiscores';

const metric:Record<SkillName,string>={Attack:'attack',Defence:'defence',Strength:'strength',Hitpoints:'hitpoints',Ranged:'ranged',Prayer:'prayer',Magic:'magic',Cooking:'cooking',Woodcutting:'woodcutting',Fletching:'fletching',Fishing:'fishing',Firemaking:'firemaking',Crafting:'crafting',Smithing:'smithing',Mining:'mining',Herblore:'herblore',Agility:'agility',Thieving:'thieving',Slayer:'slayer',Farming:'farming',Runecraft:'runecrafting',Hunter:'hunter',Construction:'construction',Sailing:'sailing'};
export async function fetchPlayer(username:string):Promise<Snapshot>{
 const u=username.trim(); const res=await fetch(`https://api.wiseoldman.net/v2/players/${encodeURIComponent(u)}`,{headers:{Accept:'application/json'}});
 if(res.status===404)throw new Error('Player is not tracked yet on Wise Old Man.'); if(!res.ok)throw new Error(`Player lookup failed (${res.status}).`);
 const body=await res.json(); const data=body?.latestSnapshot?.data?.skills; if(!data)throw new Error('No latest skill snapshot is available for this player.');
 const skills={} as Snapshot['skills']; let totalLevel=0,totalXp=0;
 for(const name of SKILLS){const row=data[metric[name]]; if(!row)throw new Error(`${name} is missing from the live snapshot.`);const level=Number(row.level);const xp=Number(row.experience);const rank=Number(row.rank);if(!Number.isFinite(level)||!Number.isFinite(xp))throw new Error(`${name} contains invalid live data.`);skills[name]={level,xp,rank};totalLevel+=level;totalXp+=xp}
 const overall=data.overall; if(overall&&Number(overall.level)!==totalLevel)throw new Error(`Live total mismatch (${overall.level} vs ${totalLevel}).`);
 return {username:body.displayName||body.username||u,table:body.type||'regular',totalLevel,totalXp,fetchedAt:body.latestSnapshot.createdAt||new Date().toISOString(),skills};
}
