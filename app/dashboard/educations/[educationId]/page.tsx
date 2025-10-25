type PageProps = {
  params: Promise<{ educationId: string }>;
};

export default async function EducationPage({ params }: PageProps) {
  const educationId = (await params).educationId;

  return <div>EducationPage {educationId}</div>;
}
