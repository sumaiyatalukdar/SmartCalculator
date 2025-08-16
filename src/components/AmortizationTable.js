import React, { useState } from 'react';
import './AmortizationTable.css';

const AmortizationTable = ({ principal, emi, totalInterest, numberOfPayments, interestRate }) => {
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Show 12 months per page

  const generateAmortizationSchedule = () => {
    const schedule = [];
    let remainingBalance = principal;
    const monthlyRate = interestRate / 100 / 12;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingBalance = remainingBalance - principalPayment;

      schedule.push({
        month,
        emi: emi,
        principalPayment: principalPayment,
        interestPayment: interestPayment,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }

    return schedule;
  };

  const schedule = generateAmortizationSchedule();
  const totalPages = Math.ceil(schedule.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchedule = schedule.slice(startIndex, endIndex);

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (!showTable) {
    return (
      <div className="amortization-toggle">
        <button 
          className="show-amortization-btn"
          onClick={() => setShowTable(true)}
        >
          📊 Show Amortization Schedule
        </button>
      </div>
    );
  }

  return (
    <div className="amortization-table-container">
      <div className="amortization-header">
        <h4>Amortization Schedule</h4>
        <button 
          className="hide-amortization-btn"
          onClick={() => setShowTable(false)}
        >
          ✕
        </button>
      </div>

      <div className="amortization-summary">
        <div className="summary-item">
          <span>Total Payments:</span>
          <span>{formatCurrency(emi * numberOfPayments)}</span>
        </div>
        <div className="summary-item">
          <span>Total Interest:</span>
          <span>{formatCurrency(totalInterest)}</span>
        </div>
        <div className="summary-item">
          <span>Total Principal:</span>
          <span>{formatCurrency(principal)}</span>
        </div>
      </div>

      <div className="table-container">
        <table className="amortization-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>EMI</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {currentSchedule.map((row) => (
              <tr key={row.month}>
                <td>{row.month}</td>
                <td>{formatCurrency(row.emi)}</td>
                <td>{formatCurrency(row.principalPayment)}</td>
                <td>{formatCurrency(row.interestPayment)}</td>
                <td>{formatCurrency(row.remainingBalance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="page-btn"
          >
            ← Previous
          </button>
          
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Next →
          </button>
        </div>
      )}

      <div className="amortization-actions">
        <button 
          className="export-schedule-btn"
          onClick={() => {
            // Export functionality can be added here
            alert('Export functionality will be implemented');
          }}
        >
          📄 Export Schedule
        </button>
      </div>
    </div>
  );
};

export default AmortizationTable;
