
export default function fightCalculator(monster, armors, weapons) {
  console.log(weapons);
  const random = (max) => {
    return Math.floor(Math.random() * max) + 1
  }
  
  let userDmg = random(weapons.stat)
  let userDef = random(armors.stat)
  let userHeal = false
  let userLoot = random(11) - 1
  let monsterDmg = random(monster.damage)
  if (weapons.level === 1 && random(100) > 80) monsterDmg = 0
  if (weapons.level === 2 && random(100) > 70) userDmg += userDmg
  if (weapons.level === 3 && random(100) > 60) userHeal = true

  return {
    monsterDmg: monsterDmg <= userDef ? 0 : monsterDmg - userDef,
    userDmg,
    userHeal,
    userLoot
  }
}
