import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OperationSelection() {
  const navigate = useNavigate();

  const operations = [
    {
      name: 'Addition',
      description: 'Add two binary numbers',
      path: '/calculate/addition'
    }
  ];

  return (
    <>
      <style>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            max-width: 400px;
            margin: 0 auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .container h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .button-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }
          .button-wrapper {
            display: flex;
          }
          .custom-button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 15px;
            background-color: #e5e5e5;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s ease, background-color 0.2s ease;
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }
          .custom-button:hover {
            background-color: #d4d4d4;
            transform: scale(1.02);
          }
          .button-text {
            text-align: left;
            flex-grow: 1;
          }
          .button-arrow {
            font-size: 20px;
            color: #666;
          }
        `}
      </style>

      <div className="container">
        <h1>Add or Subtract</h1>
        <div className="button-container">
          {operations.map((operation) => (
            <div key={operation.name} className="button-wrapper">
              <button
                onClick={() => navigate(operation.path)}
                className="custom-button"
              >
                <span className="button-text">{operation.name}</span>
                <span className="button-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}