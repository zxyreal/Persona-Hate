'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ExplorerSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="explorer-field">
      <label htmlFor={id}>{label}</label>
      <Select
        value={value}
        onValueChange={(next) => {
          if (typeof next === 'string') onChange(next);
        }}
      >
        <SelectTrigger id={id} className="explorer-select">
          <SelectValue>
            {options.find((option) => option.value === value)?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          className="explorer-select-menu"
          alignItemWithTrigger={false}
        >
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ComparisonBars({
  rows,
  max,
  format,
  unit,
}: {
  rows: { label: string; value: number; tone: 'primary' | 'reference' }[];
  max: number;
  format: (value: number) => string;
  unit: string;
}) {
  return (
    <div
      className="comparison-bars"
      role="img"
      aria-label={`${unit}. ${rows.map((row) => `${row.label}: ${format(row.value)}`).join('; ')}`}
    >
      {rows.map((row) => (
        <div className="comparison-bar-row" key={row.label}>
          <div className="comparison-bar-label">{row.label}</div>
          <div className="comparison-bar-track">
            <div
              className={`comparison-bar-fill ${row.tone}`}
              style={{ width: `${Math.min(100, (row.value / max) * 100)}%` }}
            />
          </div>
          <strong>{format(row.value)}</strong>
        </div>
      ))}
      <div className="comparison-axis" aria-hidden="true">
        <span>0</span>
        <span>{format(max / 2)}</span>
        <span>{format(max)}</span>
      </div>
      <p className="comparison-unit">{unit}</p>
    </div>
  );
}
