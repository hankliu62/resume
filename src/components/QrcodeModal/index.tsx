'use client';

import { Modal } from 'antd';
import classNames from 'classnames';
import QRCode from 'qrcode.react';
import React from 'react';

export interface IQrcodeModalProps {
  visible: boolean;
  content: string;
  onCancel: () => void;
  isMobile: boolean;
}

export default function QrcodeModal({ visible, content, isMobile, onCancel }: IQrcodeModalProps) {
  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      width={isMobile ? '80%' : 250 + 24 * 2}
      onCancel={onCancel}
      wrapClassName={classNames('qrcode-modal', {
        'mobile-qrcode-modal': isMobile,
      })}
    >
      <QRCode value={content} size={250} />
    </Modal>
  );
}
