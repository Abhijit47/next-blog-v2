import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  QuoteIcon,
  RedoIcon,
  StrikethroughIcon,
  UndoIcon,
} from 'lucide-react';

import { type Editor } from '@tiptap/react';

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return (
      <p>
        <strong>Editor is not initialized.</strong> Please ensure the editor is
        set up correctly.
      </p>
    );
  }

  return (
    <div className='border-b p-2 flex flex-wrap items-center gap-1'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size='sm'
            pressed={editor.isActive('bold')}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}>
            <BoldIcon className='h-4 w-4' />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Bold</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size='sm'
            pressed={editor.isActive('italic')}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}>
            <ItalicIcon className='h-4 w-4' />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Italic</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size='sm'
            pressed={editor.isActive('strike')}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}>
            <StrikethroughIcon className='h-4 w-4' />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Strike-through</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size='sm'
            pressed={editor.isActive('code')}
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}>
            <CodeIcon className='h-4 w-4' />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Code</p>
        </TooltipContent>
      </Tooltip>

      <Separator orientation='vertical' className='min-h-6' />

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size='sm'
            pressed={editor.isActive('heading', { level: 1 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }>
            <Heading1Icon className='h-4 w-4' />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Heading 1</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size='sm'
            pressed={editor.isActive('heading', { level: 2 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }>
            <Heading2Icon className='h-4 w-4' />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Heading 2</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size='sm'
            pressed={editor.isActive('heading', { level: 3 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }>
            <Heading3Icon className='h-4 w-4' />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Heading 3</p>
        </TooltipContent>
      </Tooltip>

      <Separator orientation='vertical' className='min-h-6' />

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size='sm'
            pressed={editor.isActive('bulletList')}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }>
            <ListIcon className='h-4 w-4' />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Bullet-List</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size='sm'
            pressed={editor.isActive('orderedList')}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }>
            <ListOrderedIcon className='h-4 w-4' />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ordered-List</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size='sm'
            pressed={editor.isActive('blockquote')}
            onPressedChange={() =>
              editor.chain().focus().toggleBlockquote().run()
            }>
            <QuoteIcon className='h-4 w-4' />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Blockquote</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size='sm'
            pressed={editor.isActive('link')}
            onPressedChange={() =>
              // editor.chain().focus().toggleBlockquote().run()
              editor
                .chain()
                .focus()
                .setLink({ href: 'https://example.com' })
                .run()
            }>
            {/* <button
                  onClick={setLink}
                  className={editorState.isLink ? 'is-active' : ''}>
                  Set link
                </button>
                <button
                  onClick={() => editor.chain().focus().unsetLink().run()}
                  disabled={!editorState.isLink}>
                  Unset link
                </button> */}
            <LinkIcon className='h-4 w-4' />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Link</p>
        </TooltipContent>
      </Tooltip>

      <Separator orientation='vertical' className='min-h-6' />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <MinusIcon className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Horizontal Rule</p>
        </TooltipContent>
      </Tooltip>

      <Separator orientation='vertical' className='min-h-6' />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}>
            <UndoIcon className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Undo</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}>
            <RedoIcon className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Redo</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
