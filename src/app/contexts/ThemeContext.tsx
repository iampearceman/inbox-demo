"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { NotionIcon } from "../components/icons/Notion";
import { useForm, UseFormReturn } from "react-hook-form";
import { RedditIcon } from "../components/icons/Reddit";
import { PenIcon } from "../components/icons/Pen";

export interface Workflow {
  id: string;
  title: string;
  data?: Record<string, unknown>;
}

export interface Theme {
  id: string;
  title: string;
  icon: JSX.Element | null;
  workflows: Workflow[];
  placement?: string;
  placementOffset?: number;
  appearance: {
    variables: Record<string, unknown>;
    elements: Record<string, unknown>;
  };
}

const themes: Theme[] = [
  {
    id: "default-theme",
    title: "Default Theme",
    icon: <PenIcon />,
    workflows: [
      {
        id: "default-notification",
        title: "Custom Workflow",
        data: {
          inAppSubject: `In-App Notification Subject!`, //Main notification text (subject)
          inAppBody: `In-App Notification Body!`, //page name
          enablePrimaryAction: true,
          inAppPrimaryActionLabel: "Reply",
          inAppPrimaryActionUrl: "https://google.com",
          enableSecondaryAction: false,
          inAppSecondaryActionLabel: "Dismiss",
          inAppSecondaryActionUrl: "https://google.com",
          showInAppAvatar: true,
          inAppAvatar: "https://avatars.githubusercontent.com/u/77433905?s=200&v=4",
        },
      },
    ],
    placement: "bottom-start",
    placementOffset: 10,
    appearance: {
      variables: {},
      elements: {},
    },
  },
  {
    id: "notion",
    title: "Notion",
    icon: <NotionIcon />,
    appearance: {
      variables: {
        colorPrimary: "#efefed",
        colorPrimaryForeground: "white",
        colorSecondary: "#efefed",
        colorSecondaryForeground: "#1A1523",
        colorCounter: "#E5484D",
        colorCounterForeground: "white",
        colorNeutral: "black",
        borderRadius: "0.375rem",
      },
      elements: {
        notificationListNewNotificationsNotice__button: {
          background: "#2b6cb0",
        },
        notificationListContainer: {
          paddingRight: "10px",
        },
        inboxHeader: {
          padding: "8px 16px",
        },
        inboxStatus__dropdownTrigger: {
          gap: "2px",
        },
        moreActionsContainer: {
          marginRight: "-4px",
        },
        inboxStatus__title: {
          fontSize: "14px",
          fontWeight: "500",
        },
        bellContainer: {
          display: "none",
        },
        preferences__button: {
          display: "none",
        },
        popoverContent: {
          width: "100%", // Relative width for responsiveness
          maxWidth: "390px", // Maximum width for larger screens
          height: "calc(100% - 136px)", // Let the height adjust based on content
          maxHeight: "100%", // Maximum height relative to viewport
          borderRadius: "0px", // Rounded corners
          overflow: "auto", // Allows scrolling for overflow content
          boxShadow:
            "rgba(15, 15, 15, 0.04) 0px 0px 0px 1px, rgba(15, 15, 15, 0.03) 0px 3px 6px, rgba(15, 15, 15, 0.06) 0px 9px 24px",
          backgroundColor: "#fff", // Background color
          marginTop: "-64px", // Spacing from the top
          marginLeft: "-32px", // Spacing from the left
          fontSize: "14px", // Font size
          fontWeight: "500",
        },
        notificationImage: {
          borderRadius: "50%",
          width: "24px",
          height: "24px",
        },
        notificationDot: {
          marginTop: "2px",
          backgroundColor: "#0081F1",
        },
        notificationSubject: {
          color: "black",
          fontSize: "14px",
          fontWeight: "600",
        },
        notificationBody: {},

        notificationPrimaryAction__button: {
          variant: "outline",
          paddingLeft: "8px",
          paddingRight: "8px",
          height: "26px",
          borderRadius: "4px",
          border: "0.5px solid #dfdfdf", // Adding the border line
          fontWeight: "500",
          backgroundColor: "transparent",
          color: "black",
          fontSize: "14px",
        },
        notificationSecondaryAction__button: {
          variant: "outline",
          paddingLeft: "8px",
          paddingRight: "8px",
          height: "26px",
          borderRadius: "4px",
          border: "0.5px solid #dfdfdf", // Adding the border line
          fontWeight: "500",
          backgroundColor: "transparent",
          color: "black",
          fontSize: "14px",
        },
      },
    },
    workflows: [
      {
        id: "notion-comment-notification",
        title: "Comment",
        data: {
          inAppSubject: `{{subscriber.firstName | capitalize}} commented in`,
          inAppBody: "Secret Project Launch 2024",
          enablePrimaryAction: true,
          inAppPrimaryActionLabel: "Reply",
          inAppPrimaryActionUrl: "",
          enableSecondaryAction: false,
          inAppSecondaryActionLabel: "Dismiss",
          inAppSecondaryActionUrl: "",
          showInAppAvatar: true,
          inAppAvatar: "https://avatars.githubusercontent.com/u/63902456?v=4",
        },
      },
      {
        id: "notion-invite-notification",
        title: "Invite",
        data: {
          inAppSubject: `{{subscriber.firstName | capitalize}} invited you to a page`, //Main notification text (subject)
          inAppBody: "Happy Hour Planning", //page name
          enablePrimaryAction: true,
          inAppPrimaryActionLabel: "Accept",
          inAppPrimaryActionUrl: "",
          enableSecondaryAction: true,
          inAppSecondaryActionLabel: "Dismiss",
          inAppSecondaryActionUrl: "",
          showInAppAvatar: true,
          inAppAvatar: "https://dashboard.novu.co/images/avatar.svg",
        },
      },
      {
        id: "notion-mention-notification",
        title: "Mention",
        data: {
          inAppSubject: `{{subscriber.firstName | capitalize}} mentioned you in`, //Main notification text (subject)
          inAppBody: "Very Interesting Project", //page name
          enablePrimaryAction: false,
          inAppPrimaryActionLabel: "Reply",
          inAppPrimaryActionUrl: "",
          enableSecondaryAction: false,
          inAppSecondaryActionLabel: "Dismiss",
          inAppSecondaryActionUrl: "",
          showInAppAvatar: true,
          inAppAvatar: "https://dashboard.novu.co/images/avatar.svg",
        },
      },
    ],
  },
  {
    id: "reddit",
    title: "Reddit",
    icon: <RedditIcon />,
    appearance: {
      variables: {},
      elements: {
        inboxHeader: {
          display: "none",
        },
        preferencesHeader: {
          display: "none",
        },
      },
    },
    workflows: [
      {
        id: "reddit-reply-to-comment",
        title: "Reply To Comment",
        data: {
          inAppSubject: `u/{{subscriber.firstName}} replied to your comment in r/ProgrammerHumor`,
          inAppBody: "you thought you had edge cases covered..you thought",
          enablePrimaryAction: true,
          inAppPrimaryActionLabel: "Reply back",
          inAppPrimaryActionUrl: "https://google.com",
          enableSecondaryAction: false,
          inAppSecondaryActionLabel: "Dismiss",
          inAppSecondaryActionUrl: "https://google.com",
          showInAppAvatar: true,
          inAppAvatar:
            "https://i.redd.it/snoovatar/avatars/3c428706-19a9-48f3-b7ce-cb67f2773e7b.png",
        },
      },
      {
        id: "reddit-reply-to-post",
        title: "Reply To Post",
        data: {
          inAppSubject: `u/{{subscriber.firstName}} replied to your post in r/reactjs`, //Main notification text (subject)
          inAppBody: "Not everything needs to be broken down into an excalidraw diagram", //page name
          enablePrimaryAction: false,
          inAppPrimaryActionLabel: "Accept",
          inAppPrimaryActionUrl: "",
          enableSecondaryAction: false,
          inAppSecondaryActionLabel: "Dismiss",
          inAppSecondaryActionUrl: "",
          showInAppAvatar: true,
          inAppAvatar: "https://dashboard.novu.co/images/avatar.svg",
        },
      },
      {
        id: "reddit-upvote",
        title: "Upvote",
        data: {
          inAppSubject: `⬆️ 1st upvote!`, //Main notification text (subject)
          inAppBody: "Go see your post on r/novuhq: 'Novu is...'", //page name
          enablePrimaryAction: false,
          inAppPrimaryActionLabel: "Reply",
          inAppPrimaryActionUrl: "https://google.com",
          enableSecondaryAction: false,
          inAppSecondaryActionLabel: "Dismiss",
          inAppSecondaryActionUrl: "https://google.com",
          showInAppAvatar: true,
          inAppAvatar: "https://dashboard.novu.co/images/avatar.svg",
        },
      },
    ],
  },
];

