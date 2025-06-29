import type { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header = ({ children, className = '' }: HeaderProps) => {
  return (
    <header
      className={`bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </header>
  );
};

interface MainProps {
  children: ReactNode;
  className?: string;
}

export const Main = ({ children, className = '' }: MainProps) => {
  return <main className={`flex-1 ${className}`}>{children}</main>;
};

interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const Container = ({
  children,
  size = 'xl',
  className = '',
}: ContainerProps) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    full: 'max-w-full',
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};

interface SectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const Section = ({
  children,
  title,
  description,
  className = '',
}: SectionProps) => {
  return (
    <section className={`py-8 ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 2 | 4 | 6 | 8;
  className?: string;
}

export const Grid = ({
  children,
  cols = 3,
  gap = 4,
  className = '',
}: GridProps) => {
  const gridColsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
  };

  const gapClasses = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div
      className={`grid ${gridColsClasses[cols]} ${gapClasses[gap]} ${className}`}
    >
      {children}
    </div>
  );
};
