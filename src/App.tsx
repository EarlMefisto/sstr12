import { useState } from "react";
import { Map } from "./Components/Map";
import { Modal } from "./Components/Modal/Modal";
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<string>("");

  const handleAreaDrawn = (coords: string) => {
    setCoordinates(coords);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCoordinates("");
  };

  return (
    <div className="appContainer">
      <Map onAreaDrawn={handleAreaDrawn} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        coordinates={coordinates}
      />
    </div>
  );
}

export default App;
