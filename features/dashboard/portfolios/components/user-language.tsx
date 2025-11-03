import { MultiSelect } from '@/components/extends/multi-select';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Controller, useFormContext } from 'react-hook-form';
import { PortfolioFormValues } from './portfolio-form';

const languagesList = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ru', label: 'Russian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'hi', label: 'Hindi' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'bn', label: 'Bengali' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'jv', label: 'Javanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'it', label: 'Italian' },
  { value: 'tr', label: 'Turkish' },
  { value: 'vi', label: 'Vietnamese' },
];

export default function UserLanguages({
  placeholder,
}: {
  placeholder: string;
}) {
  const form = useFormContext<Pick<PortfolioFormValues, 'languages'>>();

  return (
    <Controller
      control={form.control}
      name='languages'
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Known Languages</FieldLabel>
          <MultiSelect
            aria-invalid={fieldState.invalid}
            id={field.name}
            options={languagesList}
            value={field.value}
            animation={0}
            badgeAnimation={'none'}
            onValueChange={field.onChange}
            placeholder={placeholder}
            maxCount={3}
            closeOnSelect={true}
            deduplicateOptions={true}
            animationConfig={{
              badgeAnimation: 'none',
              optionHoverAnimation: 'none',
            }}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
