import { ACTION_ICONS } from '../icons/actions-icons.constant';
import { DEVELOPMENT_ICONS } from '../icons/development-icons.constant';
import { LOCATION_ICONS } from '../icons/location-icons.constant';
import { UTILITY_ICONS } from '../icons/utility-icons.constant';
import { IconOptions } from './icons.function';

const cursorIcons: Record<string, (options?: IconOptions) => string> = {
  eyedropper: LOCATION_ICONS.locate,
  feather: ACTION_ICONS.edit,
  lightning: UTILITY_ICONS.zap,
  magic: ACTION_ICONS.sliders,
  screwdriver: DEVELOPMENT_ICONS.code,
};

export async function gestisciCursore(
  icona: string,
  colore: string = '#000000',
): Promise<void> {
  const body = document.body;

  if (!icona) {
    resetCursor(body);
    return;
  }

  const svg = getCursorSvg(icona, colore);
  if (!svg) {
    console.warn('Cursor icon is not supported.');
    resetCursor(body);
    return;
  }

  const image = new Image();
  const imageUrl = URL.createObjectURL(
    new Blob([svg], { type: 'image/svg+xml' }),
  );
  try {
    image.src = imageUrl;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(image, 4, 4, 24, 24);

    body.style.setProperty(
      '--cursore-attivo',
      `url("${canvas.toDataURL('image/png')}") 16 16, auto`,
    );

    body.classList.add('cursore-personalizzato');
  } catch (error) {
    console.error('Failed to render the custom cursor icon.', error);
    resetCursor(body);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

function getCursorSvg(icon: string, color: string): string | null {
  const value = icon.trim();
  if (value.startsWith('<svg')) {
    return value.replace(/stroke="[^"]*"/, `stroke="${color}"`);
  }

  const lastClass = value.split(/\s+/).pop() || '';
  const iconName = lastClass.replace(/^[a-z]+-/, '').replace(/-fill$/, '');
  const iconFactory = cursorIcons[iconName];

  return iconFactory ? iconFactory({ stroke: color }) : null;
}

function resetCursor(body: HTMLElement): void {
  body.classList.remove('cursore-personalizzato');
  body.style.removeProperty('--cursore-attivo');
}
