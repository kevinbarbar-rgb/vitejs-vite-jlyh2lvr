import {describe,it,expect} from 'vitest';import {xpForLevel,levelForXp} from './xp';
describe('OSRS XP table',()=>{it('matches canonical milestones',()=>{expect(xpForLevel(2)).toBe(83);expect(xpForLevel(50)).toBe(101333);expect(xpForLevel(99)).toBe(13034431)});it('maps XP back to levels',()=>{expect(levelForXp(0)).toBe(1);expect(levelForXp(83)).toBe(2);expect(levelForXp(13034431)).toBe(99)})});
