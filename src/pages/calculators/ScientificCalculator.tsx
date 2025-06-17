
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import AdSpace from '../../components/AdSpace';

const ScientificCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [memory, setMemory] = useState(0);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performScientificOperation = (func) => {
    const value = parseFloat(display);
    let result;

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'cube':
        result = value * value * value;
        break;
      case 'factorial':
        result = factorial(value);
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case '1/x':
        result = 1 / value;
        break;
      default:
        result = value;
    }

    setDisplay(String(result));
    setWaitingForNewValue(true);
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const Button = ({ onClick, className = '', children }) => (
    <button
      onClick={onClick}
      className={`bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Scientific Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Advanced calculator with scientific functions for complex calculations
          </p>
        </div>

        {/* Ad Space */}
        <AdSpace size="leaderboard" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            {/* Display */}
            <div className="bg-gray-900 text-white p-4 rounded-lg mb-6 text-right">
              <div className="text-3xl font-mono overflow-hidden">
                {display}
              </div>
            </div>

            {/* Scientific Functions */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              <Button onClick={() => performScientificOperation('sin')}>sin</Button>
              <Button onClick={() => performScientificOperation('cos')}>cos</Button>
              <Button onClick={() => performScientificOperation('tan')}>tan</Button>
              <Button onClick={() => performScientificOperation('log')}>log</Button>
              <Button onClick={() => performScientificOperation('ln')}>ln</Button>
              <Button onClick={() => performScientificOperation('sqrt')}>√</Button>
            </div>

            <div className="grid grid-cols-6 gap-2 mb-4">
              <Button onClick={() => performScientificOperation('square')}>x²</Button>
              <Button onClick={() => performScientificOperation('cube')}>x³</Button>
              <Button onClick={() => performScientificOperation('1/x')}>1/x</Button>
              <Button onClick={() => performScientificOperation('factorial')}>x!</Button>
              <Button onClick={() => performScientificOperation('pi')}>π</Button>
              <Button onClick={() => performScientificOperation('e')}>e</Button>
            </div>

            {/* Basic Calculator */}
            <div className="grid grid-cols-4 gap-2">
              <Button onClick={clear} className="bg-red-500 hover:bg-red-600 text-white">C</Button>
              <Button onClick={() => setDisplay(display.slice(0, -1) || '0')}>⌫</Button>
              <Button onClick={() => performOperation('/')} className="bg-blue-500 hover:bg-blue-600 text-white">÷</Button>
              <Button onClick={() => performOperation('*')} className="bg-blue-500 hover:bg-blue-600 text-white">×</Button>

              <Button onClick={() => inputNumber(7)}>7</Button>
              <Button onClick={() => inputNumber(8)}>8</Button>
              <Button onClick={() => inputNumber(9)}>9</Button>
              <Button onClick={() => performOperation('-')} className="bg-blue-500 hover:bg-blue-600 text-white">-</Button>

              <Button onClick={() => inputNumber(4)}>4</Button>
              <Button onClick={() => inputNumber(5)}>5</Button>
              <Button onClick={() => inputNumber(6)}>6</Button>
              <Button onClick={() => performOperation('+')} className="bg-blue-500 hover:bg-blue-600 text-white">+</Button>

              <Button onClick={() => inputNumber(1)}>1</Button>
              <Button onClick={() => inputNumber(2)}>2</Button>
              <Button onClick={() => inputNumber(3)}>3</Button>
              <Button onClick={() => performOperation('=')} className="bg-green-500 hover:bg-green-600 text-white row-span-2">=</Button>

              <Button onClick={() => inputNumber(0)} className="col-span-2">0</Button>
              <Button onClick={inputDecimal}>.</Button>
            </div>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Memory</h3>
              <div className="text-2xl font-mono text-center py-2 bg-gray-100 dark:bg-gray-700 rounded">
                {memory}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button onClick={() => setMemory(parseFloat(display))}>MS</Button>
                <Button onClick={() => setMemory(memory + parseFloat(display))}>M+</Button>
                <Button onClick={() => setDisplay(String(memory))}>MR</Button>
                <Button onClick={() => setMemory(0)}>MC</Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Function Guide</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div><strong>sin/cos/tan:</strong> Trigonometric functions (degrees)</div>
                <div><strong>log:</strong> Base-10 logarithm</div>
                <div><strong>ln:</strong> Natural logarithm</div>
                <div><strong>√:</strong> Square root</div>
                <div><strong>x²/x³:</strong> Power functions</div>
                <div><strong>x!:</strong> Factorial</div>
                <div><strong>π:</strong> Pi (3.14159...)</div>
                <div><strong>e:</strong> Euler's number (2.71828...)</div>
              </div>
            </div>

            {/* Ad Space */}
            <AdSpace size="rectangle" />
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Scientific Calculator Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Trigonometric Functions</h4>
              <p>Calculate sine, cosine, and tangent values. Note that this calculator uses degrees, not radians, for trigonometric calculations.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Logarithmic Functions</h4>
              <p>Both common logarithm (base 10) and natural logarithm (base e) are available for exponential and growth calculations.</p>
            </div>
          </div>
        </div>

        {/* Ad Space */}
        <div className="mt-8">
          <AdSpace size="leaderboard" />
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
