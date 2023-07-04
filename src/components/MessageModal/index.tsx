"use client";

import { Modal } from "antd";
import classNames from "classnames";
import React from "react";

export interface IMessageModalProps {
  title: string;
  visible: boolean;
  children: any;
  onCancel: () => void;
  isMobile: boolean;
}

export default function MessageModal({
  title,
  visible,
  isMobile,
  children,
  onCancel,
}: IMessageModalProps) {
  return (
    <Modal
      open={visible}
      title={title}
      onCancel={onCancel}
      onOk={onCancel}
      wrapClassName={classNames("message-modal", {
        "mobile-message-modal": isMobile,
      })}
    >
      {children}
    </Modal>
  );
}
