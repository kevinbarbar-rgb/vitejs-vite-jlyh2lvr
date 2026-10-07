// Validation boundary reserved for the production WASM build.
// The JS validator in src/lib/osrs/hiscores.ts mirrors the context-pack invariants
// so the web v1 remains runnable until the Rust/WASM toolchain is installed.
pub const CATALOG_VERSION: &str = "2025-11-19";
pub const SKILLS: [&str; 24] = ["Attack","Defence","Strength","Hitpoints","Ranged","Prayer","Magic","Cooking","Woodcutting","Fletching","Fishing","Firemaking","Crafting","Smithing","Mining","Herblore","Agility","Thieving","Slayer","Farming","Runecraft","Hunter","Construction","Sailing"];
