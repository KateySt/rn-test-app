import React from 'react';
import { View } from 'react-native';

export default function Obstacle({ body }: any) {
    const width = 10;
    const height = 10;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;

    return (
        <View
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width,
                height,
                backgroundColor: 'red',
            }}
        />
    );
}
