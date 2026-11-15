"use client";

import { useMemo } from "react";
import { Copy, Facebook, Linkedin, Link2, Mail, MessageCircleMore, Send, Twitter } from "lucide-react";
import { getSiteUrl } from "@/lib/site-url";

function encode(value: string) {
  return encodeURIComponent(value);
}

type BlogShareButtonsProps = {
  title: string;
  path: string;
  className?: string;
};

export default function BlogShareButtons({ title, path, className }: BlogShareButtonsProps) {
  const shareUrl = useMemo(() => new URL(path, getSiteUrl()).toString(), [path]);

  const text = `${title}`;

  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encode(shareUrl)}`,
      icon: Facebook,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encode(shareUrl)}&text=${encode(text)}`,
      icon: Twitter,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encode(shareUrl)}`,
      icon: Linkedin,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encode(`${title} ${shareUrl}`)}`,
      icon: MessageCircleMore,
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encode(shareUrl)}&text=${encode(text)}`,
      icon: Send,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encode(title)}&body=${encode(`${title}\n\n${shareUrl}`)}`,
      icon: Mail,
    },
  ];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      window.alert("Link copied.");
    } catch {
      window.prompt("Copy this link:", shareUrl);
    }
  }

  async function handleNativeShare() {
    if (typeof navigator === "undefined" || !("share" in navigator)) return;

    try {
      await navigator.share({
        title,
        text,
        url: shareUrl,
      });
    } catch {
      // User dismissed or share failed.
    }
  }

  return (
    <div className={["blog-share-card", className].filter(Boolean).join(" ")}>
      <div className="blog-share-header">
        <div>
          <p className="blog-share-label">Share this post</p>
          <p className="blog-share-subcopy">Send it to socials, chats, or copy the link.</p>
        </div>
        {typeof window !== "undefined" && typeof navigator !== "undefined" && "share" in navigator ? (
          <button type="button" className="blog-share-native-btn" onClick={handleNativeShare}>
            <Link2 size={16} /> Share
          </button>
        ) : null}
      </div>

      <div className="blog-share-grid">
        {shareLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="blog-share-btn"
            aria-label={`Share on ${label}`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </a>
        ))}

        <button type="button" className="blog-share-btn" onClick={handleCopy} aria-label="Copy article link">
          <Copy size={16} />
          <span>Copy link</span>
        </button>
      </div>
    </div>
  );
}
