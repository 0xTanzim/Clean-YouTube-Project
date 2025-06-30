import type { ReactNode } from 'react';
import type { Playlist } from '../features/playlist';

// Component prop types
export interface PlayListCardProps {
  playlist: Playlist;
}

export interface PlayListFormProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (playlistId: string) => void;
}

// Navigation types
export interface LayoutProps {
  children: ReactNode;
}

export interface MenuBarProps {
  menuBarTrig: boolean;
}

export interface SideNavProps {
  handleMenuBarTrig: () => void;
}

// Generic UI component types
export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}
