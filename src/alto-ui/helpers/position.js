export const getRelativePosition = (node, target, options) => {
  if (!node || !target) return {};

  const { left, right, top, bottom, margin = 0 } = options || {};

  const n = node.getBoundingClientRect();
  const t = target.getBoundingClientRect();
  const { innerWidth, innerHeight } = window;

  const isBottomOK = innerHeight - t.bottom >= n.height + margin;
  const isTopOK = t.top >= n.height + margin;
  const isRightOK = innerWidth - t.right >= n.width + margin;
  const isLeftOK = t.left >= n.width + margin;

  if (top) {
    if (isTopOK) return { top: true };
    if (isBottomOK) return { bottom: true };
    if (isRightOK) return { right: true };
    if (isLeftOK) return { left: true };
  }

  if (right) {
    if (isRightOK) return { right: true };
    if (isBottomOK) return { bottom: true };
    if (isTopOK) return { top: true };
    if (isLeftOK) return { left: true };
  }

  if (left) {
    if (isLeftOK) return { left: true };
    if (isBottomOK) return { bottom: true };
    if (isTopOK) return { top: true };
    if (isRightOK) return { right: true };
  }

  if (isBottomOK) return { bottom: true };
  if (isTopOK) return { top: true };
  if (isRightOK) return { right: true };
  if (isLeftOK) return { left: true };
  return { left, right, top, bottom };
};

const alignItem = (nodeSize, targetStart, targetSize, { start, end }) => {
  if (start) return targetStart;
  if (end) return targetStart + targetSize - nodeSize;
  return targetStart + targetSize / 2 - nodeSize / 2;
};

export const getPositionStyle = (node, target, options) => {
  if (!node || !target) return {};

  const { left, right, top, start, middle, end, margin = 0 } = options;

  const n = node.getBoundingClientRect();
  const t = target.getBoundingClientRect();
  const { innerWidth, innerHeight } = window;

  if (left || right) {
    const y = alignItem(n.height, t.top, t.height, { start, middle, end });
    const x = left ? t.left - n.width - margin : t.left + t.width + margin;
    return {
      left: x,
      top: Math.max(0, Math.min(innerHeight - n.height, y)),
    };
  }

  const x = alignItem(n.width, t.left, t.width, { start, middle, end });
  const y = top ? t.top - n.height - margin : t.top + t.height + margin;

  return {
    top: y,
    left: Math.max(0, Math.min(innerWidth - n.width, x)),
  };
};

export const getRelativePositionStyle = (node, target, options) => {
  const { top, bottom, left, right } = getRelativePosition(node, target, options);
  return getPositionStyle(node, target, { ...options, top, bottom, left, right });
};
