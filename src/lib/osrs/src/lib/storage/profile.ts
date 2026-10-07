import type {SkillName} from '../osrs/skills';
export type Goal={id:string,title:string,done:boolean};
export type LogItem={id:string,name:string,source:string,obtained:boolean};
export type Profile={schema:4,username:string,targets:Partial<Record<SkillName,number>>,rates:Partial<Record<SkillName,number>>,goals:Goal[],log:LogItem[]};
const key=(u:string)=>`osrs-ledger.v4.${u.toLowerCase()}`;
export function emptyProfile(username:string):Profile{return {schema:4,username,targets:{},rates:{},goals:[],log:[]}}
export function loadProfile(username:string):Profile{try{const raw=localStorage.getItem(key(username));if(raw){const p=JSON.parse(raw);if(p?.schema===4)return p}for(const v of [3,2]){const old=localStorage.getItem(`osrs-ledger.v${v}.${username.toLowerCase()}`);if(old){const p=JSON.parse(old);return {...emptyProfile(username),...p,username,schema:4,log:Array.isArray(p.log)?p.log:[]}}}return emptyProfile(username)}catch{return emptyProfile(username)}}
export function saveProfile(p:Profile){localStorage.setItem(key(p.username),JSON.stringify(p))}
export function exportProfile(p:Profile){return JSON.stringify({...p,schema:4},null,2)}
export function importProfile(raw:string,username:string):Profile{const p=JSON.parse(raw);if(!p||typeof p!=='object'||!Array.isArray(p.goals)||!Array.isArray(p.log))throw new Error('Invalid OSRS Ledger profile file.');return {...emptyProfile(username),...p,username,schema:4}}
