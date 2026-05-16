// Маппинг строковых iconKey из content-engine на конкретные LucideIcon.

import {
  Clock,
  Car,
  Sparkles,
  Backpack,
  Shield,
  Briefcase,
  Compass,
  Camera,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  clock: Clock,
  car: Car,
  sparkles: Sparkles,
  backpack: Backpack,
  shield: Shield,
  briefcase: Briefcase,
  compass: Compass,
  camera: Camera,
};

export function iconFor(key: string): LucideIcon {
  return ICON_MAP[key] ?? Sparkles;
}
