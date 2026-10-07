export const CATALOG_VERSION = '2025-11-19';
export const SKILLS = ['Attack','Defence','Strength','Hitpoints','Ranged','Prayer','Magic','Cooking','Woodcutting','Fletching','Fishing','Firemaking','Crafting','Smithing','Mining','Herblore','Agility','Thieving','Slayer','Farming','Runecraft','Hunter','Construction','Sailing'] as const;
export type SkillName = typeof SKILLS[number];
export const skillId = (name: SkillName) => SKILLS.indexOf(name) + 1;
