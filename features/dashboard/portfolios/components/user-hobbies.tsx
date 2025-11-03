import { Button } from '@/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { AlertTriangleIcon, PlusCircleIcon, XCircleIcon } from 'lucide-react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { PortfolioFormValues } from './portfolio-form';

export const UserHobbies = () => {
  const form = useFormContext<Pick<PortfolioFormValues, 'hobbies'>>();

  const {
    fields: hobbies,
    append: addHobbies,
    remove: removeHobbies,
  } = useFieldArray({
    control: form.control,
    name: 'hobbies',
    rules: {
      minLength: 1,
      maxLength: 5,
    },
  });

  const watchHobbies = form.watch('hobbies').length;
  return (
    <FieldGroup>
      <div className={'flex items-center justify-between'}>
        <FieldContent>
          <FieldTitle>Hobbies</FieldTitle>
          <FieldDescription>Add your hobbies</FieldDescription>
        </FieldContent>
        <Button
          disabled={watchHobbies >= 5}
          type='button'
          size={'sm'}
          variant={'outline'}
          aria-busy={watchHobbies >= 5}
          onClick={() => addHobbies({ name: '' })}>
          {watchHobbies >= 5 ? (
            <span className={'inline-flex items-center gap-2'}>
              Max (5) hobbies
              <AlertTriangleIcon className={'size-4 stroke-destructive'} />
            </span>
          ) : (
            <span className={'inline-flex items-center gap-2'}>
              Add Hobbies
              <PlusCircleIcon className='size-4' />
            </span>
          )}
        </Button>
      </div>
      {form.formState.errors.hobbies?.root && (
        <FieldError errors={[form.formState.errors.hobbies?.root]} />
      )}
      {hobbies.map((field, idx) => (
        <Field key={field.id}>
          <Controller
            name={`hobbies.${idx}.name`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Hobbies #{idx + 1}</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    type='text'
                    aria-invalid={fieldState.invalid}
                    aria-label={`hobbies.${idx}.name`}
                    placeholder={`Enter your hobby #${idx + 1}`}
                    {...field}
                  />
                  <InputGroupAddon align={'inline-end'}>
                    <InputGroupButton
                      disabled={watchHobbies <= 1}
                      size={'icon-xs'}
                      variant={'destructive'}
                      onClick={() => removeHobbies(idx)}>
                      <XCircleIcon className={'size-4'} />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </Field>
      ))}
    </FieldGroup>
  );
};
