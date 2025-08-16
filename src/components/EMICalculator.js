import React, { useState } from 'react';
import './EMICalculator.css';

const EMICalculator = ({ onCalculate, onFavorite }) => {
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: '',
    tenureType: 'years'
  });

  const [result, setResult] = useState(null);

  const interestRateOptions = [
    { value: '5', label: '5%' },
    { value: '6', label: '6%' },
    { value: '7', label: '7%' },
    { value: '8', label: '8%' },
    { value: '9', label: '9%' },
    { value: '10', label: '10%' },
    { value: '11', label: '11%' },
    { value: '12', label: '12%' },
    { value: '13', label: '13%' },
    { value: '14', label: '14%' },
    { value: '15', label: '15%' },
    { value: '16', label: '16%' },
    { value: '17', label: '17%' },
    { value: '18', label: '18%' },
    { value: '19', label: '19%' },
    { value: '20', label: '20%' }
  ];

  const tenureOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '30', label: '30' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEMI = () => {
    const { loanAmount, interestRate, tenure, tenureType } = formData;
    
    if (!loanAmount || !interestRate || !tenure) {
      alert('Please fill in all fields');
      return;
    }

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    let numberOfPayments;

    if (tenureType === 'years') {
      numberOfPayments = parseFloat(tenure) * 12;
    } else {
      numberOfPayments = parseFloat(tenure);
    }

    // EMI formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi = principal * rate * Math.pow(1 + rate, numberOfPayments) / 
                (Math.pow(1 + rate, numberOfPayments) - 1);

    const totalAmount = emi * numberOfPayments;
    const totalInterest = totalAmount - principal;

    const calculationResult = {
      emi: emi.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: principal,
      numberOfPayments: numberOfPayments,
      interestRate: parseFloat(interestRate)
    };

    setResult(calculationResult);
    
    // Pass calculation to parent component for history
    if (onCalculate) {
      onCalculate(calculationResult);
    }
  };

  const resetForm = () => {
    setFormData({
      loanAmount: '',
      interestRate: '',
      tenure: '',
      tenureType: 'years'
    });
    setResult(null);
  };

  const handleFavorite = () => {
    if (result && onFavorite) {
      onFavorite(result);
    }
  };

  return (
    <div className="emi-calculator">
      <h2>EMI Calculator</h2>
      
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount (₹):</label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            placeholder="Enter loan amount"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="interestRate">Interest Rate:</label>
          <select
            id="interestRate"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleInputChange}
          >
            <option value="">Select interest rate</option>
            {interestRateOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tenure">Loan Tenure:</label>
          <div className="tenure-input-group">
            <select
              id="tenure"
              name="tenure"
              value={formData.tenure}
              onChange={handleInputChange}
            >
              <option value="">Select tenure</option>
              {tenureOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              name="tenureType"
              value={formData.tenureType}
              onChange={handleInputChange}
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        <div className="button-group">
          <button onClick={calculateEMI} className="calculate-btn">
            Calculate EMI
          </button>
          <button onClick={resetForm} className="reset-btn">
            Reset
          </button>
        </div>
      </div>

      {result && (
        <div className="result-section">
          <div className="result-header">
            <h3>EMI Calculation Results</h3>
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
              <span className="label">Monthly EMI:</span>
              <span className="value">₹{parseFloat(result.emi).toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span className="label">Total Interest:</span>
              <span className="value">₹{parseFloat(result.totalInterest).toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span className="label">Total Amount:</span>
              <span className="value">₹{parseFloat(result.totalAmount).toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span className="label">Principal Amount:</span>
              <span className="value">₹{result.principal.toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span className="label">Number of Payments:</span>
              <span className="value">{result.numberOfPayments}</span>
            </div>
          </div>

          <div className="emi-breakdown">
            <h4>Payment Breakdown</h4>
            <div className="breakdown-grid">
              <div className="breakdown-item">
                <div className="breakdown-label">Principal</div>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-fill principal-fill"
                    style={{ width: `${(result.principal / parseFloat(result.totalAmount)) * 100}%` }}
                  ></div>
                </div>
                <div className="breakdown-percentage">
                  {((result.principal / parseFloat(result.totalAmount)) * 100).toFixed(1)}%
                </div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-label">Interest</div>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-fill interest-fill"
                    style={{ width: `${(parseFloat(result.totalInterest) / parseFloat(result.totalAmount)) * 100}%` }}
                  ></div>
                </div>
                <div className="breakdown-percentage">
                  {((parseFloat(result.totalInterest) / parseFloat(result.totalAmount)) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;
