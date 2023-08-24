const distinctColors = [
  "#FF6B6B",
  "#FF9F1A",
  "#FFCD56",
  "#4CAF50",
  "#00BCD4",
  "#2196F3",
  "#9C27B0",
  "#FF63B1",
  "#8BC34A",
  "#FFC107"
];

const userIdColorMap: Record<string, string> = {};

const assignColorToUser = (id: string): string => {
  if (!userIdColorMap[id]) {
    const colorIndex = Object.keys(userIdColorMap).length % distinctColors.length;
    userIdColorMap[id] = distinctColors[colorIndex];
  }
  return userIdColorMap[id];
};

export const colorFns = {
    assignColorToUser
}
