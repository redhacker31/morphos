import React from "react";
import { cn } from "@/lib/utils";

const typographyVariants = {
  displayXL: "font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-tight",
  display: "font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight",
  h1: "font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight",
  h2: "font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug",
  h3: "font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight leading-snug",
  title: "text-lg sm:text-xl font-medium tracking-tight leading-snug",
  bodyLarge: "text-lg leading-relaxed",
  body: "text-base leading-relaxed",
  bodySmall: "text-sm leading-relaxed",
  caption: "text-xs font-medium text-muted-foreground",
  overline: "text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground",
} as const;

type VariantType = keyof typeof typographyVariants;

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: VariantType;
  as?: React.ElementType;
  children: React.ReactNode;
}

const defaultElements: Record<VariantType, React.ElementType> = {
  displayXL: "h1",
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  title: "h4",
  bodyLarge: "p",
  body: "p",
  bodySmall: "p",
  caption: "span",
  overline: "span",
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "body", as, className, children, ...props }, ref) => {
    const Component = as || defaultElements[variant];
    return (
      <Component
        ref={ref as any}
        className={cn(typographyVariants[variant], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Typography.displayName = "Typography";

// Pre-bound convenience components
export const DisplayXL = (props: Omit<TypographyProps, "variant">) => <Typography variant="displayXL" {...props} />;
export const Display = (props: Omit<TypographyProps, "variant">) => <Typography variant="display" {...props} />;
export const H1 = (props: Omit<TypographyProps, "variant">) => <Typography variant="h1" {...props} />;
export const H2 = (props: Omit<TypographyProps, "variant">) => <Typography variant="h2" {...props} />;
export const H3 = (props: Omit<TypographyProps, "variant">) => <Typography variant="h3" {...props} />;
export const Title = (props: Omit<TypographyProps, "variant">) => <Typography variant="title" {...props} />;
export const BodyLarge = (props: Omit<TypographyProps, "variant">) => <Typography variant="bodyLarge" {...props} />;
export const Body = (props: Omit<TypographyProps, "variant">) => <Typography variant="body" {...props} />;
export const BodySmall = (props: Omit<TypographyProps, "variant">) => <Typography variant="bodySmall" {...props} />;
export const Caption = (props: Omit<TypographyProps, "variant">) => <Typography variant="caption" {...props} />;
export const Overline = (props: Omit<TypographyProps, "variant">) => <Typography variant="overline" {...props} />;
