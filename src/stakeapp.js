import Nav from './nav';
import Mapgl from './mapgl';

function Stakeapp() {
  return (
    <div className="flex flex-col md:flex-row md:min-h-screen w-full">
      <Nav />
      <div className="z-0 flex flex-col flex-shrink md:w-full focus:ring ">
        <Mapgl />
      </div>
    </div>
  );
}

export default Stakeapp;
