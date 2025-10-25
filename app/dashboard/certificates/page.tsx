import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EyeIcon, PenLine } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteAlertDialog } from '../_components/delete-alert-dialog';

export default function CertificatesPage() {
  return (
    <section
      className={
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
      }>
      {Array.from({ length: 6 }).map((_, idx) => (
        <Card key={crypto.randomUUID()} className={'gap-4 py-4'}>
          <CardHeader>
            <CardTitle>
              <h1 className={'line-clamp-1'}>Info - {crypto.randomUUID()}</h1>
            </CardTitle>
          </CardHeader>

          <Separator />

          <CardContent>
            <div
              className={
                'aspect-square w-full h-full rounded-lg ring-1 ring-accent p-4'
              }>
              <Image
                src={'/file.svg'}
                alt='image'
                width={500}
                height={500}
                className={'w-full h-full object-contain'}
              />
            </div>
          </CardContent>

          <CardContent>
            <CardDescription>
              <p className={'line-clamp-3'}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda vel beatae quia autem inventore! Reiciendis vitae
                reprehenderit, suscipit, ab sed voluptate nesciunt tempora
                aliquam quos laboriosam nam adipisci delectus. Harum.
              </p>
            </CardDescription>
          </CardContent>

          <CardFooter className={'w-full justify-center gap-4'}>
            <Link
              href={`/dashboard/certificates/${crypto.randomUUID()}`}
              className={buttonVariants({
                size: 'sm',
                variant: 'secondary',
              })}>
              View <EyeIcon className={'size-4'} />
            </Link>
            <Link
              href={`/dashboard/certificates/${crypto.randomUUID()}/update`}
              className={buttonVariants({
                size: 'sm',
                variant: 'secondary',
              })}>
              Update <PenLine className={'size-4'} />
            </Link>
            <DeleteAlertDialog id={crypto.randomUUID()} />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
