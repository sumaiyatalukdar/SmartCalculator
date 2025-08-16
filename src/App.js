import React, { useState, useEffect } from 'react';
import './App.css';
import InterestCalculator from './components/InterestCalculator';
import EMICalculator from './components/EMICalculator';
import { currencies, convertCurrency, formatCurrency } from './utils/currencyConverter';
import { exportToPDF } from './utils/pdfExporter';

function App() {
  const [activeTab, setActiveTab] = useState('interest');
  const [darkMode, setDarkMode] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage only once on component mount
  useEffect(() => {
    try {
      const savedDarkMode = localStorage.getItem('darkMode');
      const savedHistory = localStorage.getItem('calculationHistory');
      const savedFavorites = localStorage.getItem('favorites');
      const savedCurrency = localStorage.getItem('selectedCurrency');

      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
      if (savedHistory) {
        setCalculationHistory(JSON.parse(savedHistory));
      }
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      if (savedCurrency) {
        setSelectedCurrency(savedCurrency);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
        localStorage.setItem('favorites', JSON.stringify(favorites));
        localStorage.setItem('selectedCurrency', selectedCurrency);
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    }
  }, [darkMode, calculationHistory, favorites, selectedCurrency, isLoaded]);

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addToHistory = (calculation) => {
    const newCalculation = {
      ...calculation,
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      type: activeTab
    };
    setCalculationHistory(prev => [newCalculation, ...prev.slice(0, 19)]);
  };

  const addToFavorites = (calculation) => {
    const favoriteCalculation = {
      ...calculation,
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      type: activeTab
    };
    setFavorites(prev => [favoriteCalculation, ...prev]);
  };

  const removeFromFavorites = (id) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setCalculationHistory([]);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const exportCalculation = (calculation) => {
    exportToPDF(calculation, calculation.type);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="App-header">
        <div className="header-content">
          <div className="title-section">
            <h1>Smart Calculator</h1>
            <p>Calculate Interest and EMI with ease</p>
          </div>
          <div className="header-controls">
            <div className="currency-selector">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="currency-select"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </option>
                ))}
              </select>
            </div>
            <button 
              className={`dark-mode-toggle ${darkMode ? 'active' : ''}`}
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            {calculationHistory.length > 0 && (
              <button 
                className="history-toggle"
                onClick={() => setActiveTab(activeTab === 'history' ? 'interest' : 'history')}
                title="View Calculation History"
              >
                📊
              </button>
            )}
            {favorites.length > 0 && (
              <button 
                className="favorites-toggle"
                onClick={() => setActiveTab(activeTab === 'favorites' ? 'interest' : 'favorites')}
                title="View Favorites"
              >
                ⭐
              </button>
            )}
          </div>
        </div>
      </header>
      
      <div className="calculator-container">
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'interest' ? 'active' : ''}`}
            onClick={() => setActiveTab('interest')}
          >
            Interest Calculator
          </button>
          <button 
            className={`tab-button ${activeTab === 'emi' ? 'active' : ''}`}
            onClick={() => setActiveTab('emi')}
          >
            EMI Calculator
          </button>
          {calculationHistory.length > 0 && (
            <button 
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History ({calculationHistory.length})
            </button>
          )}
          {favorites.length > 0 && (
            <button 
              className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites ({favorites.length})
            </button>
          )}
        </div>
        
        <div className="calculator-content">
          {activeTab === 'interest' ? (
            <InterestCalculator 
              onCalculate={addToHistory}
              onFavorite={addToFavorites}
              selectedCurrency={selectedCurrency}
            />
          ) : activeTab === 'emi' ? (
            <EMICalculator 
              onCalculate={addToHistory}
              onFavorite={addToFavorites}
              selectedCurrency={selectedCurrency}
            />
          ) : activeTab === 'history' ? (
            <CalculationHistory 
              history={calculationHistory} 
              onClear={clearHistory}
              onDelete={(id) => setCalculationHistory(prev => prev.filter(item => item.id !== id))}
              onFavorite={addToFavorites}
              onExport={exportCalculation}
              selectedCurrency={selectedCurrency}
            />
          ) : activeTab === 'favorites' ? (
            <FavoritesList
              favorites={favorites}
              onClear={clearFavorites}
              onRemove={removeFromFavorites}
              onExport={exportCalculation}
              selectedCurrency={selectedCurrency}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Calculation History Component
const CalculationHistory = ({ history, onClear, onDelete, onFavorite, onExport, selectedCurrency }) => {
  if (history.length === 0) {
    return (
      <div className="history-empty">
        <h2>No Calculation History</h2>
        <p>Your calculations will appear here once you start using the calculators.</p>
      </div>
    );
  }

  return (
    <div className="calculation-history">
      <div className="history-header">
        <h2>Calculation History</h2>
        <button onClick={onClear} className="clear-history-btn">
          Clear All
        </button>
      </div>
      
      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div className="history-item-header">
              <span className="history-type">
                {item.type === 'interest' ? '💰 Interest' : '🏠 EMI'}
              </span>
              <span className="history-timestamp">{item.timestamp}</span>
              <div className="history-actions">
                <button 
                  onClick={() => onFavorite(item)} 
                  className="favorite-btn"
                  title="Add to Favorites"
                >
                  ⭐
                </button>
                <button 
                  onClick={() => onExport(item)} 
                  className="export-btn"
                  title="Export to PDF"
                >
                  📄
                </button>
                <button 
                  onClick={() => onDelete(item.id)} 
                  className="delete-history-btn"
                  title="Delete this calculation"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="history-details">
              {item.type === 'interest' ? (
                <>
                  <div className="history-detail">
                    <span>Principal:</span>
                    <span>{formatCurrency(item.principal, selectedCurrency)}</span>
                  </div>
                  <div className="history-detail">
                    <span>Interest Earned:</span>
                    <span>{formatCurrency(parseFloat(item.interest || 0), selectedCurrency)}</span>
                  </div>
                  <div className="history-detail">
                    <span>Total Amount:</span>
                    <span>{formatCurrency(parseFloat(item.amount || 0), selectedCurrency)}</span>
                  </div>
                  <div className="history-detail">
                    <span>Type:</span>
                    <span>{item.calculationType} Interest ({item.interestType})</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="history-detail">
                    <span>Loan Amount:</span>
                    <span>{formatCurrency(item.principal, selectedCurrency)}</span>
                  </div>
                  <div className="history-detail">
                    <span>Monthly EMI:</span>
                    <span>{formatCurrency(parseFloat(item.emi || 0), selectedCurrency)}</span>
                  </div>
                  <div className="history-detail">
                    <span>Total Interest:</span>
                    <span>{formatCurrency(parseFloat(item.totalInterest || 0), selectedCurrency)}</span>
                  </div>
                  <div className="history-detail">
                    <span>Total Amount:</span>
                    <span>{formatCurrency(parseFloat(item.totalAmount || 0), selectedCurrency)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Favorites List Component
const FavoritesList = ({ favorites, onClear, onRemove, onExport, selectedCurrency }) => {
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorites</h2>
        <p>Add calculations to favorites to see them here.</p>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <div className="favorites-header">
        <h2>Favorite Calculations</h2>
        <button onClick={onClear} className="clear-favorites-btn">
          Clear All
        </button>
      </div>
      
      <div className="favorites-grid">
        {favorites.map((item) => (
          <div key={item.id} className="favorite-item">
            <div className="favorite-item-header">
              <span className="favorite-type">
                {item.type === 'interest' ? '💰 Interest' : '🏠 EMI'}
              </span>
              <span className="favorite-timestamp">{item.timestamp}</span>
              <div className="favorite-actions">
                <button 
                  onClick={() => onExport(item)} 
                  className="export-btn"
                  title="Export to PDF"
                >
                  📄
                </button>
                <button 
                  onClick={() => onRemove(item.id)} 
                  className="remove-favorite-btn"
                  title="Remove from Favorites"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="favorite-details">
              {item.type === 'interest' ? (
                <>
                  <div className="favorite-detail">
                    <span>Principal:</span>
                    <span>{formatCurrency(item.principal, selectedCurrency)}</span>
                  </div>
                  <div className="favorite-detail">
                    <span>Interest Earned:</span>
                    <span>{formatCurrency(parseFloat(item.interest || 0), selectedCurrency)}</span>
                  </div>
                  <div className="favorite-detail">
                    <span>Total Amount:</span>
                    <span>{formatCurrency(parseFloat(item.amount || 0), selectedCurrency)}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="favorite-detail">
                    <span>Loan Amount:</span>
                    <span>{formatCurrency(item.principal, selectedCurrency)}</span>
                  </div>
                  <div className="favorite-detail">
                    <span>Monthly EMI:</span>
                    <span>{formatCurrency(parseFloat(item.emi || 0), selectedCurrency)}</span>
                  </div>
                  <div className="favorite-detail">
                    <span>Total Interest:</span>
                    <span>{formatCurrency(parseFloat(item.totalInterest || 0), selectedCurrency)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
