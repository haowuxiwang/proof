import { useId } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  error?: string;
  disabled?: boolean;
  helperText?: string;
  maxLength?: number;
}

export default function FormField({
  label,
  required,
  type = 'text',
  value,
  onChange,
  placeholder,
  multiline,
  error,
  disabled,
  helperText,
  maxLength,
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const describedBy = [
    error ? errorId : null,
    helperText ? helperId : null,
  ].filter(Boolean).join(' ') || undefined;

  const inputClasses = [
    'input-field',
    error ? 'error' : '',
  ].filter(Boolean).join(' ');

  return (
    <div>
      <label htmlFor={id} className="label-field">
        {label}
        {required && <span className="required" aria-hidden="true">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          className={inputClasses}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          disabled={disabled}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          maxLength={maxLength}
        />
      ) : (
        <input
          id={id}
          className={inputClasses}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          maxLength={maxLength}
        />
      )}
      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={helperId} className="field-helper">
          {helperText}
        </p>
      )}
      {multiline && maxLength && (
        <p className={`field-counter ${value.length > maxLength ? 'over' : ''}`}>
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  );
}
