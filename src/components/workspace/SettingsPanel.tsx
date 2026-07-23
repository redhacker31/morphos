
import React from "react";
import {
  Settings,
  Palette,
  Sparkles,
  Globe,
  Monitor,
  Info,
  ExternalLink,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[var(--card-border)] shrink-0">
        <div className="flex items-center gap-2">
          <Settings size={18} className="text-[var(--primary)]" />
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Theme */}
        <SettingsSection icon={Palette} title="Theme">
          <SettingsRow label="Dark Mode" description="Currently active">
            <Switch checked disabled className="data-[state=checked]:bg-[var(--primary)]" />
          </SettingsRow>
          <SettingsRow label="Light Mode" description="Coming soon">
            <Switch disabled />
            <Badge className="text-[8px] bg-[var(--primary-subtle)] text-[var(--primary)] border-none px-1.5">
              Soon
            </Badge>
          </SettingsRow>
        </SettingsSection>

        <Separator className="bg-[var(--card-border)]" />

        {/* Appearance */}
        <SettingsSection icon={Monitor} title="Appearance">
          <SettingsRow label="Font Size">
            <Select defaultValue="medium">
              <SelectTrigger className="w-32 h-8 bg-[var(--card)] border-[var(--card-border)] text-sm text-[var(--text-primary)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--background-secondary)] border-[var(--card-border)] text-[var(--text-primary)]">
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </SettingsRow>
          <SettingsRow label="Interface Density">
            <Select defaultValue="comfortable">
              <SelectTrigger className="w-32 h-8 bg-[var(--card)] border-[var(--card-border)] text-sm text-[var(--text-primary)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--background-secondary)] border-[var(--card-border)] text-[var(--text-primary)]">
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="comfortable">Comfortable</SelectItem>
                <SelectItem value="spacious">Spacious</SelectItem>
              </SelectContent>
            </Select>
          </SettingsRow>
        </SettingsSection>

        <Separator className="bg-[var(--card-border)]" />

        {/* Animations */}
        <SettingsSection icon={Sparkles} title="Animations">
          <SettingsRow label="Enable Animations" description="Smooth transitions and motion effects">
            <Switch defaultChecked className="data-[state=checked]:bg-[var(--primary)]" />
          </SettingsRow>
          <SettingsRow label="Reduced Motion" description="Minimize non-essential motion">
            <Switch className="data-[state=checked]:bg-[var(--primary)]" />
          </SettingsRow>
        </SettingsSection>

        <Separator className="bg-[var(--card-border)]" />

        {/* Language */}
        <SettingsSection icon={Globe} title="Language">
          <SettingsRow label="Interface Language">
            <Select defaultValue="en">
              <SelectTrigger className="w-32 h-8 bg-[var(--card)] border-[var(--card-border)] text-sm text-[var(--text-primary)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--background-secondary)] border-[var(--card-border)] text-[var(--text-primary)]">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es" disabled>Español</SelectItem>
                <SelectItem value="fr" disabled>Français</SelectItem>
              </SelectContent>
            </Select>
          </SettingsRow>
        </SettingsSection>

        <Separator className="bg-[var(--card-border)]" />

        {/* Demo Mode */}
        <SettingsSection icon={Monitor} title="Demo Mode">
          <SettingsRow label="Demo Mode" description="Use mock data for presentations">
            <Switch defaultChecked className="data-[state=checked]:bg-[var(--primary)]" />
          </SettingsRow>
        </SettingsSection>

        <Separator className="bg-[var(--card-border)]" />

        {/* About */}
        <SettingsSection icon={Info} title="About MorphOS">
          <div className="space-y-3 px-6 pb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Version</span>
              <span className="text-[var(--text-primary)] font-mono text-xs">0.1.0-alpha</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Architecture</span>
              <span className="text-[var(--text-primary)] font-mono text-xs">JSON AST Pipeline</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Backend</span>
              <span className="text-[var(--text-primary)] font-mono text-xs">Convex</span>
            </div>
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm text-[var(--primary)] hover:underline mt-2"
            >
              Documentation
              <ExternalLink size={12} />
            </a>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-5">
      <div className="flex items-center gap-2 px-6 mb-4">
        <Icon size={15} className="text-[var(--text-muted)]" />
        <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function SettingsRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-1">
      <div>
        <Label className="text-sm text-[var(--text-primary)] font-medium">{label}</Label>
        {description && (
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
