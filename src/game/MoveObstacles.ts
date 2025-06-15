import Matter from 'matter-js';

const OBSTACLE_SPEED = -3;

let nextId = 0;

const createObstacle = (world: any) => {
    const obstacle = Matter.Bodies.rectangle(400, 650, 20, 20, {
        isStatic: false,
        label: `Obstacle-${nextId++}`,
    });
    Matter.World.add(world, obstacle);

    return { body: obstacle, renderer: require('./Obstacle.tsx').default };
};

const MoveObstacles = (entities: any, { time }: any, onScoreIncrement: () => void) => {
    let world = entities.physics.world;

    const obstacles = Object.keys(entities)
        .filter((key) => key.startsWith('obstacle'))
        .map((key) => ({ key, entity: entities[key] }));

    for (const { key, entity } of obstacles) {
        Matter.Body.translate(entity.body, { x: OBSTACLE_SPEED, y: 0 });

        if (entity.body.position.x < -50) {
            Matter.World.remove(world, entity.body);
            delete entities[key];
            if (onScoreIncrement) {
                onScoreIncrement();
            }
        }
    }

    if (!entities.lastObstacleTime || time.current - entities.lastObstacleTime > 2000) {
        entities[`obstacle-${nextId}`] = createObstacle(world);
        entities.lastObstacleTime = time.current;
    }

    return entities;
};

export default MoveObstacles;
