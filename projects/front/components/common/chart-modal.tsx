import { CloseIconModal } from '@/public/icons/close-icon-modal';
import { Box } from './box';
import LineChartComponent from '../analytics/linear-diagram';
import PieDiagram from '../analytics/pie-diagram';
import StraightLineDiagram from '../analytics/straight-line-diagram';

const linearData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Loss',
      data: [650000, 590000, 800000, 810000, 560000, 550000],
      borderColor: '#FA4B3C',
      borderWidth: 2,
    },
    {
      label: 'Profit',
      data: [280000, 480000, 400000, 190000, 860000, 270000],
      borderColor: '#00DFA4',
      borderWidth: 2,
    },
  ],
};
const straightLineData = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      data: [10, 13, 8, 15, 13, 12, 14],
      borderColor: '#00DF16',
      borderWidth: 2,
    },
  ],
};

interface ModalTypes {
  modal: boolean;
  setModal: (_value: boolean | ((_prevModal: boolean) => boolean)) => void;
}

export const ChartModal = ({ modal, setModal }: ModalTypes) => {
  return (
    <Box className={` ${!modal && 'hidden'} fixed w-[100vw] h-screen`}>
      <Box
        onClick={() => setModal(false)}
        className="w-[54.44%] h-full bg-transparent"
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
            <LineChartComponent data={linearData}></LineChartComponent>
          </Box>
          <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
            <PieDiagram number={35}></PieDiagram>
          </Box>
          <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
            <LineChartComponent data={linearData}></LineChartComponent>
          </Box>
          <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
            <PieDiagram number={35}></PieDiagram>
          </Box>
          <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
            <StraightLineDiagram data={straightLineData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
