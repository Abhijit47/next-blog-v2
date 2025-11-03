'use client';

import { ProjectFormValues } from '@/features/dashboard/projects/components/project-form';
import { cn } from '@/lib/utils';
import { Placeholder } from '@tiptap/extensions';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit, { type StarterKitOptions } from '@tiptap/starter-kit';
import { ControllerRenderProps } from 'react-hook-form';
import MenuBar from './menu-bar';

type FieldType = ControllerRenderProps<
  ProjectFormValues,
  `project.${number}.description`
>;

interface MinimalTiptapProps {
  // content?: string;
  // onChange?: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
  field: FieldType;
}

const LinkExtension: Partial<StarterKitOptions['link']> = {
  openOnClick: false,
  autolink: true,
  defaultProtocol: 'https',
  protocols: ['http', 'https'],
  isAllowedUri: (url, ctx) => {
    try {
      // construct URL
      const parsedUrl = url.includes(':')
        ? new URL(url)
        : new URL(`${ctx.defaultProtocol}://${url}`);

      // use default validation
      if (!ctx.defaultValidate(parsedUrl.href)) {
        return false;
      }

      // disallowed protocols
      const disallowedProtocols = ['ftp', 'file', 'mailto'];
      const protocol = parsedUrl.protocol.replace(':', '');

      if (disallowedProtocols.includes(protocol)) {
        return false;
      }

      // only allow protocols specified in ctx.protocols
      const allowedProtocols = ctx.protocols.map((p) =>
        typeof p === 'string' ? p : p.scheme
      );

      if (!allowedProtocols.includes(protocol)) {
        return false;
      }

      // disallowed domains
      const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
      const domain = parsedUrl.hostname;

      if (disallowedDomains.includes(domain)) {
        return false;
      }

      // all checks have passed
      return true;
    } catch {
      return false;
    }
  },
  shouldAutoLink: (url) => {
    try {
      // construct URL
      const parsedUrl = url.includes(':')
        ? new URL(url)
        : new URL(`https://${url}`);

      // only auto-link if the domain is not in the disallowed list
      const disallowedDomains = [
        'example-no-autolink.com',
        'another-no-autolink.com',
      ];
      const domain = parsedUrl.hostname;

      return !disallowedDomains.includes(domain);
    } catch {
      return false;
    }
  },
};

// | ControllerRenderProps<LessonSchemaValues, 'description'>;

function MinimalTiptap({
  // content = '',
  // onChange,
  placeholder = 'Start typing...',
  editable = true,
  className,
  field,
}: MinimalTiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        link: LinkExtension,
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: field.value ? JSON.parse(field.value) : `<p>Hello World!!!</p>`, // Initialize with the value from the form field,
    editable,
    onUpdate: ({ editor }) => {
      // onChange?.(editor.getHTML());
      // console.log(editor.getHTML());
      const stringyfiedContent = JSON.stringify(editor.getJSON());
      // Update the form field value when the editor content changes
      field.onChange(stringyfiedContent);
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
          'min-h-[200px] p-4 border-0'
        ),
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      id={field.name}
      className={cn('border rounded-lg overflow-hidden', className)}>
      <MenuBar editor={editor} />

      <EditorContent
        id={field.name}
        editor={editor}
        placeholder={placeholder}
      />
    </div>
  );
}

export { MinimalTiptap, type MinimalTiptapProps };
