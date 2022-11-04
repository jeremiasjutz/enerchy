import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function Controls({
  setMinPower,
  setMaxPower,
  setCategoryWaterPowerEnabled,
  setCategoryPhotovoltaicEnabled,
  setCategoryWindEnergyEnabled,
  setCategoryBiomassEnabled,
  setCategoryOilEnabled,
  setCategoryGasEnabled,
  setCategoryWasteEnabled,
  setCategoryNuclearEnergyEnabled,
}: {
  setMinPower: Dispatch<SetStateAction<number>>;
  setMaxPower: Dispatch<SetStateAction<number>>;
  setCategoryWaterPowerEnabled: Dispatch<SetStateAction<boolean>>;
  setCategoryPhotovoltaicEnabled: Dispatch<SetStateAction<boolean>>;
  setCategoryWindEnergyEnabled: Dispatch<SetStateAction<boolean>>;
  setCategoryBiomassEnabled: Dispatch<SetStateAction<boolean>>;
  setCategoryOilEnabled: Dispatch<SetStateAction<boolean>>;
  setCategoryGasEnabled: Dispatch<SetStateAction<boolean>>;
  setCategoryWasteEnabled: Dispatch<SetStateAction<boolean>>;
  setCategoryNuclearEnergyEnabled: Dispatch<SetStateAction<boolean>>;
}) {
  const [minPowerSliderValue, setMinPowerSliderValue] = useState(0);
  const [maxPowerSliderValue, setMaxPowerSliderValue] = useState(0);
  const [waterPowerCheckbox, setWaterPowerCheckbox] = useState(false);
  const [photovoltaicCheckbox, setPhotovoltaicCheckbox] = useState(false);
  const [windEnergyCheckbox, setWindEnergyCheckbox] = useState(false);
  const [biomassCheckbox, setBiomassCheckbox] = useState(false);
  const [oilCheckbox, setOilCheckbox] = useState(false);
  const [gasCheckbox, setGasCheckbox] = useState(false);
  const [wasteCheckbox, setWasteCheckbox] = useState(false);
  const [nuclearEnergyCheckbox, setNuclearEnergyCheckbox] = useState(false);

  const onMinPowerSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinPowerSliderValue(parseInt(event.target.value));
  };

  const onMaxPowerSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxPowerSliderValue(parseInt(event.target.value));
  };

  const onWaterPowerCheckboxChange = () => {
    setWaterPowerCheckbox(!waterPowerCheckbox);
  };

  const onPhotovoltaicCheckboxChange = () => {
    setPhotovoltaicCheckbox(!photovoltaicCheckbox);
  };

  const onWindEnergyCheckboxChange = () => {
    setWindEnergyCheckbox(!windEnergyCheckbox);
  };

  const onBiomassCheckboxChange = () => {
    setBiomassCheckbox(!biomassCheckbox);
  };

  const onOilCheckboxChange = () => {
    setOilCheckbox(!oilCheckbox);
  };

  const onGasCheckboxChange = () => {
    setGasCheckbox(!gasCheckbox);
  };

  const onWasteCheckboxChange = () => {
    setWasteCheckbox(!wasteCheckbox);
  };

  const onNuclearEnergyCheckboxChange = () => {
    setNuclearEnergyCheckbox(!nuclearEnergyCheckbox);
  };

  const onSubmit = () => {
    setMinPower(minPowerSliderValue);
    setMaxPower(maxPowerSliderValue);
    setCategoryWaterPowerEnabled(waterPowerCheckbox);
    setCategoryPhotovoltaicEnabled(photovoltaicCheckbox);
    setCategoryWindEnergyEnabled(windEnergyCheckbox);
    setCategoryBiomassEnabled(biomassCheckbox);
    setCategoryOilEnabled(oilCheckbox);
    setCategoryGasEnabled(gasCheckbox);
    setCategoryWasteEnabled(wasteCheckbox);
    setCategoryNuclearEnergyEnabled(nuclearEnergyCheckbox);
  };

  return (
    <div className="fixed top-10 right-10 z-10">
      <div className="my-2">
        <label htmlFor="minPowerSlider">min power</label>
        <input
          className="m-2"
          type="range"
          value={minPowerSliderValue}
          min="1"
          max="1_872_000"
          id="minPowerSlider"
          onChange={onMinPowerSliderChange}
        />
      </div>
      <div className="my-2">
        <label htmlFor="maxPowerSlider">max power</label>
        <input
          className="m-2"
          type="range"
          value={maxPowerSliderValue}
          min="1"
          max="1_872_000"
          id="maxPowerSlider"
          onChange={onMaxPowerSliderChange}
        />
      </div>
      <div className="my-2">
        <label htmlFor="waterPowerCheckbox">Wasserkraft</label>
        <input
          type="checkbox"
          id="waterPowerCheckbox"
          checked={waterPowerCheckbox}
          onChange={onWaterPowerCheckboxChange}
        />
      </div>
      <div className="my-2">
        <label htmlFor="photovoltaicCheckbox">Photovoltaik</label>
        <input
          type="checkbox"
          id="photovoltaicCheckbox"
          checked={photovoltaicCheckbox}
          onChange={onPhotovoltaicCheckboxChange}
        />
      </div>
      <div className="my-2">
        <label htmlFor="windEnergyCheckbox">Windenergie</label>
        <input
          type="checkbox"
          id="windEnergyCheckbox"
          checked={windEnergyCheckbox}
          onChange={onWindEnergyCheckboxChange}
        />
      </div>
      <div className="my-2">
        <label htmlFor="biomassCheckbox">Biomasse</label>
        <input
          type="checkbox"
          id="biomassCheckbox"
          checked={biomassCheckbox}
          onChange={onBiomassCheckboxChange}
        />
      </div>
      <div className="my-2">
        <label htmlFor="oilCheckbox">Erdöl</label>
        <input
          type="checkbox"
          id="oilCheckbox"
          checked={oilCheckbox}
          onChange={onOilCheckboxChange}
        />
      </div>
      <div className="my-2">
        <label htmlFor="gasCheckbox">Erdgas</label>
        <input
          type="checkbox"
          id="gasCheckbox"
          checked={gasCheckbox}
          onChange={onGasCheckboxChange}
        />
      </div>
      <div className="my-2">
        <label htmlFor="wasteCheckbox">Abfälle</label>
        <input
          type="checkbox"
          id="wasteCheckbox"
          checked={wasteCheckbox}
          onChange={onWasteCheckboxChange}
        />
      </div>
      <div className="my-2">
        <label htmlFor="nuclearEnergyCheckbox">Kernenergie</label>
        <input
          type="checkbox"
          id="nuclearEnergyCheckbox"
          checked={nuclearEnergyCheckbox}
          onChange={onNuclearEnergyCheckboxChange}
        />
      </div>
      <div className="my-2">
        <button onClick={onSubmit}>Anwenden</button>
      </div>
    </div>
  );
}
