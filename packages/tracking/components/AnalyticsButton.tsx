"use client";

import { useTracking } from "../hooks/useTracking";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type AnalyticsButtonProps<T extends ElementType = "button"> = {
  as?: T;
  trackingLocation: string;
  trackingLabel: string;
  trackingType: "schedule" | "transformation" | "whatsapp";
  onAnalyticsClick?: () => void;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function AnalyticsButton<T extends ElementType = "button">({
  as,
  trackingLocation,
  trackingLabel,
  trackingType,
  onAnalyticsClick,
  onClick,
  children,
  ...props
}: AnalyticsButtonProps<T>) {
  const { trackCTAClick } = useTracking();
  const Component = as || "button";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the event
    trackCTAClick(trackingLocation, trackingLabel, trackingType);

    // Call the analytics callback if provided
    if (onAnalyticsClick) {
      onAnalyticsClick();
    }

    // Call the original onClick if provided
    if (onClick) {
      (onClick as (e: React.MouseEvent<HTMLButtonElement>) => void)(e);
    }
  };

  return (
    <Component {...props} onClick={handleClick}>
      {children}
    </Component>
  );
}
