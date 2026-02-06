"use client";

import { Button } from "@/components/ui/shadcn-button";
import Link from "next/link";
import {
    SiGoogle,
    SiAuth0,
    SiCloudflare,
    SiSlack,
    SiZoom,
    SiSalesforce,
    SiHubspot,
    SiZendesk,
    SiJira,
    SiAsana,
    SiNotion,
    SiDropbox,
    SiGithub,
    SiGitlab,
    SiDocker,
    SiKubernetes,
    SiTwilio,
    SiStripe
} from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";

// Brand integrations with their official colors
const integrations = [
    { Icon: SiGoogle, name: "Google", color: "#4285F4" },
    { Icon: SiAuth0, name: "Auth0", color: "#EB5424" },
    { Icon: SiCloudflare, name: "Cloudflare", color: "#F38020" },
    { Icon: SiSlack, name: "Slack", color: "#4A154B" },
    { Icon: SiZoom, name: "Zoom", color: "#2D8CFF" },
    { Icon: SiSalesforce, name: "Salesforce", color: "#00A1E0" },
    { Icon: SiHubspot, name: "HubSpot", color: "#FF7A59" },
    { Icon: SiZendesk, name: "Zendesk", color: "#03363D" },
    { Icon: SiJira, name: "Jira", color: "#0052CC" },
    { Icon: SiAsana, name: "Asana", color: "#F06A6A" },
    { Icon: SiNotion, name: "Notion", color: "#000000" },
    { Icon: SiDropbox, name: "Dropbox", color: "#0061FF" },
    { Icon: SiGithub, name: "GitHub", color: "#181717" },
    { Icon: SiGitlab, name: "GitLab", color: "#FC6D26" },
    { Icon: SiDocker, name: "Docker", color: "#2496ED" },
    { Icon: SiKubernetes, name: "Kubernetes", color: "#326CE5" },
    { Icon: SiTwilio, name: "Twilio", color: "#F22F46" },
    { Icon: SiStripe, name: "Stripe", color: "#008CDD" },
];

export default function IntegrationsSection() {
    return (
        <section className="max-w-7xl mx-auto my-20 px-6 grid md:grid-cols-2 gap-10 items-center border border-gray-200 dark:border-gray-700 p-8 lg:p-12 rounded-3xl bg-white dark:bg-gray-900">
            {/* Left Side */}
            <div>
                <p className="uppercase text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                    Integrations
                </p>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mt-3 mb-5 text-dark dark:text-white leading-[1.1]">
                    Supercharge your security operations
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                    Connect all your security systems, devices, and teams into one unified intelligence layer. Seamlessly integrate with the tools you already use.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button className="bg-dark text-white px-6 py-3 rounded-lg font-medium hover:bg-dark/90 transition-colors">
                        <Link href="/solutions/operations">Explore Solutions</Link>
                    </Button>
                    <Button variant="outline" className="border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Link href="/contact">Request Demo →</Link>
                    </Button>
                </div>
            </div>

            {/* Right Side - Icon Grid with Simple Icons */}
            <div className="grid grid-cols-6 gap-3 lg:gap-4">
                {integrations.map((item, idx) => {
                    const Icon = item.Icon;
                    return (
                        <div
                            key={idx}
                            className={cn(
                                "relative w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center",
                                "bg-white dark:bg-gray-800 shadow-sm border-2 border-gray-200 dark:border-gray-700",
                                "transition-all duration-200 hover:scale-110 hover:shadow-lg cursor-pointer group"
                            )}
                            style={{
                                clipPath:
                                    "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
                            }}
                            title={item.name}
                        >
                            <Icon
                                size={24}
                                color={item.color}
                                className="transition-transform duration-200 group-hover:scale-110"
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
