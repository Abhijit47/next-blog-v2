'use client';

// import { Editor } from '@/components/blocks/editor-md/editor';
import { MinimalTiptap } from '@/components/extends/shadcn-io/minimal-tiptap';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
// import { LexicalCollaboration } from '@lexical/react/LexicalCollaborationContext';
import { format } from 'date-fns';
// import { SerializedEditorState } from 'lexical';
import {
  AlertTriangleIcon,
  CalendarIcon,
  PlusCircleIcon,
  XCircleIcon,
} from 'lucide-react';
import { useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const projectSchema = z.object({
  project: z
    .array(
      z
        .object({
          title: z
            .string({ error: 'Title is required' })
            .min(3, { error: 'Title must be at least 3 characters long' })
            .max(50, { error: 'Title must be at most 100 characters long' }),
          subtitle: z
            .string({ error: 'Subtitle is required' })
            .min(3, { error: 'Subtitle must be at least 3 characters long' })
            .max(50, { error: 'Subtitle must be at most 100 characters long' }),
          description: z
            .string({ error: 'Description is required' })
            .min(10, {
              error: 'Description must be at least 10 characters long',
            })
            .max(500, {
              error: 'Description must be at most 500 characters long',
            }),
          link: z.url({ error: 'Invalid URL format' }),
          startDate: z.date({ error: 'Invalid start date' }),
          endDate: z.date({ error: 'Invalid end date' }),
        })
        .refine(({ startDate, endDate }) => {
          if (startDate && endDate) {
            return startDate < endDate;
          } else {
            return true;
          }
          // data.startDate < data.endDate,
          //   {
          //     error: 'Start date must be before end date',
          //     path: ['startDate', 'endDate'],
          //     abort: false,
          //   };
        })
    )
    .min(1, 'At least one project is required'),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

// const initialValue = {
//   root: {
//     children: [
//       {
//         children: [
//           {
//             detail: 0,
//             format: 0,
//             mode: 'normal',
//             style: '',
//             text: 'Hello World 🚀',
//             type: 'text',
//             version: 1,
//           },
//         ],
//         direction: 'ltr',
//         format: '',
//         indent: 0,
//         type: 'paragraph',
//         version: 1,
//       },
//     ],
//     direction: 'ltr',
//     format: '',
//     indent: 0,
//     type: 'root',
//     version: 1,
//   },
// } as unknown as SerializedEditorState;

export default function ProjectForm() {
  // const [editorState, setEditorState] =
  //   useState<SerializedEditorState>(initialValue);

  const [content, setContent] = useState(`
    <h1>Welcome to Minimal Tiptap</h1>
    <p>This is a rich text editor built with Tiptap. Try editing this text!</p>
    <ul>
      <li>Use the toolbar to format text</li>
      <li>Try making text <strong>bold</strong> or <em>italic</em></li>
      <li>Create lists and headings</li>
    </ul>
    <blockquote>
      <p>This is a blockquote. Perfect for highlighting important information.</p>
    </blockquote>
  `);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      project: [
        {
          title: '',
          subtitle: '',
          description: '',
          link: '',
          startDate: undefined,
          endDate: undefined,
        },
      ],
    },
    mode: 'onChange',
  });

  const {
    fields: projects,
    append: addProjects,
    remove: removeProjects,
  } = useFieldArray({
    control: form.control,
    name: 'project',
    rules: {
      minLength: 1,
    },
  });

  const watchProjects = form.watch('project').length;

  const onError: SubmitErrorHandler<ProjectFormValues> = (errors) =>
    console.log(errors);

  const onSubmit: SubmitHandler<ProjectFormValues> = (values) => {
    console.log(values);
    toast.success(
      <pre className={'bg-background text-foreground w-full'}>
        {JSON.stringify(values, null, 2)}
      </pre>
    );
  };

  return (
    <Card className={'max-w-4xl mx-auto gap-4 py-4'}>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <FieldGroup className={'gap-4'}>
              <div className={'flex items-center justify-between'}>
                <FieldContent>
                  <FieldTitle>Projects</FieldTitle>
                  <FieldDescription>Add your project details</FieldDescription>
                </FieldContent>
                <Button
                  disabled={watchProjects >= 5}
                  type='button'
                  size={'sm'}
                  variant={'outline'}
                  aria-busy={watchProjects >= 5}
                  onClick={() =>
                    addProjects({
                      title: '',
                      subtitle: '',
                      description: '',
                      link: '',
                      startDate: new Date(),
                      endDate: new Date(),
                    })
                  }>
                  {watchProjects >= 5 ? (
                    <span className={'inline-flex items-center gap-2'}>
                      Max (5) socials
                      <AlertTriangleIcon
                        className={'size-4 stroke-destructive'}
                      />
                    </span>
                  ) : (
                    <span className={'inline-flex items-center gap-2'}>
                      Add Socials
                      <PlusCircleIcon className='size-4' />
                    </span>
                  )}
                </Button>
              </div>
              <Separator />
              {form.formState.errors.project?.root && (
                <FieldError errors={[form.formState.errors.project?.root]} />
              )}

              <Accordion
                type='single'
                collapsible
                className='w-full space-y-4'
                defaultValue='item-1'>
                {projects.map((field, idx) => (
                  <AccordionItem
                    key={field.id}
                    value={`item-${idx + 1}`}
                    className={'ring-1 ring-foreground/10 px-4 rounded-lg'}>
                    <AccordionTrigger>Project #{idx + 1}</AccordionTrigger>
                    <AccordionContent className='flex flex-col gap-4 text-balance'>
                      <Card className={'gap-4 py-4'}>
                        <CardHeader>
                          <CardTitle
                            className={
                              'flex flex-row items-center justify-between'
                            }>
                            <p className={'hover:underline underline-offset-2'}>
                              Project #{idx + 1} details
                            </p>
                            <CardAction>
                              <Button
                                className={'p-0'}
                                disabled={watchProjects <= 1}
                                size={'icon-sm'}
                                variant={'destructive'}
                                onClick={() => removeProjects(idx)}>
                                <XCircleIcon className={'size-4'} />
                              </Button>
                            </CardAction>
                          </CardTitle>
                        </CardHeader>
                        <Separator />

                        <CardContent>
                          <FieldGroup className={'gap-4'}>
                            <div
                              className={
                                'grid grid-cols-1 md:grid-cols-2 gap-4'
                              }>
                              <Controller
                                name={`project.${idx}.title`}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                  <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                      Title
                                    </FieldLabel>
                                    <Input
                                      id={field.name}
                                      aria-invalid={fieldState.invalid}
                                      placeholder='Enter your project title'
                                      {...field}
                                    />
                                    {fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                    )}
                                  </Field>
                                )}
                              />
                              <Controller
                                name={`project.${idx}.subtitle`}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                  <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                      Subtitle
                                    </FieldLabel>
                                    <Input
                                      id={field.name}
                                      aria-invalid={fieldState.invalid}
                                      placeholder='Enter your project subtitle'
                                      {...field}
                                    />
                                    {fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                    )}
                                  </Field>
                                )}
                              />
                            </div>
                            <Controller
                              name={`project.${idx}.description`}
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor={field.name}>
                                    Description
                                  </FieldLabel>
                                  <MinimalTiptap
                                    // content={content}
                                    // onChange={setContent}
                                    placeholder='Start typing your content here...'
                                    className='min-h-[300px] w-full'
                                    field={field}
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                            <Controller
                              name={`project.${idx}.link`}
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor={field.name}>
                                    Link
                                  </FieldLabel>
                                  <Input
                                    type='url'
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder='Enter your project link'
                                    {...field}
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />

                            <div
                              className={
                                'grid grid-cols-1 md:grid-cols-2 gap-4'
                              }>
                              <Controller
                                name={`project.${idx}.startDate`}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                  <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                      State date
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
                                            !field.value &&
                                              'text-muted-foreground'
                                          )}>
                                          {field.value ? (
                                            format(field.value, 'PPP')
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          {field.value ? (
                                            <span
                                              className={
                                                'ml-auto cursor-pointer opacity-50'
                                              }
                                              onClick={() =>
                                                form.resetField(
                                                  `project.${idx}.startDate`,
                                                  {
                                                    keepDirty: false,
                                                  }
                                                )
                                              }>
                                              <XCircleIcon
                                                className={'size-4'}
                                              />
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
                                            date > new Date() ||
                                            date < new Date('1900-01-01')
                                          }
                                          captionLayout='dropdown'
                                        />
                                      </PopoverContent>
                                    </Popover>

                                    {fieldState.invalid ? (
                                      <FieldError errors={[fieldState.error]} />
                                    ) : (
                                      <FieldDescription>
                                        Mention when you started this project.
                                      </FieldDescription>
                                    )}
                                  </Field>
                                )}
                              />

                              <Controller
                                name={`project.${idx}.endDate`}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                  <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                      End date
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
                                            !field.value &&
                                              'text-muted-foreground'
                                          )}>
                                          {field.value ? (
                                            format(field.value, 'PPP')
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          {field.value ? (
                                            <span
                                              className={
                                                'ml-auto cursor-pointer opacity-50'
                                              }
                                              onClick={() =>
                                                form.resetField(
                                                  `project.${idx}.endDate`,
                                                  {
                                                    keepDirty: false,
                                                  }
                                                )
                                              }>
                                              <XCircleIcon
                                                className={'size-4'}
                                              />
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
                                            date > new Date() ||
                                            date < new Date('1900-01-01')
                                          }
                                          captionLayout='dropdown'
                                        />
                                      </PopoverContent>
                                    </Popover>

                                    {fieldState.invalid ? (
                                      <FieldError errors={[fieldState.error]} />
                                    ) : (
                                      <FieldDescription>
                                        Mention when you ended this project.
                                      </FieldDescription>
                                    )}
                                  </Field>
                                )}
                              />
                            </div>
                          </FieldGroup>
                        </CardContent>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button type='submit'>Submit</Button>
            </FieldGroup>
            <DevTool control={form.control} />
          </form>
        </FormProvider>

        {/* <LexicalCollaboration>
          <Editor
            editorSerializedState={editorState}
            onSerializedChange={(value) => setEditorState(value)}
          />
        </LexicalCollaboration> */}
      </CardContent>
    </Card>
  );
}
