import { IMotionSensorItem } from './IMotionSensorItem';

export interface IMotionSensorComponentProps {
  items: IMotionSensorItem[]; 
   onAddItem: (item: IMotionSensorItem) => void;
}
