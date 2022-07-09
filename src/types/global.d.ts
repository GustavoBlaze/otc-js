/* eslint-disable no-unused-vars */
declare global {
  type Size = {
    width: number;
    height: number;
  };

  type Point = {
    x: number;
    y: number;
  };

  type Light = {
    intensity: number;
    color: number;
  };

  type MarketData = {
    category: number;
    tradeAs: number;
    showAs: number;
    name: string;
    restrictVocation: number;
    requiredLevel: number;
  };
}

export {};
