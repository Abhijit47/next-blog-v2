import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';

type CustomFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = {
  label: string;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>['control'];
  name: TName;
};

type FormControlFunction<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = () => React.ReactNode;

type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = CustomFieldProps<TFieldValues, TName, TTransformedValues> & {
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>['render']
    >[0]['field'] & {
      'aria-invalid': boolean;
      id: string;
    }
  ) => React.ReactNode;
};

export function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>({
  children,
  name,
  control,
  label,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          {children({
            ...field,
            'aria-invalid': fieldState.invalid,
            id: field.name,
          })}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function CustomField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>(props: CustomFieldProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <FormBase {...props}>
      {(field) => (
        <Input type='text' placeholder='Enter your hobbies' {...field} />
      )}
    </FormBase>
  );
}
