const distinctColors = [
  "#E57373",
  "#F06292",
  "#BA68C8",
  "#9575CD",
  "#7986CB",
  "#64B5F6",
  "#4FC3F7",
  "#4DD0E1",
  "#81C784",
  "#AED581",
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
