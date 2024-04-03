import React from 'react';
import Lottie from 'react-lottie';
import animationData from '@/public/lotties/uploadAnimation.json';

export const UploadAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie
      isClickToPauseDisabled
      height={180}
      width={180}
      options={defaultOptions}
    />
  );
};
