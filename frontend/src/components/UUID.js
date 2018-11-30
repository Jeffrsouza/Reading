export const UUID = () => {
  let date = new Date().getTime();
  let key = "xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    let r = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return key;
};

export default UUID;
