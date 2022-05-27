import React, { useState } from 'react';
import { Logo } from './Logo';
import { Wrapper } from './Wrapper';
import { CurrentEquation } from './CurrentEquation';
import { PreviousEquation } from './PreviousEquation';
import { Button, ButtonGrid, ButtonSpace } from './Button';

function Calculator() {
  const [currentEquation, setCurrentEquation] = useState('0');
  const [prevResult, setPrevResult] = useState('0');
  const [prevEquation, setPrevEquation] = useState();
  const showPrevResult = Boolean(prevResult) && prevResult !== currentEquation;
  const showPrevEquasion = Boolean(prevEquation) && prevResult === currentEquation;

  const lastCharIsOperator = () => {
    return ['-', '+', '*', '/'].includes(currentEquation.slice(-1));
  };

  const allClear = () => {
    setCurrentEquation('0');
    setPrevResult('0');
    setPrevEquation();
  };

  const clearEntry = () => {
    setCurrentEquation(
      currentEquation.length > 1 ? currentEquation.slice(0, -1).trim() : prevResult
    );
  };

  const decimal = () => {
    const equationParts = currentEquation.split(' ');
    const currentValue = equationParts[equationParts.length - 1];
    const currentValueHasDecimal = currentValue.indexOf('.') !== -1;

    if (!currentValueHasDecimal) {
      const prefix = lastCharIsOperator() ? ' 0' : '';
      setCurrentEquation(`${currentEquation}${prefix}.`);
    }
  };

  const number = (value) => {
    if (prevResult === currentEquation || currentEquation === '0') {
      setCurrentEquation(value);
    } else {
      setCurrentEquation(currentEquation + (lastCharIsOperator() ? ' ' : '') + value);
    }
  };

  const operator = (value) => {
    if (lastCharIsOperator()) {
      setCurrentEquation(currentEquation.slice(0, -1) + value);
    } else {
      setCurrentEquation(`${currentEquation} ${value}`);
    }
  };

  const equals = () => {
    const equation = lastCharIsOperator() ? currentEquation.slice(0, -1).trim() : currentEquation;
    const factor = Math.pow(10, 10);
    // eslint-disable-next-line
    const calculation = Math.round(new Function(`return ${equation}`)() * factor) / factor;
    const result = calculation.toString();
    setPrevEquation(equation);
    setPrevResult(result);
    setCurrentEquation(result);
  };

  return (
    <Wrapper data-testid="calculator">
      <Logo />

      <PreviousEquation data-testid="previous-equation">
        {showPrevResult && `Ans = ${prevResult}`}
        {showPrevEquasion && `${prevEquation} =`}
      </PreviousEquation>

      <CurrentEquation data-testid="current-equation">{currentEquation}</CurrentEquation>

      <ButtonGrid>
        <Button data-testid={`button-ce`} $variant="action" onClick={() => clearEntry()}>
          CE
        </Button>

        <Button data-testid={`button-ac`} $variant="action" onClick={() => allClear()}>
          AC
        </Button>

        <ButtonSpace />

        <Button data-testid={`button-divide`} $variant="operator" onClick={() => operator('/')}>
          /
        </Button>

        <Button data-testid={`button-7`} $variant="number" onClick={() => number('7')}>
          7
        </Button>

        <Button data-testid={`button-8`} $variant="number" onClick={() => number('8')}>
          8
        </Button>

        <Button data-testid={`button-9`} $variant="number" onClick={() => number('9')}>
          9
        </Button>

        <Button data-testid={`button-times`} $variant="operator" onClick={() => operator('*')}>
          X
        </Button>

        <Button data-testid={`button-4`} $variant="number" onClick={() => number('4')}>
          4
        </Button>

        <Button data-testid={`button-5`} $variant="number" onClick={() => number('5')}>
          5
        </Button>

        <Button data-testid={`button-6`} $variant="number" onClick={() => number('6')}>
          6
        </Button>

        <Button data-testid={`button-minus`} $variant="operator" onClick={() => operator('-')}>
          -
        </Button>

        <Button data-testid={`button-1`} $variant="number" onClick={() => number('1')}>
          1
        </Button>

        <Button data-testid={`button-2`} $variant="number" onClick={() => number('2')}>
          2
        </Button>

        <Button data-testid={`button-3`} $variant="number" onClick={() => number('3')}>
          3
        </Button>

        <Button data-testid={`button-plus`} $variant="operator" onClick={() => operator('+')}>
          +
        </Button>

        <Button data-testid={`button-0`} $variant="number" onClick={() => number('0')}>
          0
        </Button>

        <Button data-testid={`button-decimal`} $variant="number" onClick={() => decimal()}>
          .
        </Button>

        <Button data-testid={`button-equals`} $variant="equals" onClick={() => equals('equals')}>
          =
        </Button>
      </ButtonGrid>
    </Wrapper>
  );
}

export { Calculator };
