import Matter from 'matter-js';

const Physics =  (entities: any, { time }: any) => {
    let engine = entities.physics.engine;
    const MAX_DELTA = 16.667;
    Matter.Engine.update(engine, Math.min(time.delta, MAX_DELTA));
    return entities;
};

export default Physics;
