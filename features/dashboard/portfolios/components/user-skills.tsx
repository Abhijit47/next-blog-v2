import { Controller, useFormContext } from 'react-hook-form';

import { MultiSelect } from '@/components/extends/multi-select';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { PortfolioFormValues } from './portfolio-form';

const frameworksList = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nodejs', label: 'Node.js' },

  // CSS frameworks
  { value: 'tailwindcss', label: 'Tailwind CSS' },
  { value: 'bootstrap', label: 'Bootstrap' },
  { value: 'bulma', label: 'Bulma' },
  { value: 'foundation', label: 'Foundation' },
  { value: 'materialize', label: 'Materialize' },
  { value: 'semantic-ui', label: 'Semantic UI' },
  { value: 'ui5', label: 'UI5' },
  { value: 'ant-design', label: 'Ant Design' },
  { value: 'chakra-ui', label: 'Chakra UI' },
  { value: 'material-ui', label: 'Material-UI' },
  { value: 'vuetify', label: 'Vuetify' },
  { value: 'quasar', label: 'Quasar' },
  { value: 'foundation-sites', label: 'Foundation Sites' },
  { value: 'purecss', label: 'PureCSS' },

  // Fullstack frameworks
  { value: 'next.js', label: 'Next.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'ember', label: 'Ember.js' },
  { value: 'backbone', label: 'Backbone.js' },
  { value: 'meteor', label: 'Meteor.js' },
  { value: 'express', label: 'Express.js' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'gatsby', label: 'Gatsby' },
  { value: 'jekyll', label: 'Jekyll' },
  { value: 'wordpress', label: 'WordPress' },

  // Frontend frameworks
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },

  { value: 'python', label: 'Python' },
  { value: 'django', label: 'Django' },
  { value: 'flask', label: 'Flask' },

  { value: 'ruby', label: 'Ruby' },
  { value: 'rails', label: 'Rails' },

  { value: 'java', label: 'Java' },
  { value: 'spring', label: 'Spring' },
  { value: 'csharp', label: 'C#' },
  { value: '.net', label: '.NET' },
  { value: 'php', label: 'PHP' },
  { value: 'laravel', label: 'Laravel' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'swift', label: 'Swift' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'dart', label: 'Dart' },

  { value: 'sql', label: 'SQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'graphql', label: 'GraphQL' },

  { value: 'docker', label: 'Docker' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'aws', label: 'AWS' },
  { value: 'azure', label: 'Azure' },
  { value: 'gcp', label: 'GCP' },
  { value: 'firebase', label: 'Firebase' },
  { value: 'linux', label: 'Linux' },
  { value: 'git', label: 'Git' },
  { value: 'ci/cd', label: 'CI/CD' },

  { value: 'testing', label: 'Testing' },
  { value: 'jest', label: 'Jest' },
  { value: 'cypress', label: 'Cypress' },
  { value: 'selenium', label: 'Selenium' },
];

export default function UserSkills({ placeholder }: { placeholder: string }) {
  const form = useFormContext<Pick<PortfolioFormValues, 'skills'>>();

  return (
    <Controller
      control={form.control}
      name='skills'
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Known Skills</FieldLabel>
          <MultiSelect
            aria-invalid={fieldState.invalid}
            id={field.name}
            options={frameworksList}
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