interface NotificationFormState {
  subscriberFirstName: string;
  subscriberLastName: string;
  inAppSubject: string;
  inAppBody: string;
  inAppAvatar: string;
  showInAppAvatar: boolean | string;
  inAppPrimaryActionLabel: string;
  enablePrimaryAction: boolean | string;
  inAppPrimaryActionUrl: string;
  inAppSecondaryActionLabel: string;
  enableSecondaryAction: boolean | string;
  inAppSecondaryActionUrl: string;
  selectedWorkflow: string;
}

interface ThemeContextType {
  themes: Theme[];
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
  inboxThemeForm: UseFormReturn<any>;
  notificationForm: UseFormReturn<NotificationFormState>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const inboxThemeForm = useForm({
    defaultValues: {
      language: "en",
      colorPrimary: "#0081F1",
      colorPrimaryForeground: "white",
      colorSecondary: "#F3F3F3",
      colorSecondaryForeground: "#1A1523",
      colorCounter: "#E5484D",
      colorCounterForeground: "white",
      colorBackground: "#FCFCFC",
      colorForeground: "#1A1523",
      colorNeutral: "black",
      fontSize: "18px",
      borderRadius: "0.375rem",
    },
  });

  const notificationForm = useForm<NotificationFormState>({
    defaultValues: {
      subscriberFirstName: "John",
      subscriberLastName: "Doe",
      inAppSubject: "",
      inAppBody: "",
      inAppAvatar: "",
      showInAppAvatar: false,
      inAppPrimaryActionLabel: "",
      enablePrimaryAction: false,
      inAppPrimaryActionUrl: "",
      inAppSecondaryActionLabel: "",
      enableSecondaryAction: false,
      inAppSecondaryActionUrl: "",
      selectedWorkflow: themes[0].workflows[0].id,
    },
  });

  const value: ThemeContextType = {
    themes,
    selectedTheme,
    setSelectedTheme,
    inboxThemeForm,
    notificationForm,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
