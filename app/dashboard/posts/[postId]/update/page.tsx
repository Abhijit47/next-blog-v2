type PageProps = {
  params: Promise<{ postId: string }>;
};

export default async function UpdatePostPage({ params }: PageProps) {
  const postId = (await params).postId;

  return <div>UpdatePostPage {postId}</div>;
}
