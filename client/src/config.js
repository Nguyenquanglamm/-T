export const converCurences = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  export const formatDate = (m) => {
    const a =
      m.getUTCFullYear() +
      "/" +
      ("0" + (m.getUTCMonth() + 1)).slice(-2) +
      "/" +
      ("0" + m.getUTCDate()).slice(-2)
  
    return a;
  };