import { useState } from "react";
import type { AnatomyStructure } from "@/data/anatomy_atlas_data";

interface AnatomySVGProps {
  system: "muscular" | "skeletal";
  structures: AnatomyStructure[];
  highlightedId?: string | null;
  answeredIds?: Set<string>;
  correctIds?: Set<string>;
  wrongIds?: Set<string>;
  onStructureClick?: (structure: AnatomyStructure) => void;
  showLabels?: boolean;
  activeDropTarget?: string | null;
}

// SVG body outline paths for anterior view
const BODY_OUTLINE = `M50,2 C54,2 56,4 56,7 C56,10 54,12 50,12 C46,12 44,10 44,7 C44,4 46,2 50,2
M42,12 L38,13 L33,15 L30,18 L28,22 L27,28 L26,32 L25,38 L27,38 L29,32 L30,28 L32,24 L35,20 L38,18 L42,16
M58,12 L62,13 L67,15 L70,18 L72,22 L73,28 L74,32 L75,38 L73,38 L71,32 L70,28 L68,24 L65,20 L62,18 L58,16
M42,16 L44,20 L44,26 L43,32 L42,36 L40,40 L39,42 L38,48 L37,52 L38,56 L39,58
M58,16 L56,20 L56,26 L57,32 L58,36 L60,40 L61,42 L62,48 L63,52 L62,56 L61,58
M39,58 L38,64 L37,70 L37,76 L38,80 L36,82
M61,58 L62,64 L63,70 L63,76 L62,80 L64,82`;

// Muscle shapes for anterior view (simplified polygons)
const MUSCLE_SHAPES: Record<string, string> = {
  m_frontalis: "M46,2 L54,2 L55,4 L53,5 L47,5 L45,4 Z",
  m_sternocleidomastoid: "M44,9 L46,8 L48,10 L47,13 L45,13 L43,11 Z",
  m_trapezius: "M38,10 L43,10 L44,13 L42,15 L38,14 Z",
  m_deltoid: "M32,14 L38,13 L39,16 L37,20 L33,19 L31,16 Z",
  m_pectoralis_major: "M40,15 L50,15 L52,18 L51,22 L44,22 L39,20 Z",
  m_biceps_brachii: "M30,21 L34,20 L35,24 L34,28 L31,28 L29,24 Z",
  m_brachioradialis: "M28,29 L32,28 L33,32 L31,36 L28,35 Z",
  m_rectus_abdominis: "M45,23 L53,23 L53,35 L45,35 Z",
  m_external_oblique: "M38,24 L44,24 L44,33 L40,34 L37,30 Z",
  m_quadriceps: "M40,40 L48,40 L49,54 L47,56 L42,56 L39,54 Z",
  m_rectus_femoris: "M43,42 L47,42 L48,52 L46,54 L44,54 L42,52 Z",
  m_sartorius: "M46,39 L48,39 L44,54 L42,54 Z",
  m_adductors: "M47,44 L51,44 L50,54 L48,54 Z",
  m_tibialis_anterior: "M41,59 L44,58 L44,68 L42,70 L40,68 Z",
  m_gastrocnemius: "M55,59 L59,58 L59,68 L57,70 L54,68 Z",
  m_serratus_anterior: "M35,21 L39,20 L39,26 L37,27 L35,25 Z",
};

