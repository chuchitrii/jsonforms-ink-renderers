import { useState, useCallback, useMemo } from 'react';
import { useFocus } from 'ink';
import { ControlProps } from '@jsonforms/core';
import { useDebounce } from './useDebounce';

/**
 * Custom hook that combines JSONForms control props with Ink-specific features.
 * Provides local state for responsive UI updates while debouncing JSONForms updates.
 */
export function useInkControl<T = any>(props: ControlProps) {
  const { isFocused } = useFocus();
  const [localValue, setLocalValue] = useState<T>(props.data);

  // Debounce JSONForms state updates for better performance
  const debouncedChange = useDebounce(
    (val: T) => props.handleChange(props.path, val),
    150
  );

  // Update both local and debounced JSONForms state
  const onChange = useCallback(
    (val: T) => {
      setLocalValue(val);
      debouncedChange(val);
    },
    [debouncedChange]
  );

  // Sync local state when external data changes
  useMemo(() => {
    if (props.data !== localValue) {
      setLocalValue(props.data);
    }
  }, [props.data]);

  return {
    value: localValue ?? props.data,
    onChange,
    isFocused,
    label: props.label,
    errors: props.errors,
    visible: props.visible,
    enabled: props.enabled,
    required: props.required,
    schema: props.schema,
    path: props.path,
    handleChange: props.handleChange,
  };
}
