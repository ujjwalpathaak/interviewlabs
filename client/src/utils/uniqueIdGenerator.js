export const uniqueIdGenerator = () => {
  let tempNumber = "";
  for (let i = 0; i < 3; i++) {
    let temp = Math.floor(Math.random() * 1000);
    while (temp < 100) {
      temp = Math.floor(Math.random() * 1000);
    }
    tempNumber = tempNumber + temp + "-";
  }
  return (tempNumber = tempNumber.slice(0, -1));
};
