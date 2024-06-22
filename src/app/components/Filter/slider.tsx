// components/RangeSlider.tsx
import React, { useState } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  onChange: (min: number, max: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, step, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxValue - step);
    setMinValue(value);
    onChange(value, maxValue);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minValue + step);
    setMaxValue(value);
    onChange(minValue, value);
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={handleMinChange}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxValue}
        onChange={handleMaxChange}
      />
      <div>
        <span>Min: {minValue}</span> - <span>Max: {maxValue}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
