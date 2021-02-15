export function getDamage(colors: i32, drops: i32, attack: i32, magnification: f64, targets: i32, growth: i32, effectiveness: f64): i32 {
  // Count the generated stars
  const star: i32 = getStar(colors, drops, targets, growth);

  const quotient: i32 = star / 99;
  const remainder: i32 = star % 99;

  // Calculate a damage value from the inputs
  const damage: i32 = <i32>(attack * magnification * effectiveness
    * (quotient * getAttackRatio(99) + getAttackRatio(remainder)));

  return damage;
}

export function getStar(colors: i32, drops: i32, targets: i32, growth: i32): i32 {
  // Count number of the generated stars
  return <i32>((targets + 1) / <f64>colors * drops * (<f64>growth + 1.5));
}

function getAttackRatio(star: i32): f64 {
  if (star > 99) {
    // A damage value gets immutable when a star count is at least one hundred
    return 0.4 * 99 - 0.65;
  } else if (star >= 12) {
    // A damage value increases linearly when a star count is at least twelve
    return 0.4 * star - 0.65;
  } else {
    switch (star) {
      case 3:
        return 1;
      case 4:
        return 1.1;
      case 5:
        return 1.2;
      case 6:
        return 2.04;
      case 7:
        return 2.14;
      case 8:
        return 2.24;
      case 9:
        return 3.09;
      case 10:
        return 3.19;
      case 11:
        return 3.29;
      default:
        return 0;
    }
  }
}