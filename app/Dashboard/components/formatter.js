export const FormatTime = (timeString) => {
  const [time, format] = timeString.split(" ");
  const [hours, minutes] = time.split(":");
  return { time: `${hours}:${minutes}`, format };
};
