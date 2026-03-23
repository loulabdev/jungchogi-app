import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ className?: string }>;

export default function Card({ children, className = '' }: Props) {
  return <section className={`card ${className}`.trim()}>{children}</section>;
}
