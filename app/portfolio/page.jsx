import SectionHeading from "../../components/SectionHeading";
import PortfolioGrid from "../../components/PortfolioGrid";
import { getProjects } from "../../lib/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portfolio",
  description:
    "500+ websites built by Shaheer Shaikh on WordPress, Shopify and GoHighLevel — agencies, e-commerce, services, healthcare, finance and personal brands.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36">
      <SectionHeading
        kicker="Portfolio"
        title="Websites I've built & launched"
        description="Every project below is a real, live website built for a real business. Hover any card to scroll through the full page — click to visit the live site."
      />
      <PortfolioGrid projects={projects} />
    </div>
  );
}
