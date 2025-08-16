import React, { useState } from 'react';
import './InterestCalculator.css';

const InterestCalculator = ({ onCalculate, onFavorite }) => {
  const [formData, setFormData] = useState({
    principal: '',
    rate: '',
    years: '',
    interestType: 'yearly',
    calculationType: 'simple'
  });

  const [result, setResult] = useState(null);

  const rateOptions = [
    { value: '1', label: '1%' },
    { value: '2', label: '2%' },
    { value: '3', label: '3%' },
    { value: '4', label: '4%' },
    { value: '5', label: '5%' },
    { value: '6', label: '6%' },
    { value: '7', label: '7%' },
    { value: '8', label: '8%' },
    { value: '9', label: '9%' },
    { value: '10', label: '10%' },
    { value: '12', label: '12%' },
    { value: '15', label: '15%' },
    { value: '18', label: '18%' },
    { value: '20', label: '20%' },
    { value: '25', label: '25%' }
  ];

  const yearOptions = [
    { value: '1', label: '1 Year' },
    { value: '2', label: '2 Years' },
    { value: '3', label: '3 Years' },
    { value: '4', label: '4 Years' },
    { value: '5', label: '5 Years' },
    { value: '6', label: '6 Years' },
    { value: '7', label: '7 Years' },
    { value: '8', label: '8 Years' },
    { value: '9', label: '9 Years' },
    { value: '10', label: '10 Years' },
    { value: '15', label: '15 Years' },
    { value: '20', label: '20 Years' },
    { value: '25', label: '25 Years' },
    { value: '30', label: '30 Years' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateInterest = () => {
    const { principal, rate, years, interestType, calculationType } = formData;
    
    if (!principal || !rate || !years) {
      alert('Please fill in all fields');
      return;
    }

    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    
    let effectiveRate = r;
    let effectiveTime = t;

    // Adjust rate and time based on interest type
    switch (interestType) {
      case 'monthly':
        effectiveRate = r / 12;
        effectiveTime = t * 12;
        break;
      case 'quarterly':
        effectiveRate = r / 4;
        effectiveTime = t * 4;
        break;
      case 'yearly':
      default:
        effectiveRate = r;
        effectiveTime = t;
        break;
    }

    let interest, amount;

    if (calculationType === 'simple') {
      interest = p * effectiveRate * effectiveTime;
      amount = p + interest;
    } else {
      // Compound interest
      amount = p * Math.pow(1 + effectiveRate, effectiveTime);
      interest = amount - p;
    }

    const calculationResult = {
      principal: p,
      interest: interest.toFixed(2),
      amount: amount.toFixed(2),
      calculationType: calculationType,
      interestType: interestType
    };

    setResult(calculationResult);
    
    // Pass calculation to parent component for history
    if (onCalculate) {
      onCalculate(calculationResult);
    }
  };

  const resetForm = () => {
    setFormData({
      principal: '',
      rate: '',
      years: '',
      interestType: 'yearly',
      calculationType: 'simple'
    });
    setResult(null);
  };

  const handleFavorite = () => {
    if (result && onFavorite) {
      onFavorite(result);
    }
  };

  return (
    <div className="interest-calculator">
      <h2>Interest Calculator</h2>
      
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="calculationType">Calculation Type:</label>
          <select
            id="calculationType"
            name="calculationType"
            value={formData.calculationType}
            onChange={handleInputChange}
          >
            <option value="simple">Simple Interest</option>
            <option value="compound">Compound Interest</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="principal">Principal Amount (₹):</label>
          <input
            type="number"
            id="principal"
            name="principal"
            value={formData.principal}
            onChange={handleInputChange}
            placeholder="Enter principal amount"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rate">Rate of Interest:</label>
          <select
            id="rate"
            name="rate"
            value={formData.rate}
            onChange={handleInputChange}
          >
            <option value="">Select rate</option>
            {rateOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="years">Number of Years:</label>
          <select
            id="years"
            name="years"
            value={formData.years}
            onChange={handleInputChange}
          >
            <option value="">Select years</option>
            {yearOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="interestType">Interest Type:</label>
          <select
            id="interestType"
            name="interestType"
            value={formData.interestType}
            onChange={handleInputChange}
          >
            <option value="yearly">Yearly</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="button-group">
          <button onClick={calculateInterest} className="calculate-btn">
            Calculate
          </button>
          <button onClick={resetForm} className="reset-btn">
            Reset
          </button>
        </div>
      </div>

      {result && (
        <div className="result-section">
          <div className="result-header">
            <h3>Calculation Results</h3>
            <div className="result-actions">
              <button 
                onClick={handleFavorite} 
                className="favorite-result-btn"
                title="Add to Favorites"
              >
                ⭐
              </button>
            </div>
          </div>
          <div className="result-grid">
            <div className="result-item">
              <span className="label">Principal Amount:</span>
              <span className="value">₹{result.principal.toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span className="label">Interest Earned:</span>
              <span className="value">₹{parseFloat(result.interest).toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span className="label">Total Amount:</span>
              <span className="value">₹{parseFloat(result.amount).toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span className="label">Calculation Type:</span>
              <span className="value">{result.calculationType.charAt(0).toUpperCase() + result.calculationType.slice(1)} Interest</span>
            </div>
            <div className="result-item">
              <span className="label">Interest Frequency:</span>
              <span className="value">{result.interestType.charAt(0).toUpperCase() + result.interestType.slice(1)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestCalculator;
