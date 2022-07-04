export enum PlayerShield {
  ShieldNone = 0,
  ShieldWhiteYellow, // 1 party leader
  ShieldWhiteBlue, // 2 party member
  ShieldBlue, // 3 party member sexp off
  ShieldYellow, // 4 party leader sexp off
  ShieldBlueSharedExp, // 5 party member sexp on
  ShieldYellowSharedExp, // 6 // party leader sexp on
  ShieldBlueNoSharedExpBlink, // 7 party member sexp inactive guilty
  ShieldYellowNoSharedExpBlink, // 8 // party leader sexp inactive guilty
  ShieldBlueNoSharedExp, // 9 party member sexp inactive innocent
  ShieldYellowNoSharedExp, // 10 party leader sexp inactive innocent
  ShieldGray, // 11 member of another party
}
