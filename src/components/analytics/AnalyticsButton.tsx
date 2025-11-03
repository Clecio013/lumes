"use client";

import { Button } from "@/components/ui/button";
import { useTracking } from "@/hooks/useTracking";
import type { ComponentProps } from "react";

interface AnalyticsButtonProps extends ComponentProps<typeof Button> {
  trackingLocation: string;
  trackingLabel: string;
  trackingType: "schedule" | "transformation" | "whatsapp";
  onAnalyticsClick?: () => void;
}

export function AnalyticsButton({
  trackingLocation,
  trackingLabel,
  trackingType,
  onAnalyticsClick,
  onClick,
  children,
  ...props
}: AnalyticsButtonProps) {
  const { trackCTAClick } = useTracking();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the event
    trackCTAClick(trackingLocation, trackingLabel, trackingType);

    // Call the analytics callback if provided
    if (onAnalyticsClick) {
      onAnalyticsClick();
    }

    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
}
