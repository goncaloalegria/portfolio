"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const TiltContext = createContext(false);
export const useTiltHover = () => useContext(TiltContext);

export default function Tilt3D({
  children,
  className = "",
  intensity = 12,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 250, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 250, damping: 25 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || reduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      rotateX.set((y - 0.5) * -intensity);
      rotateY.set((x - 0.5) * intensity);
    },
    [rotateX, rotateY, intensity, reduceMotion]
  );

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <TiltContext.Provider value={hovered}>
      <div
        ref={ref}
        className={className}
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            rotateX: springX,
            rotateY: springY,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </motion.div>
      </div>
    </TiltContext.Provider>
  );
}

export function TiltItem({
  children,
  className = "",
  z = 0,
}: {
  children: ReactNode;
  className?: string;
  z?: number;
}) {
  const isHovered = useTiltHover();

  return (
    <div
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered ? `translateZ(${z}px)` : "translateZ(0px)",
        transition: "transform 0.25s ease-out",
      }}
    >
      {children}
    </div>
  );
}