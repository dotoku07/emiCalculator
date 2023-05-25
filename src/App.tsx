import { useState } from "react";
import PieChart from "./components/Chart";
import InfoCards from "./components/InfoCard";
import Modal from "./components/Modal";
import RadioGroupComponent, { Option } from "./components/RadioGroup";
import useEMICalculator from "./hoooks/useEMICalculator";
import { classNames } from "./utilities/helpers";

const App = () => {
  const {
    principal,
    setPrincipal,
    setInterestRate,
    setTenure,
    emi,
    isMonthly,
    setMonthly,
    calculateEMI,
    results,
  } = useEMICalculator();

  const [open, setOpen] = useState<boolean>(false);

  const radioOptions: Option[] = [
    {
      name: "Monthly",
      value: "m",
    },
    {
      name: "Yearly",
      value: "y",
    },
  ];
  const handleOptionChange = (value: string) => {
    if (value === "m") {
      setMonthly(true);
    } else {
      setMonthly(false);
    }
  };

  const handleSubmit = () => {
    calculateEMI();
  };

  const getDataForChart = () => {
    if (results.length < 3) return [];
    const primaryPer: number = Number(
      ((principal / results[2].value) * 100).toFixed(2)
    );
    const interestPer: number = Number(
      ((results[1].value / results[2].value) * 100).toFixed(2)
    );
    if (!isNaN(primaryPer) && !isNaN(interestPer))
      return [primaryPer, interestPer];
    else return [];
  };
  return (
    <>
      <div className='flex justify-center items-center h-screen overflow-y-auto'>
        <div className='bg-white rounded-lg shadow-lg p-6  border border-zinc-100  md:w-2/4 sm:w-11/12'>
          <h2 className='text-2xl text-center mb-4'>EMI Calculator</h2>
          <div className='mb-4'>
            <label className='block mb-2 text-gray-700'>Primary Amount</label>
            <input
              className='border border-gray-300 px-4 py-2 rounded-md w-full'
              type='text'
              defaultValue={0}
              onChange={(e) =>
                setPrincipal(
                  isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                )
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-gray-700'>
              Interest rate (%)
            </label>
            <input
              className='border border-gray-300 px-4 py-2 rounded-md w-full'
              type='text'
              defaultValue={0}
              onChange={(e) =>
                setInterestRate(
                  isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                )
              }
            />
          </div>
          <div className='mb-4 items-center justify-center max-sm:flex-row md:flex'>
            <div className='w-full'>
              <label className='block mb-2 text-gray-700'>
                Tenure (in {isMonthly ? "months" : "years"}):
              </label>
              <input
                className='border border-gray-300 px-4 py-2 rounded-md w-full'
                max={12}
                defaultValue={0}
                type='text'
                onChange={(e) =>
                  setTenure(
                    isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                  )
                }
              />
            </div>
            <div className='w-full md:ml-2'>
              <RadioGroupComponent
                onChange={handleOptionChange}
                options={radioOptions}
                label='Select One'
                selectedValue={isMonthly ? "m" : "y"}
              />
            </div>
          </div>
          <div className='grid md:grid-cols-2 grid-rows-none gap-3 max-sm:grid-rows-2 grid-cols-none gap-y-2'>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md sm:w-full'
              onClick={() => handleSubmit()}>
              Calculate
            </button>
            <button
              className={classNames(
                "bg-sky-500 text-white px-4 py-2 rounded-md sm:w-full",
                !!emi && emi > 0 ? "block" : "hidden"
              )}
              onClick={() => setOpen(true)}>
              Show Graph
            </button>
          </div>
          <br />
          <div className='hidden bg-white rounded-lg shadow-lg p-6 w-full mt-5 border border-separate border-stone-700'>
            <div className='flex items-center justify-center'>
              <span className='text-md font-bold text-gray-800'>
                Result: {emi.toFixed(3)}
              </span>
            </div>
          </div>
          <InfoCards isOrange={false} infos={results} />
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className='mt-2 max-sm:mb-3 md:mb-5'>
          <InfoCards isOrange={true} infos={results} />
        </div>
        <PieChart data={getDataForChart()} />
      </Modal>
    </>
  );
};

export default App;
