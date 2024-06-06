import { CloseIconModal } from '@/public/icons/close-icon-modal';
import { Box } from './box';
import LineChartComponent from '../analytics/linear-diagram';
import PieDiagram from '../analytics/pie-diagram';
import StraightLineDiagram from '../analytics/straight-line-diagram';

interface ModalTypes {
  modal: boolean;
  setModal: (_value: boolean | ((_prevModal: boolean) => boolean)) => void;
}

export const ChartModal = ({ modal, setModal }: ModalTypes) => {
  return (
    <Box className={` ${!modal && 'hidden'} fixed w-[100vw] h-screen`}>
      <Box
        onClick={() => setModal(false)}
        className="w-[56%] h-full bg-transparent"
      ></Box>
      <Box className="w-[40%] h-full bg-[#F2F3F9] flex-col items-center overflow-y-auto overflow-x-hidden p-10 gap-y-5 scrollbar-hide shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)]">
        <Box className="relative w-full h-max">
          <Box
            className="absolute top-0 right-0 pr-3"
            onClick={() => setModal(false)}
          >
            <CloseIconModal />
          </Box>
        </Box>

        <Box className="flex-col w-max gap-y-5 pt-10">
          <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
            <LineChartComponent></LineChartComponent>
          </Box>
          <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
            <PieDiagram></PieDiagram>
          </Box>
          <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
            <LineChartComponent></LineChartComponent>
          </Box>
          <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
            <PieDiagram></PieDiagram>
          </Box>
          <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
            <StraightLineDiagram />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
