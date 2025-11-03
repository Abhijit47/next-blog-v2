import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Controller, useFormContext, Watch } from 'react-hook-form';
import { PortfolioFormValues } from './portfolio-form';

export default function UserAbout() {
  const form = useFormContext<Pick<PortfolioFormValues, 'about'>>();

  return (
    <Controller
      name='about'
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
          <Textarea
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder='Enter your bio'
            className={'min-h-[120px] resize-none'}
            {...field}
          />
          {fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : (
            <FieldDescription className={'flex items-center justify-between'}>
              <span>Maximum 1000 characters.</span>
              <Watch
                control={form.control}
                names={[field.name]}
                render={() => (
                  <span className='text-xs'>
                    {form.watch('about').length ?? 0}/1000 characters
                  </span>
                )}
              />
            </FieldDescription>
          )}
        </Field>
      )}
    />
  );
}
