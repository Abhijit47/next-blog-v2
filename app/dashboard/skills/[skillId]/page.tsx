type PageProps = {
  params: Promise<{ skillId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SkillPage({ params }: PageProps) {
  const skillId = (await params).skillId;

  return <div>skillPage id{skillId} </div>;
}
