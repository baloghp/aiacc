import { useCallback, useState } from 'react';

interface ValidationRule {
  test: (value: any) => boolean;
  message: string;
}

interface UseFormValidationReturn {
  errors: Record<string, string>;
  validate: (data: Record<string, any>, rules: Record<string, ValidationRule[]>) => boolean;
  clearErrors: () => void;
  setError: (field: string, message: string) => void;
}

export function useFormValidation(): UseFormValidationReturn {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(
    (data: Record<string, any>, rules: Record<string, ValidationRule[]>) => {
      const newErrors: Record<string, string> = {};

      Object.keys(rules).forEach((field) => {
        const fieldRules = rules[field];
        const value = data[field];

        for (const rule of fieldRules) {
          if (!rule.test(value)) {
            newErrors[field] = rule.message;
            break;
          }
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    []
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setError = useCallback((field: string, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  }, []);

  return {
    errors,
    validate,
    clearErrors,
    setError,
  };
}
