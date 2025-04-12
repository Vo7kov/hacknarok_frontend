import { FC, useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ARPopup } from '@/components/ARPopup';
import { RuneScene } from './RuneScene';

type Props = {
  data: string;
};

export const RunesGame: FC<Props> = ({ data }) => {
  const [tapCount, setTapCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [collectedRunes, setCollectedRunes] = useState<string[]>([]);

  const handleTouch = () => {
    if (showPopup) return;

    const newCount = tapCount + 1;
    setTapCount(newCount);
    setCollectedRunes((prev) => [...prev, '?']); // можно заменить на реальные руны

    if (newCount === 3) {
      setShowPopup(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View
        style={{
          position: 'absolute',
          top: '10%',
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {!showPopup && <RuneScene />}
        {showPopup && <ARPopup data={data} />}
      </View>
    </TouchableWithoutFeedback>
  );
};
