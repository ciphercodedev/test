export interface Shape {
   borderRadius: number | string;
   borderRadiusSm: number | string;
   borderRadiusMd: number | string;
}

export type ShapeOptions = Partial<Shape>;

declare const shape: Shape;

export default shape;
