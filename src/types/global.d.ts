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

  type uint8 = number;
  type uint16 = number;
  type uint32 = number;
  type uint64 = number;
  type int8 = number;
  type int16 = number;
  type int32 = number;
  type int64 = number;
  type double = number;
}

export {};
