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
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { AlertTriangleIcon, PlusCircleIcon, XCircleIcon } from 'lucide-react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { PortfolioFormValues } from './portfolio-form';

export const UserSocials = () => {
  const form = useFormContext<Pick<PortfolioFormValues, 'socials'>>();

  const watchSocials = form.watch('socials').length;

  const {
    fields: socials,
    append: addSocials,
    remove: removeSocials,
  } = useFieldArray({
    control: form.control,
    name: 'socials',
    rules: {
      minLength: 1,
      maxLength: 5,
    },
  });

  return (
    <FieldGroup>
      <div className={'flex items-center justify-between'}>
        <FieldContent>
          <FieldTitle>Socials</FieldTitle>
          <FieldDescription>Add your social providers</FieldDescription>
        </FieldContent>
        <Button
          disabled={watchSocials >= 5}
          type='button'
          size={'sm'}
          variant={'outline'}
          aria-busy={watchSocials >= 5}
          onClick={() => addSocials({ name: '', url: '' })}>
          {watchSocials >= 5 ? (
            <span className={'inline-flex items-center gap-2'}>
              Max (5) socials
              <AlertTriangleIcon className={'size-4 stroke-destructive'} />
            </span>
          ) : (
            <span className={'inline-flex items-center gap-2'}>
              Add Socials
              <PlusCircleIcon className='size-4' />
            </span>
          )}
        </Button>
      </div>
      {form.formState.errors.socials?.root && (
        <FieldError errors={[form.formState.errors.socials?.root]} />
      )}
      {socials.map((field, idx) => (
        <Field
          key={field.id}
          className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <Controller
            name={`socials.${idx}.name`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Provider Name</FieldLabel>
                <Input
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder='Enter your provider name'
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name={`socials.${idx}.url`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    type='url'
                    aria-invalid={fieldState.invalid}
                    aria-label={`socials.${idx + 1}.url`}
                    placeholder='Enter your provider url'
                    {...field}
                  />
                  <InputGroupAddon align={'inline-end'}>
                    <InputGroupButton
                      disabled={watchSocials <= 1}
                      size={'icon-xs'}
                      variant={'destructive'}
                      onClick={() => removeSocials(idx)}>
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
