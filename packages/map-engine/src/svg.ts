import type { Point } from './types';
import type { Scene, SceneItem } from './scene';

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const pts = (a: Point[]): string => a.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
const op = (o?: number): string => (o !== undefined ? ` opacity="${o}"` : '');

/** Glifos de las insignias, dibujados en un cuadro de lado `s` centrado en (0,0). */
function glyph(kind: string, s: number, font: string): string {
  const white = '#FFFFFF';
  switch (kind) {
    case 'info':
      return `<text y="${(s * 0.22).toFixed(1)}" text-anchor="middle" font-family="${font}" font-size="${(s * 0.66).toFixed(1)}" font-weight="800" fill="${white}">i</text>`;
    case 'wc':
      return `<text y="${(s * 0.14).toFixed(1)}" text-anchor="middle" font-family="${font}" font-size="${(s * 0.4).toFixed(1)}" font-weight="800" fill="${white}">WC</text>`;
    case 'atm':
      return `<text y="${(s * 0.22).toFixed(1)}" text-anchor="middle" font-family="${font}" font-size="${(s * 0.62).toFixed(1)}" font-weight="800" fill="${white}">$</text>`;
    case 'stairs': {
      const p = [[-0.3, 0.28], [-0.1, 0.28], [-0.1, 0.08], [0.1, 0.08], [0.1, -0.12], [0.3, -0.12]].map(([x, y]) => `${((x ?? 0) * s).toFixed(1)},${((y ?? 0) * s).toFixed(1)}`).join(' ');
      return `<polyline points="${p}" fill="none" stroke="${white}" stroke-width="${(s * 0.11).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    default: {
      // elevator
      const a = s * 0.14;
      const b = s * 0.3;
      const c = s * 0.08;
      return `<polygon points="0,${-b} ${-a},${-c} ${a},${-c}" fill="${white}"/><polygon points="0,${b} ${-a},${c} ${a},${c}" fill="${white}"/>`;
    }
  }
}

function item(it: SceneItem, font: string): string {
  switch (it.kind) {
    case 'polygon': {
      const sid = it.storeId ? ` data-store-id="${escapeXml(it.storeId)}"` : '';
      return `<polygon points="${pts(it.points)}" fill="${it.fill}" stroke="${it.stroke}" stroke-width="${it.strokeWidth}" stroke-linejoin="round"${op(it.opacity)}${sid}/>`;
    }
    case 'polyline': {
      const dash = it.dash ? ` stroke-dasharray="${it.dash}"` : '';
      return `<polyline points="${pts(it.points)}" fill="none" stroke="${it.stroke}" stroke-width="${it.strokeWidth}"${dash} stroke-linecap="round" stroke-linejoin="round"${op(it.opacity)}/>`;
    }
    case 'circle': {
      const stroke = it.stroke ? ` stroke="${it.stroke}" stroke-width="${it.strokeWidth ?? 1}"` : '';
      return `<circle cx="${it.x.toFixed(1)}" cy="${it.y.toFixed(1)}" r="${it.r}" fill="${it.fill}"${stroke}${op(it.opacity)}/>`;
    }
    case 'ellipse':
      return `<ellipse cx="${it.x.toFixed(1)}" cy="${it.y.toFixed(1)}" rx="${it.rx}" ry="${it.ry}" fill="${it.fill}"${op(it.opacity)}/>`;
    case 'text': {
      const sid = it.storeId ? ` data-store-id="${escapeXml(it.storeId)}"` : '';
      const halo = it.halo ? ` stroke="${it.halo}" stroke-width="3" stroke-linejoin="round" paint-order="stroke"` : '';
      return `<text x="${it.x.toFixed(1)}" y="${it.y.toFixed(1)}" text-anchor="middle" font-family="${font}" font-size="${it.size}" font-weight="${it.weight}" fill="${it.fill}"${halo}${sid}>${escapeXml(it.text)}</text>`;
    }
    case 'badge': {
      const h = it.size / 2;
      return `<g transform="translate(${it.x.toFixed(1)} ${it.y.toFixed(1)})"><rect x="${-h}" y="${-h}" width="${it.size}" height="${it.size}" rx="${(it.size * 0.28).toFixed(1)}" fill="${it.fill}" stroke="#FFFFFF" stroke-width="1.5"/>${glyph(it.glyph, it.size, font)}</g>`;
    }
    case 'pin':
      return `<g transform="translate(${it.x.toFixed(1)} ${it.y.toFixed(1)})"><path d="M0 22C-14 6-12-12 0-12C12-12 14 6 0 22Z" fill="${it.fill}" stroke="#FFFFFF" stroke-width="2"/><circle cx="0" cy="-1" r="4.5" fill="#FFFFFF"/></g>`;
    case 'userPin':
      return `<g transform="translate(${it.x.toFixed(1)} ${it.y.toFixed(1)})"><circle cx="0" cy="0" r="${(it.radius * 2.2).toFixed(1)}" fill="#4F46E5" opacity="0.18"/><circle cx="0" cy="0" r="${it.radius.toFixed(1)}" fill="#4F46E5"/><circle cx="0" cy="0" r="2.8" fill="#FFFFFF"/></g>`;
    case 'visionCone': {
      const pStr = `M ${it.apex.x.toFixed(1)},${it.apex.y.toFixed(1)} L ${it.arc.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')} Z`;
      return `<path d="${pStr}" fill="#4F46E5" opacity="${it.opacity}"/>`;
    }
    case 'userTrail':
      return it.segments
        .map(
          (seg) =>
            `<polyline points="${pts(seg.points)}" fill="none" stroke="#4F46E5" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" opacity="${seg.opacity}"/>`
        )
        .join('');
  }
}

export interface SvgOptions {
  background?: string;
  fontFamily?: string;
  /** Texto pequeño al pie (opcional). */
  caption?: string;
}

/** Serializa una escena a un documento SVG completo. */
export function sceneToSvg(scene: Scene, opts: SvgOptions = {}): string {
  const { x, y, w, h } = scene.viewBox;
  const font = opts.fontFamily ?? 'DejaVu Sans, Roboto, sans-serif';
  const bg = opts.background ?? '#F8FAFC';
  const caption = opts.caption
    ? `<text x="${(x + 16).toFixed(0)}" y="${(y + h - 14).toFixed(0)}" font-family="${font}" font-size="11" fill="#475569">${escapeXml(opts.caption)}</text>`
    : '';
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x.toFixed(0)} ${y.toFixed(0)} ${w.toFixed(0)} ${h.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}">`,
    `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${bg}"/>`,
    ...scene.items.map((it) => item(it, font)),
    caption,
    '</svg>',
  ].join('\n');
}
