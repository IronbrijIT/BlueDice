import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  rolling: boolean;
  onTap: () => void;
  disabled?: boolean;
};

// Pip grid positions for faces 1-6 (3x3 grid)
const FACE_PIPS: number[][] = [
  [5],
  [1, 9],
  [1, 5, 9],
  [1, 3, 7, 9],
  [1, 3, 5, 7, 9],
  [1, 3, 7, 9, 2, 8],
];

function Face({ pips, transform }: { pips: number[]; transform: string }) {
  return (
    <div
      className="dice-face"
      style={{
        transform,
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} style={{ gridArea: `${Math.floor(i / 3) + 1} / ${(i % 3) + 1}` }}>
          {pips.includes(i + 1) ? <div className="dice-pip" /> : null}
        </div>
      ))}
    </div>
  );
}

export function Dice3D({ rolling, onTap, disabled }: Props) {
  const controls = useAnimationControls();
  const restRef = useRef({ x: -20, y: 25 });

  useEffect(() => {
    if (rolling) {
      controls.start({
        rotateX: [restRef.current.x, restRef.current.x + 720],
        rotateY: [restRef.current.y, restRef.current.y + 900],
        transition: { duration: 1.2, ease: "linear", repeat: Infinity },
      });
    } else {
      controls.start({
        rotateX: [restRef.current.x, restRef.current.x + 360],
        rotateY: [restRef.current.y, restRef.current.y + 360],
        transition: { duration: 22, ease: "linear", repeat: Infinity },
      });
    }
  }, [rolling, controls]);



  return (
    <div className="dice-scene flex items-center justify-center" style={{ height: 240 }}>
      <motion.button
        type="button"
        onClick={disabled ? undefined : onTap}
        disabled={disabled}
        aria-label={disabled ? "Rolling dice" : "Roll the dice"}
        className={`relative outline-none ${disabled ? "cursor-default" : "cursor-pointer"}`}
        style={{ background: "transparent", border: "none", padding: 0 }}
        whileTap={{ scale: 0.94 }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <motion.div className="dice-cube" animate={controls}>
          <Face pips={FACE_PIPS[0]} transform="translateZ(80px)" />
          <Face pips={FACE_PIPS[5]} transform="rotateY(180deg) translateZ(80px)" />
          <Face pips={FACE_PIPS[1]} transform="rotateY(90deg) translateZ(80px)" />
          <Face pips={FACE_PIPS[4]} transform="rotateY(-90deg) translateZ(80px)" />
          <Face pips={FACE_PIPS[2]} transform="rotateX(90deg) translateZ(80px)" />
          <Face pips={FACE_PIPS[3]} transform="rotateX(-90deg) translateZ(80px)" />
        </motion.div>
        <div className="dice-shadow" aria-hidden />
      </motion.button>

    </div>
  );
}
