import APP_CONFIG from '../../app.config';

// Implement SimulationNodeDatum interface into our custom Node class

export class Node implements d3.SimulationNodeDatum {

    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number;
    fy?: number;

    id: string;
    linkCount: number = 0;

    constructor(id) {
        this.id = id;
    }

    normal = () => {
        return Math.sqrt(this.linkCount / APP_CONFIG.N);
    }

    get r() {
        return 50 * this.normal() + 10;
    }

    get fontSize() {
        return (30 * this.normal() +10) + 'px';
    }

    get color() {
        let index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
        return APP_CONFIG.SPECTRUM[index];
    }
}