// Bone shapes for anterior view
const BONE_SHAPES: Record<string, string> = {
  b_frontal: "M46,2 L54,2 L55,5 L53,6 L47,6 L45,5 Z",
  b_mandible: "M46,7 L53,7 L54,9 L50,10 L46,9 Z",
  b_clavicle: "M38,12 L50,12 L50,13 L38,13 Z",
  b_sternum: "M47,14 L51,14 L51,23 L49,24 L47,23 Z",
  b_ribs: "M39,15 L49,15 L51,17 L52,22 L48,26 L40,26 L38,22 L39,17 Z",
  b_humerus: "M32,17 L35,17 L36,27 L33,27 Z",
  b_radius: "M30,29 L32,29 L31,37 L29,37 Z",
  b_ulna: "M33,29 L35,29 L34,37 L32,37 Z",
  b_pelvis: "M40,33 L52,33 L54,38 L52,42 L48,42 L44,42 L40,42 L38,38 Z",
  b_femur: "M42,42 L46,42 L47,56 L44,56 L41,56 Z",
  b_patella: "M43,56 L46,56 L46,58 L43,58 Z",
  b_tibia: "M42,59 L45,59 L44,72 L41,72 Z",
  b_fibula: "M46,59 L48,59 L47,72 L45,72 Z",
  b_scapula: "M35,14 L39,14 L40,19 L38,20 L34,18 Z",
  b_vertebral_column: "M48,12 L51,12 L51,34 L48,34 Z",
};

export function AnatomySVG({
  system,
  structures,
  highlightedId,
  answeredIds = new Set(),
  correctIds = new Set(),
  wrongIds = new Set(),
  onStructureClick,
  showLabels = false,
  activeDropTarget,
}: AnatomySVGProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const shapes = system === "muscular" ? MUSCLE_SHAPES : BONE_SHAPES;

  const getStructureFill = (id: string) => {
    if (correctIds.has(id)) return "hsl(var(--chart-2) / 0.6)"; // green
    if (wrongIds.has(id)) return "hsl(var(--destructive) / 0.5)"; // red
    if (highlightedId === id || activeDropTarget === id) return "hsl(var(--primary) / 0.7)";
    if (hoveredId === id) return "hsl(var(--primary) / 0.4)";
    if (answeredIds.has(id)) return "hsl(var(--muted) / 0.5)";
    return system === "muscular"
      ? "hsl(0 60% 55% / 0.35)"   // reddish for muscles
      : "hsl(40 30% 80% / 0.5)";  // bone-ish
  };

  return (
    <svg
      viewBox="0 0 100 85"
      className="w-full h-full max-h-[70vh]"
      style={{ touchAction: "none" }}
    >
      {/* Body outline */}
      <path
        d={BODY_OUTLINE}
        fill="none"
        stroke="hsl(var(--foreground) / 0.2)"
        strokeWidth="0.3"
        strokeLinejoin="round"
      />

      {/* Structure shapes */}
      {structures.map((structure) => {
        const path = shapes[structure.id];
        if (!path) return null;

        return (
          <g key={structure.id}>
            <path
              d={path}
              fill={getStructureFill(structure.id)}
              stroke={
                highlightedId === structure.id || activeDropTarget === structure.id
                  ? "hsl(var(--primary))"
                  : correctIds.has(structure.id)
                  ? "hsl(var(--chart-2))"
                  : wrongIds.has(structure.id)
                  ? "hsl(var(--destructive))"
                  : "hsl(var(--foreground) / 0.3)"
              }
              strokeWidth={highlightedId === structure.id ? "0.5" : "0.2"}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredId(structure.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onStructureClick?.(structure)}
            />

            {/* Number label on structure */}
            <text
              x={structure.hotspot.x + structure.hotspot.width / 2}
              y={structure.hotspot.y + structure.hotspot.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="2"
              fontWeight="bold"
              fill="hsl(var(--foreground))"
              className="pointer-events-none select-none"
              opacity={0.7}
            >
              {structures.indexOf(structure) + 1}
            </text>

            {/* Show label on hover or if showLabels */}
            {(showLabels || hoveredId === structure.id) && (
              <g className="pointer-events-none">
                <rect
                  x={structure.hotspot.x - 2}
                  y={structure.hotspot.y - 3}
                  width={structure.name.length * 1.3 + 2}
                  height="3"
                  rx="0.5"
                  fill="hsl(var(--popover))"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.15"
                  opacity="0.95"
                />
                <text
                  x={structure.hotspot.x - 1}
                  y={structure.hotspot.y - 1.2}
                  fontSize="1.6"
                  fill="hsl(var(--popover-foreground))"
                  fontWeight="600"
                >
                  {structure.name}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
