import { profile, type ProfileLink, type ProfileLinkKind } from "@/data/profile";

const socialIconPaths = {
  github: "/icons/social/github.svg",
  linkedin: "/icons/social/linkedin.svg",
  threads: "/icons/social/threads.svg",
  email: "/icons/social/mail.svg",
} satisfies Record<ProfileLinkKind, string>;

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
};

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function SocialIconLink({ link, iconClassName = "" }: { link: ProfileLink; iconClassName?: string }) {
  const iconPath = socialIconPaths[link.kind];

  return (
    <a
      className={`social-icon-link inline-flex min-h-10 min-w-10 items-center justify-center transition focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent ${iconClassName}`}
      href={link.href}
      aria-label={link.label}
      title={link.label}
      {...(isExternalLink(link.href) ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span
        className="social-icon-mask h-6 w-6"
        style={{
          WebkitMask: `url("${iconPath}") center / contain no-repeat`,
          mask: `url("${iconPath}") center / contain no-repeat`,
        }}
        aria-hidden="true"
      />
    </a>
  );
}

export function SocialLinks({ className = "", iconClassName = "" }: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {profile.links.map((link) => (
        <SocialIconLink iconClassName={iconClassName} link={link} key={link.kind} />
      ))}
    </div>
  );
}
