import React, { useRef, useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Player from '../game/Player.tsx';
import Physics from '../game/Physics.tsx';
import MoveObstacles from '../game/MoveObstacles.ts';
import JumpSystem from '../game/JumpSystem.ts';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function PlayScreen() {
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);

  const engine = useRef(
    Matter.Engine.create({ enableSleeping: false }),
  ).current;
  const world = engine.world;

  const player = Matter.Bodies.rectangle(50, HEIGHT - 100, 50, 50, {
    label: 'Player',
  });
  Matter.World.add(world, [player]);

  const floor = Matter.Bodies.rectangle(WIDTH / 2, HEIGHT - 25, WIDTH, 50, {
    isStatic: true,
    label: 'Floor',
  });
  Matter.World.add(world, [player, floor]);
  const onScoreIncrement = () => setScore(prev => prev + 1);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <GameEngine
        systems={[
          Physics,
          (entities, args) => MoveObstacles(entities, args, onScoreIncrement),
          JumpSystem,
        ]}
        entities={{
          physics: { engine, world },
          player: {
            body: player,
            size: [50, 50],
            renderer: Player,
          },
        }}
        running={running}
        style={styles.gameContainer}
        onEvent={e => {
          if (e.type === 'jump') {
            Matter.Body.setVelocity(player, {
              x: player.velocity.x + 5,
              y: -15,
            });
          }
          if (e.type === 'game-over') {
            setRunning(false);
          }
        }}
      >
        <Text style={styles.score}>Score: {score}</Text>
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  score: {
    color: '#fff',
    position: 'absolute',
    top: 30,
    left: 20,
    fontSize: 18,
  },
});
