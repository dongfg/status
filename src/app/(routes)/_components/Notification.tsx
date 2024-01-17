"use client";

import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react";

export default function Notification() {
  return (
    <MagicBell
      apiKey="601f47a997eb6e8385355ab4efbe596f25caa6bb"
      userEmail="magicbell@dongfg.com"
      userKey="sUPLfQGigrlBi1muT+Dn6NZCBk4dXt4B0eusiCMwpb8="
      theme={theme}
      locale="en"
    >
      {(props) => (
        <FloatingNotificationInbox width={400} height={500} {...props} />
      )}
    </MagicBell>
  );
}

const theme = {
  icon: { borderColor: "#EDEDEF", width: "24px" },
  banner: {
    fontSize: "14px",
    backgroundColor: "#F8F5FF",
    textColor: "#3A424D",
    backgroundOpacity: 1,
  },
  unseenBadge: { backgroundColor: "#F80808" },
  header: {
    fontFamily: "inherit",
    fontSize: "15px",
    backgroundColor: "#FFFFFF",
    textColor: "#5225C1",
    borderRadius: "16px",
  },
  footer: {
    fontSize: "15px",
    backgroundColor: "#FFFFFF",
    textColor: "#5225C1",
    borderRadius: "16px",
  },
  notification: {
    default: {
      fontFamily: "inherit",
      fontSize: "14px",
      textColor: "#3A424D",
      borderRadius: "16px",
      backgroundColor: "#FFFFFF",
      hover: { backgroundColor: "#F2EDFC" },
      state: { color: "transparent" },
      margin: "8px",
    },
    unseen: {
      textColor: "#3A424D",
      backgroundColor: "#F8F5FF",
      hover: { backgroundColor: "#F2EDFC" },
      state: { color: "#5225C1" },
    },
    unread: {
      textColor: "#3A424D",
      backgroundColor: "#F8F5FF",
      hover: { backgroundColor: "#F2EDFC" },
      state: { color: "#5225C1" },
    },
  },
  dialog: {
    backgroundColor: "#F5F5F5",
    textColor: "#313131",
    accentColor: "#5225C1",
  },
};
