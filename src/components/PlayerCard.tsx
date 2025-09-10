"use client"
import React from 'react';

export default function PlayerCardDemo() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Fantasy Football App</h1>
      <div className="bg-white rounded-lg border p-4 shadow">
        <h2 className="text-xl font-bold">Josh Allen - QB</h2>
        <p>Buffalo Bills</p>
        <p className="text-blue-600 font-bold">24.5 points</p>
      </div>
    </div>
  );
}
