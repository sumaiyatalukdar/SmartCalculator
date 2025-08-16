# Smart Calculator - Advanced Interest & EMI Calculator

A comprehensive, modern web application built with React.js that provides professional-grade financial calculation tools with advanced features like dark mode, currency conversion, PDF export, and calculation history management.

## 🌟 Features

### 💰 Interest Calculator
- **Simple Interest Calculation**: Calculate interest earned on principal amount
- **Compound Interest Calculation**: Calculate compound interest with different compounding frequencies
- **Flexible Interest Types**: Support for Yearly, Quarterly, and Monthly interest calculations
- **Dropdown Selections**: Predefined options for interest rates (1% to 25%) and time periods (1 to 30 years)
- **Real-time Results**: Instant calculation with detailed breakdown
- **Currency Support**: Multi-currency display with conversion rates

### 🏠 EMI Calculator
- **Monthly EMI Calculation**: Calculate Equated Monthly Installments for loans
- **Interest Rate Options**: Wide range of interest rates from 5% to 20%
- **Flexible Tenure**: Support for both years and months as tenure units
- **Payment Breakdown**: Visual representation of principal vs interest components
- **Total Cost Analysis**: Complete breakdown of total amount and interest paid
- **Amortization Schedule**: Detailed monthly breakdown with pagination

### 🌙 Advanced Features
- **Dark Mode Toggle**: Switch between light and dark themes
- **Currency Converter**: Support for 10+ currencies with real-time conversion
- **PDF Export**: Generate professional reports for calculations
- **Calculation History**: Persistent storage of all calculations
- **Favorites System**: Bookmark frequently used calculations
- **Responsive Design**: Mobile-first approach with touch-friendly interface

## 🛠️ Technologies Used

- **React.js**: Frontend framework with hooks
- **CSS3**: Modern styling with gradients, animations, and dark mode
- **JavaScript ES6+**: Modern JavaScript features and localStorage
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Browser APIs**: Print functionality for PDF generation

## 📦 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sumaiyatalukdar/SmartCalculator.git
   cd smart-calci
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🎯 Usage Guide

### Interest Calculator
1. Select calculation type (Simple or Compound Interest)
2. Enter the principal amount
3. Choose interest rate from the dropdown (1% to 25%)
4. Select number of years (1 to 30)
5. Choose interest type (Yearly/Quarterly/Monthly)
6. Click "Calculate" to see results
7. Use ⭐ to add to favorites or 📄 to export PDF

### EMI Calculator
1. Enter loan amount
2. Select interest rate from the dropdown (5% to 20%)
3. Choose loan tenure (years or months)
4. Click "Calculate EMI" to see results
5. View payment breakdown with visual representation
6. Click "📊 Show Amortization Schedule" for monthly breakdown
7. Use ⭐ to add to favorites or 📄 to export PDF

### Advanced Features
- **🌙 Dark Mode**: Click the moon/sun icon in the header
- **💱 Currency**: Select from 10+ currencies in the header dropdown
- **📊 History**: View calculation history with the history button
- **⭐ Favorites**: Access bookmarked calculations with the star button
- **📄 Export**: Generate printable PDF reports for any calculation

## 🏗️ Project Structure

```
src/
├── components/
│   ├── InterestCalculator.js
│   ├── InterestCalculator.css
│   ├── EMICalculator.js
│   ├── EMICalculator.css
│   ├── AmortizationTable.js
│   └── AmortizationTable.css
├── utils/
│   ├── currencyConverter.js
│   └── pdfExporter.js
├── App.js
├── App.css
└── index.js
```

## 🎨 Features Highlights

### Modern UI/UX
- **Gradient Backgrounds**: Beautiful color schemes
- **Smooth Animations**: Hover effects and transitions
- **Card-based Layout**: Clean, organized interface
- **Responsive Grid**: Works on all screen sizes
- **Professional Typography**: Clear, readable fonts

### Advanced Functionality
- **Persistent Storage**: All data saved in localStorage
- **Real-time Updates**: Instant calculations and currency conversion
- **Export Capabilities**: Professional PDF reports
- **History Management**: Track all calculations with timestamps
- **Favorites System**: Quick access to important calculations
- **Amortization Tables**: Detailed loan breakdown with pagination

### Currency Support
- **10+ Currencies**: INR, USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SGD
- **Real-time Conversion**: Automatic currency formatting
- **Symbol Display**: Proper currency symbols and formatting
- **Rate Management**: Centralized currency conversion logic

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🚀 Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (not recommended)

## 🔧 Technical Implementation

### State Management
- **React Hooks**: useState and useEffect for state management
- **localStorage**: Persistent data storage across sessions
- **Component Props**: Clean data flow between components

### Styling Architecture
- **CSS Modules**: Component-scoped styling
- **Dark Mode**: CSS custom properties for theme switching
- **Responsive Design**: Mobile-first CSS Grid and Flexbox
- **Animations**: CSS transitions and transforms

### Data Persistence
- **Calculation History**: Automatic saving of all calculations
- **User Preferences**: Dark mode and currency selection
- **Favorites**: Persistent bookmark system
- **Error Handling**: Graceful fallbacks for data loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- [ ] Real-time currency rates from APIs
- [ ] Advanced charts and graphs
- [ ] More calculation types (FD, RD, SIP, etc.)
- [ ] User accounts and cloud sync
- [ ] Mobile app version
- [ ] Advanced export options (Excel, CSV)
- [ ] Calculation sharing via links
- [ ] Voice input for calculations

## 📞 Support

For support, email support@smartcalculator.com or create an issue in the repository.

## 🙏 Acknowledgments

- React.js community for the amazing framework
- CSS community for modern styling techniques
- Financial calculation formulas and standards
- Open source contributors and libraries

---

**Built with ❤️ by Sumaiya Talukdar**

*Smart Calculator - Making Financial Calculations Simple and Beautiful*
