export const otpGenerator = () => {
  const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  return otp;
};
