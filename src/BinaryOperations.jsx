import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function BinaryOperations() {
  const { operation } = useParams();
  const navigate = useNavigate();

  const [binary1, setBinary1] = useState("");
  const [binary2, setBinary2] = useState("");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!operation) {
      navigate("/");
    }
  }, [operation, navigate]);

  const add = (binary1, binary2) => {    
    if (!/^[01]+$/.test(binary1) || !/^[01]+$/.test(binary2)) {     
      return { result: "Invalid binary input", steps: [] };   
    }    
    const maxLength = Math.max(binary1.length, binary2.length);   
    binary1 = binary1.padStart(maxLength, "0");   
    binary2 = binary2.padStart(maxLength, "0");    
    
    let carry = 0;   
    let result = "";   
    let steps = [];    
    
    for (let i = maxLength - 1; i >= 0; i--) {     
      const bit1 = parseInt(binary1[i], 10);     
      const bit2 = parseInt(binary2[i], 10);     
      const sum = bit1 + bit2 + carry;          
      result = (sum % 2) + result;
      carry = Math.floor(sum / 2);     
      steps.push(`Step ${maxLength - i}: ${binary1[i]} + ${binary2[i]} + carry(${carry}) = ${sum} -> result: ${result}`);   
    }    
    
    if (carry > 0) {     
      result = carry + result;     
      steps.push(`Final carry: ${carry}, result: ${result}`);   
    }    
    
    return { result, steps }; 
  }

  const subtract = (binary1, binary2) => {    
    if (!/^[01]+$/.test(binary1) || !/^[01]+$/.test(binary2)) {     
      return { result: "Invalid binary input", steps: [] };   
    }    
    
    const maxLength = Math.max(binary1.length, binary2.length);   
    binary1 = binary1.padStart(maxLength, "0");   
    binary2 = binary2.padStart(maxLength, "0");    
    
    let borrow = 0;   
    let result = "";   
    let steps = [];    
    
    for (let i = maxLength - 1; i >= 0; i--) {     
      let bit1 = parseInt(binary1[i], 10);     
      let bit2 = parseInt(binary2[i], 10);      
      bit1 -= borrow;       
      
      if (bit1 < bit2) {       
        bit1 += 2;        
        borrow = 1;     
      } else {       
        borrow = 0;     
      }      
      
      result = (bit1 - bit2) + result;      
      steps.push(`Step ${maxLength - i}: ${binary1[i]} - ${binary2[i]} - borrow(${borrow}) = ${bit1 - bit2} -> result: ${result}`);   
    }    
    
    return { result, steps }; 
  }

  const handleOperation = () => {
    if (!binary1 || !binary2) {
      alert("Please enter both binary numbers");
      return;
    }

    let response = {};
    if (operation === "addition") {
      response = add(binary1, binary2);
    } else if (operation === "subtraction") {
      response = subtract(binary1, binary2);
    }

    setSteps(response.steps);
    setResult(response.result);
  };

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
          .back-button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 20px;
          }
          .back-button-link {
            display: flex;
            align-items: center;
            background-color: #e5e5e5;
            border: none;
            border-radius: 8px;
            padding: 10px 15px;
            cursor: pointer;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .back-button-link:hover {
            background-color: #d4d4d4;
            transform: scale(1.02);
          }
          .input-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: calc(100% - 40px);
            margin-bottom: 15px;
            align-items: center;
          }
          .input-container input {
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 16px;
            max-width: 320px;
          }
          .calculate-button {
            width: calc(100% - 40px);
            max-width: 320px;
            padding: 15px;
            background-color: #e5e5e5;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            color: #333;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .calculate-button:hover {
            background-color: #d4d4d4;
            transform: scale(1.02);
          }
          .result-container {
            width: 100%;
            margin-top: 20px;
            background-color: #e5e5e5;
            border-radius: 8px;
            padding: 15px;
          }
          .result-steps {
            background-color: white;
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 15px;
            max-height: 200px;
            overflow-y: auto;
          }
          .result-output {
            background-color: white;
            border-radius: 6px;
            padding: 10px;
          }
        `}
      </style>
      <div className="container">
        <div className="back-button">
          <button 
            onClick={() => navigate('/')}
            className="back-button-link"
          >
            ← Back
          </button>
          <h2>{operation.charAt(0).toUpperCase() + operation.slice(1)} Operation</h2>
        </div>

        <div className="input-container">
          <input 
            type="text" 
            value={binary1} 
            onChange={(e) => setBinary1(e.target.value)}
            placeholder="First Binary Number"
          />
          <input 
            type="text" 
            value={binary2} 
            onChange={(e) => setBinary2(e.target.value)}
            placeholder="Second Binary Number"
          />
        </div>

        <button 
          onClick={handleOperation}
          className="calculate-button"
        >
          Calculate {operation.charAt(0).toUpperCase() + operation.slice(1)}
        </button>

        {result && (
          <div className="result-container">
            <div className="result-steps">
              <h3>Calculation Steps:</h3>
              {steps.map((step, index) => (
                <div key={index}>{step}</div>
              ))}
            </div>
            <div className="result-output">
              <h3>Result:</h3>
              <div>{result}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}