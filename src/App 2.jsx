import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OperationSelection from './OperationSelection';
import BinaryOperations from './BinaryOperations';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Binary Operation Simulator</h1>
        <Routes>
          <Route path="/" element={<OperationSelection />} />
          <Route path="/calculate/:operation" element={<BinaryOperations />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}