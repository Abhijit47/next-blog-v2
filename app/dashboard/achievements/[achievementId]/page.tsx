type PageProps = {
  params: Promise<{ achievementId: string }>;
};

export default async function AchievementPage({ params }: PageProps) {
  const achievementId = (await params).achievementId;
  return <div>AchievementPage {achievementId}</div>;
}
