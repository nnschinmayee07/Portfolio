'use client'

import { useReducedMotion } from 'framer-motion'
import { useId } from 'react'

/*
  Aurora ambient layer.
  Uses SVG feTurbulence → feColorMatrix → feGaussianBlur rendered
  directly as an inline SVG so filter IDs are always in scope.
  mix-blend-mode: screen on a dark background isolates only the
  bright colour areas, keeping black regions transparent.
*/
export default function AuroraBlob() {
  const reduced    = useReducedMotion()
  const uid        = useId().replace(/[^a-z0-9]/gi, '')
  const fId        = `af${uid}`
  const gRedId     = `gr${uid}`
  const gBlueId    = `gb${uid}`

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        zIndex:        0,
        overflow:      'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{
          position:     'absolute',
          inset:        0,
          opacity:      0.7,
          mixBlendMode: 'screen',
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* ── Gradients ── */}
          <radialGradient id={gRedId} cx="30%" cy="35%" r="55%">
            <stop offset="0%"   stopColor="#8B0000" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={gBlueId} cx="72%" cy="68%" r="50%">
            <stop offset="0%"   stopColor="#4A90B8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* ── Turbulence filter ── */}
          <filter id={fId} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.007 0.005"
              numOctaves="4"
              seed="5"
              result="noise"
            >
              {!reduced && (
                <animate
                  attributeName="baseFrequency"
                  values="0.007 0.005;0.011 0.007;0.006 0.010;0.009 0.004;0.007 0.005"
                  dur="44s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
                />
              )}
            </feTurbulence>
            <feColorMatrix
              type="matrix"
              in="noise"
              values="
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 9 -4"
              result="mask"
            />
            <feComposite in="SourceGraphic" in2="mask" operator="in" />
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {/* Red blob — upper left */}
        <g filter={`url(#${fId})`} style={reduced ? {} : {
          animation: 'aurora-red 36s ease-in-out infinite alternate',
        }}>
          <ellipse
            cx="28%" cy="35%"
            rx="48%" ry="44%"
            fill={`url(#${gRedId})`}
            opacity="0.9"
          />
        </g>

        {/* Blue blob — lower right */}
        <g filter={`url(#${fId})`} style={reduced ? {} : {
          animation: 'aurora-blue 42s ease-in-out infinite alternate',
        }}>
          <ellipse
            cx="74%" cy="66%"
            rx="42%" ry="40%"
            fill={`url(#${gBlueId})`}
            opacity="0.75"
          />
        </g>
      </svg>

      {!reduced && (
        <style>{`
          @keyframes aurora-red {
            0%   { transform: translate(0%,   0%)   scale(1);    }
            33%  { transform: translate(4%,  -3%)   scale(1.06); }
            66%  { transform: translate(-3%,  4%)   scale(0.95); }
            100% { transform: translate(5%,   2%)   scale(1.03); }
          }
          @keyframes aurora-blue {
            0%   { transform: translate(0%,   0%)   scale(1);    }
            33%  { transform: translate(-5%,  3%)   scale(1.07); }
            66%  { transform: translate(3%,  -4%)   scale(0.94); }
            100% { transform: translate(-4%, -2%)   scale(1.04); }
          }
        `}</style>
      )}
    </div>
  )
}
