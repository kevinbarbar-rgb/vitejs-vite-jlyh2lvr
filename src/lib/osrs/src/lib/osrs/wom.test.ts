import {describe,it,expect} from 'vitest';import {SKILLS} from './skills';
describe('skill catalog',()=>{it('tracks all 24 skills with Sailing last',()=>{expect(SKILLS).toHaveLength(24);expect(SKILLS.at(-1)).toBe('Sailing')})});
