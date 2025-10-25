type PageProps = {
  params: Promise<{ toolId: string }>;
};

export default async function ToolPage({ params }: PageProps) {
  const toolId = (await params).toolId;

  return <div>ToolPage {toolId}</div>;
}
