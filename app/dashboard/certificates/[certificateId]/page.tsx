type PageProps = {
  params: Promise<{ certificateId: string }>;
};

export default async function CertificatePage({ params }: PageProps) {
  const certificateId = (await params).certificateId;
  return <div>CertificatePage {certificateId}</div>;
}
