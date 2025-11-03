'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, formatDistanceToNow } from 'date-fns';
import { CalendarIcon, InfoIcon, XCircleIcon } from 'lucide-react';
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  Watch,
} from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import UserAbout from './user-about';
import UserAvatarUpload from './user-avatar-upload';
import { UserHobbies } from './user-hobbies';
import UserLanguages from './user-language';
import UserSkills from './user-skills';
import { UserSocials } from './user-socials';

const portfolioFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { error: 'Minimum 1 character required' })
    .max(100, { error: 'Maximum 100 character required' }),
  lastName: z
    .string()
    .min(1, { error: 'Minimum 1 character required' })
    .max(100, { error: 'Maximum 100 character required' }),
  about: z.string().min(1, { error: 'Mention the bio' }).max(1000, {
    error: 'Maximum 1000 character required',
  }),
  email: z.email({ error: 'Mention the email' }),
  phone: z
    .string({ error: 'Mention the phone' })
    .regex(/^\+?[1-9]\d{1,10}$/, { message: 'Mention a valid phone number' }),
  socials: z.array(
    z.object({
      name: z
        .string()
        .min(1, { error: 'Minimum 1 name required' })
        .max(5, { error: 'Maximum 5 name allowed' }),
      url: z.url({ error: 'Mention the provider url' }),
    })
  ),
  dob: z.date({ error: 'Mention a valid date of birth' }),
  streetAddress: z.string().min(1, { error: 'Mention the street address' }),
  city: z.string().min(1, { error: 'Mention the city' }),
  state: z.string().min(1, { error: 'Mention the state' }),
  country: z.string().min(1, { error: 'Mention the country' }),
  zipcode: z.string().min(1, { error: 'Mention the zipcode' }),
  files: z.custom<File[]>().optional(),
  filePreview: z.string(),
  avatarUrl: z.url(),
  hobbies: z
    .array(z.object({ name: z.string() }))
    .min(1, { error: 'Minimum 1 hobby required' })
    .max(5, { error: 'Maximum 5 hobby allowed' }),
  languages: z
    .array(z.string())
    .min(1, { error: 'Minimum 1 language required' })
    .max(5, { error: 'Maximum 5 language allowed' }),
  skills: z
    .array(z.string())
    .min(1, { error: 'Minimum 1 skill required' })
    .max(5, { error: 'Maximum 5 skill allowed' }),
});

export type PortfolioFormValues = z.infer<typeof portfolioFormSchema>;

const isDev = process.env.NODE_ENV === 'development';

export default function PortfolioForm() {
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      socials: [{ name: '', url: '' }],
      dob: undefined,
      streetAddress: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
      files: undefined,
      filePreview: '',
      avatarUrl: '',
      about: '',
      hobbies: [],
      languages: [],
      skills: [],
    },
    mode: 'onChange',
  });

  const onError: SubmitErrorHandler<PortfolioFormValues> = (errors) =>
    console.log(errors);

  const onSubmit: SubmitHandler<PortfolioFormValues> = (values) => {
    console.log(values);
    toast.success(
      <pre className={'bg-background text-foreground w-full'}>
        {JSON.stringify(values, null, 2)}
      </pre>
    );
  };

  return (
    <Card className={'max-w-4xl mx-auto'}>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <FieldSet>
              <FieldLegend
                variant='legend'
                className={
                  'flex items-center gap-2 hover:underline underline-offset-2'
                }>
                Basic Details
                <InfoIcon className='size-4 text-muted-foreground' />
              </FieldLegend>

              <FieldGroup className={'gap-4'}>
                <div className={'grid grid-cols-2 gap-4'}>
                  <Controller
                    name='firstName'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>First name</FieldLabel>
                        <Input
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder='Enter your first name'
                          {...field}
                          autoComplete='given-name'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name='lastName'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Last name</FieldLabel>
                        <Input
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder='Enter your last name'
                          {...field}
                          autoComplete='additional-name'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <UserAbout />

                <div className='grid grid-cols-2 gap-4'>
                  <Controller
                    name='email'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          type='email'
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder='Enter your email'
                          {...field}
                          autoComplete='home email'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name='phone'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                        <Input
                          type='tel'
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder='Enter your phone'
                          {...field}
                          autoComplete='tel-country-code'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <FieldSeparator />
                <UserSocials />
                <FieldSeparator />

                <Controller
                  name='dob'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Date of birth
                      </FieldLabel>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          data-invalid={fieldState.invalid}>
                          <Button
                            id={field.name}
                            data-invalid={fieldState.invalid}
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}>
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            {field.value ? (
                              <span
                                className={'ml-auto cursor-pointer opacity-50'}
                                onClick={() =>
                                  form.resetField('dob', {
                                    keepDirty: false,
                                  })
                                }>
                                <XCircleIcon className={'size-4'} />
                              </span>
                            ) : (
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className={cn(
                            'w-full p-0'
                            // this variable width makes the calendar full width of the trigger
                            // 'min-w-[var(--radix-popover-trigger-width)]'
                          )}
                          align='start'>
                          <Calendar
                            className={'w-full'}
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            captionLayout='dropdown'
                          />
                        </PopoverContent>
                      </Popover>

                      {fieldState.invalid ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : (
                        <>
                          {field.value !== undefined ? (
                            <FieldDescription className={'capitalize'}>
                              {formatDistanceToNow(field.value, {
                                addSuffix: false,
                              })}{' '}
                              old.
                            </FieldDescription>
                          ) : (
                            <FieldDescription>
                              Your date of birth is used to calculate your age.
                            </FieldDescription>
                          )}
                        </>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name='streetAddress'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Street Address
                      </FieldLabel>
                      <Input
                        type='text'
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder='Enter your street address'
                        {...field}
                        autoComplete='address-level1'
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className='grid grid-cols-2 gap-4'>
                  <Controller
                    name='city'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>City</FieldLabel>
                        <Input
                          type='text'
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder='Enter your city'
                          {...field}
                          autoComplete='address-level2'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name='state'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>State</FieldLabel>
                        <Input
                          type='text'
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder='Enter your state'
                          {...field}
                          autoComplete='address-level3'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <Controller
                    name='country'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                        <Input
                          type='text'
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder='Enter your country'
                          {...field}
                          autoComplete='address-level4'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name='zipcode'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Zipcode</FieldLabel>
                        <Input
                          type='text'
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder='Enter your area zipcode'
                          {...field}
                          autoComplete='address-level1'
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <UserAvatarUpload />

                <Controller
                  name='avatarUrl'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Avatar Url</FieldLabel>
                      <Input
                        type='url'
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder='Enter your avatar url'
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <FieldSeparator />
                <UserHobbies />
                <FieldSeparator />

                <UserSkills placeholder='Choose your known skills' />

                <UserLanguages placeholder='Choose your known languages' />

                {isDev ? (
                  <div className={'border border-dashed'}>
                    <Watch
                      control={form.control}
                      names={['firstName']}
                      render={(value) => {
                        return <span className={'text-xs'}>{value}</span>;
                      }}
                    />
                    <Watch
                      control={form.control}
                      names={['dob']}
                      render={(value) => {
                        return (
                          <span className={'text-xs'}>
                            {JSON.stringify(value, null, 2)}
                          </span>
                        );
                      }}
                    />
                    <DevTool control={form.control} />
                  </div>
                ) : null}

                <Button type='submit'>Submit</Button>
              </FieldGroup>
            </FieldSet>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
