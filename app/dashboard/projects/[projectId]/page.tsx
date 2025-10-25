type PageProps = {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProjectPage({ params }: PageProps) {
  const projectId = (await params).projectId;

  return <div>ProjectPage {projectId} </div>;
}
