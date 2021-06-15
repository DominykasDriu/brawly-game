
export default function fightCalculator(monster, armors, weapons) {
  const random = (max) => {
    return Math.floor(Math.random() * max) + 1
  }
  
  let userDmg = random(weapons.props.stat)
  let userDef = random(armors.props.stat)
  let userHeal = false
  let userLoot = random(11) - 1
  let monsterDmg = random(monster.damage)
  if (weapons.props.level === 1 && random(100) > 80) monsterDmg = 0
  if (weapons.props.level === 2 && random(100) > 70) userDmg += userDmg
  if (weapons.props.level === 3 && random(100) > 60) userHeal = true

  return {
    monsterDmg: monsterDmg <= userDef ? 0 : monsterDmg - userDef,
    userDmg,
    userHeal,
    userLoot
  }
}
