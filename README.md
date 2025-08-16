# Smart Calculator - Interest & EMI Calculator

A modern, responsive web application built with React.js that allows users to calculate simple interest, compound interest, and EMI (Equated Monthly Installments).

## Features

### Interest Calculator
- **Simple Interest Calculation**: Calculate interest earned on principal amount
- **Compound Interest Calculation**: Calculate compound interest with different compounding frequencies
- **Flexible Interest Types**: Support for Yearly, Quarterly, and Monthly interest calculations
- **Dropdown Selections**: Predefined options for interest rates (1% to 25%) and time periods (1 to 30 years)
- **Real-time Results**: Instant calculation with detailed breakdown

### EMI Calculator
- **Monthly EMI Calculation**: Calculate Equated Monthly Installments for loans
- **Interest Rate Options**: Wide range of interest rates from 5% to 20%
- **Flexible Tenure**: Support for both years and months as tenure units
- **Payment Breakdown**: Visual representation of principal vs interest components
- **Total Cost Analysis**: Complete breakdown of total amount and interest paid

## Technologies Used

- **React.js**: Frontend framework
- **CSS3**: Modern styling with gradients and animations
- **JavaScript ES6+**: Modern JavaScript features
- **Responsive Design**: Mobile-first approach

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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

## Usage

### Interest Calculator
1. Select calculation type (Simple or Compound Interest)
2. Enter the principal amount
3. Choose interest rate from the dropdown
4. Select number of years
5. Choose interest type (Yearly/Quarterly/Monthly)
6. Click "Calculate" to see results

### EMI Calculator
1. Enter loan amount
2. Select interest rate from the dropdown
3. Choose loan tenure (years or months)
4. Click "Calculate EMI" to see results
5. View payment breakdown with visual representation

## Features Highlights

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Calculations**: Instant results with no page refresh
- **Visual Feedback**: Progress bars and color-coded breakdowns
- **Form Validation**: Input validation with user-friendly error messages
- **Reset Functionality**: Easy form reset for new calculations

## Project Structure

```
src/
├── components/
│   ├── InterestCalculator.js
│   ├── InterestCalculator.css
│   ├── EMICalculator.js
│   └── EMICalculator.css
├── App.js
├── App.css
└── index.js
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (not recommended)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Screenshots

The application features a modern design with:
- Gradient backgrounds
- Card-based layouts
- Smooth hover effects
- Responsive grid systems
- Professional color schemes

## Future Enhancements

- Add more calculation types (FD, RD, etc.)
- Export results to PDF
- Save calculation history
- Dark mode toggle
- Multiple currency support
- Advanced charts and graphs
