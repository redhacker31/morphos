"use client";

import React, { useState } from "react";
import { Typography } from "@/components/primitives/Typography";
import { Button, MotionButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/primitives/Card";
import { Icon } from "@/components/primitives/Icon";
import { Loader } from "@/components/primitives/Loader";
import { Sparkles, Hexagon, ArrowRight, Zap } from "lucide-react";

export default function DesignSystemSandbox() {
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="min-h-screen bg-background p-12 space-y-24 text-text-primary">
      <div className="bg-gradient-radial" />
      <div className="bg-grid" />
      
      <div className="max-w-6xl mx-auto space-y-32 relative z-10">
        
        <header className="space-y-4">
          <Typography variant="displayXL" className="gradient-text-primary">Design System</Typography>
          <Typography variant="bodyLarge" className="text-text-secondary max-w-2xl">
            A centralized, premium collection of reusable primitives for MorphOS. 
            Everything here is driven by design tokens and built for the future.
          </Typography>
        </header>

        {/* TYPOGRAPHY */}
        <section className="space-y-8">
          <Typography variant="h2" className="border-b border-border pb-2">Typography</Typography>
          <div className="space-y-8 glass p-8">
            <div className="space-y-2"><Typography variant="displayXL">Display XL (5xl/6xl/7xl)</Typography></div>
            <div className="space-y-2"><Typography variant="display">Display (4xl/5xl/6xl)</Typography></div>
            <div className="space-y-2"><Typography variant="h1">Heading 1 (3xl/4xl/5xl)</Typography></div>
            <div className="space-y-2"><Typography variant="h2">Heading 2 (2xl/3xl/4xl)</Typography></div>
            <div className="space-y-2"><Typography variant="h3">Heading 3 (xl/2xl/3xl)</Typography></div>
            <div className="space-y-2"><Typography variant="title">Title</Typography></div>
            <div className="space-y-2"><Typography variant="bodyLarge">Body Large</Typography></div>
            <div className="space-y-2"><Typography variant="body">Body</Typography></div>
            <div className="space-y-2"><Typography variant="bodySmall">Body Small</Typography></div>
            <div className="space-y-2"><Typography variant="caption">Caption</Typography></div>
            <div className="space-y-2"><Typography variant="overline">OVERLINE</Typography></div>
          </div>
        </section>

        {/* BUTTONS */}
        <section className="space-y-8">
          <Typography variant="h2" className="border-b border-border pb-2">Buttons</Typography>
          <div className="flex flex-wrap gap-6 glass p-8">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="gradient">Gradient</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
            <Button variant="primary" size="icon"><Sparkles className="w-5 h-5" /></Button>
            <MotionButton variant="primary" onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }} isLoading={loading}>
              Click to Load
            </MotionButton>
          </div>
        </section>

        {/* BADGES */}
        <section className="space-y-8">
          <Typography variant="h2" className="border-b border-border pb-2">Badges</Typography>
          <div className="flex flex-wrap gap-4 glass p-8">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="comingSoon">Coming Soon</Badge>
            <Badge variant="new">New</Badge>
            <Badge variant="beta">Beta</Badge>
          </div>
        </section>

        {/* INPUTS */}
        <section className="space-y-8">
          <Typography variant="h2" className="border-b border-border pb-2">Inputs</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 glass p-8">
            <div className="space-y-4">
              <Typography variant="title">Standard Input</Typography>
              <Input placeholder="Enter your email..." />
            </div>
            <div className="space-y-4">
              <Typography variant="title">Success State</Typography>
              <Input placeholder="Valid input" success defaultValue="name@example.com" />
            </div>
            <div className="space-y-4">
              <Typography variant="title">Error State</Typography>
              <Input placeholder="Invalid input" error defaultValue="invalid-email" />
            </div>
            <div className="space-y-4">
              <Typography variant="title">Textarea</Typography>
              <Textarea placeholder="Type your message here..." />
            </div>
          </div>
        </section>

        {/* CARDS & GLASSMORPHISM */}
        <section className="space-y-8">
          <Typography variant="h2" className="border-b border-border pb-2">Cards & Surfaces</Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="glass" className="p-6 h-48 flex flex-col justify-between">
              <Typography variant="title">Glass Card</Typography>
              <Typography variant="bodySmall" className="text-text-secondary">Standard blurry background.</Typography>
            </Card>
            <Card variant="feature" className="h-48 flex flex-col justify-between" interactive>
              <Icon icon={Zap} size="lg" className="text-primary mb-4" />
              <div>
                <Typography variant="title">Feature Card</Typography>
                <Typography variant="bodySmall" className="text-text-secondary">Animated borders and hover lift.</Typography>
              </div>
            </Card>
            <Card variant="application" className="h-48 flex flex-col justify-between" interactive>
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-purple">
                  <Hexagon className="w-5 h-5 text-white" />
                </div>
                <Badge variant="new">App</Badge>
              </div>
              <div className="mt-4">
                <Typography variant="title">Application Card</Typography>
                <Typography variant="bodySmall" className="text-text-secondary mt-1">Ready to use.</Typography>
              </div>
            </Card>
          </div>
        </section>

        {/* ICONS & LOADERS */}
        <section className="space-y-8">
          <Typography variant="h2" className="border-b border-border pb-2">Icons & Loaders</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6">
              <Typography variant="title">Animated Icons</Typography>
              <div className="flex gap-6 items-center">
                <Icon icon={Sparkles} size="sm" animated interactive />
                <Icon icon={Sparkles} size="md" animated interactive />
                <Icon icon={Sparkles} size="lg" animated interactive />
                <Icon icon={ArrowRight} size="lg" animated interactive className="text-primary" />
              </div>
            </Card>
            <Card className="p-8 space-y-8">
              <Typography variant="title">Loaders</Typography>
              <div className="flex flex-wrap gap-8 items-center">
                <Loader variant="spinner" />
                <Loader variant="pulse" />
                <Loader variant="typing" />
                <Loader variant="circular" />
              </div>
              <div className="h-20 w-full pt-4">
                <Loader variant="skeleton" />
              </div>
              <Loader variant="progressBar" progress={65} />
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
}
