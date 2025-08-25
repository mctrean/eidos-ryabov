import React from "react";
import {
  type UiSessionStatus,
  SESSION_STATUS_CONFIG,
} from "../../types/studySessions";

interface StatusBadgeProps {
  status: UiSessionStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = SESSION_STATUS_CONFIG[status];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: 43,
        background: config.color,
        border: "none",
        color: "#2F3144",
        fontSize: 13,
        fontWeight: 500,
        lineHeight: "20px",
        fontFamily: "Manrope",
      }}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
