import { redirect } from "next/navigation";

export default function PersonalInfoPage({
  params,
}: {
  params: { resumeId: string };
}) {
  // Redirect to the main resume builder page which handles all steps
  redirect(`/resume/${params.resumeId}`);
}
