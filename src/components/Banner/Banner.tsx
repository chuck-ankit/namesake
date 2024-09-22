import {
  type RemixiconComponentType,
  RiAlertLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiInformationLine,
} from "@remixicon/react";
import { tv } from "tailwind-variants";

export interface BannerProps {
  children: React.ReactNode;
  icon?: RemixiconComponentType;
  variant?: "info" | "success" | "danger" | "warning";
}

const bannerStyles = tv({
  base: "flex gap-2 p-3 pr-4 items-start w-full text-sm rounded-lg bg-gray-3 dark:bg-graydark-3 text-gray-dim",
  variants: {
    variant: {
      info: "bg-blue-3 dark:bg-bluedark-3 text-blue-normal",
      success: "bg-green-3 dark:bg-greendark-3 text-green-normal",
      danger: "bg-red-3 dark:bg-reddark-3 text-red-normal",
      warning: "bg-amber-3 dark:bg-amberdark-3 text-amber-normal",
    },
  },
  defaultVariants: {
    variant: undefined,
  },
});

const iconStyles = tv({
  base: "text-gray-9 dark:text-graydark-9 shrink-0",
  variants: {
    variant: {
      info: "text-blue-10 dark:text-bluedark-10",
      success: "text-green-10 dark:text-greendark-10",
      danger: "text-red-10 dark:text-reddark-10",
      warning: "text-amber-10 dark:text-amberdark-10",
    },
  },
  defaultVariants: {
    variant: undefined,
  },
});

export function Banner({ children, icon: Icon, variant }: BannerProps) {
  const DefaultIcon = () => {
    switch (variant) {
      case "success":
        return RiCheckLine;
      case "danger":
        return RiErrorWarningLine;
      case "warning":
        return RiAlertLine;
      default:
        return RiInformationLine;
    }
  };

  Icon = Icon ?? DefaultIcon();

  return (
    <div className={bannerStyles({ variant })}>
      <Icon size={20} className={iconStyles({ variant })} />
      {children}
    </div>
  );
}