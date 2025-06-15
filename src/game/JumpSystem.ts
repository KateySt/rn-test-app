import Matter from "matter-js";

const JumpSystem = (entities: any, { touches }: any) => {
    const player = entities.player.body;

    touches.filter(t => t.type === 'press').forEach(() => {
        if (Math.abs(player.velocity.y) < 0.01) {
            Matter.Body.setVelocity(player, {
                x: player.velocity.x,
                y: -10,
            });
        }
    });

    return entities;
};

export default JumpSystem;
