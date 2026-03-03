import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("min-h-[80vh] md:min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-20 relative overflow-hidden", className)}
      style={{ WebkitBackdropFilter: 'blur(0px)' }}
    >
      {children}
    </motion.section>
  );
}
